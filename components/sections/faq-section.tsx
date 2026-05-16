"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What do you actually build?",
        answer: "Websites, AI automations, and 2ndu.ai — our no-code WhatsApp chatbot.",
    },
    {
        question: "How fast can you ship?",
        answer: "2ndu.ai in under 10 minutes. Websites in 2–4 weeks. AI builds in 1–8 weeks depending on scope.",
    },
    {
        question: "Do I need to know code?",
        answer: "No. 2ndu.ai is no-code. For everything else, we handle it.",
    },
    {
        question: "Can you connect to my tools?",
        answer: "Yes — WhatsApp, Stripe, Shopify, Slack, HubSpot, Notion +30 more. Custom stack? We'll build it.",
    },
    {
        question: "What's included in support?",
        answer: "30, 90, or unlimited days depending on tier. Bug fixes + small updates always covered.",
    },
    {
        question: "Do you do revisions?",
        answer: "Two rounds included at design and pre-launch. More at standard hourly rate.",
    },
    {
        question: "What if I need help after?",
        answer: "Monthly retainer or per-incident. Most clients stay on retainer.",
    },
    {
        question: "How does pricing work?",
        answer: "Three tiers from RM 1,500. Free 30-min audit before you commit to anything.",
    },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 md:p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all text-left"
            >
                <div className="flex justify-between items-center gap-4">
                    <span className="font-semibold text-sm md:text-base text-slate-900">{question}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                    >
                        <ChevronDown size={18} className="text-blue-600" />
                    </motion.div>
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <p className="mt-3 text-slate-600 leading-relaxed text-sm">{answer}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </motion.div>
    );
}

export function FAQSection() {
    return (
        <section id="faq" className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:flex items-center md:min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-slate-200" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-slate-200/70" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-slate-200/50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25), transparent 60%)" }} />
                <div className="absolute -top-16 -right-24 w-[350px] h-[350px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.2), transparent 70%)" }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
            </div>
            <div className="max-w-3xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 md:mb-14 text-center"
                >
                    <span className="inline-block text-xs md:text-sm font-bold text-violet-600 uppercase tracking-[0.2em] mb-4">
                        FAQ
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.05]">
                        Questions?{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] animate-[gradient-x_5s_ease-in-out_infinite]">
                            Answers.
                        </span>
                    </h2>
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Export FAQs for JSON-LD schema
export const faqData = faqs;
