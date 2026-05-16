"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";

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

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden">
            {/* Background: Diagonal gradient streaks + floating orbs */}
            <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(155deg, transparent 20%, rgba(124,58,237,0.08) 50%, transparent 80%), linear-gradient(205deg, transparent 20%, rgba(37,99,235,0.08) 50%, transparent 80%)" }}>
                <div className="bg-orb bg-orb-violet w-[500px] h-[500px] -top-32 right-1/4" />
                <div className="bg-orb bg-orb-blue w-[400px] h-[400px] -bottom-24 left-1/4" />
                <div className="shimmer-line top-1/4 left-0" style={{ animationDelay: "2s" }} />
                <div className="shimmer-line bottom-1/3 left-0" style={{ animationDelay: "5s" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
            </div>
            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 md:mb-20 text-center"
                >
                    <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
                        How It{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Works
                        </span>
                    </h2>
                    <p className="text-white/60 text-sm md:text-xl max-w-2xl mx-auto">
                        Four simple steps from concept to a fully automated business system.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative">
                    {/* Connecting line (desktop) */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent origin-left"
                    />

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="relative text-center"
                        >
                            <div className="relative mx-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border-2 border-blue-500/30 flex items-center justify-center mb-3 md:mb-6 z-10">
                                <step.icon size={20} className="text-blue-400 md:w-6 md:h-6" />
                            </div>

                            <span className="text-[10px] md:text-xs font-bold text-blue-400/50 uppercase tracking-widest mb-1 md:mb-2 block">
                                Step {step.number}
                            </span>

                            <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">{step.title}</h3>
                            <p className="text-white/40 leading-relaxed text-xs md:text-sm">{step.description}</p>

                            <div className="mt-3 md:mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/[0.08] border border-blue-500/15">
                                <span className="w-1 h-1 rounded-full bg-blue-400" />
                                <span className="text-[10px] md:text-xs text-blue-200/80 font-medium">
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
