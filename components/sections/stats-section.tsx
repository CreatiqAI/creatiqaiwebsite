"use client";

import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/animated-counter";
import StarBorder from "@/components/StarBorder";
import "@/components/StarBorder.css";

const stats = [
    { value: 500, suffix: "+", label: "Projects Delivered", description: "Across multiple industries and countries" },
    { value: 60, suffix: "%", label: "Automation Rate", description: "Average workflow automation achieved" },
    { value: 24, suffix: "/7", label: "AI Availability", description: "Your AI assistant never sleeps" },
    { value: 95, suffix: "+", label: "Languages Supported", description: "Multilingual chatbot capabilities" },
];

export function StatsSection() {
    return (
        <section className="relative z-10 py-20 px-6 border-y border-white/10 bg-[#03030a]/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                    >
                        <StarBorder as="div" color="#2563eb" speed="6s" className="h-full">
                            <div className="text-center p-6 rounded-2xl h-full">
                                <div className="text-3xl md:text-5xl font-bold text-blue-400 mb-2">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-white font-semibold mb-1 text-sm md:text-base">{stat.label}</div>
                                <p className="text-xs md:text-sm text-white/40 hidden md:block">{stat.description}</p>
                            </div>
                        </StarBorder>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
