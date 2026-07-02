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

## Architecture
- React 19 + Tailwind + Framer Motion + R3F/drei + Lenis. No backend (FastAPI/Mongo untouched/unused).
- Brand constants: `/app/frontend/src/lib/brand.js`
- Page composition: `/app/frontend/src/pages/Landing.jsx`
- Sections: `/app/frontend/src/components/landing/*.jsx`

## Backlog
- P1: Replace Google Maps placeholder ("Tashkent") with the exact office address + pin once user provides it (OfficeLocation.jsx, MAPS_QUERY const)
- P2: Optional backend lead storage + admin view if user later wants leads in a database
- P2: Analytics on CTA clicks (Telegram vs call vs form) for conversion tracking
