import { headers } from "next/headers";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTAFooter } from "@/components/sections/cta-footer";

export default function Home() {
    const headersList = headers();
    const country = headersList.get("x-user-country") || "US";

    return (
        <main className="min-h-screen relative flex flex-col bg-[#050510]">
            <div className="snap-section">
                <HeroSection country={country} />
            </div>
            <div className="snap-section">
                <ServicesSection />
            </div>
            <div className="snap-section">
                <ProductShowcase />
            </div>
            <div className="snap-section">
                <HowItWorksSection />
            </div>
            <div className="snap-section">
                <FAQSection />
            </div>
            <div className="snap-section">
                <CTAFooter />
            </div>
        </main>
    );
}
