-- Creatiq AI Blog - Posts Table
-- Run this SQL in your Supabase SQL Editor: https://foyjyxcjglnvvlzofaei.supabase.co
-- Go to: SQL Editor > New Query > Paste this > Run

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    author TEXT DEFAULT 'Creatiq AI',
    tags TEXT[] DEFAULT '{}',
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT[],
    geo_target TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Index for filtering by published status and date
CREATE INDEX IF NOT EXISTS idx_posts_published_date ON posts(published, created_at DESC);

-- Index for tag filtering
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);

-- Index for geo targeting
CREATE INDEX IF NOT EXISTS idx_posts_geo ON posts(geo_target);
