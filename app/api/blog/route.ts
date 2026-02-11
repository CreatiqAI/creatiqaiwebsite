import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/blog-store";
import { isAuthenticated } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const tag = searchParams.get("tag") || undefined;
        const geo = searchParams.get("geo") || undefined;
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || undefined;
        const published = searchParams.get("published") !== "false";

        const result = await getAllPosts({ published, tag, geo, page, limit, search });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        if (!(await isAuthenticated(request))) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        if (!body.title || !body.content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            );
        }

        const post = await createPost(body);

        return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
