"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { TextScramble } from "@/components/text-scramble";
import { getGeoContent } from "@/lib/geo-content";

export function HeroSection({ country }: { country: string }) {
    const geo = getGeoContent(country);

    return (
        <section className="relative h-full flex items-center justify-center overflow-hidden">
            {/* Subtle base gradient fallback (LiquidEther renders behind via fixed layer) */}
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)" }}>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-btn mb-10"
                >
                    <Sparkles size={14} className="text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">{geo.trustBadge}</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.1] mb-6"
                >
                    <span className="text-white">Your </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                        One Stop
                    </span>
                    <br />
                    <span className="text-white">
                        <TextScramble text="AI Solution" className="text-white" />
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">.</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 1.0 }}
                    className="text-lg md:text-xl text-white/45 leading-relaxed mb-12 max-w-2xl mx-auto"
                >
                    <span className="text-white/70">Custom websites, AI automation systems, and WhatsApp chatbots</span>
                    <br />
                    — everything your business needs to go digital.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <div className="glow-border-btn glow-border-btn-primary" style={{ "--glow-color": "#3b82f6" } as React.CSSProperties}>
                        <a
                            href="https://2ndu.ai"
                            className="glow-border-btn-inner group flex items-center gap-2 px-8 py-4 text-white font-bold text-lg hover:scale-[1.02] transition-transform"
                        >
                            {geo.ctaText}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                    <div className="glow-border-btn" style={{ "--glow-color": "#7c3aed" } as React.CSSProperties}>
                        <a
                            href="#services"
                            className="glow-border-btn-inner flex items-center px-8 py-4 text-white/90 font-medium text-lg hover:scale-[1.02] transition-transform"
                        >
                            Explore Services
                        </a>
                    </div>
                </motion.div>

                {/* Trust Signals */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
                >
                    {["OFFICIAL WHATSAPP API", "META BUSINESS PARTNER", "AI-POWERED SOLUTIONS"].map((label, i) => (
                        <span key={label} className="flex items-center gap-3">
                            {i > 0 && <span className="w-1 h-1 rounded-full bg-white/30 hidden md:block" />}
                            <span className="text-white/50 text-[11px] md:text-xs font-semibold tracking-[0.2em]">
                                {label}
                            </span>
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
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
