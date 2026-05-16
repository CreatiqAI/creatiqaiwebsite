"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps a section with a scroll-driven entrance:
 *  - As the section enters the viewport from below, it slides up and fades in.
 *  - As it leaves the viewport at the top, it gently fades and scales down.
 *
 * Driven by useScroll, so the animation tracks scroll position smoothly
 * (cooperates with Lenis) instead of triggering once on intersection.
 */
export function SectionReveal({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.4]);
    const y = useTransform(scrollYProgress, [0, 0.2], [80, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 0.98]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y, scale, willChange: "transform, opacity" }}
        >
            {children}
        </motion.div>
    );
}
