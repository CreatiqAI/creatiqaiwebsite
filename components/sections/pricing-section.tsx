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
            className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white"
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2), transparent 70%)" }} />
                <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #0f172a 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>

            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 md:mb-16 text-center"
                >
                    <span className="inline-block text-xs md:text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                        Pricing
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.05] mb-4">
                        Honest pricing.{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] animate-[gradient-x_5s_ease-in-out_infinite]">
                            No surprises.
                        </span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto">
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
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg z-10">
                                    {tier.badge}
                                </span>
                            )}
                            <div
                                className={`h-full flex flex-col p-6 md:p-8 rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 ${
                                    tier.highlighted
                                        ? "border-violet-300 shadow-[0_16px_48px_-12px_rgba(124,58,237,0.3)] hover:shadow-[0_20px_60px_-12px_rgba(124,58,237,0.4)]"
                                        : "border-slate-200 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)] hover:shadow-[0_12px_32px_-12px_rgba(37,99,235,0.2)]"
                                }`}
                            >
                                <div className="mb-5 md:mb-6">
                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                                        {tier.name}
                                    </h3>
                                    <p className="text-xs md:text-sm text-slate-500">
                                        {tier.tagline}
                                    </p>
                                </div>

                                <div className="mb-5 md:mb-6">
                                    <span className="text-2xl md:text-3xl font-bold text-slate-900 tabular-nums">
                                        {tier.price}
                                    </span>
                                </div>

                                <ul className="space-y-2.5 md:space-y-3 mb-7 md:mb-8 flex-1">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                                            <Check
                                                size={16}
                                                className={`mt-0.5 flex-shrink-0 ${
                                                    tier.highlighted ? "text-violet-600" : "text-blue-600"
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
                                            ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-[0_8px_24px_-8px_rgba(124,58,237,0.5)]"
                                            : "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200"
                                    }`}
                                >
                                    {tier.cta.label}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="mt-8 md:mt-10 text-center text-xs md:text-sm text-slate-500">
                    All tiers include a free 30-min audit. No lock-ins, no hidden fees.
                </p>
            </div>
        </section>
    );
}
