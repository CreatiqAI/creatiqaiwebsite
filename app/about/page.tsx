"use client";

import { motion } from "framer-motion";
import { Users, Sparkles, Target, Globe, User, Zap, Heart, Shield } from "lucide-react";
import { Footer } from "@/components/sections/footer";

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

const values = [
    {
        icon: Sparkles,
        title: "Innovation",
        description: "We push the boundaries of what AI can do for businesses, delivering cutting-edge solutions.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        description: "Serving clients across Southeast Asia and beyond with world-class AI capabilities.",
    },
    {
        icon: Target,
        title: "Client Focus",
        description: "Every solution starts with understanding your unique challenges and measuring real impact.",
    },
    {
        icon: Shield,
        title: "Trust & Security",
        description: "Enterprise-grade security and data privacy at the core of every solution we build.",
    },
];

const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "50+", label: "Enterprise Clients" },
    { value: "95+", label: "Languages Supported" },
    { value: "24/7", label: "AI Availability" },
];

export default function AboutPage() {
    return (
        <>
            <main className="min-h-screen bg-[#050510]">
                {/* Hero Section with mesh gradient */}
                <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                    {/* Mesh gradient background */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px]" />
                        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />
                    </div>

                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                                <Heart size={14} />
                                About Our Mission
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                        >
                            <span className="text-white">We Make AI </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                Work for You
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                        >
                            Creatiq AI is a technology company specializing in AI-powered solutions
                            for business digitalization. From custom websites and intelligent
                            automation systems to conversational AI chatbots, we help businesses
                            modernize their operations and connect with customers smarter.
                        </motion.p>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="border-y border-white/10 bg-[#03030a]/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">{stat.value}</div>
                                    <div className="text-sm text-white/40">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                What Drives{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                    Us
                                </span>
                            </h2>
                            <p className="text-white/50 text-lg max-w-2xl mx-auto">
                                Our core values shape every solution we build and every relationship we nurture.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, i) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/20 hover:bg-white/[0.05] transition-all duration-500"
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                                        <value.icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 px-6 bg-[#03030a]">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4 border border-violet-500/20">
                                <Users size={16} />
                                The People Behind the Product
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                Meet Our Team
                            </h2>
                            <p className="text-white/50 text-lg max-w-xl mx-auto">
                                A passionate team building the future of business AI.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {teamMembers.map((member, i) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.6 }}
                                    className="group relative"
                                >
                                    {/* Metallic reflective card */}
                                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500">
                                        {/* Metallic sheen overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                        {/* Color accent glow */}
                                        <div
                                            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                                            style={{ backgroundColor: member.color }}
                                        />

                                        <div className="relative p-8 text-center">
                                            {/* Avatar */}
                                            <div
                                                className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 border-2 transition-transform duration-500 group-hover:scale-105"
                                                style={{
                                                    backgroundColor: `${member.color}12`,
                                                    borderColor: `${member.color}30`,
                                                }}
                                            >
                                                <User size={40} strokeWidth={1.5} style={{ color: member.color }} />
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                            <p className="text-sm font-medium mb-4" style={{ color: member.color }}>
                                                {member.role}
                                            </p>
                                            <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px]" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to work with us?
                        </h2>
                        <p className="text-white/50 text-lg mb-10">
                            Let&apos;s discuss how we can help transform your business with AI.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://2ndu.ai"
                                className="px-8 py-4 rounded-full glass-btn-primary text-white font-bold text-lg"
                            >
                                Get Started
                            </a>
                            <a
                                href="/#services"
                                className="px-8 py-4 rounded-full glass-btn text-white/90 font-medium text-lg"
                            >
                                View Services
                            </a>
                        </div>
                    </motion.div>
                </section>
            </main>

            <Footer />
        </>
    );
}
