import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Creatiq AI | One Click WhatsApp Automation & Sales Chatbot",
    description: "Automate your sales with Creatiq AI. The #1 No-Code WhatsApp Chatbot for lead qualification, instant onboarding, and 24/7 customer support. Start for free.",
    keywords: "AI Chatbot, WhatsApp Automation, WhatsApp Business API, Sales AI, Lead Generation, Malaysia AI, Customer Support Bot, No-Code Chatbot",
    openGraph: {
        title: "Creatiq AI - Automate 60% of Sales on WhatsApp",
        description: "Zero-latency AI agents for WhatsApp, Instagram, and Web. Qualify leads and book appointments while you sleep.",
        type: "website",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "antialiased selection:bg-cyan-500/30 selection:text-cyan-200")}>
                {/* Navigation Bar */}
                <nav className="fixed top-0 w-full z-50 glass-nav">
                    <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">

                        {/* Logo */}
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <Logo size={40} className="group-hover:scale-105 transition-transform duration-300" />
                            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400 tracking-tight">
                                Creatiq AI
                            </span>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://chatty-five-blush.vercel.app/"
                                className="hidden md:inline-flex px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all hover:border-cyan-500/30 hover:text-cyan-400"
                            >
                                Launch App
                            </a>
                        </div>
                    </div>
                </nav>

                {children}
            </body>
        </html>
    );
}
