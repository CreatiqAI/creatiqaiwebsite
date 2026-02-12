"use client";

import dynamic from "next/dynamic";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), {
    ssr: false,
});

export function LiquidEtherBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <LiquidEther
                colors={["#2563eb", "#7c3aed", "#3b82f6"]}
                resolution={0.35}
                autoDemo={true}
                autoSpeed={0.4}
                autoIntensity={1.8}
                mouseForce={15}
                cursorSize={80}
                autoResumeDelay={800}
                autoRampDuration={0.5}
            />
        </div>
    );
}
