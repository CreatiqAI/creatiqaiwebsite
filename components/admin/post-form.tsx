"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, EyeOff } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase";

interface PostFormProps {
    initialData?: {
        title: string;
        excerpt: string;
        content: string;
        cover_image: string;
        tags: string[];
        seo_title: string;
        seo_description: string;
        seo_keywords: string[];
        geo_target: string;
        published: boolean;
    };
    slug?: string;
    mode: "create" | "edit";
}

export function PostForm({ initialData, slug, mode }: PostFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: initialData?.title || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        cover_image: initialData?.cover_image || "",
        tags: initialData?.tags?.join(", ") || "",
        seo_title: initialData?.seo_title || "",
        seo_description: initialData?.seo_description || "",
        seo_keywords: initialData?.seo_keywords?.join(", ") || "",
        geo_target: initialData?.geo_target || "",
        published: initialData?.published ?? false,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError("");

        const supabase = createBrowserSupabase();
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token || "";

        const payload = {
            title: form.title,
            excerpt: form.excerpt,
            content: form.content,
            cover_image: form.cover_image || undefined,
            tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            seo_title: form.seo_title || undefined,
            seo_description: form.seo_description || undefined,
            seo_keywords: form.seo_keywords.split(",").map((k) => k.trim()).filter(Boolean),
            geo_target: form.geo_target || undefined,
            published: form.published,
        };

        try {
            const url = mode === "create" ? "/api/blog" : `/api/blog/${slug}`;
            const method = mode === "create" ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save post");
            }

            router.push("/admin/posts");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    const inputClass = "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-50 focus:outline-none transition-all placeholder:text-gray-300";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
    const smallInputClass = "w-full px-3 py-2 rounded-lg border border-gray-200 text-gray-900 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-50 focus:outline-none transition-all placeholder:text-gray-300";

    return (
        <form onSubmit={handleSubmit} className="space-y-5 max-w-4xl">
            {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                <div>
                    <label className={labelClass}>Title *</label>
                    <input
                        type="text"
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className={inputClass}
                        placeholder="Blog post title"
                    />
                </div>

                <div>
                    <label className={labelClass}>Excerpt</label>
                    <textarea
                        value={form.excerpt}
                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        rows={2}
                        className={inputClass + " resize-y"}
                        placeholder="Short description for listing and SEO"
                    />
                </div>

                <div>
                    <label className={labelClass}>Content (HTML) *</label>
                    <textarea
                        required
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        rows={15}
                        className={inputClass + " font-mono resize-y"}
                        placeholder="<p>Your blog content in HTML...</p>"
                    />
                </div>

                <div>
                    <label className={labelClass}>Cover Image URL</label>
                    <input
                        type="url"
                        value={form.cover_image}
                        onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                        className={inputClass}
                        placeholder="https://..."
                    />
                </div>

                <div>
                    <label className={labelClass}>Tags (comma-separated)</label>
                    <input
                        type="text"
                        value={form.tags}
                        onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        className={inputClass}
                        placeholder="AI chatbot, WhatsApp automation, business"
                    />
                </div>
            </div>

            {/* SEO Fields */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">SEO Settings</h3>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">SEO Title</label>
                    <input
                        type="text"
                        value={form.seo_title}
                        onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                        className={smallInputClass}
                        placeholder="Override title for search engines"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">SEO Description</label>
                    <textarea
                        value={form.seo_description}
                        onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                        rows={2}
                        className={smallInputClass + " resize-y"}
                        placeholder="Meta description for search engines"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">SEO Keywords (comma-separated)</label>
                    <input
                        type="text"
                        value={form.seo_keywords}
                        onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
                        className={smallInputClass}
                        placeholder="keyword 1, keyword 2, keyword 3"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Geo Target (country code)</label>
                    <input
                        type="text"
                        value={form.geo_target}
                        onChange={(e) => setForm({ ...form, geo_target: e.target.value })}
                        className={smallInputClass}
                        placeholder="MY, SG, ID, or leave empty for global"
                    />
                </div>
            </div>

            {/* Publish toggle + Submit */}
            <div className="flex items-center justify-between pt-2">
                <button
                    type="button"
                    onClick={() => setForm({ ...form, published: !form.published })}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        form.published
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                    }`}
                >
                    {form.published ? <Eye size={15} /> : <EyeOff size={15} />}
                    {form.published ? "Published" : "Draft"}
                </button>

                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors disabled:opacity-50"
                >
                    <Save size={15} />
                    {saving ? "Saving..." : mode === "create" ? "Create Post" : "Update Post"}
                </button>
            </div>
        </form>
    );
}
