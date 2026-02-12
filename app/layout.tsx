import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/ui/mobile-nav";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Link from "next/link";
import { seoConfig } from "@/lib/seo-config";
import { GoogleAnalytics } from "@/components/google-analytics";
import { TrackPageView } from "@/components/track-view";
import { ConditionalNav } from "@/components/conditional-nav";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
    metadataBase: new URL(seoConfig.siteUrl),
    title: {
        default: seoConfig.defaultTitle,
        template: seoConfig.titleTemplate,
    },
    description: seoConfig.defaultDescription,
    keywords: seoConfig.defaultKeywords,
    openGraph: {
        ...seoConfig.openGraph,
    },
    twitter: {
        ...seoConfig.twitter,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "Creatiq AI",
                            url: seoConfig.siteUrl,
                            logo: `${seoConfig.siteUrl}/logo.png`,
                            description: seoConfig.defaultDescription,
                            contactPoint: {
                                "@type": "ContactPoint",
                                contactType: "customer service",
                                availableLanguage: ["English", "Malay"],
                            },
                        }),
                    }}
                />
            </head>
            <body className={cn(spaceGrotesk.className, "antialiased selection:bg-blue-500/20 selection:text-blue-200 noise-bg")}>
                <GoogleAnalytics />
                <TrackPageView />

                {/* Site Navigation - hidden on admin pages */}
                <ConditionalNav>
                    <ScrollProgress />
                    <nav className="fixed top-0 w-full z-50">
                        {/* Glass nav layer */}
                        <div className="absolute inset-0 glass-nav" />
                        {/* Gradient accent line at top */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                        {/* Subtle glow behind nav */}
                        <div className="absolute -bottom-4 left-1/4 right-1/4 h-8 bg-blue-500/5 blur-xl rounded-full" />

                        <div className="relative max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                                <Logo size={40} className="group-hover:scale-105 transition-transform duration-300" />
                                <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 tracking-tight">
                                    Creatiq AI
                                </span>
                            </Link>

                            <div className="hidden md:flex items-center gap-1">
                                <a href="/#services" className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">
                                    Services
                                </a>
                                <a href="/#how-it-works" className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">
                                    How It Works
                                </a>
                                <Link href="/about" className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">
                                    About
                                </Link>
                                <Link href="/blog" className="px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">
                                    Blog
                                </Link>
                                <div className="w-px h-5 bg-white/10 mx-2" />
                                <div className="glow-border-btn glow-border-btn-primary" style={{ "--glow-color": "#3b82f6" } as React.CSSProperties}>
                                    <a
                                        href="https://2ndu.ai"
                                        className="glow-border-btn-inner block px-5 py-2 text-sm font-medium text-white"
                                    >
                                        Launch 2ndu.ai
                                    </a>
                                </div>
                            </div>

                            <MobileNav />
                        </div>
                    </nav>
                </ConditionalNav>

                {children}
            </body>
        </html>
    );
}
