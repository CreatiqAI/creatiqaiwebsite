import { headers } from "next/headers";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-store";
import { Calendar, Clock, ArrowRight, Tag, BookOpen } from "lucide-react";

function estimateReadTime(content: string): number {
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { tag?: string; page?: string; search?: string };
}) {
    const headersList = headers();
    const country = headersList.get("x-user-country") || "US";
    const page = parseInt(searchParams.page || "1");
    const tag = searchParams.tag;
    const search = searchParams.search;

    let posts: any[] = [];
    let total = 0;

    try {
        const result = await getAllPosts({
            published: true,
            tag: tag || undefined,
            geo: country,
            page,
            limit: 12,
            search: search || undefined,
        });
        posts = result.posts;
        total = result.total;
    } catch {
        // Supabase may not be configured yet
    }

    const totalPages = Math.ceil(total / 12);
    const featuredPost = posts.length > 0 ? posts[0] : null;
    const remainingPosts = posts.slice(1);

    return (
        <main className="min-h-screen bg-[#050510] pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with gradient glow */}
                <div className="relative mb-20 text-center">
                    <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                            Blog
                        </span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
                        Insights, guides, and updates on AI automation, chatbots, business digitalization, and more.
                    </p>
                    <div className="mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                </div>

                {/* Tag filter */}
                {tag && (
                    <div className="mb-8 flex items-center gap-3">
                        <span className="text-white/40 text-sm">Filtered by:</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20">
                            <Tag size={12} />
                            {tag}
                        </span>
                        <Link href="/blog" className="text-xs text-white/40 hover:text-white/60 transition-colors underline underline-offset-2">
                            Clear filter
                        </Link>
                    </div>
                )}

                {posts.length > 0 ? (
                    <>
                        {/* Featured Post — full width */}
                        {featuredPost && (
                            <Link
                                href={`/blog/${featuredPost.slug}`}
                                className="group block mb-12"
                            >
                                <div className="glass rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_8px_40px_-12px_rgba(37,99,235,0.2)]">
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {featuredPost.cover_image && (
                                            <div className="aspect-video md:aspect-auto md:h-full bg-white/5 overflow-hidden">
                                                <img
                                                    src={featuredPost.cover_image}
                                                    alt={featuredPost.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                        )}
                                        <div className={`p-8 md:p-10 flex flex-col justify-center ${!featuredPost.cover_image ? "md:col-span-2" : ""}`}>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[11px] font-semibold tracking-widest text-blue-400 uppercase">Featured</span>
                                                <span className="w-8 h-px bg-blue-500/30" />
                                            </div>
                                            {featuredPost.tags?.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {featuredPost.tags.slice(0, 3).map((t: string) => (
                                                        <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/15">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <h2 className="text-2xl md:text-3xl font-bold text-white/95 mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-white/45 text-base leading-relaxed mb-6 line-clamp-3">
                                                {featuredPost.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs text-white/30">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={12} />
                                                        {new Date(featuredPost.created_at).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock size={12} />
                                                        {estimateReadTime(featuredPost.content)} min read
                                                    </span>
                                                </div>
                                                <span className="flex items-center gap-2 text-sm text-blue-400 font-medium group-hover:gap-3 transition-all">
                                                    Read more
                                                    <ArrowRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Remaining Posts Grid */}
                        {remainingPosts.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {remainingPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group glass rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_rgba(37,99,235,0.15)]"
                                    >
                                        {/* Gradient top accent */}
                                        <div className="h-[2px] bg-gradient-to-r from-blue-500/40 via-violet-500/40 to-transparent" />
                                        {post.cover_image && (
                                            <div className="aspect-video bg-white/5 overflow-hidden">
                                                <img
                                                    src={post.cover_image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            {post.tags?.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {post.tags.slice(0, 3).map((t: string) => (
                                                        <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/15">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <h2 className="text-lg font-bold text-white/95 mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-white/30">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={12} />
                                                        {new Date(post.created_at).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock size={12} />
                                                        {estimateReadTime(post.content)} min read
                                                    </span>
                                                </div>
                                                <ArrowRight size={14} className="text-blue-400/50 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-24">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6">
                            <BookOpen size={28} className="text-white/30" />
                        </div>
                        <p className="text-white/50 text-lg mb-2">No blog posts yet.</p>
                        <p className="text-white/30 text-sm">Check back soon for new content.</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-16">
                        {page > 1 && (
                            <Link
                                href={`/blog?page=${page - 1}${tag ? `&tag=${tag}` : ""}`}
                                className="px-4 py-2 rounded-lg glass text-sm text-white/60 hover:text-white/80 hover:border-blue-500/20 transition-all"
                            >
                                Previous
                            </Link>
                        )}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Link
                                key={p}
                                href={`/blog?page=${p}${tag ? `&tag=${tag}` : ""}`}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm transition-all ${
                                    p === page
                                        ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold shadow-[0_4px_20px_-4px_rgba(37,99,235,0.4)]"
                                        : "glass text-white/60 hover:text-white/80 hover:border-blue-500/20"
                                }`}
                            >
                                {p}
                            </Link>
                        ))}
                        {page < totalPages && (
                            <Link
                                href={`/blog?page=${page + 1}${tag ? `&tag=${tag}` : ""}`}
                                className="px-4 py-2 rounded-lg glass text-sm text-white/60 hover:text-white/80 hover:border-blue-500/20 transition-all"
                            >
                                Next
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
