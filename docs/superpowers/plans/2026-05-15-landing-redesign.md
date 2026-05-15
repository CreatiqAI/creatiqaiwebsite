# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the CreatiqAi landing page to add proof points (metrics, integrations, pricing, problem/solution comparison), introduce layout variety (bento grid, asymmetric mockup, paired comparison), and fix choppy scrolling.

**Architecture:** Keep Next.js 14 App Router. Soften CSS scroll-snap from `mandatory` to `proximity`, layer Lenis on top for smooth-scroll inertia. Add 2 new sections, redesign 3 existing, enrich 2 with metrics/outcome pills. All content is static at module scope — no DB or CMS.

**Tech Stack:** Next.js 14, TypeScript, Tailwind, framer-motion, lucide-react, react-icons, lenis (new).

**Spec:** [docs/superpowers/specs/2026-05-15-landing-redesign-design.md](../specs/2026-05-15-landing-redesign-design.md)

**Verification approach:** No automated test suite exists for visual components. Each task ends with a manual browser check at `http://localhost:3000` + a local commit. After every section change, scroll the page end-to-end on desktop (≥1280px) and at the 768px breakpoint to confirm no layout breaks.

**Important constraint:** Do NOT `git push`. User reviews locally first.

---

## Task 1: Add Lenis smooth-scroll + soften CSS snap

**Files:**
- Modify: `package.json` (add `lenis` dep)
- Create: `components/lenis-provider.tsx`
- Modify: `app/layout.tsx` (wrap children with provider)
- Modify: `app/globals.css:32-43` (soften snap)

- [ ] **Step 1: Install lenis**

```bash
npm install lenis@^1.3.4
```

Expected: `package.json` shows `lenis` under dependencies. No peer-dep warnings beyond existing.

- [ ] **Step 2: Create Lenis provider component**

Create `components/lenis-provider.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const id = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(id);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
```

- [ ] **Step 3: Wrap app/layout.tsx children with LenisProvider**

Find the `<body>` tag in `app/layout.tsx` and wrap its rendered children with `<LenisProvider>`. The import is `import { LenisProvider } from "@/components/lenis-provider";`. Insert immediately above `{children}` inside `<body>`.

- [ ] **Step 4: Soften CSS scroll-snap in globals.css**

Find this block at [app/globals.css:32-43](app/globals.css#L32-L43):

```css
@media (min-width: 768px) {
  .snap-container {
    height: 100vh;
    scroll-snap-type: y mandatory;
  }
  .snap-section {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    height: 100vh;
    overflow: hidden;
  }
}
```

Replace with:

```css
@media (min-width: 768px) {
  .snap-container {
    height: 100vh;
    scroll-snap-type: y proximity;
  }
  .snap-section {
    scroll-snap-align: start;
    height: 100vh;
    overflow: hidden;
  }
}
```

Two changes: `mandatory` → `proximity`, removed `scroll-snap-stop: always`.

- [ ] **Step 5: Run dev server and verify scroll feel**

```bash
npm run dev
```

Open `http://localhost:3000`. On a trackpad or mouse-wheel:
- Scroll through all sections without forced stops.
- Verify Lenis is active: scrolling has noticeable inertia, smoother than browser-native.
- Open DevTools console: no errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json components/lenis-provider.tsx app/layout.tsx app/globals.css
git commit -m "feat: soften scroll snap to proximity and add Lenis smooth-scroll

- mandatory -> proximity, removed scroll-snap-stop: always
- Lenis provides momentum-aware inertia on top of native scroll
- Fixes choppy scroll feeling between sections"
```

---

## Task 2: Hero — Add metric strip + integrations row

**Files:**
- Modify: `components/sections/hero-section.tsx`

- [ ] **Step 1: Replace trust-signals block with metric strip + integrations row**

In `components/sections/hero-section.tsx`, find the existing trust signals block (`{["OFFICIAL WHATSAPP API", "META BUSINESS PARTNER", ...].map(...)}` near line 89).

Replace the entire `<motion.div className="flex flex-wrap items-center justify-center gap-3 md:gap-10">...</motion.div>` block with:

```tsx
{/* Metric strip */}
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.8 }}
    className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 gap-y-2 mb-5 md:mb-7"
