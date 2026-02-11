"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Eye, Globe, TrendingUp, FileText, BarChart3, ExternalLink, Calendar, Users } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase";

interface AnalyticsData {
    overview: { totalVisits: number; todayVisits: number; weekVisits: number; monthVisits: number; totalBlogViews: number };
    topPosts: Array<{ slug: string; views: number }>;
    topCountries: Array<{ country: string; visits: number }>;
    topPages: Array<{ path: string; visits: number }>;
    dailyVisits: Array<{ date: string; count: number }>;
}

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchAnalytics() {
        setLoading(true); setError("");
        try {
            const supabase = createBrowserSupabase();
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token || "";
            const res = await fetch("/api/analytics", { headers: { "Authorization": `Bearer ${token}` } });
            if (res.ok) setData(await res.json());
            else setError("Failed to load analytics. Make sure the page_views and site_visits tables exist in Supabase.");
        } catch { setError("Connection error."); } finally { setLoading(false); }
    }

    useEffect(() => { fetchAnalytics(); }, []);
    const maxDailyCount = data ? Math.max(...data.dailyVisits.map((d) => d.count), 1) : 1;

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Internal site analytics tracked via Supabase</p>
                </div>
                <div className="flex items-center gap-2">
                    <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[12px] text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
                        <BarChart3 size={13} /> Google Analytics <ExternalLink size={10} />
                    </a>
                    <button onClick={fetchAnalytics} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {error && <div className="mb-5 p-3 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-sm">{error}</div>}

            {loading && !data ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : data ? (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                        <Card icon={<Eye size={18} />} label="Today" value={data.overview.todayVisits} color="sky" />
                        <Card icon={<Calendar size={18} />} label="Last 7 Days" value={data.overview.weekVisits} color="blue" />
                        <Card icon={<TrendingUp size={18} />} label="Last 30 Days" value={data.overview.monthVisits} color="green" />
                        <Card icon={<Users size={18} />} label="All Time" value={data.overview.totalVisits} color="violet" />
                        <Card icon={<FileText size={18} />} label="Blog Views" value={data.overview.totalBlogViews} color="amber" />
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Daily Visits</h2>
                            <span className="text-[11px] text-gray-300">Last 7 Days</span>
                        </div>
                        <div className="flex items-end gap-3 h-44">
                            {data.dailyVisits.map((day) => (
                                <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
                                    <span className="text-xs text-gray-400 font-mono">{day.count}</span>
                                    <div className="w-full bg-blue-100 rounded-t-md transition-all duration-500 min-h-[4px]"
                                        style={{ height: `${(day.count / maxDailyCount) * 100}%` }} />
                                    <span className="text-[11px] text-gray-300">
                                        {new Date(day.date).toLocaleDateString("en", { weekday: "short" })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <FileText size={13} className="text-blue-400" /> Top Blog Posts
                            </h2>
                            {data.topPosts.length > 0 ? (
                                <ul className="space-y-2.5">
                                    {data.topPosts.map((post, i) => (
                                        <li key={post.slug} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="text-[11px] text-gray-300 w-4">{i + 1}.</span>
                                                <Link href={`/blog/${post.slug}`} target="_blank" className="text-sm text-gray-600 hover:text-blue-600 truncate transition-colors">{post.slug}</Link>
                                            </div>
                                            <span className="text-sm font-mono text-blue-500 ml-2">{post.views}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-sm text-gray-300">No blog views yet</p>}
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <Globe size={13} className="text-green-400" /> Top Countries
                            </h2>
                            {data.topCountries.length > 0 ? (
                                <ul className="space-y-2.5">
                                    {data.topCountries.map((item, i) => (
                                        <li key={item.country} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] text-gray-300 w-4">{i + 1}.</span>
                                                <span className="text-sm text-gray-600">{item.country}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-green-200 rounded-full" style={{ width: `${(item.visits / (data.topCountries[0]?.visits || 1)) * 100}%` }} />
                                                </div>
                                                <span className="text-sm font-mono text-green-600 w-6 text-right">{item.visits}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-sm text-gray-300">No geo data yet</p>}
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <TrendingUp size={13} className="text-violet-400" /> Top Pages
                            </h2>
                            {data.topPages.length > 0 ? (
                                <ul className="space-y-2.5">
                                    {data.topPages.map((page, i) => (
                                        <li key={page.path} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="text-[11px] text-gray-300 w-4">{i + 1}.</span>
                                                <span className="text-sm text-gray-600 truncate">{page.path}</span>
                                            </div>
                                            <span className="text-sm font-mono text-violet-500 ml-2">{page.visits}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-sm text-gray-300">No page data yet</p>}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}

function Card({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
    const colors: Record<string, string> = { sky: "bg-sky-50 text-sky-500", blue: "bg-blue-50 text-blue-500", green: "bg-green-50 text-green-500", violet: "bg-violet-50 text-violet-500", amber: "bg-amber-50 text-amber-500" };
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`inline-flex p-2 rounded-lg ${colors[color]} mb-2.5`}>{icon}</div>
            <p className="text-xl font-bold text-gray-900">{value.toLocaleString()}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
        </div>
    );
}
