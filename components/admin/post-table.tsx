"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import { createBrowserSupabase } from "@/lib/supabase";

export function PostTable({ posts }: { posts: BlogPost[] }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState<string | null>(null);

    async function handleDelete(slug: string) {
        if (!confirm("Are you sure you want to delete this post?")) return;

        setDeleting(slug);

        try {
            const supabase = createBrowserSupabase();
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token || "";

            const res = await fetch(`/api/blog/${slug}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (res.ok) {
                router.refresh();
                window.location.reload();
            }
        } finally {
            setDeleting(null);
        }
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                <p className="text-base mb-1">No posts yet</p>
                <p className="text-sm">Create your first blog post or wait for n8n to generate one.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left py-2.5 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                        <th className="text-left py-2.5 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="text-left py-2.5 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Tags</th>
                        <th className="text-left py-2.5 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="text-right py-2.5 px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-3 px-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-800 font-medium text-sm line-clamp-1">{post.title}</span>
                                    {post.published && (
                                        <Link href={`/blog/${post.slug}`} target="_blank" className="text-gray-300 hover:text-blue-500 transition-colors">
                                            <ExternalLink size={12} />
                                        </Link>
                                    )}
                                </div>
                            </td>
                            <td className="py-3 px-3">
                                {post.published ? (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                                        <Eye size={11} /> Published
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                        <EyeOff size={11} /> Draft
                                    </span>
                                )}
                            </td>
                            <td className="py-3 px-3">
                                <div className="flex gap-1 flex-wrap">
                                    {post.tags?.slice(0, 2).map((tag) => (
                                        <span key={tag} className="text-[11px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                                            {tag}
                                        </span>
                                    ))}
                                    {post.tags?.length > 2 && (
                                        <span className="text-[11px] text-gray-400">+{post.tags.length - 2}</span>
                                    )}
                                </div>
                            </td>
                            <td className="py-3 px-3 text-xs text-gray-400">
                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </td>
                            <td className="py-3 px-3">
                                <div className="flex items-center justify-end gap-1">
                                    <Link
                                        href={`/admin/posts/${post.slug}/edit`}
                                        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        <Edit2 size={14} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.slug)}
                                        disabled={deleting === post.slug}
                                        className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
