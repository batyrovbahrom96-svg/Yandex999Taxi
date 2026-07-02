# Yandex Taxi — 3D Marketing Landing Page

## Original Problem Statement
Build a landing page: Create 3D landing page about Yandex Taxi service.

## User Choices
- **Language**: English
- **Style**: Bright branded (Yandex yellow #FFCC00 + deep black #0A0A0A) — dark-mode Swiss/high-contrast archetype
- **3D**: All (rotating car in hero, interactive 3D city map with routes, 3D parallax icons on scroll)
- **Sections**: Hero + Benefits + Tariffs + How it works + App + Footer
- **Backend**: None — pure marketing landing

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + Lenis smooth scroll + React Three Fiber (three.js)
- **3D Scenes**: All built from R3F primitives — no external GLTFs required
  - Hero: stylized low-poly Yandex taxi with `<PresentationControls>` drag + auto-rotate + reflective `<Environment preset="city">`
  - How it works: 4 mini R3F canvases (spinning octahedron/box/torus/sphere with yellow emissive)
  - CityMap: procedural building grid + `<TubeGeometry>` route arc + animated marker following a `CatmullRomCurve3`
- **Smooth scroll**: Lenis mounted in `App.js`
- **Typography**: Cabinet Grotesk (display) + Manrope (body) + JetBrains Mono (labels)

## Sections Implemented (Dec 2025)
1. **Navigation** — Sticky glass nav, mobile hamburger, 5 links + Download CTA
2. **Hero** — Massive H1 + 3D taxi canvas + LIVE badge + 3-stat row
3. **Marquee** — Auto-scrolling ticker (FAST / SAFE / 24/7 / GLOBAL / PREMIUM / SMART / RELIABLE / EVERYWHERE)
4. **Benefits** — 6-card asymmetric bento grid (8/4 / 4/4/4 / 8) with mix of dark, yellow, glass, yellow-soft variants
5. **Tariffs** — 4 pricing cards (Economy, Comfort [featured], Business, Premier) with feature checklists
6. **How it works** — Vertical timeline with 4 steps, each paired with its own mini 3D canvas
7. **City Map** — Full-width 3D isometric city grid with animated route + moving taxi marker + live-network stats overlay
8. **App Download** — Phone mockup with fake map + route + arriving-driver card, App Store + Google Play CTAs, 3 mini stats
9. **Footer** — Big CTA + 4-column link grid + socials + huge YANDEX.TAXI wordmark

## Testing
- **Iteration 1 (Dec 2025)**: 100% frontend pass. All 51 data-testids verified. 6 WebGL canvases render. Desktop + mobile navigation smooth-scrolls. Zero console errors.

## Prioritized Backlog
### P1
- Guard R3F canvases with `IntersectionObserver` so offscreen scenes suspend on low-end devices
- Add real localized copy variants (RU / other languages) if needed

### P2
- Testimonials / press-quotes carousel
- Driver signup CTA section
- Cookie consent banner
- Real GLTF taxi model (currently primitives-only)
- OG image + meta tags for social sharing

## Next Action Items
- Optional: add IntersectionObserver-based 3D suspension for better mobile perf
- Optional: add sharing meta tags + favicon polish
