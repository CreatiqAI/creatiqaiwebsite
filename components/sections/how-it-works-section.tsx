"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";
import { useRef } from "react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Discover",
        description: "Free 30-min audit. We map your gaps.",
        outcome: "No commitment",
    },
    {
        number: "02",
        icon: PenTool,
        title: "Design",
        description: "Custom blueprint. You approve before build.",
        outcome: "1-week turnaround",
    },
    {
        number: "03",
        icon: Rocket,
        title: "Deploy",
        description: "Production-ready. Launched and tested.",
        outcome: "Live in 2–4 weeks",
    },
    {
        number: "04",
        icon: TrendingUp,
        title: "Optimize",
        description: "Track, refine, scale. Monthly reviews.",
        outcome: "Ongoing growth",
    },
];

export function HowItWorksSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end 60%"],
    });

    // Connecting line draws as you scroll through the section
    const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="how-it-works" className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden">
            <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(155deg, transparent 20%, rgba(124,58,237,0.08) 50%, transparent 80%), linear-gradient(205deg, transparent 20%, rgba(37,99,235,0.08) 50%, transparent 80%)" }}>
                <div className="bg-orb bg-orb-violet w-[500px] h-[500px] -top-32 right-1/4" />
                <div className="bg-orb bg-orb-blue w-[400px] h-[400px] -bottom-24 left-1/4" />
                <div className="shimmer-line top-1/4 left-0" style={{ animationDelay: "2s" }} />
                <div className="shimmer-line bottom-1/3 left-0" style={{ animationDelay: "5s" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto w-full" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 md:mb-20 text-center"
                >
                    <span className="inline-block text-xs md:text-sm font-bold text-violet-300 uppercase tracking-[0.2em] mb-4">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                        Four steps.{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-[length:200%_auto] animate-[gradient-x_5s_ease-in-out_infinite]">
                            Launched fast.
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
                    {/* Connecting line — desktop, animated draw on scroll */}
                    <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/10">
                        <motion.div
                            style={{ width: lineWidth }}
                            className="h-full bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                        />
                        {/* Animated dot traveling along the line */}
                        <motion.div
                            style={{ left: lineWidth }}
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"
                        >
                            <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60" />
                        </motion.div>
                    </div>

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="relative text-center group"
                        >
                            {/* Step number badge — animated */}
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -6 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative mx-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0a0a1f] border-2 border-blue-500/40 flex items-center justify-center mb-4 md:mb-6 z-10 group-hover:border-blue-400 group-hover:shadow-[0_0_24px_rgba(96,165,250,0.4)] transition-all"
                            >
                                <step.icon size={22} className="text-blue-300 md:w-6 md:h-6" />
                            </motion.div>

                            <span className="text-xs md:text-sm font-bold text-blue-400/70 uppercase tracking-[0.2em] mb-2 block">
                                Step {step.number}
                            </span>

                            <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3 tracking-tight">{step.title}</h3>
                            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                                {step.description}
                            </p>

                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                                <span className="w-1 h-1 rounded-full bg-blue-400" />
                                <span className="text-[10px] md:text-xs text-blue-200/90 font-semibold">
                                    {step.outcome}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
