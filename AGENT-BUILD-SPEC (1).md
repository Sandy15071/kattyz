# Build Spec: Katty'z 24-Hour Website
**Target consumer of this document: an agentic coding AI (e.g., Claude Code).**
This is not a narrative PRD — it is an execution spec. Follow the tasks in order. Do not build anything listed under "Out of Scope." Ask/flag only if a task is genuinely ambiguous; otherwise use the stated defaults.

---

## 0. Assumptions Locked In (do not re-litigate these)
- Language: **JavaScript** (not TypeScript) for MVP — keep dependency surface small.
- Build tool: **Vite**
- Styling: **Tailwind CSS**
- Backend: **Firebase** (Firestore + Hosting), no custom server, no Cloud Functions in MVP
- Package manager: **npm**
- No online ordering, no auth, no payments in this build — that is explicitly Phase 2+ (see §7 Out of Scope)

If any instruction below conflicts with these, the instruction below wins for that specific item; otherwise these are the defaults.

**Real business data to seed with (do not use generic placeholders):**
- Name: `Katty'z`
- Address: `Shop No. 13, Ground Floor, Flora Building, Hiranandani Estate, Ghodbunder Rd, Waghbil, Thane, Maharashtra 400607`
- Hours note: `Open 24 Hours` (per the business's own Google Business Profile — treat this as authoritative over any third-party listing)
- Phone number: **TODO — not yet confirmed.** Pull the exact number from the Katty'z Google Business Profile before running the seed script; do not guess or scrape a number from an aggregator site, since a wrong number defeats the whole click-to-call feature.
- Brand palette starting point (approximate, confirm against real signage before finalizing in `tailwind.config.js`): deep purple/maroon primary (~`#4a1942`–`#5c1f4f` range), bright yellow accent (~`#f5d90a`–`#ffd400` range) for the logo/CTA treatment. Treat these hex values as estimates from a photo, not ground truth.

---

## 1. Environment Setup

```bash
# 1. Scaffold
npm create vite@latest restaurant-site -- --template react
cd restaurant-site
npm install

# 2. Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Routing + Firebase SDK
npm install react-router-dom firebase

# 4. Firebase project (assumes `firebase login` already done)
npm install -g firebase-tools
firebase init hosting firestore
```

**Config file needed:** `src/firebaseConfig.js` — export an initialized Firebase app using env vars (`VITE_FIREBASE_API_KEY`, etc.) read via `import.meta.env`. Never hardcode keys in source; use a `.env` file and add it to `.gitignore`.

---

## 2. Repository Structure

```
src/
  components/
    Header.jsx          // logo, nav, "Open 24 Hours" badge
    HoursBadge.jsx       // reusable open-now indicator
    CallButton.jsx        // sticky click-to-call CTA
    MenuCategoryTabs.jsx // category switcher (Burgers/Wraps/Snacks/Desserts)
    MenuItemCard.jsx     // single item: image, name, price, tags
    MapEmbed.jsx         // embedded map + "Get Directions" link
    Footer.jsx
  pages/
    Home.jsx             // hero + hours + featured items + map preview
    Menu.jsx             // full categorized menu
    Location.jsx         // full map + address + hours + directions
  hooks/
    useMenuData.js       // Firestore listener for menuCategories + menuItems
    useRestaurantInfo.js // Firestore listener for restaurantInfo doc
  firebaseConfig.js
  App.jsx
  main.jsx
firestore.rules
firestore.indexes.json
firebase.json
.env.example
```

---

## 3. Firestore Data Model

Create these collections exactly as named (case-sensitive):

```
restaurantInfo (collection, single doc with id "main")
  name: string
  phoneNumber: string        // E.164 format, e.g. "+91XXXXXXXXXX"
  address: string
  lat: number
  lng: number
  hoursNote: string           // e.g. "Open 24/7"
  instagramUrl: string | null
  facebookUrl: string | null

menuCategories/{categoryId}
  name: string                // "Burgers" | "Wraps" | "Snacks" | "Desserts"
  sortOrder: number
  isActive: boolean

menuItems/{itemId}
  categoryId: string           // references menuCategories doc id
  name: string
  description: string
  price: number
  imageUrl: string
  tags: array<string>          // e.g. ["veg","spicy","bestseller"]
  isAvailable: boolean
  sortOrder: number
```

### Task: Seed Data
Write a one-time seed script (`scripts/seed.js`, run with `node scripts/seed.js` using firebase-admin) that inserts:
- 1 `restaurantInfo` doc
- 4 `menuCategories` docs (Burgers, Wraps, Snacks, Desserts)
- At least 3 `menuItems` per category (placeholder names/prices/images are fine)

**Acceptance criteria:** running the seed script populates Firestore such that `Menu.jsx` renders real data with no manual console edits.

---

## 4. Firestore Security Rules

Create `firestore.rules` with exactly this policy: public read on menu/info collections, no public writes.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /restaurantInfo/{docId} {
      allow read: if true;
      allow write: if false; // manage via Firebase console or admin SDK only
    }
    match /menuCategories/{docId} {
      allow read: if true;
      allow write: if false;
    }
    match /menuItems/{docId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```
**Acceptance criteria:** `firebase deploy --only firestore:rules` succeeds; an anonymous client can read but a client-side write attempt fails.

---

## 5. Component-Level Tasks (build in this order)

### T1 — `firebaseConfig.js` + `.env.example`
Initialize Firebase app from env vars. Export `db` (Firestore instance).
**Done when:** app boots with no console errors and `db` is importable.

### T2 — `useRestaurantInfo` hook
Real-time `onSnapshot` listener on `restaurantInfo/main`. Returns `{ data, loading }`.

### T3 — `useMenuData` hook
Fetches `menuCategories` (ordered by `sortOrder`, `isActive == true`) and `menuItems` (ordered by `sortOrder`, `isAvailable == true`), grouped by category.

### T4 — `HoursBadge.jsx`
Renders `hoursNote` from `useRestaurantInfo` inside a visually prominent pill/badge (Tailwind: high-contrast background, rounded-full). Must render above the fold on `Home.jsx`.

### T5 — `CallButton.jsx`
Fixed-position button (`position: fixed`, bottom-right on mobile), `<a href="tel:{phoneNumber}">`. Must be visible on every page (mount in `App.jsx`, not per-page).
**Done when:** tapping it on a real mobile device opens the phone dialer pre-filled.

### T6 — `MapEmbed.jsx`
Google Maps iframe embed using `lat`/`lng` from `restaurantInfo`, plus a "Get Directions" `<a>` linking to `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}`.

### T7 — `MenuCategoryTabs.jsx` + `MenuItemCard.jsx`
Tabs switch active category client-side (no page reload). Cards show image (lazy-loaded, `loading="lazy"`), name, description, price, tag chips.

### T8 — `Home.jsx`
Assemble: `Header` (with `HoursBadge`) → hero → 3–4 featured `MenuItemCard`s → `MapEmbed` preview → `Footer`. `CallButton` floats globally.

### T9 — `Menu.jsx`
Full menu using `MenuCategoryTabs` + all `MenuItemCard`s from `useMenuData`. Include a text `<input>` client-side filter by name/tag.

### T10 — `Location.jsx`
Full-size `MapEmbed`, address text, `HoursBadge`, directions link.

### T11 — Routing
`App.jsx` wires `react-router-dom`: `/` → Home, `/menu` → Menu, `/location` → Location. `Header` nav links to all three.

### T12 — SEO / Meta
Add `LocalBusiness` + `Menu` JSON-LD structured data (populate from `restaurantInfo` + menu data) injected via `<script type="application/ld+json">` in `index.html` or via a head-management approach. Set per-page `<title>`/meta description.
**Note:** since this is a client-rendered SPA, structured data injected purely client-side may not be crawled reliably — flag this to the user as a known limitation; a static prerender step is a reasonable Phase 1.5 follow-up, not required to ship MVP.

### T13 — Responsive QA pass
Test at 360px, 768px, 1024px, 1440px widths. Verify `CallButton` never overlaps content, tap targets ≥44px, no horizontal scroll.

### T14 — Deploy
`firebase deploy` (Hosting + Firestore rules). Verify live URL loads menu data from production Firestore.

---

## 6. Non-Functional Acceptance Criteria
- Lighthouse (mobile, production build): Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90.
- All images served with explicit `width`/`height` to prevent layout shift.
- No client-side write paths to Firestore anywhere in the codebase (grep for `.set(`, `.update(`, `.add(` in `src/` should return nothing outside the seed script).

---

## 7. Out of Scope — Do Not Build
Explicitly excluded from this build. Do not scaffold routes, components, or Firestore collections for any of these unless a new task instructs otherwise:
- Cart / checkout / payments
- Firebase Authentication / customer accounts
- Order history, order status tracking
- Admin dashboard
- Push notifications
- Reviews/ratings
- Multi-location support

---

## 8. Definition of Done (MVP)
- [ ] All tasks T1–T14 complete
- [ ] Site deployed on Firebase Hosting, publicly reachable
- [ ] Menu content editable via Firestore console alone (no redeploy needed to change price/availability)
- [ ] Passes Non-Functional Acceptance Criteria in §6
