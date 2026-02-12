"use client";

import { motion } from "framer-motion";
import { Monitor, Cpu, MessageSquare, ArrowRight } from "lucide-react";
import ElectricBorder from "@/components/ElectricBorder";
import "@/components/ElectricBorder.css";

const services = [
    {
        icon: Monitor,
        title: "Website Customization",
        description:
            "Stunning, high-performance websites tailored to your brand. From landing pages to full-scale web platforms — we build digital experiences that convert visitors into customers.",
        features: ["Custom UI/UX Design", "Responsive Development", "Performance Optimization", "SEO-Ready Architecture"],
    },
    {
        icon: Cpu,
        title: "AI System Customization",
        description:
            "Integrate intelligent AI into your existing business systems. We customize and deploy AI solutions that automate workflows, enhance decision-making, and drive operational efficiency.",
        features: ["Workflow Automation", "AI Integration", "Custom AI Models", "Data Analytics"],
    },
    {
        icon: MessageSquare,
        title: "2ndu.ai — Chatbot Platform",
        description:
            "Our flagship product. Plug a powerful AI chatbot into your WhatsApp Business in minutes — no coding required. Automate customer support, qualify leads, and close deals 24/7.",
        features: ["WhatsApp Integration", "No-Code Setup", "Multi-Language AI", "Analytics Dashboard"],
        highlight: true,
    },
];

export function ServicesSection() {
    return (
        <section id="services" className="relative z-10 py-12 px-6 h-full flex items-center overflow-hidden">
            {/* Background: Gradient mesh + floating orbs */}
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 60% 50% at 10% 40%, rgba(37,99,235,0.1) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 90% 60%, rgba(124,58,237,0.08) 0%, transparent 70%)" }}>
                {/* Floating orbs */}
                <div className="bg-orb bg-orb-blue w-[500px] h-[500px] -top-20 -left-40" />
                <div className="bg-orb bg-orb-violet w-[400px] h-[400px] -bottom-20 -right-32" />
                {/* Shimmer line */}
                <div className="shimmer-line top-1/3 left-0" />
                {/* Edge lines */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
            </div>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        What We{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Build
                        </span>
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                        Three pillars of digital transformation — custom websites, intelligent AI systems, and automated chatbot solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <ElectricBorder
                                color={service.highlight ? "#7c3aed" : "#2563eb"}
                                speed={1}
                                chaos={0.08}
                                borderRadius={16}
                            >
                                <div className="p-8 flex flex-col h-full bg-white/5 rounded-2xl border border-white/10">
                                    <div
                                        className={`inline-flex p-3 rounded-xl mb-6 w-fit ${
                                            service.highlight
                                                ? "bg-violet-500/10 text-violet-400"
                                                : "bg-blue-500/10 text-blue-400"
                                        }`}
                                    >
                                        <service.icon size={28} />
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-white/95">
                                        {service.title}
                                    </h3>

                                    <p className="text-white/60 leading-relaxed mb-6 flex-1">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-2 mb-8">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-sm text-white/40">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={service.highlight ? "https://2ndu.ai" : "#contact"}
                                        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                                            service.highlight
                                                ? "text-violet-400 hover:text-violet-300"
                                                : "text-blue-400 hover:text-blue-300"
                                        }`}
                                    >
                                        {service.highlight ? "Try 2ndu.ai" : "Learn More"}
                                        <ArrowRight size={14} />
                                    </a>
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
