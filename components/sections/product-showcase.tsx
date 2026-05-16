"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Zap, Globe, BarChart3, Link2, Shield } from "lucide-react";

const features = [
    { icon: MessageCircle, text: "Plug WhatsApp into an AI chatbot instantly" },
    { icon: Zap, text: "No-code setup — live in minutes" },
    { icon: Globe, text: "Multi-language support (95+ languages)" },
    { icon: BarChart3, text: "Real-time analytics dashboard" },
    { icon: Link2, text: "CRM & third-party integrations" },
    { icon: Shield, text: "Official WhatsApp Business API" },
];

export function ProductShowcase() {
    return (
        <section className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden bg-[#03030a]/85">
            {/* Background: Grid pattern + floating orbs + accent glow */}
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)" }}>
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                {/* Floating orbs */}
                <div className="bg-orb bg-orb-blue w-[600px] h-[600px] top-1/4 -right-48" />
                <div className="bg-orb bg-orb-violet w-[450px] h-[450px] bottom-0 -left-40" />
                <div className="bg-orb bg-orb-pulse w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                {/* Shimmer line */}
                <div className="shimmer-line bottom-1/4 left-0" style={{ animationDelay: "3s" }} />
                {/* Edge lines */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                                Our Product
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
                            Meet{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                2ndu.ai
                            </span>
                        </h2>

                        <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-10">
                            The smartest way to automate your WhatsApp business communications.
                            Connect your WhatsApp Business account, train the AI with your data,
                            and let it handle customer conversations 24/7 — qualifying leads,
                            answering queries, and closing sales while you sleep.
                        </p>

                        <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10">
                            {features.map((feature) => (
                                <li
                                    key={feature.text}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <feature.icon size={16} className="text-blue-400" />
                                    </div>
                                    <span className="text-white/60 text-sm md:text-base">{feature.text}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://2ndu.ai"
                            className="glass-btn-primary group inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105"
                        >
                            Try 2ndu.ai Free
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    {/* Right: Phone mockup with live metric chip */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Floating metric chip */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="absolute top-4 right-2 md:top-2 md:right-2 lg:-top-4 lg:-right-4 z-10 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl bg-white/[0.08] border border-white/10 backdrop-blur-md shadow-lg"
                        >
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <div className="leading-tight">
                                    <div className="text-xs md:text-sm font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                        10,247
                                    </div>
                                    <div className="text-[9px] md:text-[10px] text-white/45 uppercase tracking-wider">
                                        msgs this week
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Phone frame */}
                        <div className="phone-frame phone-floating w-full max-w-[320px] md:max-w-[360px]">
                            <div className="phone-screen p-4 md:p-5">
                                {/* Status bar */}
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <span className="text-[10px] text-white/50">2ndu.ai · WhatsApp</span>
                                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        Online
                                    </span>
                                </div>

                                {/* Chat */}
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                                            <span className="text-[10px] text-green-400">U</span>
                                        </div>
                                        <div className="bg-white/[0.08] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                                            <p className="text-white/80 text-xs md:text-sm">
                                                Hi, do you have the navy blazer in size M?
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <div className="bg-blue-500/15 border border-blue-500/25 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                                            <p className="text-blue-100 text-xs md:text-sm">
                                                Yes! Navy blazer in M is in stock. Want me to reserve it for you?
                                            </p>
                                            <div className="mt-1.5 flex items-center gap-1 text-[10px] text-blue-300/60">
                                                <Zap size={9} />
                                                <span>Replied in 0.3s</span>
                                            </div>
                                        </div>
                                        <div className="w-7 h-7 rounded-full bg-blue-500/25 flex items-center justify-center flex-shrink-0">
                                            <span className="text-[10px] text-blue-300">AI</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                                            <span className="text-[10px] text-green-400">U</span>
                                        </div>
                                        <div className="bg-white/[0.08] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                                            <p className="text-white/80 text-xs md:text-sm">Yes please!</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <div className="bg-blue-500/15 border border-blue-500/25 rounded-2xl rounded-tr-sm px-3 py-2">
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" />
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: "0.15s" }} />
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" style={{ animationDelay: "0.3s" }} />
                                            </div>
                                        </div>
                                        <div className="w-7 h-7 rounded-full bg-blue-500/25 flex items-center justify-center flex-shrink-0">
                                            <span className="text-[10px] text-blue-300">AI</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
