# CreatiqAi Landing Page Redesign — Design Spec

**Date:** 2026-05-15
**Status:** Approved (user opted out of per-step approval gates)
**Reference site:** auragictech.com (B2B agency, content-dense, proof-driven)

## Problem

The CreatiqAi landing page has two related issues:

1. **Scrolling feels choppy.** Caused by `scroll-snap-type: y mandatory` + `scroll-snap-stop: always` in [app/globals.css:32-43](../../../app/globals.css#L32-L43). The browser kills scroll inertia and forces a stop at every section, which feels jarring on trackpads and mouse wheels.

2. **Page feels plain / lacks substance.** Three concrete gaps:
   - **Proof:** No client logos, no metrics, no testimonials, no pricing transparency, no case studies.
   - **Visual richness:** Sparse compositions, no product mockups, no mini-graphics or illustrations, no integration story.
   - **Layout variety:** Repeated centered-heading + 3-column-card pattern across sections.

The two problems are linked: each section is locked to exactly 100vh by `scroll-snap-stop: always`, so there's no room to add more content per section without breaking the fit.

## Goals

1. Make scrolling between sections feel smooth and natural while keeping the full-page-section aesthetic.
2. Add proof points (metrics, integrations, pricing) and visual mockups so the page reads as a real agency, not a template.
3. Introduce layout variety (bento grid, asymmetric comparison, device mockup) so the page doesn't repeat the same card-grid pattern.
4. Stay within ~1 week of work. Use plausible placeholder content the user can swap in later.

## Non-Goals

- No CMS / admin UI for content. Static content for now; can move to Supabase later.
- No new heavy dependencies (no big animation libraries beyond what's already there).
- No mobile-only redesign — recent commits already shipped mobile responsive; we preserve that and add to it.
- No A/B testing or experimentation framework.
- No copy-perfection. Placeholders are fine; user replaces with real copy later.

## Approach

**Approach A — Surgical** (user-selected from 3 options): fix scroll, add 2 new sections, redesign 2 existing sections, light-touch enrichment to the rest. ~8 sections total.

### Scroll fix

- Change `scroll-snap-type: y mandatory` → `proximity` in `app/globals.css`.
- Remove `scroll-snap-stop: always`.
- Add Lenis (lightweight smooth-scroll, ~3 kB gzipped) as a provider in `app/layout.tsx`. Lenis interpolates wheel/trackpad input into smooth GPU-composited transforms.
- Keep `scroll-snap-align: start` on sections so they still feel anchored.

Result: User can scroll past sections with natural momentum; if they release near a section edge, it softly snaps into place.

### Section structure (8 sections)

| # | Section | Status | Reason |
|---|---------|--------|--------|
| 1 | Hero | Refined | Add metric strip + integrations row under CTAs |
| 2 | What We Build (Services) | Redesigned | Bento grid replaces 3 equal cards; metric overlays |
| 3 | Problem vs Solution | **New** | Adds proof + layout variety |
| 4 | Product Showcase (2ndu.ai) | Redesigned | Phone mockup + live-chat sample + metric chip |
| 5 | How It Works | Refined | Per-step icons + outcome callouts |
| 6 | Pricing | **New** | Adds proof + transparency |
| 7 | FAQ | Refined | Expand from current to 6–8 questions |
| 8 | CTA Footer | Keep | No changes |

### Architecture

- **Framework:** Next.js 14 App Router (existing).
- **Styling:** Tailwind + existing `globals.css` utilities (glassmorphism, glow borders, marquee — last is new).
- **Animation:** framer-motion (existing). No new animation libs.
- **Smooth scroll:** Lenis (new dep).
- **No new DB tables.** Pricing and integration data is static in component files.

## Component Specs

### 1. Hero — `components/sections/hero-section.tsx` (refined)

Add two strips below the existing CTA buttons, above the trust signals:

**Metric strip:** Four `tabular-nums` numbers in a horizontal row, separated by dot dividers.
```
50+ projects   ·   3.2s avg load   ·   99.9% uptime   ·   24/7 support
```
- Size: `text-sm md:text-base`, color `text-white/50`, numbers use `bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent`.
- Counter-up animation using the existing `components/animated-counter.tsx` on viewport enter.

**Integrations row:** 7 icons (24px) in a horizontal row, with a single-line caption.
```
[WA] [Stripe] [Shopify] [Slack] [GSheets] [HubSpot] [Notion]
Connects with WhatsApp, Stripe, Shopify, Slack +30 more
```
- Icons from `react-icons` (already installed) — `SiWhatsapp`, `SiStripe`, etc. If a specific brand mark isn't available, use lucide icon as fallback.
- Greyscale icons at 50% opacity; brand color on hover.

### 2. Services — `components/sections/services-section.tsx` (redesigned)

Bento grid replacing the current 3 equal cards.

Layout (desktop):
```
grid-cols-3 grid-rows-2 gap-4
[ Website Customization (col-span-2 row-span-2) ] [ AI Systems         ]
                                                  [ 2ndu.ai (highlight) ]
```

Layout (mobile): stacks vertically, all cards full-width.

Each card retains its existing `css-glow-border` treatment but:
- The large "Website Customization" card displays a screenshot mockup (placeholder image of a generic website hero on a dark device frame).
- All three cards get a small **metric badge** in the top-right corner:
  - Website: "142 sites shipped"
  - AI Systems: "+40% efficiency"
  - 2ndu.ai: "10k+ chats handled"
- Existing copy and feature lists stay.

### 3. Problem vs Solution — `components/sections/problem-solution-section.tsx` (new)

Two-column comparison, 3 paired rows.

```
            Stop fighting your tools. Start running your business.

  THE OLD WAY                          THE CREATIQ WAY
  ───────────                          ───────────────
  ❌  Manual data entry                ✓  Automated workflows
      eats 20+ hrs/week                   that run 24/7

  ❌  Customers wait hours              ✓  Instant AI replies
      for replies                          on WhatsApp, 24/7

  ❌  No visibility into                ✓  Real-time dashboards
      what's working                       show what matters
```

Visual treatment:
- Left column: `text-white/40`, X icons in `text-red-400/60`.
- Right column: full opacity, ✓ icons in emerald (`text-emerald-400`).
- Subtle vertical divider line down the middle (`bg-gradient-to-b from-transparent via-white/10 to-transparent`).
- Stagger reveal on viewport enter — left rows 0/0.1/0.2s, right rows 0.3/0.4/0.5s — communicates "old way → new way."

### 4. Product Showcase — `components/sections/product-showcase.tsx` (redesigned)

Two-column layout, content left, mockup right.

**Left (50%):**
- H2: "2ndu.ai — Our Flagship"
- Subhead + 4 feature ticks (existing copy, lightly edited).
- CTA: "Try 2ndu.ai →"

**Right (50%):** CSS-only phone frame mockup.
- 280×580px rounded rectangle with `2.5rem` corners, gradient border, inset shadow.
- Inside: stylized WhatsApp chat — 4 messages alternating left/right bubbles. Pure HTML/CSS, no image.
- Floating chip overlay (top-right of phone): `10,247 messages handled this week` — uses animated counter, glass card.
- Subtle float animation on the phone (y: -4px → 4px, 6s infinite).

### 5. How It Works — `components/sections/how-it-works-section.tsx` (refined)

Keep current 3-step layout. Each step gets:
- Existing numbered badge (01/02/03).
- A small geometric SVG glyph (~80px): circle, triangle, square arrangements — abstract, no semantic meaning, just visual rhythm.
- A new outcome callout under the description, styled as a small pill:
  - Step 1: "→ Free, no commitment"
  - Step 2: "→ Built in 2–4 weeks"
  - Step 3: "→ Live in 48 hours"

### 6. Pricing — `components/sections/pricing-section.tsx` (new)

3-column tier grid. Middle card elevated.

```
  STARTER              BUSINESS              CUSTOM
  ───────              ────────              ──────
  From RM 1,500        From RM 5,000         Let's talk
                       MOST POPULAR

  ✓ Landing page       ✓ Full website        ✓ Everything in Business
  ✓ Basic SEO          ✓ AI integration      ✓ Dedicated team
  ✓ Mobile responsive  ✓ WhatsApp bot setup  ✓ Custom AI training
  ✓ 30-day support     ✓ Analytics dashboard ✓ White-glove onboarding
                       ✓ 90-day support      ✓ Priority SLA

  [ Get Started ]      [ Get Started ]       [ Contact Sales ]
```

- All cards: glass card with 1px border.
- Middle card: `scale-105`, glow border in violet, "Most Popular" pill above title.
- Hover: brighten glow, lift card by `translateY(-4px)`.

### 7. FAQ — `components/sections/faq-section.tsx` (refined)

Keep accordion behavior. Expand to these 8 questions:
1. How long does a typical project take?
2. Do I need technical knowledge to use 2ndu.ai?
3. What's included in your support?
4. Can you work with my existing tools?
5. Do you offer revisions?
6. What's the payment structure?
7. Can I upgrade my plan later?
8. What if I need help after launch?

Each answer ~2–3 sentences. User can refine copy later.

### 8. CTA Footer — `components/sections/cta-footer.tsx`

No changes.

## Visual Style

**Tokens (no new tailwind config — use existing palette + arbitrary classes for new shades):**
- Primary blue `#2563eb` / `#3b82f6` (existing).
- Secondary violet `#7c3aed` (existing).
- Problem-row red: `#ef4444` at 40% opacity (new use).
- Solution-row emerald: `#10b981` at 80% (new use).
- Glass: existing `rgba(255,255,255,0.05)` and `glass-strong`.

**Shadows:**
- Standard cards: glassmorphism (existing).
- Highlighted (pricing middle, 2ndu.ai phone): `0 0 60px -10px var(--card-glow)`.
- Phone mockup: `inset 0 0 0 1px rgba(255,255,255,0.1), 0 30px 60px -20px rgba(0,0,0,0.5)`.

**Motion:**
- Reveal on viewport: `initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}}` — existing pattern.
- Counter-up: existing `AnimatedCounter` component.
- Integration row marquee: CSS keyframes, infinite scroll, `paused` on hover.
- No new motion patterns introduced.

**Typography:**
- Headings: existing gradient text on key word.
- Stat numbers: `text-3xl md:text-4xl font-bold tabular-nums` + gradient.
- Body: existing `text-white/60` / `text-white/45`.

## Data Flow

All content is static. Each new section file owns its own data array at module scope:

```ts
// components/sections/pricing-section.tsx
const tiers = [
  { name: "Starter", price: "From RM 1,500", features: [...], highlighted: false },
  { name: "Business", price: "From RM 5,000", features: [...], highlighted: true },
  { name: "Custom", price: "Let's talk", features: [...], highlighted: false },
];
```

No props from `app/page.tsx`, no API calls, no Supabase reads. (Hero already takes `country` for geo content — that stays.)

## Error Handling

- All sections must render with zero JS (graceful no-JS fallback). Existing pattern with `"use client"` directives stays.
- Lenis provider: if it fails to initialize, the page falls back to native scroll. No try/catch needed — Lenis is well-behaved.
- Marquee animation: CSS-only, no JS dependency.

## Testing

This is a visual redesign; no unit tests required. Verification by:
- Visual inspection in browser (run `npm run dev`, scroll the page, check each section on desktop + mobile widths).
- Confirm scroll feels smooth on Mac trackpad + Windows mouse wheel + arrow keys.
- Confirm Lighthouse perf score doesn't drop more than 5 points from current.
- Confirm no console errors / hydration warnings.

## Files Touched

**New:**
- `components/sections/problem-solution-section.tsx`
- `components/sections/pricing-section.tsx`
- `components/lenis-provider.tsx`

**Modified:**
- `app/page.tsx` — add new sections in order.
- `app/layout.tsx` — wrap children in `<LenisProvider>`.
- `app/globals.css` — soften scroll snap (mandatory → proximity, remove `scroll-snap-stop`), add `@keyframes marquee-x` for the integration row scroll, add `.phone-frame` and `.phone-screen` utility classes for the 2ndu.ai mockup.
- `components/sections/hero-section.tsx` — add metric strip + integrations row.
- `components/sections/services-section.tsx` — refactor to bento grid + metric overlays.
- `components/sections/product-showcase.tsx` — redesign with phone mockup.
- `components/sections/how-it-works-section.tsx` — add per-step glyphs + outcome pills.
- `components/sections/faq-section.tsx` — expand to 8 entries.
- `package.json` — add `lenis` dep.

**Untouched:**
- `components/sections/cta-footer.tsx`
- `components/sections/cta-banner.tsx` (not currently used on landing per `app/page.tsx`)
- `components/sections/stats-section.tsx`, `use-cases-section.tsx` (not currently used)
- All other components (`LiquidEther`, `logo`, `conditional-nav`, etc.)

## Risks & Mitigations

- **Lenis interferes with `scroll-snap`.** Mitigation: test combo early; if conflict, fall back to plain Lenis without snap-css, or use Lenis's built-in snap helpers.
- **WebGL bg + smooth scroll perf hit.** Mitigation: LiquidEther was already perf-optimized in a recent commit. If FPS dips, lower its resolution further or disable on viewports with < 1024px width (already partial).
- **Bento grid breaks at intermediate breakpoints.** Mitigation: explicit breakpoint test at 768px, 1024px, 1280px during implementation; fall back to stacked cards under 1024px.
- **Placeholder content reads as fake.** Mitigation: user is aware; placeholders are clearly labeled "swap with real" in component comments.
