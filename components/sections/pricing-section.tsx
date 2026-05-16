"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
    {
        name: "Starter",
        price: "From RM 1,500",
        tagline: "Get online, fast.",
        features: [
            "Landing page",
            "Basic SEO",
            "Mobile responsive",
            "30-day support",
        ],
        cta: { label: "Get Started", href: "#contact" },
        highlighted: false,
    },
    {
        name: "Business",
        price: "From RM 5,000",
        tagline: "The full stack.",
        features: [
            "Full website (10+ pages)",
            "AI integration",
            "WhatsApp bot (2ndu.ai)",
            "Analytics dashboard",
            "90-day support",
        ],
        cta: { label: "Get Started", href: "#contact" },
        highlighted: true,
        badge: "Most Popular",
    },
    {
        name: "Custom",
        price: "Let's talk",
        tagline: "Built to scale.",
        features: [
            "Everything in Business",
            "Dedicated build team",
            "Custom AI training",
            "Priority SLA",
        ],
        cta: { label: "Contact Sales", href: "#contact" },
        highlighted: false,
    },
];

export function PricingSection() {
    return (
        <section
            id="pricing"
            className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden"
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
                    className="mb-12 md:mb-16 text-center"
                >
                    <span className="inline-block text-xs md:text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">
                        Pricing
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-4">
                        Honest pricing.{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-[length:200%_auto] animate-[gradient-x_5s_ease-in-out_infinite]">
                            No surprises.
                        </span>
                    </h2>
                    <p className="text-white/55 text-base md:text-lg max-w-xl mx-auto">
                        Pick what fits your stage. Upgrade anytime.
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
                    All tiers include a free 30-min audit. No lock-ins, no hidden fees.
                </p>
            </div>
        </section>
    );
}
