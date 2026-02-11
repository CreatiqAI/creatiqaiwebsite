"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function TrackPageView({ postSlug }: { postSlug?: string }) {
    const pathname = usePathname();

    useEffect(() => {
        // Don't track admin pages
        if (pathname.startsWith("/admin")) return;

        const track = async () => {
            try {
                await fetch("/api/analytics/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        path: pathname,
                        post_slug: postSlug || undefined,
                        referrer: document.referrer || undefined,
                    }),
                });
            } catch {
                // Silent fail
            }
        };

        track();
    }, [pathname, postSlug]);

    return null;
}
