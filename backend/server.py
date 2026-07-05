from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Literal

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"
LOCKOUT_ATTEMPTS = 5
LOCKOUT_MINUTES = 15


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(hours=12), "type": "access"}
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: Literal["form", "callback"]
    name: Optional[str] = None
    phone: str
    telegram: Optional[str] = None
    car: Optional[str] = None
    license: Optional[str] = None
    note: Optional[str] = None
    lang: Optional[str] = None
    source: Optional[str] = None
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class LeadCreate(BaseModel):
    type: Literal["form", "callback"]
    name: Optional[str] = Field(default=None, max_length=200)
    phone: str = Field(min_length=4, max_length=30)
    telegram: Optional[str] = Field(default=None, max_length=100)
    car: Optional[str] = Field(default=None, max_length=10)
    license: Optional[str] = Field(default=None, max_length=10)
    note: Optional[str] = Field(default=None, max_length=1000)
    lang: Optional[str] = Field(default=None, max_length=5)
    source: Optional[str] = Field(default=None, max_length=50)


class StatusUpdate(BaseModel):
    status: Literal["new", "contacted", "closed"]


class LoginRequest(BaseModel):
    email: str
    password: str


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(status: Optional[str] = None, user: dict = Depends(get_current_user)):
    query = {"status": status} if status else {}
    docs = await db.leads.find(query, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return docs


@api_router.patch("/leads/{lead_id}", response_model=Lead)
async def update_lead_status(lead_id: str, payload: StatusUpdate, user: dict = Depends(get_current_user)):
    result = await db.leads.find_one_and_update(
        {"id": lead_id}, {"$set": {"status": payload.status}}, projection={"_id": 0}, return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Lead not found")
    return result


@api_router.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str, user: dict = Depends(get_current_user)):
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"deleted": True}


@api_router.post("/auth/login")
async def login(payload: LoginRequest, request: Request, response: Response):
    email = payload.email.strip().lower()
    identifier = f"{request.client.host}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    now = datetime.now(timezone.utc)
    if attempt and attempt.get("count", 0) >= LOCKOUT_ATTEMPTS:
        locked_until = datetime.fromisoformat(attempt["locked_until"])
        if now < locked_until:
            raise HTTPException(status_code=429, detail="Too many attempts. Try again later.")
        await db.login_attempts.delete_one({"identifier": identifier})

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"locked_until": (now + timedelta(minutes=LOCKOUT_MINUTES)).isoformat()}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_access_token(user["id"], email)
    response.set_cookie(key="access_token", value=token, httponly=True, secure=True, samesite="none", max_age=43200, path="/")
    return {"id": user["id"], "email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin"), "token": token}


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"ok": True}


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[o.strip() for o in os.environ.get('CORS_ORIGINS', '').split(',') if o.strip() and o.strip() != '*'],
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.leads.create_index([("created_at", -1)])
    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Admin user seeded")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Admin password updated from env")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
