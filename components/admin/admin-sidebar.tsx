"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { createBrowserSupabase } from "@/lib/supabase";
import {
    LayoutDashboard,
    BarChart3,
    FileText,
    FilePlus,
    ExternalLink,
    LogOut,
} from "lucide-react";

const supabase = createBrowserSupabase();

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/posts", label: "Blog Posts", icon: FileText },
    { href: "/admin/posts/new", label: "New Post", icon: FilePlus },
];

export function AdminSidebar() {
    const pathname = usePathname();

    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.href = "/admin/login";
    }

    return (
        <aside className="fixed left-0 top-0 h-screen w-[240px] bg-white border-r border-gray-200 flex flex-col z-50">
            {/* Logo */}
            <div className="px-5 py-4 border-b border-gray-100">
                <Link href="/admin" className="flex items-center gap-2.5">
                    <Logo size={28} className="shrink-0" />
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 leading-tight">Creatiq AI</p>
                        <p className="text-[10px] text-gray-400 leading-tight">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname === item.href || pathname.startsWith(item.href + "/");
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                        >
                            <Icon size={17} strokeWidth={isActive ? 2 : 1.5} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom actions */}
            <div className="px-3 py-3 border-t border-gray-100 space-y-0.5">
                <a
                    href="https://analytics.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <BarChart3 size={17} strokeWidth={1.5} />
                    Google Analytics
                    <ExternalLink size={11} className="ml-auto" />
                </a>
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <ExternalLink size={17} strokeWidth={1.5} />
                    View Site
                </a>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={17} strokeWidth={1.5} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
