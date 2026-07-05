# Auth Testing Guide (999 Taxi admin)

Single seeded admin, JWT (12h) via httpOnly cookie `access_token` + Bearer fallback. No registration/reset flows.

## Credentials
See /app/memory/test_credentials.md (admin@999taxi.com / Taxi999Admin_2026)

## API tests
```
API=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl -c /tmp/ck.txt -X POST "$API/api/auth/login" -H "Content-Type: application/json" -d '{"email":"admin@999taxi.com","password":"Taxi999Admin_2026"}'
curl -b /tmp/ck.txt "$API/api/auth/me"
curl -b /tmp/ck.txt "$API/api/leads"
```
- Wrong password → 401; 5 failures per ip:email → 429 lockout 15 min (collection: login_attempts)
- GET/PATCH/DELETE /api/leads* without token → 401
- POST /api/leads is PUBLIC (lead capture from the landing page)

## Mongo checks
```
mongosh --eval 'use test_database' --eval 'db.users.find({role:"admin"},{password_hash:1})'
```
Hash starts with $2b$. Indexes: users.email unique, login_attempts.identifier, leads.created_at.

## Frontend
/admin route: login form (data-testids admin-email-input/admin-password-input/admin-login-submit) → leads table (admin-leads-table), status select per row, delete, filter, refresh, logout.
