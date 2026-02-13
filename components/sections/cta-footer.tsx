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
        <section id="contact" className="relative z-10 bg-[#030308]/85 md:h-full flex flex-col overflow-hidden">
            {/* CTA Area */}
            <div className="relative flex-1 flex items-center justify-center px-4 md:px-6 py-16 md:py-0">
                <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(37,99,235,0.1) 0%, transparent 60%), radial-gradient(ellipse 35% 35% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 60%)" }}>
                    {/* Floating orbs */}
                    <div className="bg-orb bg-orb-blue w-[500px] h-[500px] -top-32 -left-40" />
                    <div className="bg-orb bg-orb-violet w-[450px] h-[450px] -bottom-24 -right-32" />
                    <div className="bg-orb bg-orb-pulse w-[350px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    {/* Shimmer line */}
                    <div className="shimmer-line top-1/3 left-0" style={{ animationDelay: "1s" }} />
                    {/* Top edge line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-2xl md:text-5xl font-bold mb-4 text-white">
                        Ready to Transform Your{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Business
                        </span>
                        ?
                    </h2>
                    <p className="text-white/60 text-sm md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                        Start your digital transformation today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="glow-border-btn glow-border-btn-primary" style={{ "--glow-color": "#3b82f6" } as React.CSSProperties}>
                            <a
                                href="https://2ndu.ai"
                                className="glow-border-btn-inner group flex items-center gap-2 px-6 py-3 md:px-8 text-white font-bold text-base md:text-lg hover:scale-105 transition-transform"
                            >
                                Start Automating
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        <a
                            href="#services"
                            className="px-6 py-3 md:px-8 rounded-full glass-btn text-white font-medium text-base md:text-lg"
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
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <Logo size={28} />
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                            Creatiq AI
                        </span>
                    </div>

                    {/* Links in a row */}
                    <div className="flex flex-wrap gap-x-8 md:gap-x-12 gap-y-4">
                        <div>
                            <h4 className="text-white text-sm font-semibold mb-2">Services</h4>
                            <ul className="space-y-1.5">
                                {footerLinks.services.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-white/40 hover:text-white/80 text-xs transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-sm font-semibold mb-2">Resources</h4>
                            <ul className="space-y-1.5">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-white/40 hover:text-white/80 text-xs transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-sm font-semibold mb-2">Company</h4>
                            <ul className="space-y-1.5">
                                {footerLinks.company.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-white/40 hover:text-white/80 text-xs transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2">
                    <p className="text-white/30 text-xs">
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