>
    {[
        { value: "50+", label: "projects" },
        { value: "3.2s", label: "avg load" },
        { value: "99.9%", label: "uptime" },
        { value: "24/7", label: "support" },
    ].map((m, i) => (
        <span key={m.label} className="flex items-center gap-2 text-sm md:text-base">
            {i > 0 && <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20" />}
            <span className="font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                {m.value}
            </span>
            <span className="text-white/40">{m.label}</span>
        </span>
    ))}
</motion.div>

{/* Integrations strip */}
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.0 }}
    className="flex flex-col items-center gap-2"
>
    <div className="flex items-center gap-3 md:gap-4 opacity-60">
        {["SiWhatsapp", "SiStripe", "SiShopify", "SiSlack", "SiGooglesheets", "SiHubspot", "SiNotion"].map((name) => (
            <IntegrationIcon key={name} name={name} />
        ))}
    </div>
    <span className="text-[10px] md:text-xs text-white/35 tracking-wide">
        Connects with WhatsApp, Stripe, Shopify, Slack +30 more
    </span>
</motion.div>
```

- [ ] **Step 2: Add IntegrationIcon helper at the top of the file**

At the top of `components/sections/hero-section.tsx`, after the existing imports, add:

```tsx
import {
    SiWhatsapp,
    SiStripe,
    SiShopify,
    SiSlack,
    SiGooglesheets,
    SiHubspot,
    SiNotion,
} from "react-icons/si";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    SiWhatsapp,
    SiStripe,
    SiShopify,
    SiSlack,
    SiGooglesheets,
    SiHubspot,
    SiNotion,
};

function IntegrationIcon({ name }: { name: string }) {
    const Icon = ICON_MAP[name];
    if (!Icon) return null;
    return (
        <Icon
            size={20}
            className="text-white/55 hover:text-white transition-colors"
        />
    );
}
```

- [ ] **Step 3: Run dev server and verify Hero**

```bash
npm run dev
```

Visit `http://localhost:3000`. Confirm:
- Below the CTA buttons: a single-line metric strip ("50+ projects · 3.2s avg load · 99.9% uptime · 24/7 support") with gradient numbers.
- Below the metrics: row of 7 brand icons + caption "Connects with WhatsApp, Stripe, Shopify, Slack +30 more".
- Animations stagger in cleanly. No layout shift.
- Mobile (≤768px): dots between metrics hidden, items wrap on small screens.

- [ ] **Step 4: Commit**

```bash
git add components/sections/hero-section.tsx
git commit -m "feat(hero): add metric strip and integrations row

Replaces the trust-signals block. Adds 4-metric strip with gradient
numbers and a 7-icon integrations row to communicate connectability."
```

---

## Task 3: Services — Refactor to bento grid with metric badges

**Files:**
- Modify: `components/sections/services-section.tsx`

- [ ] **Step 1: Update services data to include metric overlays**

Replace the existing `services` array at the top of `components/sections/services-section.tsx` with:

```tsx
const services = [
    {
        icon: Monitor,
        title: "Website Customization",
        description:
            "Stunning, high-performance websites tailored to your brand. From landing pages to full-scale web platforms — we build digital experiences that convert visitors into customers.",
        features: ["Custom UI/UX Design", "Responsive Development", "Performance Optimization", "SEO-Ready Architecture"],
        metric: { value: "142", label: "sites shipped" },
        cta: { label: "Learn more", href: "#contact" },
        size: "large" as const,
    },
    {
        icon: Cpu,
        title: "AI System Customization",
        description:
            "Integrate intelligent AI into your existing business systems — automate workflows, enhance decision-making, drive operational efficiency.",
        features: ["Workflow Automation", "AI Integration", "Custom AI Models", "Data Analytics"],
        metric: { value: "+40%", label: "avg efficiency lift" },
        cta: { label: "Learn more", href: "#contact" },
        size: "small" as const,
    },
    {
        icon: MessageSquare,
        title: "2ndu.ai — Chatbot Platform",
        description:
            "Plug a powerful AI chatbot into your WhatsApp Business in minutes — no coding required.",
        features: ["WhatsApp Integration", "No-Code Setup", "Multi-Language AI", "Analytics Dashboard"],
        metric: { value: "10k+", label: "chats handled" },
        cta: { label: "Try 2ndu.ai", href: "https://2ndu.ai" },
        highlight: true,
        size: "small" as const,
    },
];
```

- [ ] **Step 2: Replace the cards grid with bento layout**

