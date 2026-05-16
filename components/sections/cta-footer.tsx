"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

const footerLinks = {
    services: [
        { label: "Website Customization", href: "#services" },
        { label: "AI System Integration", href: "#services" },
        { label: "2ndu.ai Platform", href: "https://2ndu.ai" },
    ],
    resources: [
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "#faq" },
    ],
    company: [
        { label: "Contact", href: "#contact" },
        { label: "Privacy Policy", href: "#" },
    ],
};

export function CTAFooter() {
    return (
        <section id="contact" className="relative z-10 flex flex-col overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
            {/* CTA Area */}
            <div className="relative flex-1 flex items-center justify-center px-4 md:px-6 py-20 md:py-28">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-32 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%)" }} />
                    <div className="absolute -bottom-24 -right-32 w-[450px] h-[450px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18), transparent 60%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-slate-900 tracking-tight leading-[1.05]">
                        Let&apos;s build{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-[length:200%_auto] animate-[gradient-x_4s_ease-in-out_infinite]">
                            something real.
                        </span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-xl mb-6 md:mb-10 max-w-xl mx-auto">
                        30-minute audit. No commitment. We&apos;ll show you exactly what&apos;s possible.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://2ndu.ai"
                            className="glass-btn-primary group inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform"
                        >
                            Start Automating
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#services"
                            className="glass-btn px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg"
                        >
                            Explore Services
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Divider */}
            <div className="section-divider mx-6" />

            {/* Compact Footer */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6">
                    <div className="flex items-center gap-3">
                        <Logo size={28} />
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Creatiq AI
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-x-8 md:gap-x-12 gap-y-4">
                        <div>
                            <h4 className="text-slate-900 text-sm font-semibold mb-2">Services</h4>
                            <ul className="space-y-1.5">
                                {footerLinks.services.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-slate-500 hover:text-slate-900 text-xs transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-slate-900 text-sm font-semibold mb-2">Resources</h4>
                            <ul className="space-y-1.5">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-slate-500 hover:text-slate-900 text-xs transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-slate-900 text-sm font-semibold mb-2">Company</h4>
                            <ul className="space-y-1.5">
                                {footerLinks.company.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-slate-500 hover:text-slate-900 text-xs transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-2">
                    <p className="text-slate-500 text-xs">
                        &copy; {new Date().getFullYear()} Creatiq AI. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-xs">
                        Powered by AI. Built for businesses.
                    </p>
                </div>
            </div>
        </section>
    );
}
