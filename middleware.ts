import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Get geo data from Vercel's edge runtime
    const country =
        (request as any).geo?.country ||
        request.headers.get("x-vercel-ip-country") ||
        "US";
    const city = (request as any).geo?.city || request.headers.get("x-vercel-ip-city") || "";
    const region = (request as any).geo?.region || "";

    // Set geo headers for server components
    response.headers.set("x-user-country", country);
    response.headers.set("x-user-city", city);
    response.headers.set("x-user-region", region);

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|logo.png).*)"],
};