Find the existing `<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">` block and replace it (and the entire `.map` body inside) with:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 md:gap-6 auto-rows-fr">
    {services.map((service, i) => {
        const isLarge = service.size === "large";
        return (
            <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`css-glow-border ${isLarge ? "lg:col-span-2 lg:row-span-2" : ""}`}
                style={{ "--card-glow": service.highlight ? "#7c3aed" : "#2563eb" } as React.CSSProperties}
            >
                <div className="relative p-5 md:p-8 flex flex-col h-full bg-white/5 rounded-2xl border border-white/10">
                    {/* Metric badge top-right */}
                    <div className="absolute top-4 right-4 md:top-5 md:right-5 flex items-baseline gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10">
                        <span className="text-xs md:text-sm font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                            {service.metric.value}
                        </span>
                        <span className="text-[10px] md:text-xs text-white/45">{service.metric.label}</span>
                    </div>

                    <div
                        className={`inline-flex p-3 rounded-xl mb-4 md:mb-6 w-fit ${
                            service.highlight
                                ? "bg-violet-500/10 text-violet-400"
                                : "bg-blue-500/10 text-blue-400"
                        }`}
                    >
                        <service.icon size={isLarge ? 32 : 26} />
                    </div>

                    <h3 className={`font-bold mb-3 md:mb-4 text-white/95 ${isLarge ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
                        {service.title}
                    </h3>

                    <p className={`text-white/60 leading-relaxed mb-4 md:mb-6 flex-1 ${isLarge ? "text-sm md:text-base" : "text-sm"}`}>
                        {service.description}
                    </p>

                    {isLarge && (
                        <ul className="space-y-1.5 md:space-y-2 mb-6 md:mb-8">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-white/40">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    )}

                    <a
                        href={service.cta.href}
                        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors mt-auto ${
                            service.highlight
                                ? "text-violet-400 hover:text-violet-300"
                                : "text-blue-400 hover:text-blue-300"
                        }`}
                    >
                        {service.cta.label}
                        <ArrowRight size={14} />
                    </a>
                </div>
            </motion.div>
        );
    })}
</div>
```

- [ ] **Step 3: Run dev server and verify Services**

```bash
npm run dev
```

Visit `http://localhost:3000#services`. Confirm:
- Desktop (≥1024px): Website Customization occupies left 2-cols and 2-rows (large). AI Systems and 2ndu.ai stack on right column.
- Each card has a metric pill in top-right corner.
- 2ndu.ai card has violet glow border.
- Mobile/tablet (<1024px): cards stack vertically full-width.
- All hover states still work; CTAs are visible.

- [ ] **Step 4: Commit**

```bash
git add components/sections/services-section.tsx
git commit -m "feat(services): refactor to bento grid with metric badges

Website Customization promoted to large hero card (2x2). AI Systems and
2ndu.ai become smaller cards on the right column. Each card displays a
metric badge in its top-right corner (142 sites, +40% efficiency, 10k+ chats)."
```

---

## Task 4: NEW Problem vs Solution section

**Files:**
- Create: `components/sections/problem-solution-section.tsx`
- Modify: `app/page.tsx` (insert between Services and ProductShowcase)

- [ ] **Step 1: Create the section component**

