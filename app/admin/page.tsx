"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Eye,
    TrendingUp,
    FileText,
    FilePlus,
    BarChart3,
    Calendar,
    Users,
    Globe,
    RefreshCw,
    ArrowUpRight,
    Clock,
} from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import { createBrowserSupabase } from "@/lib/supabase";

interface AnalyticsData {
    overview: {
        totalVisits: number;
        todayVisits: number;
        weekVisits: number;
        monthVisits: number;
        totalBlogViews: number;
    };
    topPages: Array<{ path: string; visits: number }>;
    topCountries: Array<{ country: string; visits: number }>;
    dailyVisits: Array<{ date: string; count: number }>;
}

export default function AdminDashboardPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true);
        try {
            const supabase = createBrowserSupabase();
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token || "";
            const headers = { "Authorization": `Bearer ${token}` };
            const [postsRes, analyticsRes] = await Promise.allSettled([
                fetch("/api/blog?limit=100"),
                fetch("/api/analytics", { headers }),
            ]);
            if (postsRes.status === "fulfilled" && postsRes.value.ok) {
                const data = await postsRes.value.json();
                setPosts(data.posts || []);
            }
            if (analyticsRes.status === "fulfilled" && analyticsRes.value.ok) {
                setAnalytics(await analyticsRes.value.json());
            }
        } catch {} finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchData(); }, []);

    const publishedCount = posts.filter((p) => p.published).length;
    const draftCount = posts.filter((p) => !p.published).length;
    const recentPosts = [...posts]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);
    const maxDailyCount = analytics ? Math.max(...analytics.dailyVisits.map((d) => d.count), 1) : 1;

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Platform Overview</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Creatiq AI Admin Dashboard</p>
                </div>
                <button onClick={fetchData} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {loading && !analytics && posts.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                        <StatCard icon={<Users size={18} />} label="Total Visits" value={analytics?.overview.totalVisits ?? 0} color="blue" />
                        <StatCard icon={<Eye size={18} />} label="Today" value={analytics?.overview.todayVisits ?? 0} color="sky" />
                        <StatCard icon={<FileText size={18} />} label="Total Posts" value={posts.length} color="violet" />
                        <StatCard icon={<TrendingUp size={18} />} label="Published" value={publishedCount} color="green" />
                        <StatCard icon={<Calendar size={18} />} label="Blog Views" value={analytics?.overview.totalBlogViews ?? 0} color="amber" />
                    </div>

                    {/* Mini Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                        <MiniStat label="Active (7d)" value={analytics?.overview.weekVisits ?? 0} icon={<TrendingUp size={14} />} />
                        <MiniStat label="Active (30d)" value={analytics?.overview.monthVisits ?? 0} icon={<BarChart3 size={14} />} />
                        <MiniStat label="Drafts" value={draftCount} icon={<FileText size={14} />} />
                        <MiniStat label="Top Pages" value={analytics?.topPages.length ?? 0} icon={<Globe size={14} />} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h2>
                            <div className="grid grid-cols-2 gap-2">
                                <QuickAction href="/admin/posts/new" icon={<FilePlus size={16} />} label="New Post" />
                                <QuickAction href="/admin/analytics" icon={<BarChart3 size={16} />} label="Analytics" />
                                <QuickAction href="/admin/posts" icon={<FileText size={16} />} label="All Posts" />
                                <QuickAction href="/" external icon={<Globe size={16} />} label="View Site" />
                            </div>
                        </div>

                        {/* Traffic Chart */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Traffic Trend</h2>
                                <span className="text-[11px] text-gray-300">Last 7 days</span>
                            </div>
                            {analytics ? (
                                <div className="flex items-end gap-2 h-28">
                                    {analytics.dailyVisits.map((day) => (
                                        <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                                            <span className="text-[10px] text-gray-400 font-mono">{day.count}</span>
                                            <div
                                                className="w-full bg-blue-100 rounded-t transition-all duration-500 min-h-[3px]"
                                                style={{ height: `${(day.count / maxDailyCount) * 100}%` }}
                                            />
                                            <span className="text-[10px] text-gray-300">
                                                {new Date(day.date).toLocaleDateString("en", { weekday: "short" })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-28 flex items-center justify-center">
                                    <p className="text-sm text-gray-300">No traffic data yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                        {/* Recent Posts */}
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Posts</h2>
                                <Link href="/admin/posts" className="text-[11px] text-blue-500 hover:text-blue-600 transition-colors">View all</Link>
                            </div>
                            {recentPosts.length > 0 ? (
                                <div className="space-y-1">
                                    {recentPosts.map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/admin/posts/${post.slug}/edit`}
                                            className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm text-gray-700 truncate group-hover:text-gray-900">{post.title}</p>
                                                <p className="text-[11px] text-gray-300 flex items-center gap-1 mt-0.5">
                                                    <Clock size={10} />
                                                    {new Date(post.created_at).toLocaleDateString("en", { month: "short", day: "numeric" })}
                                                </p>
                                            </div>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                                post.published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                                            }`}>
                                                {post.published ? "Published" : "Draft"}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-300 py-4 text-center">No posts yet</p>
                            )}
                        </div>

                        {/* Top Countries + Pages */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Top Countries</h2>
                                {analytics && analytics.topCountries.length > 0 ? (
                                    <div className="space-y-2">
                                        {analytics.topCountries.slice(0, 5).map((item) => (
                                            <div key={item.country} className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">{item.country}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-200 rounded-full" style={{ width: `${(item.visits / (analytics.topCountries[0]?.visits || 1)) * 100}%` }} />
                                                    </div>
                                                    <span className="text-xs font-mono text-gray-400 w-6 text-right">{item.visits}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-300">No geo data yet</p>
                                )}
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Top Pages</h2>
                                {analytics && analytics.topPages.length > 0 ? (
                                    <div className="space-y-2">
                                        {analytics.topPages.slice(0, 5).map((page) => (
                                            <div key={page.path} className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600 truncate max-w-[200px]">{page.path}</span>
                                                <span className="text-xs font-mono text-gray-400">{page.visits}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-300">No page data yet</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* n8n */}
                    <div className="bg-white rounded-xl border border-blue-100 p-5">
                        <h3 className="text-xs font-semibold text-blue-600 mb-1.5">n8n Integration</h3>
                        <p className="text-xs text-gray-400 mb-2">
                            Send POST requests to <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[11px]">/api/blog</code> with your API key.
                        </p>
                        <pre className="text-[11px] text-gray-400 bg-gray-50 p-2.5 rounded-lg overflow-x-auto font-mono">
{`POST /api/blog
Headers: x-api-key: your-api-key
Body: { "title": "...", "content": "...", "tags": [...], "published": true }`}
                        </pre>
                    </div>
                </>
            )}
        </div>
    );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
    const colors: Record<string, string> = {
        blue: "bg-blue-50 text-blue-500",
        sky: "bg-sky-50 text-sky-500",
        green: "bg-green-50 text-green-500",
        violet: "bg-violet-50 text-violet-500",
        amber: "bg-amber-50 text-amber-500",
    };
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`inline-flex p-2 rounded-lg ${colors[color]} mb-2.5`}>{icon}</div>
            <p className="text-xl font-bold text-gray-900">{value.toLocaleString()}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
        </div>
    );
}

function MiniStat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-2.5">
            <div className="text-gray-300">{icon}</div>
            <div>
                <p className="text-base font-bold text-gray-900">{value.toLocaleString()}</p>
                <p className="text-[11px] text-gray-400">{label}</p>
            </div>
        </div>
    );
}

function QuickAction({ href, icon, label, external }: { href: string; icon: React.ReactNode; label: string; external?: boolean }) {
    const cls = "flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-200 transition-all";
    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {icon} {label} <ArrowUpRight size={11} className="ml-auto text-gray-300" />
            </a>
        );
    }
    return <Link href={href} className={cls}>{icon} {label}</Link>;
}
