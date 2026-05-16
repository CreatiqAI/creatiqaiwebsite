"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
    {
        problem: "Manual data entry. 20+ hrs/week gone.",
        solution: "Workflows that run themselves. 24/7.",
    },
    {
        problem: "Customers wait hours for a reply.",
        solution: "AI replies in 0.3s. Even at 3am.",
    },
    {
        problem: "No idea what's actually working.",
        solution: "Real-time dashboards. Decisions, faster.",
    },
];

export function ProblemSolutionSection() {
    return (
        <section
            id="why-creatiq"
            className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden"
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
                    className="mb-12 md:mb-20 text-center"
                >
                    <span className="inline-block text-xs md:text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">
                        Why Creatiq
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                        Stop fighting tools.{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-[length:200%_auto] animate-[gradient-x_5s_ease-in-out_infinite]">
                            Start growing.
                        </span>
                    </h2>
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
