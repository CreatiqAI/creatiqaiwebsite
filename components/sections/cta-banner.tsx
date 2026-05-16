"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import StarBorder from "@/components/StarBorder";
import "@/components/StarBorder.css";

export function CTABanner() {
    return (
        <section className="relative z-10 py-32 px-6 bg-[#03030a] overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative">
                {/* Background glow */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                        Ready to Transform Your{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                            Business
                        </span>
                        ?
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        Join hundreds of businesses already automating their operations with AI. Start your digital transformation today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <StarBorder as="div" color="#3b82f6" speed="4s" className="rounded-full">
                            <a
                                href="https://2ndu.ai"
                                className="group flex items-center gap-2 px-8 py-4 text-white font-bold text-lg hover:scale-105 transition-transform"
                            >
                                Start Automating
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </StarBorder>
                        <a
                            href="#contact"
                            className="px-8 py-4 rounded-full glass-btn text-white font-medium text-lg"
                        >
                            Contact Us
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
