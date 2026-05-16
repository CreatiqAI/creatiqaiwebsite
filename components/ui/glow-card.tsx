"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function GlowCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className={`relative overflow-hidden rounded-2xl ${className}`}
        >
            {/* Animated border glow */}
            <div
                className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 242, 255, 0.15), transparent 50%)`,
                }}
            />
            <div className="absolute inset-0 rounded-2xl border border-white/5 transition-colors duration-500 pointer-events-none"
                style={{
                    borderColor: isHovered ? "rgba(0, 242, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
                }}
            />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
