
# ReVithalize — Premium EV Retrofit Dashboard Revamp

A full visual + IA overhaul targeting a Tesla-grade, mobile-first product feel that B2C riders and fleet ops will pay for. No business-logic changes — only presentation, hierarchy, and a few new premium surfaces.

---

## 1. Design language

**Palette (locked, semantic tokens in `index.css`)**
- `--bg`: `#0A0A0A` (true black)
- `--surface`: `#111113` (raised)
- `--surface-2`: `#1A1A1D` (cards)
- `--border`: `#1F1F23` hairline
- `--accent`: `#00FF94` (ReVithalize green — single hero accent)
- `--accent-dim`: `#00B86B`
- `--text`: `#FFFFFF`
- `--text-muted`: `#8A8A93`
- `--danger`: `#FF5C5C`, `--warning`: `#FFB020`
- Gradients: `--grad-accent: linear-gradient(135deg,#00FF94,#00B86B)`; `--grad-glass: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0))`
- Shadows: `--shadow-glow: 0 0 40px -10px rgba(0,255,148,.35)`; `--shadow-card: 0 1px 0 rgba(255,255,255,.04) inset, 0 20px 40px -24px rgba(0,0,0,.8)`

**Typography (Sora + Manrope via @fontsource)**
- Display/Headings: `Sora` 600/700, tight tracking `-0.02em`
- Body/UI: `Manrope` 400/500/600
- Numerics: `font-variant-numeric: tabular-nums` for all metric cards (instrument-cluster precision)

**Radii & spacing**
- Cards: `rounded-2xl` (16px); pills `rounded-full`; modals `rounded-3xl`
- Mobile gutters: 16px; card padding: 16px mobile / 20px desktop
- 8pt grid

**Motion (subtle, never bouncy)**
- Page enter: 200ms fade + 4px translateY
- Card hover (desktop): 1px lift + accent border glow
- Numbers tween 600ms on change (count-up)
- Bolt logo: continuous 3s subtle pulse/charge sweep, pauses on `prefers-reduced-motion`

---

## 2. Logo system

Replace text `<Logo>` with the attached bolt+wordmark across the app.

- Upload `ReVithalize_logo - Edited.jpg` via `lovable-assets` → `src/assets/revithalize-logo.png.asset.json`
- Rebuild `src/components/branding/Logo.tsx`:
  - Sizes `sm | md | lg | xl` → render `<img>` of the lockup at fixed heights (20 / 28 / 36 / 56 px)
  - `variant="mark"` renders only the bolt (extracted as inline SVG for crisp mobile header use)
  - Animated bolt: SVG `<path>` with green→white gradient stroke + 3s `animate-pulse-glow` keyframe (added to tailwind config)
- Used in: mobile top bar, desktop sidebar, Auth page, splash/loading, PDF invoice header, OG image

---

## 3. Information architecture (Individual dashboard)

Mobile-first stack, ordered by what a retrofit owner opens the app to check:

```
┌──────────────────────────────────────┐
│  [Logo lockup]            [bell·avatar]│  sticky header, blurred
├──────────────────────────────────────┤
│  CHARGING / RANGE HERO               │  ← new premium surface
│  ◐ 82%   118 km          ⚡ Charging │
│  ring with animated accent sweep     │
│  "Full in 1h 24m · ₹14 saved today"  │
├──────────────────────────────────────┤
│  Quick actions (4 chips, scrollable) │
│  Lock · Locate · Trip · Service      │
├──────────────────────────────────────┤
│  Today  ▸                             │
│  ┌────────┬────────┐                  │
│  │ 24 km  │ ₹38    │                  │
│  │ Driven │ Saved  │                  │
│  ├────────┼────────┤                  │
│  │ 4.2 kg │ 96%    │                  │
│  │ CO₂ ↓  │ Health │                  │
│  └────────┴────────┘                  │
├──────────────────────────────────────┤
│  Vehicle health ring                 │  ← new (battery+motor+brakes)
│  3 segmented arcs, tap → details     │
├──────────────────────────────────────┤
│  Next service card                   │  ← new
│  "Inspection in 412 km · Book ▸"     │
├──────────────────────────────────────┤
│  Trips this week (sparkline list)    │
└──────────────────────────────────────┘
       [ bottom nav · floating pill ]
```

Fleet dashboard keeps existing IA but inherits all tokens, type, cards, and the new "Live fleet pulse" hero (cars-on-road count + avg SoC ring + alerts badge).

---

## 4. New premium components

