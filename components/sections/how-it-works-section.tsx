"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Discover",
        description: "Tell us your business needs. We analyze your workflows, customer touchpoints, and automation opportunities.",
    },
    {
        number: "02",
        icon: PenTool,
        title: "Design",
        description: "We architect the perfect solution — whether it's a custom website, AI integration, or chatbot deployment.",
    },
    {
        number: "03",
        icon: Rocket,
        title: "Deploy",
        description: "Launch your solution. Go live with a fully tested, production-ready system tailored to your business.",
    },
    {
        number: "04",
        icon: TrendingUp,
        title: "Optimize",
        description: "Continuous improvement powered by data. We monitor, refine, and scale your AI systems for peak performance.",
    },
];

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="relative z-10 py-20 px-6 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        How It{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Works
                        </span>
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                        Four simple steps from concept to a fully automated business system.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
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
                            {/* Step number circle */}
                            <div className="relative mx-auto w-16 h-16 rounded-full bg-white/5 border-2 border-blue-500/30 flex items-center justify-center mb-6 z-10">
                                <step.icon size={24} className="text-blue-400" />
                            </div>

                            <span className="text-xs font-bold text-blue-400/50 uppercase tracking-widest mb-2 block">
                                Step {step.number}
                            </span>

                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-white/40 leading-relaxed text-sm">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
