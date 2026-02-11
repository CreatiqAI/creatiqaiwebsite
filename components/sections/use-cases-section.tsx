"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Building2, Stethoscope, GraduationCap, UtensilsCrossed, Briefcase } from "lucide-react";
import ElectricBorder from "@/components/ElectricBorder";
import "@/components/ElectricBorder.css";

const useCases = [
    {
        icon: ShoppingCart,
        title: "E-Commerce",
        description: "Automate customer support, product recommendations, and order tracking. Reduce response time by 80%.",
    },
    {
        icon: Building2,
        title: "Real Estate",
        description: "Qualify leads instantly, schedule viewings, and provide property details 24/7 through WhatsApp.",
    },
    {
        icon: Stethoscope,
        title: "Healthcare",
        description: "Streamline appointment booking, patient follow-ups, and FAQ handling with HIPAA-aware AI assistants.",
    },
    {
        icon: GraduationCap,
        title: "Education",
        description: "Engage students with automated enrollment queries, course information, and campus support.",
    },
    {
        icon: UtensilsCrossed,
        title: "F&B / Restaurants",
        description: "Handle reservations, menu inquiries, and delivery orders through automated WhatsApp conversations.",
    },
    {
        icon: Briefcase,
        title: "Professional Services",
        description: "Automate client onboarding, consultation scheduling, and document collection workflows.",
    },
];

export function UseCasesSection() {
    return (
        <section className="relative z-10 py-32 px-6 bg-[#03030a]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Built for{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Every Industry
                        </span>
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                        No matter your industry, our AI solutions adapt to your unique business needs and workflows.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {useCases.map((useCase, i) => (
                        <motion.div
                            key={useCase.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <ElectricBorder color="#2563eb" speed={0.8} chaos={0.06} borderRadius={16}>
                                <div className="p-6 h-full bg-white/5 border border-white/10 rounded-2xl">
                                    <div className="inline-flex p-3 rounded-xl bg-blue-500/10 text-blue-400 mb-4">
                                        <useCase.icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white/95 mb-2">{useCase.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{useCase.description}</p>
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
