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
- Removed cinematic stage-1 praising caption ("Toshkent yo'llari uchun ideal" / Cobalt praise text) per user request — that scroll segment now shows only the car; o1 transform + stage1 i18n keys deleted (Hero.jsx, i18n.js). Stage-2/3 overlays kept. Self-tested via screenshot.
- App is DEPLOYED to production: https://yandex-ride-preview.emergent.host — changes require user redeploy.

## Architecture
- React 19 + Tailwind + Framer Motion + R3F/drei + Lenis. No backend (FastAPI/Mongo untouched/unused).
- Brand constants: `/app/frontend/src/lib/brand.js`
- Page composition: `/app/frontend/src/pages/Landing.jsx`
- Sections: `/app/frontend/src/components/landing/*.jsx`

## Backlog
- P1: Replace Google Maps placeholder ("Tashkent") with the exact office address + pin once user provides it (OfficeLocation.jsx, MAPS_QUERY const)
- P2: Optional backend lead storage + admin view if user later wants leads in a database
- P2: Analytics on CTA clicks (Telegram vs call vs form) for conversion tracking
