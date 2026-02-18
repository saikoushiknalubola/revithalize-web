
# Plan: Fix Login + Redesign Dashboard UI

## Part 1: Fix the Login Issue

The admin account `saikoushiknalubola@gmail.com` exists in the database (created Nov 2025) but the login is failing with "Invalid login credentials". This means the stored password hash doesn't match `Koushik@2330`.

**Root cause**: The password was likely set with a different password when the account was created. We need to reset it via a Supabase admin edge function.

**Fix approach**:
- Create a one-time edge function `reset-admin-password` that uses the service role key to call `supabase.auth.admin.updateUserById()` to reset the password for this specific user
- Deploy and call it once, then it's done
- Also fix the `handleLogin` in `Auth.tsx` to use `.maybeSingle()` instead of `.single()` to prevent crashes when profile doesn't exist

---

## Part 2: Redesign Dashboard UI (Hero Honda Passion Connected-Bike Theme)

The reference describes a premium dark-themed mobile-first connected-bike dashboard. We'll apply this design to the existing dashboard while keeping all the professional features intact.

### What changes:

**`src/pages/Dashboard.tsx`** - Complete visual overhaul:
- Replace the generic header with a bike showcase hero section (large bike image, bike name, "Connected" status badge)
- Add a prominent circular SVG progress indicator for battery/fuel level (animated 0 → value)
- Redesign stat cards as 2-column grid: Fuel/Battery %, Engine Health %, Range KM, Total KM
- Add a "Recent Rides" section with dummy data (realistic route names, distances, dates)
- Replace the bottom sheet trigger with a clean fixed bottom navigation bar (Home, Stats, Service, Profile tabs)
- Use electric blue (#1E6BFF) as primary accent alongside existing brand green
- Keep all existing professional features (Fleet, Analytics, etc.) below the hero section

**`src/components/mobile/MobileVehicleStatus.tsx`** - Replace swipe cards with:
- Hero bike image (Unsplash motorbike cutout, dark bg)
- Circular SVG progress for battery level
- 2×2 stat card grid (Battery, Engine Health, Range, Total KM)

**`src/components/features/BikeHeroSection.tsx`** (new component):
- Bike name header: "Hero Honda Passion Pro"
- Green dot + "Connected" badge
- Large centered motorbike image with blue glow behind it
- Circular progress ring (SVG) showing battery % with animated fill

**Color additions to Tailwind**: The existing dark theme already uses `#000000` background and supports the design. We'll use Tailwind classes that map to the reference colors.

### Key UI Specs Applied:
- Background: `bg-black` / `bg-[#121212]`
- Accent: `text-[#1E6BFF]` / `bg-[#1E6BFF]`
- Cards: `bg-[#1C1C1E]` rounded-xl with 1px `border-[#2A2A2E]`
- Typography: Poppins (already installed)
- Circular progress: Custom SVG `<circle>` with stroke-dashoffset animation
- Bottom nav: Fixed at bottom, 5 tabs, active tab has blue circular highlight
- Mobile max-width: `max-w-[420px] mx-auto` container

### Technical Details:

**Files to create/modify**:

1. **`src/components/features/BikeHeroSection.tsx`** (NEW)
   - SVG circular progress component
   - Bike image from Unsplash (commuter motorcycle)
   - Connected status badge

2. **`src/components/mobile/BikeStatCard.tsx`** (NEW)
   - Reusable stat card: icon + big number + label
   - Dark card with border, rounded-xl

3. **`src/components/layout/BikeBottomNav.tsx`** (NEW)
   - Fixed bottom navigation: Home, Stats, Service, Profile
   - Active state: blue circular background behind icon

4. **`src/pages/Dashboard.tsx`** (MODIFIED)
   - Wrap in `max-w-[420px] mx-auto` on mobile
   - Use `BikeHeroSection` for mobile top section
   - Use `BikeStatCard` grid for quick stats
   - Add Recent Rides section
   - Use `BikeBottomNav` on mobile

5. **`supabase/functions/reset-admin-password/index.ts`** (NEW - temporary)
   - Uses service role to reset admin password
   - Called once then can be removed

### Sequence:
1. Create & deploy the password reset edge function → call it → login fixed
2. Create `BikeHeroSection` component with circular progress + bike image
3. Create `BikeStatCard` reusable component
4. Create `BikeBottomNav` component
5. Update `Dashboard.tsx` to use new components with the connected-bike layout
6. Update `MobileVehicleStatus.tsx` with new design
