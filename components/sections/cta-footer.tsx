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
        { label: "About", href: "/about" },
        { label: "Contact", href: "#contact" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
    ],
};

export function CTAFooter() {
    return (
        <section id="contact" className="relative z-10 bg-[#030308] overflow-hidden">
            {/* CTA Area */}
            <div className="relative py-24 px-6">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/6 rounded-full blur-[100px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                        Ready to Transform Your{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Business
                        </span>
                        ?
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        Join businesses already automating their operations with AI. Start your digital transformation today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="glow-border-btn glow-border-btn-primary" style={{ "--glow-color": "#3b82f6" } as React.CSSProperties}>
                            <a
                                href="https://2ndu.ai"
                                className="glow-border-btn-inner group flex items-center gap-2 px-8 py-4 text-white font-bold text-lg hover:scale-105 transition-transform"
                            >
                                Start Automating
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        <a
                            href="#services"
                            className="px-8 py-4 rounded-full glass-btn text-white font-medium text-lg"
                        >
                            Explore Services
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Divider */}
            <div className="section-divider mx-6" />

            {/* Footer Area */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Logo size={32} />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                Creatiq AI
                            </span>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            AI-powered solutions for business digitalization. Custom websites, intelligent systems, and WhatsApp chatbot automation.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-white/40 hover:text-white/80 text-sm transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/40 hover:text-white/80 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/40 hover:text-white/80 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-sm">
                        &copy; {new Date().getFullYear()} Creatiq AI. All rights reserved.
                    </p>
                    <p className="text-white/30 text-xs">
                        Powered by AI. Built for businesses.
                    </p>
                </div>
            </div>
        </section>
    );
}
