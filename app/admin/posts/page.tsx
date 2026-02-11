"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PostTable } from "@/components/admin/post-table";
import { Plus, RefreshCw, FileText, Eye, FileEdit, Search } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    async function fetchPosts() {
        setLoading(true);
        try {
            const res = await fetch("/api/blog?limit=100");
            if (res.ok) { const data = await res.json(); setPosts(data.posts || []); }
        } catch {} finally { setLoading(false); }
    }

    useEffect(() => { fetchPosts(); }, []);

    const publishedCount = posts.filter((p) => p.published).length;
    const draftCount = posts.filter((p) => !p.published).length;
    const filteredPosts = search
        ? posts.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.slug.toLowerCase().includes(search.toLowerCase()) ||
            p.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
        ) : posts;

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Blog Posts</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Manage your blog content and SEO</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={fetchPosts} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    </button>
                    <Link href="/admin/posts/new"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors">
                        <Plus size={15} /> New Post
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50"><FileText size={16} className="text-blue-500" /></div>
                    <div><p className="text-lg font-bold text-gray-900">{posts.length}</p><p className="text-[11px] text-gray-400">Total Posts</p></div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-50"><Eye size={16} className="text-green-500" /></div>
                    <div><p className="text-lg font-bold text-gray-900">{publishedCount}</p><p className="text-[11px] text-gray-400">Published</p></div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-50"><FileEdit size={16} className="text-amber-500" /></div>
                    <div><p className="text-lg font-bold text-gray-900">{draftCount}</p><p className="text-[11px] text-gray-400">Drafts</p></div>
                </div>
            </div>

            <div className="mb-4">
                <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input type="text" placeholder="Search posts by title, slug, or tag..."
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 focus:outline-none transition-all" />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {search ? `Search Results (${filteredPosts.length})` : "All Posts"}
                </h2>
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : <PostTable posts={filteredPosts} />}
            </div>
        </div>
    );
}
