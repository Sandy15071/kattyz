# Product Requirements Document (PRD)
## Katty'z — 24-Hour Digital Storefront

**Document Owner:** Product Management
**Status:** Draft v1.0
**Last Updated:** September 2026

---

## 1. Executive Summary

### 1.1 Product Vision
Build a fast, mobile-first digital storefront that converts the restaurant's biggest competitive advantage — being open 24/7 — into its biggest online asset. The site must answer three questions for a stranger in under 5 seconds: *What do you serve? Are you open right now? How do I get food from you (call or visit)?*

This is not a brochure site. It is a **conversion funnel for hungry people at 2 AM**, where every design and technical decision is judged against "does this get someone fed faster."

### 1.2 Core Objectives
- **O1 — Immediate Trust:** Communicate 24/7 availability instantly, so late-night users don't bounce out of fear the shop is closed.
- **O2 — Frictionless Contact:** Reduce the path from "I'm hungry" to "I'm calling/ordering" to as few taps as possible.
- **O3 — Local Discoverability:** Rank on Google/Maps for "burgers near me," "late night food [area]," and similar local-intent searches.
- **O4 — Operational Simplicity:** Give restaurant staff a way to update menu items/prices without touching code.
- **O5 — Foundation for Growth:** Ship an architecture that can absorb online ordering and accounts later without a rewrite.

### 1.3 Target Audience
| Segment | Need | Priority |
|---|---|---|
| Late-night diners (shift workers, students, night owls) | Confirmation the shop is open + fastest contact method | Primary |
| Local residents (repeat customers) | Quick menu lookup, directions, phone number | Primary |
| First-time / tourist visitors | Discover via Google search/Maps, evaluate menu before visiting | Secondary |
| Delivery-app users (future) | Eventually order directly to avoid platform commissions | Future |

---

## 2. Technical Architecture

### 2.1 Stack Overview
| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React (Vite) SPA | Component reusability, fast dev velocity, rich ecosystem for future cart/auth features |
| Styling | Tailwind CSS | Rapid mobile-first responsive design, small bundle with purging |
| Routing | React Router | Client-side navigation between Home / Menu / Location / (future) Order |
| Backend/DB | Firebase Firestore | Serverless NoSQL store for menu data; real-time updates without redeploys |
| Hosting | Firebase Hosting | Global CDN, free SSL, one-command deploys, tight Firestore integration |
| Auth (future) | Firebase Authentication | Drop-in customer accounts phase 2 |
| Media | Firebase Storage | Menu item images, optimized/served via CDN |
| Analytics | Firebase Analytics / GA4 | Track menu views, click-to-call events, map clicks as conversion events |

### 2.2 Data Model (Firestore)
```
/restaurantInfo/{singletonDoc}
  - name, phoneNumber, address, lat, lng
  - hoursNote: "Open 24/7"
  - socialLinks: { instagram, facebook }

/menuCategories/{categoryId}
  - name: "Burgers" | "Wraps" | "Snacks" | "Desserts"
  - sortOrder: number
  - isActive: boolean

/menuItems/{itemId}
  - categoryId: ref
  - name, description, price
  - imageUrl
  - tags: ["veg", "spicy", "bestseller"]
  - isAvailable: boolean   // toggled off during stockouts
  - sortOrder: number
```
This structure lets restaurant staff mark an item "unavailable" (e.g., ran out of a bun) instantly reflected on the live site — no code change, no redeploy.

### 2.3 Security & Access
- Firestore Security Rules: **public read** on menu/restaurant info collections, **write access restricted** to an authenticated admin (Firebase Auth, single or few admin accounts).
- No customer PII is collected in the MVP, minimizing compliance surface area.

### 2.4 Deployment
- Git-based workflow → GitHub Actions (or Firebase CLI manual deploy) → `firebase deploy` to Hosting on merge to `main`.
- Firebase Hosting preview channels used for staging/QA before production push.

---

## 3. MVP Features (Phase 1 — Launch Scope)

- **Mobile-First Digital Menu**
  - Categorized browsing: Burgers, Wraps, Snacks, Desserts
  - Item cards: photo, name, short description, price, dietary/spice tags
  - Client-side filter/search (e.g., "veg only")
  - Pulled live from Firestore — no hardcoded menu in the bundle

- **Prominent 24/7 Operating Hours**
  - Persistent "Open Now — 24 Hours" badge in the header/hero, not buried in a footer
  - Visually distinct treatment (e.g., color accent) so it registers in a half-second glance

- **Click-to-Call**
  - Sticky/floating call button on mobile (`tel:` link) visible on every screen
  - Placed in the natural thumb zone (bottom-right or bottom bar)

- **Integrated Map & Directions**
  - Embedded Google Map pinned to storefront location
  - One-tap "Get Directions" deep link (opens Google/Apple Maps app on mobile)
  - Full address and a recognizable landmark reference in text (helps with local SEO too)

- **Supporting Info**
  - About/hero section reinforcing brand + 24-hour value prop
  - Social media links
  - Basic contact section (phone, address, email if applicable)

---

## 4. Future Scope (Post-MVP)

