import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get country from Vercel's injected header
    // Fallback to 'US' for default/unknown
    // We explicitly check for 'MY' in the frontend, so accurate passing is key.
    const country = (request as any).geo?.country || request.headers.get("x-vercel-ip-country") || "US";

    // Set the country in a custom header for the server component to read
    response.headers.set("x-user-country", country);

    return response;
}

export const config = {
    matcher: "/:path*",
};
