"use client";

import { motion } from "framer-motion";
import { Monitor, Cpu, MessageSquare, ArrowRight } from "lucide-react";

const services = [
    {
        icon: Monitor,
        title: "Website Customization",
        description:
            "Stunning, high-performance websites tailored to your brand. From landing pages to full-scale web platforms — we build digital experiences that convert visitors into customers.",
        features: ["Custom UI/UX Design", "Responsive Development", "Performance Optimization", "SEO-Ready Architecture"],
        metric: { value: "142", label: "sites shipped" },
        cta: { label: "Learn more", href: "#contact" },
        size: "large" as const,
    },
    {
        icon: Cpu,
        title: "AI System Customization",
        description:
            "Integrate intelligent AI into your existing business systems — automate workflows, enhance decision-making, drive operational efficiency.",
        features: ["Workflow Automation", "AI Integration", "Custom AI Models", "Data Analytics"],
        metric: { value: "+40%", label: "avg efficiency lift" },
        cta: { label: "Learn more", href: "#contact" },
        size: "small" as const,
    },
    {
        icon: MessageSquare,
        title: "2ndu.ai — Chatbot Platform",
        description:
            "Plug a powerful AI chatbot into your WhatsApp Business in minutes — no coding required.",
        features: ["WhatsApp Integration", "No-Code Setup", "Multi-Language AI", "Analytics Dashboard"],
        metric: { value: "10k+", label: "chats handled" },
        cta: { label: "Try 2ndu.ai", href: "https://2ndu.ai" },
        highlight: true,
        size: "small" as const,
    },
];

export function ServicesSection() {
    return (
        <section id="services" className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden">
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
                    className="mb-10 md:mb-20 text-center"
                >
                    <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
                        What We{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Build
                        </span>
                    </h2>
                    <p className="text-white/60 text-sm md:text-xl max-w-2xl mx-auto">
                        Three pillars of digital transformation — custom websites, intelligent AI systems, and automated chatbot solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 md:gap-6 auto-rows-fr">
                    {services.map((service, i) => {
                        const isLarge = service.size === "large";
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className={`css-glow-border ${isLarge ? "lg:col-span-2 lg:row-span-2" : ""}`}
                                style={{ "--card-glow": service.highlight ? "#7c3aed" : "#2563eb" } as React.CSSProperties}
                            >
                                <div className="relative p-5 md:p-8 flex flex-col h-full bg-white/5 rounded-2xl border border-white/10">
                                    {/* Metric badge top-right */}
                                    <div className="absolute top-4 right-4 md:top-5 md:right-5 flex items-baseline gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10">
                                        <span className="text-xs md:text-sm font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                            {service.metric.value}
                                        </span>
                                        <span className="text-[10px] md:text-xs text-white/45">{service.metric.label}</span>
                                    </div>

                                    <div
                                        className={`inline-flex p-3 rounded-xl mb-4 md:mb-6 w-fit ${
                                            service.highlight
                                                ? "bg-violet-500/10 text-violet-400"
                                                : "bg-blue-500/10 text-blue-400"
                                        }`}
                                    >
                                        <service.icon size={isLarge ? 32 : 26} />
                                    </div>

                                    <h3 className={`font-bold mb-3 md:mb-4 text-white/95 ${isLarge ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>
                                        {service.title}
                                    </h3>

                                    <p className={`text-white/60 leading-relaxed mb-4 md:mb-6 flex-1 ${isLarge ? "text-sm md:text-base" : "text-sm"}`}>
                                        {service.description}
                                    </p>

                                    {isLarge && (
                                        <ul className="space-y-1.5 md:space-y-2 mb-6 md:mb-8">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm text-white/40">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <a
                                        href={service.cta.href}
                                        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors mt-auto ${
                                            service.highlight
                                                ? "text-violet-400 hover:text-violet-300"
                                                : "text-blue-400 hover:text-blue-300"
                                        }`}
                                    >
                                        {service.cta.label}
                                        <ArrowRight size={14} />
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
