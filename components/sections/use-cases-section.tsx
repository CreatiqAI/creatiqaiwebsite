"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Building2, Stethoscope, GraduationCap, UtensilsCrossed, Briefcase } from "lucide-react";
import dynamic from "next/dynamic";

const CardSwap = dynamic(() => import("@/components/CardSwap").then(mod => mod.default), { ssr: false });
const Card = dynamic(() => import("@/components/CardSwap").then(mod => ({ default: mod.Card })), { ssr: false });

const useCases = [
    {
        icon: ShoppingCart,
        title: "E-Commerce",
        description: "Automate customer support, product recommendations, and order tracking. Reduce response time by 80%.",
        color: "#2563eb",
    },
    {
        icon: Building2,
        title: "Real Estate",
        description: "Qualify leads instantly, schedule viewings, and provide property details 24/7 through WhatsApp.",
        color: "#7c3aed",
    },
    {
        icon: Stethoscope,
        title: "Healthcare",
        description: "Streamline appointment booking, patient follow-ups, and FAQ handling with AI assistants.",
        color: "#0891b2",
    },
    {
        icon: GraduationCap,
        title: "Education",
        description: "Engage students with automated enrollment queries, course information, and campus support.",
        color: "#059669",
    },
    {
        icon: UtensilsCrossed,
        title: "F&B / Restaurants",
        description: "Handle reservations, menu inquiries, and delivery orders through automated WhatsApp conversations.",
        color: "#d97706",
    },
    {
        icon: Briefcase,
        title: "Professional Services",
        description: "Automate client onboarding, consultation scheduling, and document collection workflows.",
        color: "#dc2626",
    },
];

export function UseCasesSection() {
    return (
        <section id="industries" className="relative z-10 py-32 px-6 bg-[#03030a]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left side: Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                            Built for{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                Every Industry
                            </span>
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed">
                            No matter your industry, our AI solutions adapt to your unique business needs and workflows.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {useCases.map((uc) => (
                                <div key={uc.title} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${uc.color}15` }}>
                                        <uc.icon size={18} style={{ color: uc.color }} />
                                    </div>
                                    <span className="text-sm text-white/70 font-medium">{uc.title}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right side: CardSwap */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[500px] hidden lg:block"
                    >
                        <CardSwap
                            width={380}
                            height={280}
                            cardDistance={50}
                            verticalDistance={55}
                            delay={4000}
                            pauseOnHover={true}
                            easing="elastic"
                        >
                            {useCases.map((uc) => (
                                <Card key={uc.title} className="!bg-[#0a0a1a] !border-white/10 p-8 flex flex-col justify-between">
                                    <div>
                                        <div
                                            className="inline-flex p-3 rounded-xl mb-4"
                                            style={{ backgroundColor: `${uc.color}15` }}
                                        >
                                            <uc.icon size={28} style={{ color: uc.color }} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{uc.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">{uc.description}</p>
                                    </div>
                                </Card>
                            ))}
                        </CardSwap>
                    </motion.div>
                </div>

                {/* Mobile: Simple grid fallback */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 lg:hidden">
                    {useCases.map((uc, i) => (
                        <motion.div
                            key={uc.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10"
                        >
                            <div className="inline-flex p-3 rounded-xl mb-4" style={{ backgroundColor: `${uc.color}15` }}>
                                <uc.icon size={24} style={{ color: uc.color }} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{uc.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">{uc.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
