import { isSupabaseConfigured, supabaseAdmin } from "./supabase";
import slugify from "slugify";
import type { BlogPost, BlogPostCreateInput } from "./types/blog";

export async function getAllPosts(options?: {
    published?: boolean;
    tag?: string;
    geo?: string;
    page?: number;
    limit?: number;
    search?: string;
}): Promise<{ posts: BlogPost[]; total: number }> {
    if (!isSupabaseConfigured()) {
        return { posts: [], total: 0 };
    }

    const { published = true, tag, geo, page = 1, limit = 10, search } = options || {};

    let query = supabaseAdmin
        .from("posts")
        .select("*", { count: "exact" });

    if (published !== undefined) {
        query = query.eq("published", published);
    }

    if (tag) {
        query = query.contains("tags", [tag]);
    }

    if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    if (geo) {
        query = query.order("geo_target", { ascending: false, nullsFirst: false });
    }

    query = query
        .order("created_at", { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return { posts: (data as BlogPost[]) || [], total: count || 0 };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabaseAdmin
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) return null;
    return data as BlogPost;
}

export async function createPost(input: BlogPostCreateInput): Promise<BlogPost> {
    if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured");
    }

    const slug = slugify(input.title, { lower: true, strict: true });

    const post = {
        slug,
        title: input.title,
        content: input.content,
        excerpt: input.excerpt || input.content.replace(/<[^>]*>/g, "").slice(0, 160),
        cover_image: input.cover_image || null,
        author: input.author || "Creatiq AI",
        tags: input.tags || [],
        seo_title: input.seo_title || input.title,
        seo_description: input.seo_description || input.excerpt || "",
        seo_keywords: input.seo_keywords || [],
        geo_target: input.geo_target || null,
        published: input.published ?? false,
    };

    const { data, error } = await supabaseAdmin
        .from("posts")
        .insert(post)
        .select()
        .single();

    if (error) throw error;
    return data as BlogPost;
}

export async function updatePost(
    slug: string,
    input: Partial<BlogPostCreateInput>
): Promise<BlogPost> {
    if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured");
    }

    const updates: Record<string, unknown> = { ...input, updated_at: new Date().toISOString() };

    if (input.title) {
        updates.slug = slugify(input.title, { lower: true, strict: true });
    }

    const { data, error } = await supabaseAdmin
        .from("posts")
        .update(updates)
        .eq("slug", slug)
        .select()
        .single();

    if (error) throw error;
    return data as BlogPost;
}

export async function deletePost(slug: string): Promise<boolean> {
    if (!isSupabaseConfigured()) {
        throw new Error("Supabase is not configured");
    }

    const { error } = await supabaseAdmin
        .from("posts")
        .delete()
        .eq("slug", slug);

    if (error) throw error;
    return true;
}
