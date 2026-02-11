interface GeoContent {
    heroSubtitle: string;
    trustBadge: string;
    ctaText: string;
    blogFilter?: string;
}

const geoContentMap: Record<string, GeoContent> = {
    MY: {
        heroSubtitle: "Malaysia's Leading AI Automation Partner",
        trustBadge: "Optimized for Malaysia",
        ctaText: "Start Automating",
        blogFilter: "MY",
    },
    SG: {
        heroSubtitle: "Singapore's Smart Business AI Partner",
        trustBadge: "Optimized for Singapore",
        ctaText: "Get Started",
        blogFilter: "SG",
    },
    ID: {
        heroSubtitle: "Solusi AI Bisnis Indonesia",
        trustBadge: "Tersedia di Indonesia",
        ctaText: "Mulai Sekarang",
        blogFilter: "ID",
    },
    DEFAULT: {
        heroSubtitle: "Global AI Solutions for Modern Businesses",
        trustBadge: "Global Edge Mesh Online",
        ctaText: "Get Started",
    },
};

export function getGeoContent(countryCode: string): GeoContent {
    return geoContentMap[countryCode] || geoContentMap.DEFAULT;
}
