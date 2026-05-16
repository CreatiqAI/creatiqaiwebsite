"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Monitor, Cpu, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { useRef, MouseEvent } from "react";
import { AnimatedCounter } from "@/components/animated-counter";

type Service = {
    icon: typeof Monitor;
    title: string;
    description: string;
    metric: { value: number; suffix: string; label: string };
    cta: { label: string; href: string };
    highlight?: boolean;
    size: "large" | "small";
};

const services: Service[] = [
    {
        icon: Monitor,
        title: "Websites that convert",
        description: "Stunning, fast, conversion-tuned. Launch in 2–4 weeks.",
        metric: { value: 142, suffix: "", label: "sites shipped" },
        cta: { label: "See examples", href: "#contact" },
        size: "large",
    },
    {
        icon: Cpu,
        title: "AI that works for you",
        description: "Automate workflows, eliminate busywork.",
        metric: { value: 40, suffix: "%", label: "efficiency lift" },
        cta: { label: "Learn more", href: "#contact" },
        size: "small",
    },
    {
        icon: MessageSquare,
        title: "2ndu.ai chatbot",
        description: "AI sales on WhatsApp. 24/7.",
        metric: { value: 10, suffix: "k+", label: "chats handled" },
        cta: { label: "Try free", href: "https://2ndu.ai" },
        highlight: true,
        size: "small",
    },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
    const isLarge = service.size === "large";
    const cardRef = useRef<HTMLDivElement>(null);

    // Cursor-following spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }

    const spotlightBackground = useTransform(
        [springX, springY],
        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${service.highlight ? "rgba(124,58,237,0.18)" : "rgba(37,99,235,0.18)"}, transparent 50%)`
    );

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`group relative ${isLarge ? "lg:col-span-2 lg:row-span-2" : ""}`}
        >
            <div className={`css-glow-border relative h-full`} style={{ "--card-glow": service.highlight ? "#7c3aed" : "#2563eb" } as React.CSSProperties}>
                <div className="relative p-6 md:p-8 flex flex-col h-full bg-white/[0.04] rounded-2xl border border-white/10 overflow-hidden">
                    {/* Cursor spotlight */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: spotlightBackground }}
                    />

                    {/* Metric badge top-right */}
                    <div className="absolute top-4 right-4 md:top-5 md:right-5 flex items-baseline gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                        <span className="text-xs md:text-sm font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                            <AnimatedCounter value={service.metric.value} suffix={service.metric.suffix} />
                        </span>
                        <span className="text-[10px] md:text-xs text-white/45">{service.metric.label}</span>
                    </div>

                    {/* Highlight sparkle for 2ndu.ai card */}
                    {service.highlight && (
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30">
                            <Sparkles size={10} className="text-violet-300" />
                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-violet-200">Flagship</span>
                        </div>
                    )}

                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`inline-flex p-3 rounded-xl mb-5 md:mb-6 w-fit mt-8 md:mt-10 ${
                            service.highlight
                                ? "bg-violet-500/15 text-violet-300"
                                : "bg-blue-500/15 text-blue-300"
                        }`}
                    >
                        <service.icon size={isLarge ? 32 : 26} />
                    </motion.div>

                    <h3 className={`font-bold mb-3 text-white tracking-tight ${isLarge ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
                        {service.title}
                    </h3>

                    <p className={`text-white/55 leading-relaxed flex-1 ${isLarge ? "text-base md:text-lg" : "text-sm md:text-base"}`}>
                        {service.description}
                    </p>

                    <a
                        href={service.cta.href}
                        className={`group/cta inline-flex items-center gap-2 text-sm font-semibold mt-6 ${
                            service.highlight
                                ? "text-violet-300 hover:text-violet-200"
                                : "text-blue-300 hover:text-blue-200"
                        }`}
                    >
                        {service.cta.label}
                        <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export function ServicesSection() {
    return (
        <section id="services" className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden">
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 60% 50% at 10% 40%, rgba(37,99,235,0.1) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 90% 60%, rgba(124,58,237,0.08) 0%, transparent 70%)" }}>
                <div className="bg-orb bg-orb-blue w-[500px] h-[500px] -top-20 -left-40" />
                <div className="bg-orb bg-orb-violet w-[400px] h-[400px] -bottom-20 -right-32" />
                <div className="shimmer-line top-1/3 left-0" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 md:mb-16 text-center"
                >
                    <span className="inline-block text-xs md:text-sm font-bold text-blue-300 uppercase tracking-[0.2em] mb-4">
                        What We Build
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tight leading-[1.05]">
                        Three pillars.{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-[length:200%_auto] animate-[gradient-x_5s_ease-in-out_infinite]">
                            Zero excuses.
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 md:gap-6 auto-rows-fr">
                    {services.map((service, i) => (
                        <ServiceCard key={service.title} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