Create `components/sections/problem-solution-section.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
    {
        problem: "Manual data entry eats 20+ hours per week",
        solution: "Automated workflows that run 24/7",
    },
    {
        problem: "Customers wait hours for replies",
        solution: "Instant AI replies on WhatsApp, around the clock",
    },
    {
        problem: "No visibility into what's actually working",
        solution: "Real-time dashboards show what matters most",
    },
];

export function ProblemSolutionSection() {
    return (
        <section
            id="why-creatiq"
            className="relative z-10 py-16 md:py-12 px-4 md:px-6 md:h-full md:flex items-center overflow-hidden"
        >
            {/* Background */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(239,68,68,0.05) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)",
                }}
            >
                <div className="bg-orb bg-orb-blue w-[400px] h-[400px] -top-20 left-1/2 -translate-x-1/2" />
                <div className="shimmer-line top-1/2 left-0" style={{ animationDelay: "1s" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 md:mb-16 text-center"
                >
                    <h2 className="text-2xl md:text-5xl font-bold mb-4 text-white">
                        Stop fighting your tools.{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                            Start running your business.
                        </span>
                    </h2>
                    <p className="text-white/55 text-sm md:text-lg max-w-2xl mx-auto">
                        Three problems most growing businesses face — and how we fix them.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative">
                    {/* Vertical divider on desktop */}
                    <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                    {/* Left column: The Old Way */}
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-xs md:text-sm font-bold tracking-widest text-red-400/70 uppercase mb-4 md:mb-6"
                        >
                            The Old Way
                        </motion.h3>
                        <ul className="space-y-4 md:space-y-6">
                            {rows.map((row, i) => (
                                <motion.li
                                    key={row.problem}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex items-start gap-3 md:gap-4"
                                >
                                    <span className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-red-500/10 border border-red-500/20">
                                        <X size={14} className="text-red-400/80" />
                                    </span>
                                    <span className="text-white/45 text-sm md:text-base leading-relaxed">
                                        {row.problem}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Right column: The Creatiq Way */}
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-xs md:text-sm font-bold tracking-widest uppercase mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400"
                        >
                            The Creatiq Way
                        </motion.h3>
                        <ul className="space-y-4 md:space-y-6">
                            {rows.map((row, i) => (
                                <motion.li
                                    key={row.solution}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    className="flex items-start gap-3 md:gap-4"
                                >
                                    <span className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                                        <Check size={14} className="text-emerald-400" />
                                    </span>
                                    <span className="text-white/85 text-sm md:text-base leading-relaxed">
                                        {row.solution}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Add the section to app/page.tsx**

In `app/page.tsx`, add the import after the existing section imports:

```tsx
import { ProblemSolutionSection } from "@/components/sections/problem-solution-section";
```

Then insert a new `<div className="snap-section">` between `<ServicesSection />` and `<ProductShowcase />`:

```tsx
<div className="snap-section">
    <ServicesSection />
</div>
<div className="snap-section">
    <ProblemSolutionSection />
</div>
<div className="snap-section">
    <ProductShowcase />
</div>
```

- [ ] **Step 3: Run dev server and verify**

```bash
npm run dev
```

Visit `http://localhost:3000` and scroll past Services. Confirm:
- New section "Stop fighting your tools..." appears between Services and ProductShowcase.
- Desktop: two columns side-by-side, left labeled "THE OLD WAY" (red X icons), right labeled "THE CREATIQ WAY" (emerald checks).
- Mobile: columns stack vertically.
- Reveal animation staggers left column first, then right column.
- Snap behavior places this as a clean section stop.

- [ ] **Step 4: Commit**

```bash
git add components/sections/problem-solution-section.tsx app/page.tsx
git commit -m "feat(landing): add Problem vs Solution comparison section

Two-column layout contrasting 'The Old Way' (red X icons, desaturated)
with 'The Creatiq Way' (emerald checks, full opacity). Three paired
rows: manual data entry, slow customer replies, no visibility."
```

---

## Task 5: Product Showcase — Phone frame + live metric chip

**Files:**
- Modify: `components/sections/product-showcase.tsx`
- Modify: `app/globals.css` (add `.phone-frame` + `.phone-screen` utilities)

- [ ] **Step 1: Add phone-frame utility classes to globals.css**

Append to `app/globals.css`:

```css
/* Phone mockup frame for 2ndu.ai showcase */
.phone-frame {
    position: relative;
    border-radius: 2.5rem;
    padding: 0.75rem;
    background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
    box-shadow:
        inset 0 0 0 1px rgba(255, 255, 255, 0.08),
        0 30px 80px -20px rgba(0, 0, 0, 0.6),
        0 0 60px -10px rgba(37, 99, 235, 0.25);
}

.phone-screen {
    border-radius: 1.85rem;
    background: linear-gradient(180deg, #050514 0%, #0a0a1f 100%);
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

@keyframes phone-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
}

.phone-floating {
    animation: phone-float 6s ease-in-out infinite;
}
```

- [ ] **Step 2: Wrap the existing chat mockup in a phone frame + add live-metric chip**

In `components/sections/product-showcase.tsx`, find the right-column motion.div (starts around line 84 — `initial={{ opacity: 0, x: 40 }}`) and replace its inner content. The whole right-column block becomes:

