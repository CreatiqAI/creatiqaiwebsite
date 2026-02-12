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
        <section className="relative z-10 py-12 px-6 h-full flex items-center overflow-hidden bg-[#03030a]">
            {/* Background: Grid pattern + accent glow (no blur) */}
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)" }}>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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

                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                            Meet{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                2ndu.ai
                            </span>
                        </h2>

                        <p className="text-white/60 text-lg leading-relaxed mb-10">
                            The smartest way to automate your WhatsApp business communications.
                            Connect your WhatsApp Business account, train the AI with your data,
                            and let it handle customer conversations 24/7 — qualifying leads,
                            answering queries, and closing sales while you sleep.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {features.map((feature) => (
                                <li
                                    key={feature.text}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <feature.icon size={16} className="text-blue-400" />
                                    </div>
                                    <span className="text-white/60">{feature.text}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href="https://2ndu.ai"
                            className="glass-btn-primary group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105"
                        >
                            Try 2ndu.ai Free
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    {/* Right: Visual mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl p-8 md:p-12 bg-white/5 border border-white/10 shadow-lg">
                            {/* Chat simulation */}
                            <div className="space-y-4">
                                {/* Incoming message */}
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs text-green-400">U</span>
                                    </div>
                                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                                        <p className="text-white/80 text-sm">Hi, I&apos;m interested in your services. What packages do you offer?</p>
                                    </div>
                                </div>

                                {/* AI response */}
                                <div className="flex gap-3 justify-end">
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                                        <p className="text-blue-200 text-sm">
                                            Hello! Thanks for reaching out. We offer customized AI solutions for your business. Let me help you find the perfect fit. What industry are you in?
                                        </p>
                                        <div className="mt-2 flex items-center gap-1 text-xs text-blue-400/60">
                                            <Zap size={10} />
                                            <span>2ndu.ai — Responded in 0.3s</span>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs text-blue-400">AI</span>
                                    </div>
                                </div>

                                {/* Another incoming */}
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs text-green-400">U</span>
                                    </div>
                                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                                        <p className="text-white/80 text-sm">I run an e-commerce store selling fashion items.</p>
                                    </div>
                                </div>

                                {/* AI typing indicator */}
                                <div className="flex gap-3 justify-end">
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl rounded-tr-sm px-4 py-3">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 rounded-full bg-blue-400/50 animate-pulse" />
                                            <span className="w-2 h-2 rounded-full bg-blue-400/50 animate-pulse" style={{ animationDelay: "0.15s" }} />
                                            <span className="w-2 h-2 rounded-full bg-blue-400/50 animate-pulse" style={{ animationDelay: "0.3s" }} />
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs text-blue-400">AI</span>
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
