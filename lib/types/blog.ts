export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    cover_image?: string;
    author: string;
    tags: string[];
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string[];
    geo_target?: string;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export interface BlogPostCreateInput {
    title: string;
    content: string;
    excerpt?: string;
    cover_image?: string;
    author?: string;
    tags?: string[];
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string[];
    geo_target?: string;
    published?: boolean;
}
