"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const incrementTime = (duration / end) * 0.8; // slightly faster than linear

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= end) clearInterval(timer);
            }, Math.max(incrementTime, 10)); // Cap speed

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
};
