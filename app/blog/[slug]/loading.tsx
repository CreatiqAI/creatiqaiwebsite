export default function BlogPostLoading() {
    return (
        <main className="min-h-screen bg-[#050510] pt-28 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Back link */}
                <div className="h-5 w-24 bg-white/5 rounded animate-pulse mb-8" />

                {/* Title */}
                <div className="h-10 w-full bg-white/5 rounded-lg animate-pulse mb-4" />
                <div className="h-10 w-2/3 bg-white/5 rounded-lg animate-pulse mb-6" />

                {/* Meta */}
                <div className="flex gap-4 mb-8">
                    <div className="h-5 w-28 bg-white/5 rounded animate-pulse" />
                    <div className="h-5 w-20 bg-white/5 rounded animate-pulse" />
                </div>

                {/* Cover image */}
                <div className="aspect-video w-full bg-white/5 rounded-2xl animate-pulse mb-10" />

                {/* Content lines */}
                <div className="space-y-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
                    ))}
                </div>
            </div>
        </main>
    );
}
