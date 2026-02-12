"use client";

import dynamic from "next/dynamic";

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), {
    ssr: false,
});

export function LiquidEtherBackground() {
    return (
        <div className="fixed inset-0 z-[1]" style={{ pointerEvents: "none" }}>
            <LiquidEther
                colors={["#2563eb", "#7c3aed", "#3b82f6"]}
                resolution={0.5}
                autoDemo={true}
                autoSpeed={0.6}
                autoIntensity={2.5}
                mouseForce={20}
                cursorSize={100}
                autoResumeDelay={600}
                autoRampDuration={0.4}
            />
        </div>
    );
}
