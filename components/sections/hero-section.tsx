"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import {
    SiWhatsapp,
    SiStripe,
    SiShopify,
    SiSlack,
    SiGooglesheets,
    SiHubspot,
    SiNotion,
} from "react-icons/si";
import { getGeoContent } from "@/lib/geo-content";
import { AnimatedCounter } from "@/components/animated-counter";

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

export function HeroSection({ country }: { country: string }) {
    const geo = getGeoContent(country);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32">
            {/* Subtle base gradient + animated aurora blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)" }}>
                <div className="hero-aurora">
                    <div className="hero-aurora-blob w-[500px] h-[500px] -top-32 -left-20" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35), transparent 60%)", animation: "aurora-drift-1 18s ease-in-out infinite" }} />
                    <div className="hero-aurora-blob w-[600px] h-[600px] -top-20 -right-40" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.3), transparent 60%)", animation: "aurora-drift-2 22s ease-in-out infinite" }} />
                    <div className="hero-aurora-blob w-[400px] h-[400px] bottom-0 left-1/3" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.25), transparent 60%)", animation: "aurora-drift-3 20s ease-in-out infinite" }} />
                </div>
                <div className="hero-dot-grid" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6 text-center">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full glass-btn mb-6 md:mb-10"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-xs md:text-sm font-medium text-blue-300">{geo.trustBadge}</span>
                </motion.div>

                {/* Main Heading — shorter, punchier, animated gradient */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-[2.75rem] md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-[1.05] mb-5 md:mb-8"
                >
                    <span className="text-white">Build it.</span>
                    <br />
                    <span className="text-white">Automate it.</span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-[length:200%_auto] animate-[gradient-x_4s_ease-in-out_infinite]">
                        Ship it.
                    </span>
                </motion.h1>

                {/* One-line subhead */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-base md:text-xl text-white/55 mb-8 md:mb-12 max-w-2xl mx-auto"
                >
                    Websites, AI systems, and WhatsApp chatbots that{" "}
                    <span className="text-white font-medium">actually move the needle.</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-16"
                >
                    <div className="glow-border-btn glow-border-btn-primary" style={{ "--glow-color": "#3b82f6" } as React.CSSProperties}>
                        <a
                            href="https://2ndu.ai"
                            className="glow-border-btn-inner group flex items-center gap-2 px-7 py-3.5 md:px-9 md:py-4 text-white font-bold text-base md:text-lg hover:scale-[1.02] transition-transform"
                        >
                            {geo.ctaText}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                    <div className="glow-border-btn" style={{ "--glow-color": "#7c3aed" } as React.CSSProperties}>
                        <a
                            href="#services"
                            className="glow-border-btn-inner flex items-center px-7 py-3.5 md:px-9 md:py-4 text-white/90 font-medium text-base md:text-lg hover:scale-[1.02] transition-transform"
                        >
                            See What We Build
                        </a>
                    </div>
                </motion.div>

                {/* Metric strip with animated counters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-3 mb-6 md:mb-8"
                >
                    {[
                        { value: 50, suffix: "+", label: "projects" },
                        { value: 99, suffix: "%", label: "uptime" },
                        { value: 24, suffix: "/7", label: "support" },
                    ].map((m, i) => (
                        <span key={m.label} className="flex items-center gap-2.5 text-sm md:text-base">
                            {i > 0 && <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20" />}
                            <span className="font-bold tabular-nums text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                <AnimatedCounter value={m.value} suffix={m.suffix} />
                            </span>
                            <span className="text-white/45 text-xs md:text-sm uppercase tracking-wider">{m.label}</span>
                        </span>
                    ))}
                </motion.div>

                {/* Integrations strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="flex items-center gap-3 md:gap-5 opacity-70">
                        {["SiWhatsapp", "SiStripe", "SiShopify", "SiSlack", "SiGooglesheets", "SiHubspot", "SiNotion"].map((name) => (
                            <IntegrationIcon key={name} name={name} />
                        ))}
                    </div>
                    <span className="text-[10px] md:text-xs text-white/40 tracking-wide">
                        Plugs into WhatsApp, Stripe, Shopify, Slack +30 more
                    </span>
                </motion.div>
            </div>

            {/* Scroll indicator — desktop only */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:block"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
                >
                    <div className="w-1 h-2 rounded-full bg-blue-400" />
                </motion.div>
            </motion.div>
        </section>
    );
}
