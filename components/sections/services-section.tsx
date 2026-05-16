"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
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
        ([x, y]) => `radial-gradient(360px circle at ${x}px ${y}px, ${service.highlight ? "rgba(124,58,237,0.08)" : "rgba(37,99,235,0.07)"}, transparent 50%)`
    );

    const accentColor = service.highlight ? "violet" : "blue";

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className={`group relative ${isLarge ? "lg:col-span-2 lg:row-span-2" : ""}`}
        >
            <div
                className={`relative h-full p-6 md:p-8 flex flex-col bg-white rounded-2xl border overflow-hidden transition-shadow duration-300 ${
                    service.highlight
                        ? "border-violet-200 shadow-[0_8px_32px_-12px_rgba(124,58,237,0.25)] hover:shadow-[0_16px_48px_-12px_rgba(124,58,237,0.35)]"
                        : "border-slate-200 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] hover:shadow-[0_16px_48px_-12px_rgba(37,99,235,0.18)]"
                }`}
            >
                {/* Cursor spotlight */}
                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: spotlightBackground }}
                />

                {/* Metric badge */}
                <div className="absolute top-4 right-4 md:top-5 md:right-5 flex items-baseline gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200">
                    <span className={`text-xs md:text-sm font-bold tabular-nums bg-clip-text text-transparent ${
                        service.highlight
                            ? "bg-gradient-to-r from-violet-600 to-blue-600"
                            : "bg-gradient-to-r from-blue-600 to-violet-600"
                    }`}>
                        <AnimatedCounter value={service.metric.value} suffix={service.metric.suffix} />
                    </span>
                    <span className="text-[10px] md:text-xs text-slate-500">{service.metric.label}</span>
                </div>

                {service.highlight && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-100 border border-violet-200">
                        <Sparkles size={10} className="text-violet-600" />
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-violet-700">Flagship</span>
                    </div>
                )}

                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`inline-flex p-3 rounded-xl mb-5 md:mb-6 w-fit mt-8 md:mt-10 ${
                        service.highlight
                            ? "bg-violet-100 text-violet-600"
                            : "bg-blue-100 text-blue-600"
                    }`}
                >
                    <service.icon size={isLarge ? 32 : 26} />
                </motion.div>

                <h3 className={`font-bold mb-3 text-slate-900 tracking-tight ${isLarge ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
                    {service.title}
                </h3>

                <p className={`text-slate-600 leading-relaxed flex-1 ${isLarge ? "text-base md:text-lg" : "text-sm md:text-base"}`}>
                    {service.description}
                </p>

                <a
                    href={service.cta.href}
                    className={`group/cta inline-flex items-center gap-2 text-sm font-semibold mt-6 ${
                        service.highlight
                            ? "text-violet-600 hover:text-violet-700"
                            : "text-blue-600 hover:text-blue-700"
                    }`}
                >
                    {service.cta.label}
                    <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                </a>
            </div>
        </motion.div>
    );
}

export function ServicesSection() {
    return (
        <section
            id="services"
            className="relative z-20 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white"
        >
            {/* Soft tinted blobs on white */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)" }} />
                <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)" }} />
                {/* Top edge accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
                {/* Bottom edge accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #0f172a 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>

            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 md:mb-16 text-center"
                >
                    <span className="inline-block text-xs md:text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                        What We Build
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.05]">
                        Three pillars.{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] animate-[gradient-x_5s_ease-in-out_infinite]">
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
