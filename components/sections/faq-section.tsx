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
        answer: "2ndu.ai is our chatbot platform that lets you connect your WhatsApp Business account to an AI chatbot in minutes. Simply sign up, connect your WhatsApp number, train the AI with your business data (PDFs, website links, scripts), and launch. The AI handles customer conversations 24/7 — qualifying leads, answering FAQs, and more.",
    },
    {
        question: "Do I need coding skills to use your services?",
        answer: "Not at all. 2ndu.ai is completely no-code — if you can send an email, you can set up a chatbot. For custom websites and AI system integrations, our team handles all the technical work. You just tell us what you need.",
    },
    {
        question: "Is the WhatsApp Business API official?",
        answer: "Yes, we partner with Meta Business Solution Providers (BSPs) to offer seamless access to the official WhatsApp Business API. This ensures your business communications are compliant, secure, and reliable.",
    },
    {
        question: "Can the chatbot speak multiple languages?",
        answer: "Absolutely. Our AI chatbots are multilingual and can fluently converse in over 95 languages, including English, Bahasa Melayu, Chinese (Mandarin), Tamil, Hindi, Arabic, and many more.",
    },
    {
        question: "How long does it take to set up?",
        answer: "For 2ndu.ai, you can be up and running in under 10 minutes. Custom website projects typically take 2-4 weeks depending on complexity. AI system integrations vary based on scope but usually 1-3 weeks for standard implementations.",
    },
    {
        question: "Do you offer support after deployment?",
        answer: "Yes. All our services include ongoing support and maintenance. We monitor your AI systems, provide updates, and continuously optimize performance based on real usage data.",
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
                className="w-full p-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 transition-colors text-left"
            >
                <div className="flex justify-between items-center gap-4">
                    <span className="font-semibold text-lg text-white/95">{question}</span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                    >
                        <ChevronDown size={20} className="text-blue-400" />
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
                            <p className="mt-4 text-white/60 leading-relaxed">{answer}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </motion.div>
    );
}

export function FAQSection() {
    return (
        <section id="faq" className="relative z-10 py-32 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Frequently Asked{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Questions
                        </span>
                    </h2>
                    <p className="text-white/60 text-lg">
                        Everything you need to know about our services and platform.
                    </p>
                </motion.div>

                <div className="space-y-4">
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
