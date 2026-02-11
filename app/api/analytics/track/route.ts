import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
    if (!isSupabaseConfigured()) {
        return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }

    try {
        const body = await request.json();
        const { path, post_slug, referrer } = body;

        // Detect geo from request headers (set by Vercel edge / middleware)
        const country =
            body.country ||
            request.headers.get("x-vercel-ip-country") ||
            request.headers.get("x-user-country") ||
            null;
        const city =
            body.city ||
            request.headers.get("x-vercel-ip-city") ||
            request.headers.get("x-user-city") ||
            null;

        // Track site visit
        if (path) {
            await supabaseAdmin.from("site_visits").insert({
                path,
                country,
                city,
                referrer: referrer || null,
            });
        }

        // Track blog post view
        if (post_slug) {
            await supabaseAdmin.from("page_views").insert({
                post_slug,
                country,
                city,
                referrer: referrer || null,
            });
        }

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ ok: true });
    }
}
