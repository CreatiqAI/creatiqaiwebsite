"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "What services does Creatiq AI provide?",
        answer: "We offer three core services: custom website development, AI system integration and customization, and our flagship product 2ndu.ai — a no-code WhatsApp chatbot platform. Whether you need a stunning website, intelligent automation, or AI-powered customer communication, we've got you covered.",
    },
    {
        question: "What is 2ndu.ai and how does it work?",
        answer: "2ndu.ai is our chatbot platform that lets you connect your WhatsApp Business account to an AI chatbot in minutes. Sign up, connect your WhatsApp number, train the AI on your business data, and launch. The AI then handles customer conversations 24/7.",
    },
    {
        question: "Do I need coding skills to use your services?",
        answer: "Not at all. 2ndu.ai is completely no-code — if you can send an email, you can set up a chatbot. For custom websites and AI integrations, our team handles all the technical work and walks you through the setup.",
    },
    {
        question: "How long does a typical project take?",
        answer: "2ndu.ai is live in under 10 minutes. Custom websites typically take 2–4 weeks depending on scope. AI system integrations usually run 1–3 weeks for standard implementations and 4–8 weeks for complex builds.",
    },
    {
        question: "Can you work with my existing tools?",
        answer: "Yes. We integrate with most popular tools — WhatsApp Business, Stripe, Shopify, Slack, Google Workspace, HubSpot, Notion, and 30+ others. If you have a custom stack, we'll build the integration as part of the project scope.",
    },
    {
        question: "What's included in your support?",
        answer: "Starter packages include 30 days of post-launch support; Business includes 90 days; Custom includes ongoing priority SLA support. Support covers bug fixes, small content updates, and general guidance. Major feature additions are quoted separately.",
    },
    {
        question: "Do you offer revisions during a project?",
        answer: "Yes. Every project includes two rounds of revisions at key milestones — design and pre-launch. Additional revisions are available at our standard hourly rate. We'd rather iterate early than ship something you're not happy with.",
    },
    {
        question: "What happens if I need help after the support period ends?",
        answer: "You can move onto a monthly retainer for continued maintenance, or pay per-incident for one-off requests. Many of our clients choose the retainer once their business depends on the system.",
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
                className="w-full p-4 md:p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 transition-colors text-left"
            >
                <div className="flex justify-between items-center gap-4">
                    <span className="font-semibold text-sm md:text-base text-white/95">{question}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                    >
                        <ChevronDown size={18} className="text-blue-400" />
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
                            <p className="mt-3 text-white/50 leading-relaxed text-sm">{answer}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </motion.div>
    );
}

export function FAQSection() {
    return (
        <section id="faq" className="relative z-10 py-20 md:py-28 px-4 md:px-6 md:flex items-center md:min-h-screen overflow-hidden bg-[#03030a]/85">
            {/* Background: Centered radial glow + floating orbs + rings */}
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 60%)" }}>
                {/* Concentric rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/[0.04]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.03]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.02]" />
                {/* Floating orbs */}
                <div className="bg-orb bg-orb-violet w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orb-pulse" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 60%)" }} />
                <div className="bg-orb bg-orb-blue w-[350px] h-[350px] -top-16 -right-24" />
                <div className="bg-orb bg-orb-violet w-[300px] h-[300px] -bottom-16 -left-20" />
                {/* Shimmer line */}
                <div className="shimmer-line top-2/3 left-0" style={{ animationDelay: "4s" }} />
                {/* Edge lines */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
            </div>
            <div className="max-w-3xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 md:mb-12 text-center"
                >
                    <h2 className="text-2xl md:text-5xl font-bold mb-4 text-white">
                        Frequently Asked{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Questions
                        </span>
                    </h2>
                    <p className="text-white/50 text-sm md:text-lg">
                        Everything you need to know about our services.
                    </p>
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
