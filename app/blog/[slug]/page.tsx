import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog-store";
import { BlogPostingJsonLd } from "@/components/seo/json-ld";
import { Calendar, Clock, ArrowLeft, Tag, ArrowRight, User } from "lucide-react";
import { seoConfig } from "@/lib/seo-config";
import { TrackPageView } from "@/components/track-view";

function estimateReadTime(content: string): number {
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    try {
        const post = await getPostBySlug(params.slug);

        if (!post) {
            return { title: "Post Not Found" };
        }

        return {
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt,
            keywords: post.seo_keywords,
            openGraph: {
                title: post.title,
                description: post.excerpt,
                type: "article",
                publishedTime: post.created_at,
                modifiedTime: post.updated_at,
                tags: post.tags,
                ...(post.cover_image && { images: [post.cover_image] }),
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description: post.excerpt,
                ...(post.cover_image && { images: [post.cover_image] }),
            },
            alternates: {
                canonical: `${seoConfig.siteUrl}/blog/${post.slug}`,
            },
        };
    } catch {
        return { title: "Blog Post" };
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string };
}) {
    let post;
    try {
        post = await getPostBySlug(params.slug);
    } catch {
        notFound();
    }

    if (!post) {
        notFound();
    }

    // Get related posts
    let relatedPosts: any[] = [];
    try {
        if (post.tags?.length > 0) {
            const result = await getAllPosts({
                published: true,
                tag: post.tags[0],
                limit: 3,
            });
            relatedPosts = result.posts.filter((p) => p.slug !== post!.slug).slice(0, 2);
        }
    } catch {
        // Ignore
    }

    const readTime = estimateReadTime(post.content);
    const authorInitials = post.author
        ? post.author.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        : "CA";

    return (
        <main className="min-h-screen bg-[#050510] pt-28 pb-20 px-6">
            <TrackPageView postSlug={post.slug} />
            <BlogPostingJsonLd post={post} />

            <article className="max-w-3xl mx-auto">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors mb-10 px-4 py-2 rounded-full glass hover:border-blue-500/20"
                >
                    <ArrowLeft size={14} />
                    Back to Blog
                </Link>

                {/* Post header */}
                <header className="mb-10">
                    {/* Gradient accent line */}
                    <div className="w-16 h-[3px] bg-gradient-to-r from-blue-500 to-violet-500 rounded-full mb-6" />

                    {post.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                            {post.tags.map((tag: string) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${tag}`}
                                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/15 hover:bg-blue-500/20 transition-colors"
                                >
                                    <Tag size={10} />
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl md:text-5xl font-bold text-white/95 mb-8 leading-[1.15]">
                        {post.title}
                    </h1>

                    {/* Author / date bar */}
                    <div className="flex items-center gap-4 py-4 px-5 rounded-xl glass">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 text-sm font-bold text-blue-400">
                            {authorInitials}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <span className="text-sm text-white/70 font-medium">{post.author}</span>
                            <div className="flex items-center gap-3 text-sm text-white/40">
                                <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20" />
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={13} />
                                    {new Date(post.created_at).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="flex items-center gap-1.5">
                                    <Clock size={13} />
                                    {readTime} min read
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Cover image */}
                {post.cover_image && (
                    <div className="rounded-2xl overflow-hidden mb-12 shadow-[0_8px_40px_-12px_rgba(37,99,235,0.25)]">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

                {/* Post content */}
                <div
                    className="prose prose-lg prose-dark max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-white/10">
                        <h3 className="text-xl font-bold mb-8">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                                Continue Reading
                            </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedPosts.map((rp) => (
                                <Link
                                    key={rp.id}
                                    href={`/blog/${rp.slug}`}
                                    className="group glass rounded-xl overflow-hidden hover:border-blue-500/30 hover:shadow-[0_4px_20px_-8px_rgba(37,99,235,0.15)] transition-all"
                                >
                                    {rp.cover_image && (
                                        <div className="aspect-[2/1] bg-white/5 overflow-hidden">
                                            <img
                                                src={rp.cover_image}
                                                alt={rp.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h4 className="font-semibold text-white/80 group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                                            {rp.title}
                                        </h4>
                                        <p className="text-sm text-white/40 line-clamp-2 mb-3">{rp.excerpt}</p>
                                        <span className="flex items-center gap-1.5 text-xs text-blue-400/60 group-hover:text-blue-400 transition-colors">
                                            Read more <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </main>
    );
}
