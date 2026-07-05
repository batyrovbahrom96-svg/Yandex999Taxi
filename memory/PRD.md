# PRD — 999 Taxi Landing Page

## Original Problem Statement
Originally a 3D marketing landing page for Yandex Taxi (English, dark Swiss high-contrast theme, R3F 3D elements). In June 2026 the user requested a FULL REBRAND/REBUILD into **999 Taxi** — a premium, trustworthy, conversion-focused landing page for a taxi-driver connection & support service in Tashkent (helps drivers connect/work with Yandex Go).

## Key Requirements (user-confirmed)
- 100% Uzbek (Latin) UI — no English left
- Vertical continuous scroll on desktop AND mobile (horizontal scroll removed)
- Pure frontend — NO backend/database
- Lead form → opens Telegram (t.me deep link) with pre-filled message, then shows success state
- Brand colors: yellow #FFD400, black #050505, charcoal #111, red #E11D2E, white, gray
- Legal safety: NEVER claim "official Yandex partner"; safe wording used in FAQ #6 and footer legal note
- No fake reviews — honest placeholder "Haydovchilar fikrlari tez orada qo'shiladi"
- Contact: Phone +998 78 113 99 91, Telegram @t_boxodir, Toshkent, Har kuni 09:00–21:00
- Logo: user planned to upload a yellow/red/black 999 Taxi logo but never attached it → text-based "999 TAXI" brand mark built in `Logo.jsx` (swap when file arrives)

