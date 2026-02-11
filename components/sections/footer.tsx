import Link from "next/link";
import { Logo } from "@/components/logo";

const footerLinks = {
    services: [
        { label: "Website Customization", href: "#services" },
        { label: "AI System Integration", href: "#services" },
        { label: "2ndu.ai Platform", href: "https://2ndu.ai" },
    ],
    resources: [
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "#faq" },
    ],
    company: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "#contact" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
    ],
};

export function Footer() {
    return (
        <footer id="contact" className="relative z-10 border-t border-white/10 bg-[#030308]">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Logo size={32} />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                Creatiq AI
                            </span>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            AI-powered solutions for business digitalization. Custom websites, intelligent systems, and WhatsApp chatbot automation.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-white/40 hover:text-white/80 text-sm transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/40 hover:text-white/80 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/40 hover:text-white/80 text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-sm">
                        &copy; {new Date().getFullYear()} Creatiq AI. All rights reserved.
                    </p>
                    <p className="text-white/30 text-xs">
                        Powered by AI. Built for businesses.
                    </p>
                </div>
            </div>
        </footer>
    );
}
