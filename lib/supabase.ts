import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.");
    }
    if (!_supabase) {
        _supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
    return _supabase;
}

function getSupabaseAdmin(): SupabaseClient {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.");
    }
    if (!_supabaseAdmin) {
        _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);
    }
    return _supabaseAdmin;
}

export const supabase = new Proxy({} as SupabaseClient, {
    get(_, prop) {
        return (getSupabaseClient() as any)[prop];
    },
});

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
    get(_, prop) {
        return (getSupabaseAdmin() as any)[prop];
    },
});

export function isSupabaseConfigured(): boolean {
    return !!(supabaseUrl && supabaseAnonKey);
}

// Browser client for Supabase Auth (client components)
export function createBrowserSupabase(): SupabaseClient {
    return createClient(supabaseUrl, supabaseAnonKey);
}
