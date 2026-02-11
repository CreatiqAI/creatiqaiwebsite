import { seoConfig } from "@/lib/seo-config";
import type { BlogPost } from "@/lib/types/blog";

export function OrganizationJsonLd() {
    const data = {
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
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function WebSiteJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${seoConfig.siteUrl}/blog?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function ServiceJsonLd({
    name,
    description,
}: {
    name: string;
    description: string;
}) {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: {
            "@type": "Organization",
            name: "Creatiq AI",
            url: seoConfig.siteUrl,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function BlogPostingJsonLd({ post }: { post: BlogPost }) {
    const data = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.seo_title || post.title,
        description: post.seo_description || post.excerpt,
        author: {
            "@type": "Person",
            name: post.author,
        },
        publisher: {
            "@type": "Organization",
            name: "Creatiq AI",
            logo: {
                "@type": "ImageObject",
                url: `${seoConfig.siteUrl}/logo.png`,
            },
        },
        datePublished: post.created_at,
        dateModified: post.updated_at,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${seoConfig.siteUrl}/blog/${post.slug}`,
        },
        keywords: post.seo_keywords?.join(", "),
        ...(post.cover_image && { image: post.cover_image }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function FAQJsonLd({
    faqs,
}: {
    faqs: Array<{ question: string; answer: string }>;
}) {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
