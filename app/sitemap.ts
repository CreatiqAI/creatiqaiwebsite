import { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = seoConfig.siteUrl;

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // Dynamic blog posts
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const { getAllPosts } = await import("@/lib/blog-store");
        const { posts } = await getAllPosts({ published: true, limit: 1000 });
        blogPages = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated_at),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));
    } catch {
        // Blog store may not be available yet
    }

    return [...staticPages, ...blogPages];
}
