"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { TextScramble } from "@/components/text-scramble";
import { getGeoContent } from "@/lib/geo-content";
import dynamic from "next/dynamic";
import StarBorder from "@/components/StarBorder";
import "@/components/StarBorder.css";

const FloatingLines = dynamic(() => import("@/components/FloatingLines"), {
    ssr: false,
});

export function HeroSection({ country }: { country: string }) {
    const geo = getGeoContent(country);

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#050510]">
            {/* FloatingLines Background */}
            <div className="absolute inset-0 z-0">
                <FloatingLines
                    linesGradient={["#2563eb", "#7c3aed", "#3b82f6", "#8b5cf6"]}
                    enabledWaves={["top", "middle", "bottom"]}
                    lineCount={[4, 6, 4]}
                    lineDistance={[6, 5, 7]}
                    animationSpeed={0.8}
                    interactive={true}
                    bendRadius={6}
                    bendStrength={-0.4}
                    mouseDamping={0.06}
                    parallax={true}
                    parallaxStrength={0.15}
                />
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
                    Custom websites, AI automation systems, and WhatsApp chatbots
                    — everything your business needs to go digital.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <StarBorder as="div" color="#3b82f6" speed="4s" className="rounded-full">
                        <a
                            href="https://2ndu.ai"
                            className="group flex items-center gap-2 px-8 py-4 text-white font-bold text-lg hover:scale-[1.03] transition-transform"
                        >
                            {geo.ctaText}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </StarBorder>
                    <StarBorder as="div" color="#7c3aed" speed="6s" className="rounded-full">
                        <a
                            href="#services"
                            className="flex items-center px-8 py-4 text-white/90 font-medium text-lg hover:scale-[1.03] transition-transform"
                        >
                            Explore Services
                        </a>
                    </StarBorder>
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
                            {i > 0 && <span className="w-1 h-1 rounded-full bg-white/15 hidden md:block" />}
                            <span className="text-white/20 text-[11px] md:text-xs font-semibold tracking-[0.2em]">
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
