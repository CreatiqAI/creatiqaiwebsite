"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PostForm } from "@/components/admin/post-form";
import type { BlogPost } from "@/lib/types/blog";

export default function EditPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/blog/${slug}`);
                if (res.ok) setPost(await res.json());
                else setError("Post not found");
            } catch { setError("Failed to load post"); } finally { setLoading(false); }
        }
        fetchPost();
    }, [slug]);

    if (loading) return (
        <div className="p-8 flex items-center justify-center min-h-[60vh]">
            <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (error || !post) return (
        <div className="p-8 text-center py-20">
            <p className="text-red-500 mb-3">{error || "Post not found"}</p>
            <Link href="/admin/posts" className="text-blue-500 hover:text-blue-600 text-sm">Back to Posts</Link>
        </div>
    );

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-900">Edit Post</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Editing: {post.title}</p>
                </div>
                <PostForm mode="edit" slug={slug} initialData={{
                    title: post.title, excerpt: post.excerpt, content: post.content,
                    cover_image: post.cover_image || "", tags: post.tags || [],
                    seo_title: post.seo_title || "", seo_description: post.seo_description || "",
                    seo_keywords: post.seo_keywords || [], geo_target: post.geo_target || "",
                    published: post.published,
                }} />
            </div>
        </div>
    );
}
