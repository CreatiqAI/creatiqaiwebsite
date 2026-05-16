"use client";

import { motion, useScroll, useTransform } from "motion/react";
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
    const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            id="how-it-works"
            className="relative z-20 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white"
        >
            {/* Soft tinted blobs on white */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)" }} />
                <div className="absolute -bottom-24 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #0f172a 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>

            <div className="max-w-7xl mx-auto w-full" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 md:mb-20 text-center"
                >
                    <span className="inline-block text-xs md:text-sm font-bold text-violet-600 uppercase tracking-[0.2em] mb-4">
                        How It Works
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.05]">
                        Four steps.{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] animate-[gradient-x_5s_ease-in-out_infinite]">
                            Launched fast.
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
                    {/* Connecting line — desktop, animated draw on scroll */}
                    <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-slate-200">
                        <motion.div
                            style={{ width: lineWidth }}
                            className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                        />
                        <motion.div
                            style={{ left: lineWidth }}
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.6)]"
                        >
                            <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-60" />
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
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -6 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative mx-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center mb-4 md:mb-6 z-10 group-hover:shadow-[0_0_24px_rgba(37,99,235,0.35)] transition-shadow"
                            >
                                <step.icon size={22} className="text-blue-600 md:w-6 md:h-6" />
                            </motion.div>

                            <span className="text-xs md:text-sm font-bold text-blue-600/70 uppercase tracking-[0.2em] mb-2 block">
                                Step {step.number}
                            </span>

                            <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-2 md:mb-3 tracking-tight">{step.title}</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                                {step.description}
                            </p>

                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                                <span className="w-1 h-1 rounded-full bg-blue-600" />
                                <span className="text-[10px] md:text-xs text-blue-700 font-semibold">
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
