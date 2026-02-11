-- Row Level Security Policies for Posts Table
-- Run this AFTER 001_create_posts_table.sql

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Public read access: anyone can read published posts
CREATE POLICY "Public can read published posts"
    ON posts
    FOR SELECT
    USING (published = true);

-- Service role has full access (used by API routes with service role key)
-- No policy needed — service role key bypasses RLS automatically
