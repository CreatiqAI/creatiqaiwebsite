"use client";

import { Users, Sparkles, Target, Globe, User } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import ElectricBorder from "@/components/ElectricBorder";
import "@/components/ElectricBorder.css";

const teamMembers = [
    {
        name: "Alex Chen",
        role: "Co-Founder & CEO",
        bio: "Driving AI innovation for businesses across Southeast Asia",
        color: "#2563eb",
    },
    {
        name: "Sarah Lim",
        role: "Co-Founder & CTO",
        bio: "Building intelligent systems that transform how businesses operate",
        color: "#7c3aed",
    },
    {
        name: "Ravi Kumar",
        role: "Head of AI",
        bio: "Specializing in NLP and conversational AI solutions",
        color: "#0891b2",
    },
];

const missionCards = [
    {
        icon: Sparkles,
        title: "Innovation",
        description:
            "We push the boundaries of what AI can do for businesses, delivering cutting-edge solutions that automate workflows and unlock new opportunities.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description:
            "Serving clients across Southeast Asia and beyond, we bring world-class AI capabilities to businesses of every size and industry.",
    },
    {
        icon: Target,
        title: "Client Focus",
        description:
            "Every solution we build starts with understanding your unique challenges. We measure our success by the real impact we create for your business.",
    },
];

export default function AboutPage() {
    return (
        <>
            <main className="min-h-screen bg-[#050510] pt-28 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-20 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                About Creatiq AI
                            </span>
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            Creatiq AI is a technology company specializing in AI-powered solutions
                            for business digitalization. From custom websites and intelligent
                            automation systems to conversational AI chatbots, we help businesses
                            modernize their operations and connect with customers in smarter,
                            more efficient ways.
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="mb-20">
                        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
                            Our Mission
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {missionCards.map((card) => (
                                <div
                                    key={card.title}
                                    className="bg-white/5 rounded-2xl border border-white/10 p-8 text-center hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 mb-5">
                                        <card.icon size={28} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Meet Our Team Section */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
                                <Users size={16} />
                                The People Behind the Product
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                Meet Our Team
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
                            {teamMembers.map((member) => (
                                <ElectricBorder
                                    key={member.name}
                                    color={member.color}
                                    speed={0.8}
                                    chaos={0.08}
                                    borderRadius={20}
                                >
                                    <div className="bg-white/5 rounded-[20px] p-8 text-center">
                                        <div
                                            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
                                            style={{
                                                backgroundColor: `${member.color}15`,
                                                color: member.color,
                                            }}
                                        >
                                            <User size={36} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">
                                            {member.name}
                                        </h3>
                                        <p
                                            className="text-sm font-medium mb-3"
                                            style={{ color: member.color }}
                                        >
                                            {member.role}
                                        </p>
                                        <p className="text-white/60 text-sm leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </div>
                                </ElectricBorder>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
