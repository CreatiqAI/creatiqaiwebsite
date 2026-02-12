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
                resolution={0.25}
                BFECC={false}
                iterationsPoisson={16}
                iterationsViscous={16}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.0}
                mouseForce={15}
                cursorSize={80}
                autoResumeDelay={800}
                autoRampDuration={0.5}
            />
        </div>
    );
}
