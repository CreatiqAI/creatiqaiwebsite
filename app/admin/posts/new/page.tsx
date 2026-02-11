"use client";

import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-900">Create New Post</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Write and publish a new blog post</p>
                </div>
                <PostForm mode="create" />
            </div>
        </div>
    );
}
