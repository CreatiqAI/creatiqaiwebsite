import { headers } from "next/headers";
import dynamic from "next/dynamic";
import { ArrowRight, Zap, Monitor, Boxes, Globe } from "lucide-react";
import Link from 'next/link';

// Lazy load 3D component
const HeroStream = dynamic(() => import("@/components/hero-stream"), { ssr: false });

function FeatureCard({ icon: Icon, title, description, className = "", badge }: any) {
    return (
        <div className={`glass p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group flex flex-col justify-between ${className}`}>
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
        </div>
    );
}

function StatItem({ value, label, description }: any) {
    return (
        <div className="text-center p-6 glass rounded-2xl border border-white/5">
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{value}</div>
            <div className="text-white font-semibold mb-2">{label}</div>
            <p className="text-sm text-white/40">{description}</p>
        </div>
    );
}

function StepCard({ number, title, description }: any) {
    return (
        <div className="relative pl-8 md:pl-0">
            <div className="absolute left-0 top-0 md:relative md:mb-6 w-8 h-8 md:w-12 md:h-12 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/20">
                {number}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/60 leading-relaxed">{description}</p>
        </div>
    );
}

function PricingCard({ title, price, features, recommended = false, cta, isMY }: any) {
    return (
        <div className={`relative p-8 rounded-3xl border ${recommended ? 'border-cyan-500 bg-cyan-950/20' : 'border-white/10 bg-white/5'} flex flex-col`}>
            {recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-sm font-bold rounded-full uppercase tracking-wide">
                    Most Popular
                </div>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="mb-6">
                <span className="text-4xl font-bold text-white">{price}</span>
                <span className="text-white/40">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">✓</div>
                        {feature}
                    </li>
                ))}
            </ul>
            <a href="https://chatty-five-blush.vercel.app/" className={`w-full py-4 rounded-xl font-bold text-center transition-all ${recommended ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,242,255,0.3)]' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                {cta}
            </a>
        </div>
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

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-cyan-200">
                            {isMY ? "Optimized for Malaysia 🇲🇾" : "Global Edge Mesh Online 🌐"}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        One Stop <br />
                        <span className="text-cyan-400">AI Solution.</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Revolutionizing digital marketing with intelligent chatbots. Connect your WhatsApp Business API in <strong className="text-white">one click</strong> and automate 60% of your sales process 24/7.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://chatty-five-blush.vercel.app/"
                            className="group relative px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_40px_-10px_rgba(0,242,255,0.4)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Scaling Now
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>

                        <a href="#demo" className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-lg transition-all">
                            View Demo
                        </a>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-white/30 text-sm font-medium">
                        <span>TRUSTED BY 100+ BRANDS</span>
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span>OFFICIAL WHATSAPP API</span>
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span>META PARTNER</span>
                    </div>
                </div>

                <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none z-20"></div>
            </section>

            {/* Stats Section - Social Proof */}
            <section className="relative z-10 py-20 px-6 border-y border-white/5 bg-[#0a0a1a]/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatItem value="60%" label="Automated Qualification" description="Of leads are qualified without human intervention." />
                    <StatItem value="50%" label="Faster Onboarding" description="Reduce client onboarding time significantly." />
                    <StatItem value="30%" label="Higher Conversion" description="Increase in sales conversion rates with instant replies." />
                </div>
            </section>

            {/* Feature Bento Grid */}
            <section id="features" className="relative z-10 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Different?</h2>
                        <p className="text-white/60 text-xl max-w-2xl mx-auto">
                            Most chatbots are slow and dumb. Ours is engineered for <span className="text-cyan-400">sales performance</span> and instant engagement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
                        {/* Highlights */}
                        <FeatureCard
                            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-white/5 to-transparent"
                            icon={Zap}
                            title="Zero-Latency Responses"
                            description="Don't lose leads to waiting times. Our edge-native architecture delivers responses in milliseconds, keeping engagement high and drop-offs low."
                        />
                        <FeatureCard
                            className="md:col-span-2"
                            icon={Monitor}
                            title="Omnichannel Control"
                            description="Deploy unified AI agents across WhatsApp, Facebook Messenger, Instagram, and your Website from a single dashboard."
                        />
                        <FeatureCard
                            className="md:col-span-1"
                            icon={Boxes}
                            title="CRM Integration"
                            description="Seamlessly sync leads with HubSpot, Salesforce, or Google Sheets."
                        />
                        <FeatureCard
                            className="md:col-span-1"
                            icon={Globe}
                            title="24/7 Availability"
                            description="Your sales team sleeps. Your AI doesn't. Capture leads at 3 AM."
                            badge="Always On"
                        />
                        <div className="md:col-span-2 glass p-8 rounded-2xl flex flex-col justify-center items-center text-center border border-cyan-500/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500/5 animate-pulse-slow"></div>
                            <h3 className="text-2xl font-bold mb-2">Ready to automate?</h3>
                            <p className="text-white/60 mb-6">
                                Join the top 1% of digital marketers using AI.
                            </p>
                            <a href="https://chatty-five-blush.vercel.app/" className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-colors w-full md:w-auto">
                                View Pricing
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative z-10 py-32 px-6 bg-[#03030a]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
                        <p className="text-white/60 text-xl max-w-2xl mx-auto">
                            Three simple steps to AI supremacy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

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
                    <div className="mb-20 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple Pricing</h2>
                        <p className="text-white/60 text-xl max-w-2xl mx-auto">
                            Start for free, scale when you grow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <PricingCard
                            title="Starter"
                            price={isMY ? "RM 0" : "$0"}
                            features={["1 AI Agent", "50 Conversations/mo", "Basic Analytics", "Community Support"]}
                            cta="Start Free"
                            isMY={isMY}
                        />
                        <PricingCard
                            title="Pro"
                            price={isMY ? "RM 99" : "$29"}
                            recommended={true}
                            features={["3 AI Agents", "1,000 Conversations/mo", "WhatsApp API Access", "Priority Support", "Remove Branding"]}
                            cta="Get Pro"
                            isMY={isMY}
                        />
                        <PricingCard
                            title="Business"
                            price={isMY ? "RM 299" : "$99"}
                            features={["Unlimited Agents", "Unlimited Conversations", "Custom Integrations", "Dedicated Account Manager", "SSO & API Access"]}
                            cta="Contact Sales"
                            isMY={isMY}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative z-10 py-20 px-6 bg-[#03030a] border-t border-white/5">
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
