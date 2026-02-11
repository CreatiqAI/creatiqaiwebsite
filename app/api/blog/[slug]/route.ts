import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, updatePost, deletePost } from "@/lib/blog-store";
import { isAuthenticated } from "@/lib/api-auth";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const post = await getPostBySlug(params.slug);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        if (!(await isAuthenticated(request))) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const post = await updatePost(params.slug, body);

        return NextResponse.json(post);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        if (!(await isAuthenticated(request))) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await deletePost(params.slug);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
