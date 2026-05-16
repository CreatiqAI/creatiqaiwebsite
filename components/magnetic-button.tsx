"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, MouseEvent, ReactNode } from "react";

/**
 * Wraps a child button/link with a magnetic-cursor effect: as the cursor
 * approaches, the element drifts toward it, with a spring-y return when
 * the cursor leaves. Subtle (8px max pull) but adds tactile premium feel.
 */
export function MagneticButton({
    children,
    className = "",
    strength = 0.25,
}: {
    children: ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

    function onMove(e: MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
    }

    function onLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ x: springX, y: springY }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
}
