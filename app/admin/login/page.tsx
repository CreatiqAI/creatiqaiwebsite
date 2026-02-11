"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { createBrowserSupabase } from "@/lib/supabase";

const supabase = createBrowserSupabase();

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                setError("Invalid email or password.");
            } else {
                router.replace("/admin");
            }
        } catch {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#f5f6f8] flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Logo size={28} />
                            <span className="text-lg font-bold text-gray-900">Creatiq AI</span>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 mb-1">Admin Login</h1>
                        <p className="text-gray-400 text-sm">Sign in to manage your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-50 focus:outline-none transition-all"
                                placeholder="admin@creatiqai.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-50 focus:outline-none transition-all"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
