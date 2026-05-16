"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), {
    ssr: false,
});

export function LiquidEtherBackground() {
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Only render WebGL when we're near the hero viewport — once user
    // scrolls past, unmount it to free GPU/CPU. Re-mount when scrolled
    // back up.
    useEffect(() => {
        if (isMobile) return;

        function onScroll() {
            // Hide when scrolled more than half the viewport height
            setIsVisible(window.scrollY < window.innerHeight * 0.9);
        }

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div
            className="fixed inset-0 z-[1] transition-opacity duration-500"
            style={{
                pointerEvents: "none",
                opacity: isVisible ? 1 : 0,
            }}
        >
            {isVisible && (
                <LiquidEther
                    colors={["#2563eb", "#7c3aed", "#3b82f6"]}
                    resolution={0.2}
                    BFECC={false}
                    iterationsPoisson={12}
                    iterationsViscous={12}
                    autoDemo={true}
                    autoSpeed={0.4}
                    autoIntensity={1.6}
                    mouseForce={12}
                    cursorSize={70}
                    autoResumeDelay={800}
                    autoRampDuration={0.5}
                />
            )}
        </div>
    );
}
