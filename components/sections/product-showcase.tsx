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
        <section className="relative z-10 py-32 px-6">
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
                            {features.map((feature, i) => (
                                <motion.li
                                    key={feature.text}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <feature.icon size={16} className="text-blue-400" />
                                    </div>
                                    <span className="text-white/60">{feature.text}</span>
                                </motion.li>
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
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs text-green-400">U</span>
                                    </div>
                                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                                        <p className="text-white/80 text-sm">Hi, I&apos;m interested in your services. What packages do you offer?</p>
                                    </div>
                                </motion.div>

                                {/* AI response */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 }}
                                    className="flex gap-3 justify-end"
                                >
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
                                </motion.div>

                                {/* Another incoming */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1.1 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs text-green-400">U</span>
                                    </div>
                                    <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                                        <p className="text-white/80 text-sm">I run an e-commerce store selling fashion items.</p>
                                    </div>
                                </motion.div>

                                {/* AI typing indicator */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1.4 }}
                                    className="flex gap-3 justify-end"
                                >
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
                                </motion.div>
                            </div>

                            {/* Background glow */}
                            <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl blur-xl -z-10" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
