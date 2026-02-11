# n8n Blog Integration Guide

## Overview

n8n automation posts blog articles hourly to the Creatiq AI website via the Blog API.

## API Endpoint

```
POST https://creatiqai.com/api/blog
```

## Authentication

Include the API key in the request header:
```
x-api-key: your-BLOG_API_KEY-value
```

## Request Body (JSON)

```json
{
    "title": "How AI Chatbots Transform E-commerce in 2026",
    "content": "<h2>Introduction</h2><p>Full HTML content here...</p>",
    "excerpt": "A short 1-2 sentence description for listing pages and SEO.",
    "tags": ["AI chatbot", "e-commerce", "automation"],
    "seoTitle": "How AI Chatbots Transform E-commerce | Creatiq AI",
    "seoDescription": "Learn how AI chatbots are revolutionizing e-commerce...",
    "seoKeywords": ["AI chatbot e-commerce", "WhatsApp business automation"],
    "geoTarget": "MY",
    "published": true
}
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Blog post title |
| `content` | Yes | HTML content of the post |
| `excerpt` | No | Short description (auto-generated from content if empty) |
| `tags` | No | Array of tag strings for categorization |
| `seo_title` | No | Override title for search engines |
| `seo_description` | No | Meta description for search engines |
| `seo_keywords` | No | Array of target keyword strings |
| `geo_target` | No | Country code (MY, SG, ID) or empty for global |
| `published` | No | `true` to publish immediately, `false` for draft (default) |
| `cover_image` | No | URL to a cover image |
| `author` | No | Author name (defaults to "Creatiq AI") |

## n8n Workflow Setup

1. **Trigger:** Schedule node - set to run every hour
2. **AI Node:** OpenAI/Claude node to generate blog content with SEO keywords
3. **HTTP Request Node:**
   - Method: `POST`
   - URL: `https://creatiqai.com/api/blog`
   - Headers: `x-api-key: your-api-key`
   - Body Type: JSON
   - Body: the generated blog post data

## Response

### Success (201)
```json
{
    "id": "uuid-here",
    "slug": "auto-generated-from-title",
    "title": "...",
    "published": true,
    "created_at": "2026-02-11T..."
}
```

### Error (401)
```json
{ "error": "Unauthorized" }
```

### Error (400)
```json
{ "error": "Title and content are required" }
```

## Other Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/blog` | No | List published posts |
| GET | `/api/blog?tag=AI&page=1&limit=10` | No | Filter/paginate posts |
| GET | `/api/blog/[slug]` | No | Get single post |
| PUT | `/api/blog/[slug]` | Yes | Update a post |
| DELETE | `/api/blog/[slug]` | Yes | Delete a post |