## Implemented (2026-06)
- Full rebuild, all sections: Navigation (Uzbek, Telegram/Call CTAs), Hero (3D taxi R3F canvas, 3 CTAs, 4 trust badges), SEO keyword Marquee, About (4 cards), Services (6 cards + Bog'lanish CTAs), WhyUs (6 cards), Process (4-step 3D timeline + CTA), Requirements (5 items + safe note), Trust (contact blocks + honest testimonial placeholder), FAQ (6-item shadcn accordion, safe answer for "official Yandex?" question), LeadForm (→ Telegram prefill via window.open, success "Rahmat!" state), FinalCTA, Footer (legal note), MobileCTA sticky bottom bar (Qo'ng'iroq / Telegram / Ariza)
- TaxiScene updated: paint #FFD400, red #E11D2E side stripes
- Tailwind colors `taxi` / `redb` added; index.css utilities (tilt-card, road-line, city-lights, road-perspective)
- index.html: lang=uz, Uzbek/Russian SEO title, description, keywords
- Deleted obsolete: HorizontalScroll, Benefits, Tariffs, HowItWorks, CityMap, AppDownload, ScrollProgress
- Testing: iteration_2.json — frontend 100% pass (all CTAs, form flow, FAQ, mobile sticky bar, no overflow, no English leftovers). `yarn build` passes (exit 0).

## Implemented (2026-06) — Iteration 2
- Real uploaded logo (/public/logo-999.png) in navbar/footer + favicon; Cobalt reference photo saved at /public/cobalt-taxi.jpg
- 3D hero rebuilt: Chevrolet Cobalt-style sedan (3-box silhouette, chrome grille + gold bowtie, orange TAXI roof sign), passengers inside (driver + 2 clients), red "999" + TAXI + checker decals on both doors (canvas textures — drei <Text>/troika crashes with installed three version, do NOT reuse it), city backdrop buildings + glowing showcase platform
- New sections: DriverAdvantages (#tizim, yellow bg, 6 cards, section 04), Testimonials (#fikrlar, 6 generated Uzbek driver reviews — user explicitly requested generation, section 08), OfficeLocation (#manzil, Google Maps embed placeholder "Tashkent" — EXACT OFFICE ADDRESS STILL NEEDED FROM USER, section 09), top ScrollProgress bar
- Section numbering 01–11 sequential; Trust placeholder removed
- Testing: iteration_3.json — 100% pass; yarn build exit 0

## Implemented (2026-06) — Iteration 3 (real GLB + cinematic scroll)
- Real user-uploaded Chevrolet Cobalt LTZ 2014 GLB (Q.SARDOR / CC BY 4.0, credit in footer) optimized 33.4MB → 270KB via gltf-transform (weld+simplify err 0.001+draco, `--no-palette` REQUIRED to preserve material names Realistic_Car_Paint / Car_windshield_glass) at /public/models/cobalt.glb (URL ?v=2 cache-bust)
- CobaltModel.jsx: draco useGLTF, paint recolored #FFD400, transparent glass, roof TAXI sign, red 999 + TAXI + checker decals both sides (canvas textures), normalized bottom y=0 length 4.3 along z, FRONT of car faces -z
- Peachworlds-style cinematic hero: desktop = 400vh sticky section, 4 camera keyframes (front reveal → side → close-up → final CTA) driven by scrollYProgress, stage overlay texts fade in/out; mobile <1024px = single screen auto-rotating car; 3D loader % overlay (useProgress), lazy-loaded scene, WebGL/image fallback (/cobalt-taxi.jpg), road + route glow + city backdrop + fog
- CRITICAL: main uses `overflow-x-clip` NOT `overflow-x-hidden` (hidden breaks position:sticky)
- Lead form reset now clears fields
- Testing: iteration_4.json — 100% pass (desktop cinematic stages, sticky, mobile, regressions, zero console errors); yarn build exit 0

## Implemented (2026-06) — Iteration 4 (premium polish pass, user bug report)
- Desktop hero: camera reframed (stage0 look [1.5,0.55,0.95] pushes car RIGHT — note: shifting lookAt toward screen-LEFT moves car right), car ~20% smaller, text max-w-44% left, zero overlap
- Mobile/tablet (<1024px): content-first layout — headline → paragraph → CTAs → separate bordered 300px canvas below → trust badges; car never behind text
- Premium paint (metalness .3, roughness .18, clearcoat 1), continuous checker-band texture + single aligned "999 TAXI" door decal texture, bigger roof sign, hemisphere studio light, darker 40x9 road with subtle lanes
- Marquee: Russian removed, Uzbek-only; headline: "999 Taxi bilan Yandex Go'da tezroq ish boshlang"; badge "HAYDOVCHILAR UCHUN ULANISH XIZMATI" (driver positioning Option A)
- Lead form reset clears fields
- Testing: iteration_5.json — 100% pass at 1440/1280/768/390; build exit 0
- NOTE: CobaltModel.jsx once got a duplicated tail from partial search_replace — file is clean now, verify before bulk edits

## Implemented (2026-06) — Iteration 5 (GLB quality fix, user bug report)
- Root cause of "broken" car: --simplify-error 0.001 crushed panels/wheels/normals. Fix: draco-only re-optimization (NO simplify), full 1M-tri geometry, 33MB → 1.33MB, served at /models/cobalt.glb?v=3
- Material upgrades: chrome alloy rims ('roda*' materials, luminance-split rim vs tire), transparent realistic headlight glass, red transparent rear lights, chrome exhaust ('escape')
- Decals: continuous checker-band texture (1.7 wide) + single aligned "999 TAXI" door texture (both sides)
- Testing: iteration_6.json — 100% pass, full 3D visual checklist verified (crisp panels, silver rims, realistic lights, aligned decals); build exit 0

## Implemented (2026-06) — Iteration 6 (real office address)
- Official address wired everywhere (brand.js LOCATION, OfficeLocation, Trust, LeadForm, Footer): "Yashnobod tumani, Qorasuv ko'chasi, 39-uy, Toshkent, 100014"
- Google Maps embed pinned to Qorasuv ko'chasi 39, Yashnobod (z=16); phone labeled "Call-markaz" +998 78 113 99 91 (user wrote "+9989 (78)..." — normalized to valid UZ format)
- Self-tested via screenshot: address/map/phone verified in office section

## Implemented (2026-06) — Iteration 7 (pre-publish pass)
- FULL UZ/RU bilingual: /src/lib/i18n.js (translations dict + LangProvider/useT/useLang), toggle in nav (desktop + mobile, testids lang-toggle-uz/ru), localStorage 'lang999', html lang attr; ALL 17 components consume useT()
- Official partnership (user confirmed documented): hero badge "YANDEX TAXI RASMIY HAMKORI"/"ОФИЦИАЛЬНЫЙ ПАРТНЁР ЯНДЕКС ТАКСИ", FAQ #6 = yes-official, footer legal updated
- "Call-markaz (09:00–21:00)" labels everywhere; real photo block (real-photo-block, /cobalt-taxi.jpg) in Trust; privacy note under lead form (leadform-privacy); mobile sticky CTA safe-area-inset-bottom
- Sentry (@sentry/react) conditional init via REACT_APP_SENTRY_DSN (empty in .env → no-op); /src/lib/sentry.js; USER MUST PROVIDE DSN to activate
- Testing: iteration_7.json — 100% pass (both languages full-page, persistence, form flows, mobile); build exit 0
- GOTCHA: lang-toggle testids exist twice in DOM (desktop nav + mobile) — tests must pick visible instance

## Implemented (2026-06) — Iteration 8
- Removed cinematic stage-1 praising caption ("Toshkent yo'llari uchun ideal" / Cobalt praise text) per user request, then REPLACED (next request) with company-praise copy: UZ "999 TAXI — ISHONCHLI HAMKOR / Haydovchilar tanlovi — 999 Taxi / Tezkor ulanish, halol munosabat…", RU "999 TAXI — НАДЁЖНЫЙ ПАРТНЁР / Выбор водителей — 999 Taxi…" (Hero.jsx stage1 + i18n.js). Self-tested via screenshot.
- App is DEPLOYED to production: https://yandex-ride-preview.emergent.host — changes require user redeploy. "Made with Emergent" badge is platform-injected, not in codebase (user directed to support@emergent.sh).

## Implemented (2026-06) — Iteration 9
- Replaced the Trust-section Cobalt photo with user's uploaded promo VIDEO (/public/cobalt-video.mp4, 2.5MB H.264, autoplay/muted/loop/playsInline, poster=/cobalt-taxi.jpg, testid brand-video); tag label now "VIDEO"/"ВИДЕО". NOTE: headless Playwright Chromium can't decode H.264 (readyState 0) — NOT a bug, real browsers play it; poster shows as fallback.
- Mute/unmute button on video (testid video-mute-toggle, bottom-right, VolumeX/Volume2 icons); play() promise wrapped in .catch() to avoid unhandled rejection in codec-less browsers. Self-tested: toggle flips video.muted, no error overlay.

## Implemented (2026-06) — Iteration 10 (final acceptance)
- Full operational acceptance run (iteration_8.json): 6/6 PASS — lead form → t.me/t_boxodir with prefilled name+phone (desktop+mobile, UZ+RU messages), all CTA hrefs verified, zero console errors, zero horizontal overflow at 3 scroll depths on 390px, RU persistence after reload, FAQ toggle OK
- Hardening: popup-blocked fallback in LeadForm (window.open null → window.location.href = t.me url) so no lead is lost
- TESTING TIP for future agents: use JS-based interactions (window.open override, native input setter + input event, element.click()) — Playwright fill/click stalls on Lenis + popup navigation

## Implemented (2026-07) — Iteration 11 (production domain check)
- User reported https://999taxi.com "doesn't work". Verified twice (self + testing agent iteration_9.json, 5/5 PASS): production is FULLY FUNCTIONAL — DNS via Cloudflare, HTTPS 200, hero/3D/GLB/video/CTAs/lead form/mobile all green, www redirects to apex. Root cause: client-side DNS propagation / ISP or browser cache at the user's location. No code changes.

## Implemented (2026-07) — Iteration 12 (badge removal)
- Removed "Made with Emergent" badge: deleted the <a id="emergent-badge"> block AND the assets.emergent.sh/scripts/emergent-main.js script tag from public/index.html (script was re-injecting the badge at runtime). No React component rendered it (src/ clean). GOTCHA: public/index.html changes need `sudo supervisorctl restart frontend` — dev server caches it. Verified: 0 badge elements in preview + build/index.html clean. If the deploy pipeline re-injects it on production, that's platform-side → support@emergent.sh.

## Architecture
- React 19 + Tailwind + Framer Motion + R3F/drei + Lenis. No backend (FastAPI/Mongo untouched/unused).
- Brand constants: `/app/frontend/src/lib/brand.js`
- Page composition: `/app/frontend/src/pages/Landing.jsx`
- Sections: `/app/frontend/src/components/landing/*.jsx`

## Backlog
- P1: Replace Google Maps placeholder ("Tashkent") with the exact office address + pin once user provides it (OfficeLocation.jsx, MAPS_QUERY const)
- P2: Optional backend lead storage + admin view if user later wants leads in a database
- P2: Analytics on CTA clicks (Telegram vs call vs form) for conversion tracking

## Implemented (2026-07) — Iteration 13 (mobile 3D polish, P0 complete)
- Fixed corrupted CinematicScene.jsx (duplicate trailing lines from previous failed edit broke the file tail)
- Mobile polish: content-first hero (text/CTAs above, 3D block below — no overlap), deferred 3D mount (700ms sceneReady gate + poster placeholder, testid hero-3d-placeholder), `small` prop on CinematicScene (<768px): car scale 0.85, camera [6.6,2.2,-9.6] fov 34, antialias off, shadows only in cinematic mode, DPR capped [1,1.5] non-cinematic
- Verified (testing agent iteration_10.json, 100% PASS): 390/430/768px — zero overlap, zero horizontal scroll, sticky CTA doesn't cover form submit, canvas mounts ~2s; desktop 1920 cinematic 400vh intact, UZ/RU toggle OK

## Backlog (updated)
- P1: Exact office address for Google Maps pin (waiting on user)
- P2: Yandex Metrica / Google Analytics CTA conversion tracking (NEXT UP per user: "after mobile polish, move to analytics")
- P2: Optional backend lead storage + admin view

## Implemented (2026-07) — Iteration 14 (3D occupants + animated decor + call-me-back)
- 3D people in the Cobalt (Occupants.jsx, primitives ~0KB): driver front-left (white shirt, yellow cap, arms to wheel) + client rear-right, cabin pointLight, windshield glass lightened to opacity 0.22 for visibility. NOTE: car FRONT faces -Z in world space (Occupants group rotated PI).
- OrbitPrep-style animated floating 3D decor (FloatingDecor.jsx): brand yellow/black renders (public/decor/*.webp, ~150KB total, backgrounds removed via flood-fill) with 3D tumble (rotateY/Z + perspective), float, pulsing glow, rotating dashed orbit ring, drifting particles. Placed: About=phone (xl+), Services=docs (xl+), Process=wheel (xl+), OfficeLocation=pin (lg+). Hidden on mobile/tablet by design (zero overlap guarantee).
- "Call me back" in sticky mobile bar (MobileCTA.jsx): 4th button (sticky-cta-callback) opens bottom sheet (callback-sheet) → phone input → t.me/t_boxodir deep link with prefilled message (popup-block fallback), success state, auto-close 2.5s. i18n UZ/RU under mobileCta.sheet.
- Self-tested (testing agent timed out — SUBAGENT TIMEOUT, no report): 390px callback flow E2E PASS (t.me URL captured with phone), 4 buttons fit, decor hidden on mobile, no horizontal scroll, occupants + decor visually verified at 1920px.
- User will push to Vercel themselves via Save to GitHub (their project: frontend-amber-ten-38.vercel.app = same codebase).

## Implemented (2026-07) — Iteration 15 (full cinematic 3D on mobile)
- User requested desktop cinematic experience transposed to smartphones. Removed the simplified mobile hero: cinematic sticky 400vh scroll now runs on ALL devices with WebGL (gate: `cinematic = webgl` in Hero.jsx).
- Mobile tuning: KEYS_MOBILE camera path in CinematicScene.jsx (look-points raised so car frames in lower half, text on top), fov 42 portrait, DPR [1,1.5], shadows+antialias OFF on mobile. Stage overlays: items-start pt-20/24 on mobile, lg reverts to centered; TrustBadges hidden <lg in stage 0; scroll hint bottom-24 (above sticky bar).
- Non-WebGL fallback = static image hero (sceneReady/isSmall/deferred-mount logic removed as dead code).
- Verified via screenshots at 390px: all 4 stages render correctly (stage 2 close-up shows driver+client), no horizontal scroll, sticky bar clear; desktop 1920 regression OK.
- NOTE: full pre-launch button-by-button QA was INTERRUPTED by user (testing agent timed out twice before that). Mobile callback flow E2E-tested in iteration 14. Remaining QA: nav links, FAQ accordion, lead form UZ/RU E2E, hamburger menu.
- Security audit (done, CONDITIONAL PASS): SEC-001 PostHog session replay vs privacy copy (MEDIUM), SEC-002 backend wildcard CORS (LOW), missing CSP/security headers + maps iframe referrer (hardening). User has NOT yet chosen fix option.

## Implemented (2026-07) — Iteration 16 (pre-launch QA + security fixes + analytics)
- SECURITY FIXES APPLIED: PostHog maskAllInputs:true + recordCrossOriginIframes:false (index.html); backend CORS no wildcard+credentials (server.py); maps iframe referrerPolicy=no-referrer (OfficeLocation.jsx); /app/frontend/vercel.json created with CSP + security headers (allows PostHog/Sentry/YM/GA/GoogleMaps/fonts).
- IMPORTANT DISCOVERY: the PostHog key phc_xAvL... in index.html is the EMERGENT PLATFORM's key (remote config contains platform event triggers). Data flows to Emergent's PostHog project, not the user's. Recommended removal before launch — user has not decided yet.
- ANALYTICS: /app/frontend/src/lib/analytics.js — initAnalytics() (loads Yandex Metrica if REACT_APP_YM_ID set, gtag if REACT_APP_GA_ID set; neither set yet) + track() (ym reachGoal + gtag event + posthog capture). Wired: hero 3 CTAs + stage3 2 CTAs, nav call/telegram, sticky bar 4 buttons (cta_call/cta_telegram/callback_open/cta_form with source), lead_callback, lead_form. Events flow into PostHog already.
- FULL PRE-LAUNCH QA PASSED (self-tested, 3 batches): all 9 tel:+17 t.me hrefs correct, 0 _blank-without-noreferrer, all 7 anchors, nav links scroll (smooth scroll takes ~5s over long page — early checks false-negative, NOT a bug), FAQ 6 items open/close, lang UZ↔RU + localStorage lang999 persistence, lead form UZ+RU E2E (correct t.me payloads), required-field validation, reset, mobile hamburger (opens/closes/scrolls), callback E2E regression, no horizontal scroll 390/1920.

## Implemented (2026-07) — Iteration 17 (backend lead storage + admin dashboard)
- BACKEND IS NOW LIVE (server.py rewritten, status_checks scaffold removed): POST /api/leads (public, validated Literal type form|callback), GET/PATCH/DELETE /api/leads (JWT-protected), POST /api/auth/login|logout, GET /api/auth/me. bcrypt + PyJWT (12h token, httpOnly cookie samesite=none secure + Bearer fallback), brute force lockout (5 fails/15min per ip:email), admin seeded from env on startup, Mongo indexes. New deps: bcrypt, pyjwt (requirements.txt frozen).
- backend/.env: added JWT_SECRET, ADMIN_EMAIL=admin@999taxi.com, ADMIN_PASSWORD (see /app/memory/test_credentials.md), CORS_ORIGINS now explicit list (preview + 999taxi.com + vercel + localhost).
- FRONTEND: src/lib/api.js submitLead() fire-and-forget (keepalive fetch, never blocks Telegram flow) wired into LeadForm + callback sheet. /admin route (lazy-loaded Admin.jsx): login form, leads table (date/type/name/tel-link/telegram-link/car-lic/source+note/status select new-contacted-closed/delete), status filter, counts, refresh, logout. vercel.json CSP connect-src now allows *.emergentagent.com / *.emergent.host.
- TESTED E2E: 9-step curl chain (create/401/login/me/list/patch/delete/422) all pass; site form → lead in Mongo → visible in /admin UI → status change works. Test leads cleaned.
- NOTE: leads only persist where the backend runs (Emergent deploy). The Vercel copy is static — its leads POST silently no-ops unless REACT_APP_BACKEND_URL points to a live backend.
