import React from "react";
import Image from "next/image";

export const Logo = ({ className = "", size = 32 }: { className?: string; size?: number }) => {
    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            <Image
                src="/logo.png"
                alt="Creatiq AI Logo"
                fill
                className="object-contain" // Ensures the logo scales correctly without distortion
                priority
            />
        </div>
    );
};