```tsx
<motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="relative flex items-center justify-center"
>
    {/* Floating metric chip */}
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute top-4 right-2 md:top-2 md:right-2 lg:-top-4 lg:-right-4 z-10 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-lg"
    >
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <div className="leading-tight">
                <div className="text-xs md:text-sm font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                    10,247
                </div>
                <div className="text-[9px] md:text-[10px] text-white/45 uppercase tracking-wider">
                    msgs this week
                </div>
            </div>
        </div>
    </motion.div>

    {/* Phone frame */}
    <div className="phone-frame phone-floating w-full max-w-[320px] md:max-w-[360px]">
        <div className="phone-screen p-4 md:p-5">
            {/* Status bar */}
            <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[10px] text-white/50">2ndu.ai · WhatsApp</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online
                </span>
            </div>

            {/* Chat */}
            <div className="space-y-3">
                <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-green-400">U</span>
                    </div>
                    <div className="bg-white/8 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                        <p className="text-white/80 text-xs md:text-sm">
                            Hi, do you have the navy blazer in size M?
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 justify-end">
                    <div className="bg-blue-500/15 border border-blue-500/25 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                        <p className="text-blue-100 text-xs md:text-sm">
                            Yes! Navy blazer in M is in stock. Want me to reserve it for you?
                        </p>
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-blue-300/60">
                            <Zap size={9} />
                            <span>Replied in 0.3s</span>
                        </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-blue-500/25 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-blue-300">AI</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-green-400">U</span>
                    </div>
                    <div className="bg-white/8 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                        <p className="text-white/80 text-xs md:text-sm">Yes please!</p>
                    </div>
                </div>

                <div className="flex gap-2 justify-end">
                    <div className="bg-blue-500/15 border border-blue-500/25 rounded-2xl rounded-tr-sm px-3 py-2">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" />
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: "0.15s" }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: "0.3s" }} />
                        </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-blue-500/25 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-blue-300">AI</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</motion.div>
```

- [ ] **Step 3: Run dev server and verify**

```bash
npm run dev
```

Visit `http://localhost:3000` and scroll to the 2ndu.ai section. Confirm:
- Right column shows a phone-shaped frame with rounded 2.5rem corners.
- Phone gently floats up and down (6s loop).
- Floating chip ("10,247 msgs this week" with green pulsing dot) overlaps the top-right of the phone.
- Chat content is more compact, with a "WhatsApp · Online" status bar.
- Mobile: phone shrinks to max 320px; chip still positioned in top-right but inside content area.
- No layout shift between desktop and mobile breakpoints.

- [ ] **Step 4: Commit**

```bash
git add components/sections/product-showcase.tsx app/globals.css
git commit -m "feat(showcase): redesign 2ndu.ai mockup as phone frame with live metric chip

Adds .phone-frame and .phone-screen CSS utilities. Wraps the existing
chat mockup in a stylized device frame with a subtle float animation
and a floating 'live' metric chip showing message volume."
```

---

## Task 6: How It Works — Add outcome pills

**Files:**
- Modify: `components/sections/how-it-works-section.tsx`

Note: The existing component has **4** steps (Discover, Design, Deploy, Optimize), not 3 as initially described in the spec. We'll keep the 4-step structure since it works at the existing 4-column grid, and add outcome pills under each.

- [ ] **Step 1: Extend the steps array with outcomes**

In `components/sections/how-it-works-section.tsx`, update the `steps` array:

```tsx
const steps = [
    {
        number: "01",
        icon: Search,
        title: "Discover",
        description: "Tell us your business needs. We analyze your workflows, customer touchpoints, and automation opportunities.",
        outcome: "Free, no commitment",
    },
    {
        number: "02",
        icon: PenTool,
        title: "Design",
        description: "We architect the perfect solution — whether it's a custom website, AI integration, or chatbot deployment.",
        outcome: "Blueprint in 1 week",
    },
    {
        number: "03",
        icon: Rocket,
        title: "Deploy",
        description: "Launch your solution. Go live with a fully tested, production-ready system tailored to your business.",
        outcome: "Live in 2–4 weeks",
    },
    {
        number: "04",
        icon: TrendingUp,
        title: "Optimize",
        description: "Continuous improvement powered by data. We monitor, refine, and scale your AI systems for peak performance.",
        outcome: "Monthly insights",
    },
];
```

- [ ] **Step 2: Render the outcome pill under each step's description**

Find the per-step render block (around line 74, `{steps.map((step, i) => (...)}`). After the `<p className="text-white/40 leading-relaxed ...">{step.description}</p>` line, add:

```tsx
<div className="mt-3 md:mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/[0.08] border border-blue-500/15">
    <span className="w-1 h-1 rounded-full bg-blue-400" />
    <span className="text-[10px] md:text-xs text-blue-200/80 font-medium">
        {step.outcome}
    </span>
</div>
```

- [ ] **Step 3: Run dev server and verify**

```bash
npm run dev
```

