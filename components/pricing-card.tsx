"use client";

import { motion } from "framer-motion";

export const PricingCard = ({ title, price, features, recommended = false, cta, isMY }: any) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`relative p-8 rounded-3xl border ${recommended ? 'border-cyan-500 bg-cyan-950/20' : 'border-white/10 bg-white/5'} flex flex-col`}
        >
            {recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-sm font-bold rounded-full uppercase tracking-wide">
                    Most Popular
                </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="mb-6">
                <span className="text-4xl font-bold text-white">{price}</span>
                <span className="text-white/40">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">✓</div>
                        {feature}
                    </li>
                ))}
            </ul>
            <a href="https://chatty-five-blush.vercel.app/" className={`w-full py-4 rounded-xl font-bold text-center transition-all ${recommended ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,242,255,0.3)]' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                {cta}
            </a>
        </motion.div>
    );
};
