"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextScramble } from "./text-scramble";

export const HeroContent = ({ isMY }: { isMY: boolean }) => {
    return (
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-sm font-medium text-cyan-200">
                    {isMY ? "Optimized for Malaysia 🇲🇾" : "Global Edge Mesh Online 🌐"}
                </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                One Stop <br />
                <span className="text-cyan-400">
                    <TextScramble text="AI Solution." className="text-cyan-400" />
                </span>
            </h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 1.0 }}
                className="text-lg md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
                Revolutionizing digital marketing with intelligent chatbots. Connect your WhatsApp Business API in <strong className="text-white">one click</strong> and automate 60% of your sales process 24/7.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <a
                    href="https://chatty-five-blush.vercel.app/"
                    className="group relative px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_40px_-10px_rgba(0,242,255,0.4)]"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Start Scaling Now
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </a>

                <a href="#demo" className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-lg transition-all">
                    View Demo
                </a>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
                className="mt-12 flex items-center justify-center gap-8 text-white/30 text-sm font-medium"
            >
                <span>TRUSTED BY 100+ BRANDS</span>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span>OFFICIAL WHATSAPP API</span>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span>META PARTNER</span>
            </motion.div>
        </div>
    );
};