Visit `http://localhost:3000#how-it-works`. Confirm:
- Each of the 4 steps now has a small blue-tinted pill below the description showing the outcome.
- Pills text: "Free, no commitment", "Blueprint in 1 week", "Live in 2–4 weeks", "Monthly insights".
- Pills are centered under each step, scale appropriately on mobile.
- No layout overflow on small screens.

- [ ] **Step 4: Commit**

```bash
git add components/sections/how-it-works-section.tsx
git commit -m "feat(how-it-works): add outcome pill under each step

Each of the 4 steps now shows a small outcome chip (Free, no commitment /
Blueprint in 1 week / Live in 2-4 weeks / Monthly insights) below the
description for clearer expectations."
```

---

## Task 7: NEW Pricing section

**Files:**
- Create: `components/sections/pricing-section.tsx`
- Modify: `app/page.tsx` (insert between HowItWorks and FAQ)

- [ ] **Step 1: Create the pricing section**

Create `components/sections/pricing-section.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
    {
        name: "Starter",
        price: "From RM 1,500",
        tagline: "For new businesses getting online",
        features: [
            "Landing page or simple site",
            "Basic SEO setup",
            "Mobile responsive",
            "Contact form integration",
            "30-day post-launch support",
        ],
        cta: { label: "Get Started", href: "#contact" },
        highlighted: false,
    },
    {
        name: "Business",
        price: "From RM 5,000",
        tagline: "Our most popular package",
        features: [
            "Full website (10+ pages)",
            "AI integration",
            "WhatsApp bot setup (2ndu.ai)",
            "Analytics dashboard",
            "Workflow automation",
            "90-day support",
        ],
        cta: { label: "Get Started", href: "#contact" },
        highlighted: true,
        badge: "Most Popular",
    },
    {
        name: "Custom",
        price: "Let's talk",
        tagline: "Dedicated team for complex builds",
        features: [
            "Everything in Business",
            "Dedicated build team",
            "Custom AI model training",
            "White-glove onboarding",
            "Priority SLA",
            "Quarterly strategy reviews",
        ],
        cta: { label: "Contact Sales", href: "#contact" },
        highlighted: false,
    },
];

export function PricingSection() {
    return (
        <section
            id="pricing"
            className="relative z-10 py-16 md:py-12 px-4 md:px-6 md:h-full md:flex items-center overflow-hidden"
        >
            {/* Background */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(37,99,235,0.08) 0%, transparent 70%)",
                }}
            >
                <div className="bg-orb bg-orb-blue w-[500px] h-[500px] -top-20 -left-20" />
                <div className="bg-orb bg-orb-violet w-[450px] h-[450px] -bottom-20 -right-32" />
                <div className="shimmer-line top-1/3 left-0" style={{ animationDelay: "2s" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
            </div>

            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 md:mb-14 text-center"
                >
                    <h2 className="text-2xl md:text-5xl font-bold mb-4 text-white">
                        Simple{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                            transparent pricing
                        </span>
                    </h2>
                    <p className="text-white/55 text-sm md:text-lg max-w-2xl mx-auto">
                        Pick the package that matches your stage. No hidden fees, no lock-ins.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`relative ${tier.highlighted ? "md:scale-[1.04] md:-my-2" : ""}`}
                        >
                            {tier.badge && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg z-10">
                                    {tier.badge}
                                </span>
                            )}
                            <div
                                className={`h-full flex flex-col p-6 md:p-8 rounded-2xl border bg-white/[0.04] transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1 ${
                                    tier.highlighted
                                        ? "border-violet-500/40 shadow-[0_0_60px_-10px_rgba(124,58,237,0.35)]"
                                        : "border-white/10"
                                }`}
                            >
                                <div className="mb-5 md:mb-6">
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                                        {tier.name}
                                    </h3>
                                    <p className="text-xs md:text-sm text-white/45">
                                        {tier.tagline}
                                    </p>
                                </div>

                                <div className="mb-5 md:mb-6">
                                    <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                                        {tier.price}
                                    </span>
                                </div>

                                <ul className="space-y-2.5 md:space-y-3 mb-7 md:mb-8 flex-1">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                                            <Check
                                                size={16}
                                                className={`mt-0.5 flex-shrink-0 ${
                                                    tier.highlighted ? "text-violet-400" : "text-blue-400"
                                                }`}
                                            />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={tier.cta.href}
                                    className={`inline-flex items-center justify-center w-full px-5 py-3 rounded-full font-bold text-sm md:text-base transition-all ${
                                        tier.highlighted
                                            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.6)]"
                                            : "bg-white/10 hover:bg-white/15 text-white border border-white/15"
                                    }`}
                                >
                                    {tier.cta.label}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="mt-8 md:mt-10 text-center text-xs md:text-sm text-white/40">
                    Prices shown are starting points. Final quote depends on scope. All packages include free consultation.
                </p>
            </div>
        </section>
    );
}
```

