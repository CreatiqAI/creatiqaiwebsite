"use client";

import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const AnimatedLine = ({ className = "", delay = 0 }: { className?: string, delay?: number }) => (
    <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay, ease: "easeInOut" }}
        viewport={{ once: true }}
        className={`origin-left ${className}`}
    />
);
