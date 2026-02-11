import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";
import { isAuthenticated } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
    if (!(await isAuthenticated(request))) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isSupabaseConfigured()) {
        return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }

    try {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

        // Total site visits (all time)
        const { count: totalVisits } = await supabaseAdmin
            .from("site_visits")
            .select("*", { count: "exact", head: true });

        // Visits today
        const { count: todayVisits } = await supabaseAdmin
            .from("site_visits")
            .select("*", { count: "exact", head: true })
            .gte("visited_at", today);

        // Visits last 7 days
        const { count: weekVisits } = await supabaseAdmin
            .from("site_visits")
            .select("*", { count: "exact", head: true })
            .gte("visited_at", sevenDaysAgo);

        // Visits last 30 days
        const { count: monthVisits } = await supabaseAdmin
            .from("site_visits")
            .select("*", { count: "exact", head: true })
            .gte("visited_at", thirtyDaysAgo);

        // Total blog views
        const { count: totalBlogViews } = await supabaseAdmin
            .from("page_views")
            .select("*", { count: "exact", head: true });

        // Top posts by views (last 30 days)
        const { data: topPostsRaw } = await supabaseAdmin
            .from("page_views")
            .select("post_slug")
            .gte("viewed_at", thirtyDaysAgo);

        // Aggregate top posts
        const postCounts: Record<string, number> = {};
        (topPostsRaw || []).forEach((row: any) => {
            postCounts[row.post_slug] = (postCounts[row.post_slug] || 0) + 1;
        });
        const topPosts = Object.entries(postCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([slug, views]) => ({ slug, views }));

        // Top countries (last 30 days)
        const { data: countryData } = await supabaseAdmin
            .from("site_visits")
            .select("country")
            .gte("visited_at", thirtyDaysAgo)
            .not("country", "is", null);

        const countryCounts: Record<string, number> = {};
        (countryData || []).forEach((row: any) => {
            if (row.country) {
                countryCounts[row.country] = (countryCounts[row.country] || 0) + 1;
            }
        });
        const topCountries = Object.entries(countryCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([country, visits]) => ({ country, visits }));

        // Top pages (last 30 days)
        const { data: pageData } = await supabaseAdmin
            .from("site_visits")
            .select("path")
            .gte("visited_at", thirtyDaysAgo);

        const pageCounts: Record<string, number> = {};
        (pageData || []).forEach((row: any) => {
            pageCounts[row.path] = (pageCounts[row.path] || 0) + 1;
        });
        const topPages = Object.entries(pageCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([path, visits]) => ({ path, visits }));

        // Daily visits for last 7 days (for chart)
        const { data: dailyData } = await supabaseAdmin
            .from("site_visits")
            .select("visited_at")
            .gte("visited_at", sevenDaysAgo);

        const dailyCounts: Record<string, number> = {};
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const key = d.toISOString().split("T")[0];
            dailyCounts[key] = 0;
        }
        (dailyData || []).forEach((row: any) => {
            const key = new Date(row.visited_at).toISOString().split("T")[0];
            if (dailyCounts[key] !== undefined) {
                dailyCounts[key]++;
            }
        });
        const dailyVisits = Object.entries(dailyCounts).map(([date, count]) => ({ date, count }));

        return NextResponse.json({
            overview: {
                totalVisits: totalVisits || 0,
                todayVisits: todayVisits || 0,
                weekVisits: weekVisits || 0,
                monthVisits: monthVisits || 0,
                totalBlogViews: totalBlogViews || 0,
            },
            topPosts,
            topCountries,
            topPages,
            dailyVisits,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