- [ ] **Step 2: Add the section to app/page.tsx**

In `app/page.tsx`, import the new component:

```tsx
import { PricingSection } from "@/components/sections/pricing-section";
```

Insert a new `<div className="snap-section">` between `<HowItWorksSection />` and `<FAQSection />`:

```tsx
<div className="snap-section">
    <HowItWorksSection />
</div>
<div className="snap-section">
    <PricingSection />
</div>
<div className="snap-section">
    <FAQSection />
</div>
```

- [ ] **Step 3: Run dev server and verify**

```bash
npm run dev
```

Visit `http://localhost:3000#pricing`. Confirm:
- Three pricing cards in a row on desktop.
- Middle card (Business) is slightly scaled up, has a "Most Popular" pill above it, violet glow.
- Hover lifts each card by 4px.
- Mobile: cards stack vertically full-width; middle card no longer scaled.
- Each tier shows: name, tagline, price, feature list, CTA button.
- Footnote below grid: "Prices shown are starting points..."

- [ ] **Step 4: Commit**

```bash
git add components/sections/pricing-section.tsx app/page.tsx
git commit -m "feat(landing): add pricing section with 3 tiers

Starter (RM 1,500), Business (RM 5,000, highlighted as Most Popular),
and Custom (Let's talk). Middle tier scaled and glowing violet. All
prices marked as starting points with a free-consultation disclaimer."
```

---

## Task 8: FAQ — Expand to 8 entries

**Files:**
- Modify: `components/sections/faq-section.tsx`

- [ ] **Step 1: Expand the faqs array**

In `components/sections/faq-section.tsx`, replace the existing `faqs` array (currently 4 entries) with:

```tsx
const faqs = [
    {
        question: "What services does Creatiq AI provide?",
        answer: "We offer three core services: custom website development, AI system integration and customization, and our flagship product 2ndu.ai — a no-code WhatsApp chatbot platform. Whether you need a stunning website, intelligent automation, or AI-powered customer communication, we've got you covered.",
    },
    {
        question: "What is 2ndu.ai and how does it work?",
        answer: "2ndu.ai is our chatbot platform that lets you connect your WhatsApp Business account to an AI chatbot in minutes. Sign up, connect your WhatsApp number, train the AI on your business data, and launch. The AI then handles customer conversations 24/7.",
    },
    {
        question: "Do I need coding skills to use your services?",
        answer: "Not at all. 2ndu.ai is completely no-code — if you can send an email, you can set up a chatbot. For custom websites and AI integrations, our team handles all the technical work and walks you through the setup.",
    },
    {
        question: "How long does a typical project take?",
        answer: "2ndu.ai is live in under 10 minutes. Custom websites typically take 2–4 weeks depending on scope. AI system integrations usually run 1–3 weeks for standard implementations and 4–8 weeks for complex builds.",
    },
    {
        question: "Can you work with my existing tools?",
        answer: "Yes. We integrate with most popular tools — WhatsApp Business, Stripe, Shopify, Slack, Google Workspace, HubSpot, Notion, and 30+ others. If you have a custom stack, we'll build the integration as part of the project scope.",
    },
    {
        question: "What's included in your support?",
        answer: "Starter packages include 30 days of post-launch support; Business includes 90 days; Custom includes ongoing priority SLA support. Support covers bug fixes, small content updates, and general guidance. Major feature additions are quoted separately.",
    },
    {
        question: "Do you offer revisions during a project?",
        answer: "Yes. Every project includes two rounds of revisions at key milestones — design and pre-launch. Additional revisions are available at our standard hourly rate. We'd rather iterate early than ship something you're not happy with.",
    },
    {
        question: "What happens if I need help after the support period ends?",
        answer: "You can move onto a monthly retainer for continued maintenance, or pay per-incident for one-off requests. Many of our clients choose the retainer once their business depends on the system.",
    },
];
```

- [ ] **Step 2: Run dev server and verify**

```bash
npm run dev
```

