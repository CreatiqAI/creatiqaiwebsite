"use client";

import { useMemo } from "react";

type Sparkle = {
    left: string;
    top: string;
    size: number;
    delay: number;
    duration: number;
    opacity: number;
};

/**
 * Decorative drifting sparkles, CSS-only animation (no per-frame JS).
 * Use sparingly inside a relative-positioned container.
 */
export function FloatingSparkles({ count = 18, color = "rgba(96, 165, 250, 0.5)" }: { count?: number; color?: string }) {
    const sparkles = useMemo<Sparkle[]>(() => {
        // Deterministic positions so SSR + client match (no Math.random reseed)
        return Array.from({ length: count }, (_, i) => {
            const seed = i * 7919; // arbitrary prime
            const pseudo = (n: number, mod: number) => ((seed * (n + 1)) % mod) / mod;
            return {
                left: `${(pseudo(1, 100)) * 100}%`,
                top: `${(pseudo(2, 100)) * 100}%`,
                size: 1 + pseudo(3, 4) * 2.5,
                delay: pseudo(4, 8) * 8,
                duration: 6 + pseudo(5, 6) * 6,
                opacity: 0.3 + pseudo(6, 5) * 0.6,
            };
        });
    }, [count]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {sparkles.map((s, i) => (
                <span
                    key={i}
                    className="absolute rounded-full sparkle-drift"
                    style={{
                        left: s.left,
                        top: s.top,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        background: color,
                        opacity: s.opacity,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                        boxShadow: `0 0 ${s.size * 3}px ${color}`,
                    }}
                />
            ))}
        </div>
    );
}
