"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const events = [
    { type: "deploy", text: "New website launched in Kuala Lumpur", color: "text-blue-300" },
    { type: "chat", text: "2ndu.ai handled 1,247 chats in the last hour", color: "text-emerald-300" },
    { type: "metric", text: "Average reply time: 0.3 seconds", color: "text-violet-300" },
    { type: "deploy", text: "WhatsApp bot deployed for fashion brand", color: "text-blue-300" },
    { type: "chat", text: "AI closed 23 sales while you read this", color: "text-emerald-300" },
    { type: "metric", text: "+40% efficiency vs manual process", color: "text-violet-300" },
];

export function LiveTicker() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % events.length);
        }, 3000);
        return () => clearInterval(id);
    }, []);

    const event = events[index];

    return (
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-wider">Live</span>
            <span className="text-white/30">·</span>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={`text-xs md:text-sm font-medium ${event.color}`}
                >
                    {event.text}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