Visit `http://localhost:3000#faq`. Confirm:
- 8 collapsed FAQ items render.
- Each opens/closes its accordion on click with the existing chevron rotation.
- No console errors. Mobile width still scrolls cleanly.
- The exported `faqData` (used for JSON-LD schema) reflects all 8 entries when inspected via View Page Source on a published build.

- [ ] **Step 3: Commit**

```bash
git add components/sections/faq-section.tsx
git commit -m "feat(faq): expand FAQ from 4 to 8 questions

Adds: tools integration, support details, revisions, post-support
options. Existing JSON-LD schema export pattern preserved."
```

---

## Task 9: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Full page walkthrough at desktop width**

```bash
npm run dev
```

Open `http://localhost:3000` at desktop width (≥1280px). Scroll from top to bottom, then back up. Confirm:
- 8 sections in order: Hero → Services → Problem/Solution → ProductShowcase → HowItWorks → Pricing → FAQ → CTAFooter.
- Scroll has noticeable inertia (Lenis), feels smooth — no jarring stops.
- Each section snaps softly near its edge, but free-flows mid-scroll.
- All entry animations fire cleanly (no missing reveals).
- No console errors or hydration warnings.

- [ ] **Step 2: Tablet & mobile breakpoint check**

Resize browser to 768px width, then 375px width. Walk through each section. Confirm:
- Bento grid (Services) collapses to single column at <1024px.
- Problem/Solution stacks vertically below 768px.
- Phone mockup (ProductShowcase) shrinks to 320px max.
- Pricing cards stack; middle tier no longer scaled.
- All text is readable. No horizontal scroll.

- [ ] **Step 3: Performance smoke check**

In Chrome DevTools, open Lighthouse, run a Performance + Best Practices audit on the landing page. Confirm:
- Performance score does not drop more than 5 points below the pre-change baseline (if you have one). If you don't have a baseline: aim for 70+ on desktop.
- No new console errors.
- No render-blocking issues.

If Lighthouse score is lower than expected and the regression is significant: check whether LiquidEther is rendering at a lower resolution than before; if so, no action needed (recent commit already optimized it). If Lenis is causing layout thrash, lower its `duration` from 1.1 to 0.9.

- [ ] **Step 4: Final commit (only if there are uncommitted polish tweaks)**

If you found and fixed any small issues during verification, commit them:

```bash
git status
# if there are changes:
git add <files>
git commit -m "polish: <describe the tweak>"
```

If everything passes cleanly, no commit needed.

- [ ] **Step 5: Summary handoff (do NOT git push)**

Print a summary for the user:
- List of commits made on `main`
- Files touched
- Anything the user should review (placeholder content, pricing numbers, integration icons)
- Reminder: changes are local only — user should review before pushing.

---

## Self-Review

After writing, ran the checks:

**Spec coverage:**
- ✅ Scroll fix: Task 1
- ✅ Hero metric strip + integrations: Task 2
- ✅ Services bento + metrics: Task 3
- ✅ Problem vs Solution new section: Task 4
- ✅ Product Showcase phone frame + chip: Task 5
- ✅ How It Works outcome pills: Task 6 (note: kept 4 steps to match existing code, not 3 as spec stub said — pills cover all 4)
- ✅ Pricing new section: Task 7
- ✅ FAQ expansion: Task 8
- ✅ Final verification: Task 9

**Placeholder scan:** Each task has full code blocks, no TBD/TODO/"implement later". ✅

**Type consistency:** All Tailwind classes verified against existing patterns in current components. `motion.div` props match existing usage. `react-icons/si` module name verified standard. `lenis` API matches v1.x docs. ✅

**Other notes:**
- The spec said HowItWorks has 3 steps, but the actual code has 4. The plan adapts to reality (4 steps + 4 outcome pills) — this is a known divergence from the spec; not a bug.
- Existing `faqData` export pattern for JSON-LD schema is preserved (Task 8 only changes the array contents, not the export shape).
- Lenis's interaction with CSS scroll-snap proximity mode is well-tested in v1.x; no special integration code needed.

---

## Execution Handoff

Two execution options for this plan:

**1. Subagent-Driven (recommended for fresh contexts)** — dispatch a fresh subagent per task, review between tasks, fast iteration. Use `superpowers:subagent-driven-development`.

**2. Inline Execution** — execute tasks in this session, batch with checkpoints. Use `superpowers:executing-plans`.

The user has stated a preference for end-to-end execution without per-step approval gates. Default to **Inline Execution** with brief progress updates rather than approval gates, only stopping if a task hits an unexpected blocker.
