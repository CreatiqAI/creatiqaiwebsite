import { headers } from "next/headers";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { StatsSection } from "@/components/sections/stats-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { UseCasesSection } from "@/components/sections/use-cases-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTABanner } from "@/components/sections/cta-banner";
import { Footer } from "@/components/sections/footer";

export default function Home() {
    const headersList = headers();
    const country = headersList.get("x-user-country") || "US";

    return (
        <main className="min-h-screen relative flex flex-col bg-[#050510]">
            <HeroSection country={country} />
            <StatsSection />
            <ServicesSection />
            <ProductShowcase />
            <HowItWorksSection />
            <UseCasesSection />
            <FAQSection />
            <CTABanner />
            <Footer />
        </main>
    );
}
