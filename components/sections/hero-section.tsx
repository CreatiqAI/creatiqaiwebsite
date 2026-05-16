"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
import { LiveTicker } from "@/components/live-ticker";
import { MagneticButton } from "@/components/magnetic-button";

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
            className="text-slate-400 hover:text-slate-700 transition-colors"
        />
    );
}

export function HeroSection({ country }: { country: string }) {
    const geo = getGeoContent(country);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32 bg-gradient-to-b from-white via-slate-50 to-white">
            {/* Soft aurora blobs on white */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="hero-aurora">
                    <div className="hero-aurora-blob w-[600px] h-[600px] -top-40 -left-32 opacity-50" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent 60%)", animation: "aurora-drift-1 18s ease-in-out infinite" }} />
                    <div className="hero-aurora-blob w-[700px] h-[700px] -top-32 -right-40 opacity-50" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.28), transparent 60%)", animation: "aurora-drift-2 22s ease-in-out infinite" }} />
                    <div className="hero-aurora-blob w-[500px] h-[500px] bottom-0 left-1/3 opacity-50" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent 60%)", animation: "aurora-drift-3 20s ease-in-out infinite" }} />
                </div>
                <div className="hero-dot-grid" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-6 text-center">
                {/* Live activity ticker */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 md:mb-10"
                >
                    <LiveTicker />
                </motion.div>

                {/* Main Heading — staggered line reveal with per-line animated gradients */}
                <h1 className="mb-5 md:mb-8 text-[2.75rem] md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-[1.05] text-slate-900">
                    {[
                        { word: "Build", gradient: "from-blue-600 via-cyan-500 to-blue-600" },
                        { word: "Automate", gradient: "from-violet-600 via-fuchsia-500 to-violet-600" },
                        { word: "Ship", gradient: "from-blue-600 via-violet-600 to-blue-600" },
                    ].map((line, i) => (
                        <motion.div
                            key={line.word}
                            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.4 + i * 0.18, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="block"
                        >
                            <span className={`inline-block bg-clip-text text-transparent bg-gradient-to-r ${line.gradient} bg-[length:200%_auto] animate-[gradient-x_4s_ease-in-out_infinite] hover:scale-[1.03] transition-transform duration-300 cursor-default`} style={{ animationDelay: `${i * 0.4}s` }}>
                                {line.word}
                            </span>
                            <span className="text-slate-900"> it</span>
                            <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.18 + 0.5, type: "spring", stiffness: 400 }}
                                className={`inline-block bg-clip-text text-transparent bg-gradient-to-r ${line.gradient} bg-[length:200%_auto] animate-[gradient-x_4s_ease-in-out_infinite]`}
                                style={{ animationDelay: `${i * 0.4}s` }}
                            >
                                .
                            </motion.span>
                            {i === 2 && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                    className="inline-block w-[0.35em] h-[0.85em] ml-2 -mb-1 bg-blue-600 caret-blink rounded-sm align-middle"
                                />
                            )}
                        </motion.div>
                    ))}
                </h1>

                {/* Subhead */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-base md:text-xl text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto"
                >
                    Websites, AI systems, and WhatsApp chatbots that{" "}
                    <span className="text-slate-900 font-semibold">actually move the needle.</span>
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-16"
                >
                    <MagneticButton>
                        <a
                            href="https://2ndu.ai"
                            className="glass-btn-primary group flex items-center gap-2 px-7 py-3.5 md:px-9 md:py-4 rounded-full font-bold text-base md:text-lg hover:scale-[1.02] transition-transform"
                        >
                            {geo.ctaText}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a
                            href="#services"
                            className="glass-btn flex items-center px-7 py-3.5 md:px-9 md:py-4 rounded-full font-semibold text-base md:text-lg hover:scale-[1.02] transition-transform"
                        >
                            See What We Build
                        </a>
                    </MagneticButton>
                </motion.div>

                {/* Metric strip */}
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
                            {i > 0 && <span className="hidden md:inline w-1 h-1 rounded-full bg-slate-300" />}
                            <span className="font-bold tabular-nums text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                <AnimatedCounter value={m.value} suffix={m.suffix} />
                            </span>
                            <span className="text-slate-500 text-xs md:text-sm uppercase tracking-wider">{m.label}</span>
                        </span>
                    ))}
                </motion.div>

                {/* Integrations — endless marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                    className="flex flex-col items-center gap-3 w-full"
                >
                    <span className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">
                        Plugs into 30+ tools
                    </span>
                    <div className="marquee-container w-full max-w-3xl">
                        <div className="marquee-track gap-8 md:gap-14 py-2">
                            {/* Duplicate the icon list twice for seamless loop */}
                            {[0, 1].map((repeatIndex) => (
                                <div key={repeatIndex} className="flex items-center gap-8 md:gap-14 pr-8 md:pr-14" aria-hidden={repeatIndex === 1}>
                                    {[
                                        { name: "SiWhatsapp", label: "WhatsApp" },
                                        { name: "SiStripe", label: "Stripe" },
                                        { name: "SiShopify", label: "Shopify" },
                                        { name: "SiSlack", label: "Slack" },
                                        { name: "SiGooglesheets", label: "Sheets" },
                                        { name: "SiHubspot", label: "HubSpot" },
                                        { name: "SiNotion", label: "Notion" },
                                    ].map((item) => (
                                        <div key={`${repeatIndex}-${item.name}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors flex-shrink-0">
                                            <IntegrationIcon name={item.name} />
                                            <span className="text-xs md:text-sm font-medium whitespace-nowrap">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:block"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center p-1"
                >
                    <div className="w-1 h-2 rounded-full bg-blue-600" />
                </motion.div>
            </motion.div>
        </section>
    );
}
