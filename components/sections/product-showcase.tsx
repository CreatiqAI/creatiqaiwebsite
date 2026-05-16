"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Zap, Globe, BarChart3, Link2, Shield } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/animated-counter";

const features = [
    { icon: MessageCircle, label: "WhatsApp" },
    { icon: Zap, label: "No-code" },
    { icon: Globe, label: "95+ Languages" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Link2, label: "Integrations" },
    { icon: Shield, label: "Official API" },
];

type ChatMessage = {
    from: "user" | "ai";
    text: string;
    meta?: string;
};

const conversation: ChatMessage[] = [
    { from: "user", text: "Hi! Do you have the navy blazer in size M?" },
    { from: "ai", text: "Yes! Navy blazer in M is in stock. Want me to reserve it?", meta: "Replied in 0.3s" },
    { from: "user", text: "Yes please!" },
    { from: "ai", text: "Reserved ✓ I'll send a payment link now.", meta: "Replied in 0.2s" },
    { from: "user", text: "Got it. How long do I have to pay?" },
    { from: "ai", text: "24 hours. I'll remind you 2 hrs before it expires.", meta: "Replied in 0.3s" },
];

function useChatLoop() {
    const [visibleCount, setVisibleCount] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (visibleCount >= conversation.length) {
            const reset = setTimeout(() => setVisibleCount(0), 3500);
            return () => clearTimeout(reset);
        }

        const next = conversation[visibleCount];
        const showTyping = next.from === "ai";

        if (showTyping) {
            setIsTyping(true);
            const typingDelay = setTimeout(() => {
                setIsTyping(false);
                setVisibleCount((c) => c + 1);
            }, 1100);
            return () => clearTimeout(typingDelay);
        } else {
            const userDelay = setTimeout(() => {
                setVisibleCount((c) => c + 1);
            }, 900);
            return () => clearTimeout(userDelay);
        }
    }, [visibleCount]);

    return { messages: conversation.slice(0, visibleCount), isTyping };
}

const ChatBubble = forwardRef<HTMLDivElement, { message: ChatMessage }>(function ChatBubble({ message }, ref) {
    const isAi = message.from === "ai";
    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`flex gap-2 ${isAi ? "justify-end" : ""}`}
        >
            {!isAi && (
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-semibold text-emerald-700">U</span>
                </div>
            )}
            <div
                className={`max-w-[80%] px-3 py-2 ${
                    isAi
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl rounded-tr-sm shadow-sm"
                        : "bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm"
                }`}
            >
                <p className={`text-xs md:text-sm ${isAi ? "text-white" : "text-slate-800"}`}>
                    {message.text}
                </p>
                {message.meta && (
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-blue-100/90">
                        <Zap size={9} />
                        <span>{message.meta}</span>
                    </div>
                )}
            </div>
            {isAi && (
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-semibold text-blue-700">AI</span>
                </div>
            )}
        </motion.div>
    );
});

const TypingIndicator = forwardRef<HTMLDivElement>(function TypingIndicator(_, ref) {
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-2 justify-end"
        >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl rounded-tr-sm px-3 py-2 shadow-sm">
                <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: "0.15s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: "0.3s" }} />
                </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-semibold text-blue-700">AI</span>
            </div>
        </motion.div>
    );
});

export function ProductShowcase() {
    const { messages, isTyping } = useChatLoop();

    return (
        <section className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:min-h-screen md:flex items-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(15,23,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)" }} />
                <div className="absolute bottom-0 -left-32 w-[450px] h-[450px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
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
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                            </span>
                            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                                Live now
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-slate-900 leading-[1.05] tracking-tight">
                            Sell on{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] animate-[gradient-x_4s_ease-in-out_infinite]">
                                WhatsApp.
                            </span>
                            <br />
                            On autopilot.
                        </h2>

                        <p className="text-slate-600 text-base md:text-xl leading-relaxed mb-6 md:mb-8 max-w-lg">
                            <span className="text-slate-900 font-semibold">2ndu.ai</span> plugs into your WhatsApp Business and closes deals while you sleep.
                        </p>

                        <div className="flex flex-wrap gap-2 md:gap-2.5 mb-8 md:mb-10">
                            {features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="group inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-default"
                                >
                                    <feature.icon size={14} className="text-blue-600 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs md:text-sm text-slate-700 font-medium">{feature.label}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href="https://2ndu.ai"
                            className="glass-btn-primary group inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all duration-300 hover:scale-105"
                        >
                            Try 2ndu.ai free
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    {/* Right: Phone mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Floating live metric chip */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="absolute top-4 right-2 md:top-2 md:right-2 lg:-top-4 lg:-right-4 z-10 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl bg-white border border-slate-200 shadow-lg"
                        >
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <div className="leading-tight">
                                    <div className="text-xs md:text-sm font-bold tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                        <AnimatedCounter value={10247} />
                                    </div>
                                    <div className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wider">
                                        msgs this week
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Phone frame — light */}
                        <div className="phone-frame-light phone-floating w-full max-w-[320px] md:max-w-[360px]">
                            <div className="phone-screen-light p-4 md:p-5">
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <span className="text-[10px] text-slate-500 font-medium">2ndu.ai · WhatsApp</span>
                                    <span className="text-[10px] text-emerald-600 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        Online
                                    </span>
                                </div>

                                <div className="space-y-3 min-h-[280px] md:min-h-[320px]">
                                    <AnimatePresence mode="popLayout">
                                        {messages.map((m, i) => (
                                            <ChatBubble key={`${i}-${m.text}`} message={m} />
                                        ))}
                                        {isTyping && <TypingIndicator key="typing" />}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