- `ChargingHero` — radial SoC ring (SVG), animated accent sweep when charging, range + ETA + savings
- `HealthRing` — 3 concentric arcs (battery / motor / brakes) with tap-through
- `StatTile` — tabular-num metric tile, optional sparkline, optional delta chip
- `QuickActionChip` — 56px circular icon + label, haptic-feel press (scale .96)
- `ServiceCard` — next service / warranty / RSA, CTA on right
- `SectionHeader` — uppercase 11px label + chevron link, used everywhere
- `GlassCard` — base card with `--shadow-card` + 1px inset highlight + optional accent border on focus

All built with semantic tokens — zero hardcoded hex in components.

---

## 5. Mobile-first execution across all pages

Pages touched (visual only, no logic):
Dashboard · VehicleDetails · MapView · AdvancedAnalytics · BatteryAnalytics · MaintenanceAI · ChargingIntelligence · RangePrediction · BatteryTwin · EcoProgram · CarbonTracker · SmartGrid · Notifications · Profile · Subscription · Settings · Support · About · Auth · FleetDashboard · FleetManagement · Reports · Compliance · Customers · Security · AI Insights · Energy Optimization · System Monitoring · Integration Hub · Predictive Analytics

Per page:
- Replace ad-hoc headings with `<SectionHeader>` + Sora display
- Wrap blocks in `GlassCard` (16px padding mobile)
- Convert raw grids to responsive `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- Tabs → segmented pill control (full-width on mobile, scrollable)
- Charts: 180px height mobile, accent green stroke, no gridlines on small screens, tabular numerics in tooltips
- Forms: 48px tap targets, floating labels, `inputMode` hints
- Empty states: bolt mark + one-line copy + CTA
- Safe-area padding (`env(safe-area-inset-bottom)`) above bottom nav

Global CSS safety net (already in place) keeps wide grids and oversize headings from overflowing on `<375px` screens.

---

## 6. Bottom nav refinement

- Floating pill stays, but: 64px height, true-black `#0A0A0A/95` glass, hairline `#1F1F23` border, active item shows a 4px accent dot above the icon (instead of full ring) for a more premium, less gamey feel
- Center "Map" gets a slightly raised treatment on individual dashboard

---

## 7. Auth & first-run polish

- Auth page: black canvas, centered logo lockup with the bolt slowly pulsing, single accent CTA, social row below — mobile-first, no decorative gradients
- Splash/loading: same lockup, charge-sweep on the bolt

---

## Technical details

**Files to add**
- `src/assets/revithalize-logo.png.asset.json` (via `lovable-assets`)
- `src/components/branding/LogoMark.tsx` (animated bolt SVG)
- `src/components/ui/glass-card.tsx`
- `src/components/ui/section-header.tsx`
- `src/components/ui/stat-tile.tsx`
- `src/components/ui/quick-action-chip.tsx`
- `src/components/dashboard/ChargingHero.tsx`
- `src/components/dashboard/HealthRing.tsx`
- `src/components/dashboard/ServiceCard.tsx`

**Files to edit (high-impact first)**
- `src/index.css` — new token set, font faces, `pulse-glow` keyframe, safe-area helpers
- `tailwind.config.ts` — add `sora`/`manrope` families, accent tokens, `pulse-glow` animation
- `src/main.tsx` — `@fontsource/sora`, `@fontsource/manrope` imports
- `src/components/branding/Logo.tsx` — switch to image lockup + mark variant
- `src/components/layout/DashboardLayout.tsx` — new header, refined bottom nav, safe-area
- `src/components/ui/card.tsx`, `tabs.tsx`, `button.tsx` — premium variants
- `src/pages/Dashboard.tsx` — new IA (ChargingHero → QuickActions → StatTiles → HealthRing → ServiceCard → Trips)
- All remaining pages listed in §5 — swap to new primitives, no business logic touched

**Dependencies to install**
```bash
bun add @fontsource/sora @fontsource/manrope
```

**Out of scope (won't change)**
- Supabase schema, auth, RLS, edge functions
- Routing, role gating, dual-dashboard separation
- Payment/PhonePe, invoice math, subscription tiers
- Any AI/data fetching logic

---

## Acceptance

- All pages render cleanly on 360×640, 390×844, 768, 1280
- Single accent color throughout; zero hardcoded `text-white` / `bg-black` in new components
- Logo lockup visible on mobile header, desktop sidebar, auth, splash, PDF
- Bolt animation respects `prefers-reduced-motion`
- No console errors; build green; existing tests/routes unaffected
