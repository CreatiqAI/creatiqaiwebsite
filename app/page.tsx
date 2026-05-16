import { headers } from "next/headers";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProblemSolutionSection } from "@/components/sections/problem-solution-section";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTAFooter } from "@/components/sections/cta-footer";
import { LiquidEtherBackground } from "@/components/LiquidEtherBackground";
import { SectionReveal } from "@/components/section-reveal";

export default function Home() {
    const headersList = headers();
    const country = headersList.get("x-user-country") || "US";

    return (
        <>
        <LiquidEtherBackground />
        <main className="relative">
            {/* Hero is not wrapped — it's already visible on load, no reveal needed */}
            <HeroSection country={country} />

            <SectionReveal>
                <ServicesSection />
            </SectionReveal>
            <SectionReveal>
                <ProblemSolutionSection />
            </SectionReveal>
            <SectionReveal>
                <ProductShowcase />
            </SectionReveal>
            <SectionReveal>
                <HowItWorksSection />
            </SectionReveal>
            <SectionReveal>
                <PricingSection />
            </SectionReveal>
            <SectionReveal>
                <FAQSection />
            </SectionReveal>
            <SectionReveal>
                <CTAFooter />
            </SectionReveal>
        </main>
        </>
    );
}