### Phase 2 — Ordering Enablement
- Full online ordering: cart, item customization (add-ons/removals), order summary
- Payment gateway integration (e.g., Razorpay/Stripe/UPI depending on region)
- Order-type selection: pickup vs. delivery (if applicable)
- Order status page (received → preparing → ready)

### Phase 3 — Customer Accounts & Retention
- Firebase Auth-based customer accounts (phone/email login)
- Order history and reordering ("order again" one-tap)
- Loyalty points / rewards program
- Push notifications (FCM) for late-night promos, new menu drops

### Phase 4 — Operations & Scale
- Admin dashboard for staff: live order queue, inventory toggles, sales reporting
- Inventory management tied to `isAvailable` flags (auto-disable sold-out items)
- Multi-branch support if the business expands locations
- Customer reviews/ratings module

---

## 5. Primary User Flow

1. **Entry:** User lands via Google search ("burgers near me"), Maps listing, or direct link — typically on mobile, often late at night.
2. **Instant Reassurance:** Hero section confirms "Open 24/7" within the first viewport — no scrolling required.
3. **Menu Exploration:** User taps into a category (e.g., Burgers), browses items with photos/prices.
4. **Decision Point:**
   - **Path A (Call):** User taps the sticky call button → phone dialer opens → order placed by phone.
   - **Path B (Visit):** User taps "Get Directions" → native maps app opens with route pre-loaded.
   - **Path C (Future):** User adds items to cart → checks out online → receives order confirmation.
5. **Exit/Retention:** User optionally follows social links or (future) creates an account for faster reordering next time.

The MVP is intentionally optimized to end most journeys at **Path A or B** within 2–3 taps from landing.

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Target Lighthouse scores: **Performance ≥ 90, Accessibility ≥ 90** on mobile
- First Contentful Paint < 1.5s on 4G; menu images lazy-loaded and served via Firebase Storage/CDN with responsive `srcset`
- Code-splitting per route to keep initial JS bundle lean (menu-heavy screens shouldn't block hero render)

### 6.2 Local SEO
- Server-rendered or pre-rendered meta tags (title/description per key page) — consider a prerendering step or static hosting fallback since this is a React SPA
- `LocalBusiness` and `Menu` structured data (schema.org JSON-LD) including hours, address, phone
- Google Business Profile kept in sync with site data (hours, phone, address must match exactly)
- Fast mobile load speed as a ranking factor; clean semantic HTML headings

### 6.3 Mobile Responsiveness
- Mobile-first breakpoints (design for 360–420px width first, scale up to tablet/desktop)
- Touch targets ≥ 44x44px, primary CTAs within thumb-reach zones
- Sticky call button and nav must not overlap content or obstruct menu scrolling

### 6.4 Reliability & Security
- Firebase Hosting SLA + global CDN for uptime consistent with a 24-hour business
- HTTPS enforced by default via Firebase Hosting
- Firestore rules prevent public writes; only vetted admin accounts can edit menu/hours data

---

## 7. Phased Rollout Plan

| Phase | Timeline (indicative) | Scope | Success Metrics |
|---|---|---|---|
| **Phase 0 — Setup** | Week 1 | Firebase project setup, repo, CI/CD, design system in Tailwind | Deploy pipeline working end-to-end |
| **Phase 1 — MVP Launch** | Weeks 2–5 | Menu, hours badge, click-to-call, map, hosting go-live | Site live, Lighthouse ≥ 90, GBP synced |
| **Phase 2 — Ordering** | Months 2–4 post-launch | Cart, checkout, payments | First N online orders processed successfully |
| **Phase 3 — Accounts & Retention** | Months 4–6 | Auth, order history, notifications, loyalty | Repeat-order rate, push opt-in rate |
| **Phase 4 — Ops & Scale** | Month 6+ | Admin dashboard, inventory automation, reviews | Reduced manual menu-update time, review volume |

---

## 8. Open Questions for Stakeholder Input
- Payment gateway preference for Phase 2 (region-specific: Razorpay, Stripe, UPI direct)?
- Is delivery in scope at all, or pickup/dine-in/call-in only?
- ~~Any existing brand guidelines (logo, color palette, tone)?~~ **Partially answered:** storefront signage uses a deep purple/maroon base with a bright yellow logo treatment — see §9 below. Confirm exact hex values against physical signage or brand assets before locking the design system.
- **Phone number for click-to-call** — needs confirming directly from the Katty'z Google Business Profile before build.

## 9. Real-World Reference Details (Katty'z, Ghodbunder Road, Thane)
- **Location:** Shop No. 13, Ground Floor, Flora Building, Hiranandani Estate, Ghodbunder Rd, Waghbil, Thane, Maharashtra 400607
- **Google rating:** 4.0★ (572 reviews) at time of writing
- **Price range:** ₹1–200 (fits the fast-food/snacks positioning)
- **Hours:** Google Business Profile lists "Open 24 hours" for this outlet — use this as the source of truth over any third-party aggregator listing shorter hours, since those tend to go stale
- **Brand cues from storefront photos:** purple/maroon signage band with yellow "KATTY'Z" wordmark; purple accents carried into interior seating area — a reasonable starting palette for the site's primary/accent colors
