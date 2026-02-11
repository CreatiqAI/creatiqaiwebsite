"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/#faq", label: "FAQ" },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-white/40 hover:text-white transition-colors"
                aria-label="Open menu"
            >
                <Menu size={24} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-72 bg-[#050510]/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                    Creatiq AI
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white/40 hover:text-white transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex-1 p-6">
                                <ul className="space-y-2">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="p-6 border-t border-white/10">
                                <a
                                    href="https://2ndu.ai"
                                    className="block w-full px-6 py-3 rounded-lg glass-btn-primary text-white font-bold text-center"
                                >
                                    Launch 2ndu.ai
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
