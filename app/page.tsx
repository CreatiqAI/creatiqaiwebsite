import { headers } from "next/headers";
import dynamic from "next/dynamic";
import { Zap, Monitor, Boxes, Globe } from "lucide-react";
import Link from 'next/link';
import { SpotlightCard } from "@/components/spotlight-card";
import { AnimatedCounter } from "@/components/animated-counter";
import { Reveal, AnimatedLine } from "@/components/reveal";
import { HeroContent } from "@/components/hero-content";
import { PricingCard } from "@/components/pricing-card";

// Lazy load 3D component
const HeroStream = dynamic(() => import("@/components/hero-stream"), { ssr: false });

function FeatureCard({ icon: Icon, title, description, className = "", badge }: any) {
    return (
        <SpotlightCard className={`group flex flex-col justify-between h-full bg-white/5 ${className}`}>
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        <Icon size={24} />
                    </div>
                    {badge && (
                        <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                            {badge}
                        </span>
                    )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white/90">{title}</h3>
                <p className="text-white/60 leading-relaxed text-sm md:text-base">{description}</p>
            </div>
        </SpotlightCard>
    );
}

function StatItem({ value, label, description }: any) {
    // Extract number from string (e.g., "60%")
    const num = parseInt(value);
    const suffix = value.replace(num.toString(), "");

    return (
        <div className="text-center p-6 glass rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
                <AnimatedCounter value={num} suffix={suffix} />
            </div>
            <div className="text-white font-semibold mb-2">{label}</div>
            <p className="text-sm text-white/40">{description}</p>
        </div>
    );
}

function StepCard({ number, title, description }: any) {
    return (
        <Reveal delay={Number(number) * 0.2}>
            <div className="relative pl-8 md:pl-0">
                <div className="absolute left-0 top-0 md:relative md:mb-6 w-8 h-8 md:w-12 md:h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/20">
                    {number}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-white/60 leading-relaxed">{description}</p>
            </div>
        </Reveal>
    );
}

export default function Home() {
    const headersList = headers();
    const country = headersList.get("x-user-country") || "US";
    const isMY = country === "MY";

    return (
        <main className="min-h-screen relative flex flex-col bg-[#050510]">
            {/* Hero Section */}
            <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
                <HeroStream />
                <HeroContent isMY={isMY} />
                <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none z-20"></div>
            </section>

            {/* Stats Section - Social Proof */}
            <section className="relative z-10 py-20 px-6 border-y border-white/5 bg-[#0a0a1a]/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Reveal delay={0.1}>
                        <StatItem value="60%" label="Automated Qualification" description="Of leads are qualified without human intervention." />
                    </Reveal>
                    <Reveal delay={0.3}>
                        <StatItem value="50%" label="Faster Onboarding" description="Reduce client onboarding time significantly." />
                    </Reveal>
                    <Reveal delay={0.5}>
                        <StatItem value="30%" label="Higher Conversion" description="Increase in sales conversion rates with instant replies." />
                    </Reveal>
                </div>
            </section>

            {/* Feature Bento Grid */}
            <section id="features" className="relative z-10 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <div className="mb-20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Different?</h2>
                            <p className="text-white/60 text-xl max-w-2xl mx-auto">
                                Most chatbots are slow and dumb. Ours is engineered for <span className="text-cyan-400">sales performance</span> and instant engagement.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
                        {/* Highlights */}
                        <div className="md:col-span-2 md:row-span-2">
                            <FeatureCard
                                className="h-full bg-gradient-to-br from-white/5 to-transparent"
                                icon={Zap}
                                title="Zero-Latency Responses"
                                description="Don't lose leads to waiting times. Our edge-native architecture delivers responses in milliseconds, keeping engagement high and drop-offs low."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <FeatureCard
                                className="h-full"
                                icon={Monitor}
                                title="Omnichannel Control"
                                description="Deploy unified AI agents across WhatsApp, Facebook Messenger, Instagram, and your Website from a single dashboard."
                            />
                        </div>
                        <div className="md:col-span-1">
                            <FeatureCard
                                className="h-full"
                                icon={Boxes}
                                title="CRM Integration"
                                description="Seamlessly sync leads with HubSpot, Salesforce, or Google Sheets."
                            />
                        </div>
                        <div className="md:col-span-1">
                            <FeatureCard
                                className="h-full"
                                icon={Globe}
                                title="24/7 Availability"
                                description="Your sales team sleeps. Your AI doesn't. Capture leads at 3 AM."
                                badge="Always On"
                            />
                        </div>
                        <Reveal delay={0.4} className="h-full md:col-span-2 w-full">
                            <div className="h-full glass p-8 rounded-2xl flex flex-col justify-center items-center text-center border border-cyan-500/20 relative overflow-hidden w-full">
                                <div className="absolute inset-0 bg-cyan-500/5 animate-pulse-slow"></div>
                                <h3 className="text-2xl font-bold mb-2">Ready to automate?</h3>
                                <p className="text-white/60 mb-6">
                                    Join the top 1% of digital marketers using AI.
                                </p>
                                <a href="https://chatty-five-blush.vercel.app/" className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-colors w-full md:w-auto">
                                    View Pricing
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative z-10 py-32 px-6 bg-[#03030a]">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <div className="mb-20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
                            <p className="text-white/60 text-xl max-w-2xl mx-auto">
                                Three simple steps to AI supremacy.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <AnimatedLine delay={0.5} className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                        <StepCard
                            number="1"
                            title="Connect"
                            description="Link your WhatsApp Business API or social accounts in just one click. No coding required."
                        />
                        <StepCard
                            number="2"
                            title="Train"
                            description="Upload your PDFs, website links, or sales scripts. Our AI learns your business in seconds."
                        />
                        <StepCard
                            number="3"
                            title="Launch"
                            description="Activate your agent. It starts conversing, qualifying leads, and booking appointments immediately."
                        />
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="relative z-10 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <Reveal>
                        <div className="mb-20 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple Pricing</h2>
                            <p className="text-white/60 text-xl max-w-2xl mx-auto">
                                Start for free, scale when you grow.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Reveal delay={0.2}>
                            <PricingCard
                                title="Starter"
                                price={isMY ? "RM 0" : "$0"}
                                features={["1 AI Agent", "50 Conversations/mo", "Basic Analytics", "Community Support"]}
                                cta="Start Free"
                                isMY={isMY}
                            />
                        </Reveal>
                        <Reveal delay={0.4}>
                            <PricingCard
                                title="Pro"
                                price={isMY ? "RM 99" : "$29"}
                                recommended={true}
                                features={["3 AI Agents", "1,000 Conversations/mo", "WhatsApp API Access", "Priority Support", "Remove Branding"]}
                                cta="Get Pro"
                                isMY={isMY}
                            />
                        </Reveal>
                        <Reveal delay={0.6}>
                            <PricingCard
                                title="Business"
                                price={isMY ? "RM 299" : "$99"}
                                features={["Unlimited Agents", "Unlimited Conversations", "Custom Integrations", "Dedicated Account Manager", "SSO & API Access"]}
                                cta="Contact Sales"
                                isMY={isMY}
                            />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative z-10 py-20 px-6 bg-[#03030a] border-t border-white/5">
                <Reveal>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <details className="group p-6 rounded-2xl bg-white/5 open:bg-white/10 transition-colors cursor-pointer">
                                <summary className="font-semibold text-lg list-none flex justify-between items-center text-white/90">
                                    <span>Do I need coding skills?</span>
                                    <span className="group-open:rotate-180 transition-transform text-cyan-500">▼</span>
                                </summary>
                                <p className="mt-4 text-white/60 leading-relaxed">
                                    Not at all. Creatiq AI is designed to be No-Code. If you can send an email, you can set up a chatbot.
                                </p>
                            </details>
                            <details className="group p-6 rounded-2xl bg-white/5 open:bg-white/10 transition-colors cursor-pointer">
                                <summary className="font-semibold text-lg list-none flex justify-between items-center text-white/90">
                                    <span>Is WhatsApp Official API included?</span>
                                    <span className="group-open:rotate-180 transition-transform text-cyan-500">▼</span>
                                </summary>
                                <p className="mt-4 text-white/60 leading-relaxed">
                                    Yes, we partner with Meta BSPs to provide seamless access to the official API. We also support unofficial integration for specific use cases.
                                </p>
                            </details>
                            <details className="group p-6 rounded-2xl bg-white/5 open:bg-white/10 transition-colors cursor-pointer">
                                <summary className="font-semibold text-lg list-none flex justify-between items-center text-white/90">
                                    <span>Can it speak other languages?</span>
                                    <span className="group-open:rotate-180 transition-transform text-cyan-500">▼</span>
                                </summary>
                                <p className="mt-4 text-white/60 leading-relaxed">
                                    Absolutely. Our AI agents are multilingual and can fluent converse in over 95 languages, including Bahasa Melayu, Chinese, and Tamil.
                                </p>
                            </details>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-6 border-t border-white/10 text-center text-white/40 text-sm">
                <p>&copy; {new Date().getFullYear()} Creatiq AI. All rights reserved.</p>
                <div className="mt-4 flex justify-center gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
            </footer>
        </main>
    );
}
