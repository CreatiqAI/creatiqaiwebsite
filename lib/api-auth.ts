import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Checks if a request is authenticated via either:
 * 1. x-api-key header (for n8n / machine-to-machine)
 * 2. Authorization: Bearer <token> (for admin dashboard via Supabase Auth)
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
    // Check API key first (n8n)
    const apiKey = request.headers.get("x-api-key");
    if (apiKey && apiKey === process.env.BLOG_API_KEY) {
        return true;
    }

    // Check Supabase auth token (admin dashboard)
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.slice(7);
        try {
            const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
            if (user && !error) return true;
        } catch {}
    }

    return false;
}
