# Admin Dashboard Guide

## Access

URL: `https://creatiqai.com/admin`

## Login

1. Go to `/admin` (redirects to `/admin/login` if not authenticated)
2. Enter your `BLOG_API_KEY` value as the API key
3. Click "Sign In"

Authentication is stored in sessionStorage (cleared when browser tab closes).

## Dashboard Features

### Post Management
- View all blog posts (published and drafts)
- See stats: total posts, published count, drafts count
- Edit existing posts
- Delete posts (with confirmation)
- Create new posts manually

### Create/Edit Post
- Title, excerpt, and HTML content fields
- Cover image URL
- Tags (comma-separated)
- SEO fields: title override, meta description, keywords
- Geo target: set country code (MY, SG, ID) for geo-targeted content
- Publish toggle: save as draft or publish immediately

## Admin URL Routes

| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard with post list and stats |
| `/admin/login` | Login page |
| `/admin/posts/new` | Create new blog post |
| `/admin/posts/[slug]/edit` | Edit existing blog post |

## Security Notes

- Admin pages are excluded from sitemap and robots.txt
- Admin layout sets `robots: { index: false, follow: false }` metadata
- API write operations require the `x-api-key` header
- Session expires when browser tab is closed
