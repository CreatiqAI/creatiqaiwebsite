# Creatiq AI Website - Setup Guide

## Prerequisites
- Node.js 18+
- Supabase account (https://supabase.com)
- Vercel account for deployment

## 1. Environment Variables

Copy `.env` to `.env.local` for local development:
```bash
cp .env .env.local
```

Required variables:
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `BLOG_API_KEY` | Secret key for blog API authentication (used by n8n) |
| `ADMIN_PASSWORD` | Password for admin dashboard login |

**Important:** Also set these in your Vercel dashboard under Project Settings > Environment Variables.

## 2. Database Setup

Run these SQL files in order in your Supabase SQL Editor:

1. `database/001_create_posts_table.sql` - Creates the posts table and indexes
2. `database/002_rls_policies.sql` - Sets up Row Level Security
3. `database/003_seed_sample_post.sql` - (Optional) Adds a sample blog post

## 3. Local Development

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

## 4. Deployment

Push to GitHub, then connect to Vercel:
```bash
git add .
git commit -m "Initial deployment"
git push
```

Vercel will auto-build and deploy.
