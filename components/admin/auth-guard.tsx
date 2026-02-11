"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase";

const supabase = createBrowserSupabase();

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function checkSession() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsAuth(true);
            } else {
                router.replace("/admin/login");
            }
            setLoading(false);
        }
        checkSession();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center">
                <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuth) return null;
    return <>{children}</>;
}
