"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./admin-sidebar";
import { AuthGuard } from "./auth-guard";

export function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-[#f5f6f8]">
                <AdminSidebar />
                <main className="flex-1 ml-[240px] min-h-screen">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}
