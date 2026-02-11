-- Page Views Tracking Table
-- Run this in Supabase SQL Editor AFTER the posts table is created

CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_slug TEXT NOT NULL REFERENCES posts(slug) ON DELETE CASCADE,
    country TEXT,
    city TEXT,
    referrer TEXT,
    viewed_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookups by post
CREATE INDEX IF NOT EXISTS idx_page_views_slug ON page_views(post_slug);

-- Index for date-based analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(viewed_at DESC);

-- Index for geo analytics
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country);

-- RLS: allow inserts from anon (tracking), reads from service role
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views"
    ON page_views
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Service role can read page views"
    ON page_views
    FOR SELECT
    USING (true);

-- Also create a simple site_visits table for overall traffic tracking
CREATE TABLE IF NOT EXISTS site_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path TEXT NOT NULL,
    country TEXT,
    city TEXT,
    referrer TEXT,
    visited_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_site_visits_date ON site_visits(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_visits_path ON site_visits(path);
CREATE INDEX IF NOT EXISTS idx_site_visits_country ON site_visits(country);

ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert site visits"
    ON site_visits
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Anyone can read site visits"
    ON site_visits
    FOR SELECT
    USING (true);
