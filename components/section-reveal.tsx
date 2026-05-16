"use client";

import { motion } from "motion/react";

/**
 * Wraps a section with a one-shot entrance reveal.
 *
 * Uses framer-motion's whileInView (IntersectionObserver under the hood)
 * which fires once per section. Cheap compared to scroll-driven transforms
 * — no per-frame recalculations, no Lenis interference.
 */
export function SectionReveal({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            {children}
        </motion.div>
    );
}
