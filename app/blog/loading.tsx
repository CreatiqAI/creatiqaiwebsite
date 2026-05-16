export default function BlogLoading() {
    return (
        <main className="min-h-screen bg-white pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header skeleton */}
                <div className="mb-20 text-center">
                    <div className="h-12 w-40 bg-slate-100 rounded-lg mx-auto mb-6 animate-pulse" />
                    <div className="h-5 w-80 bg-slate-100 rounded-lg mx-auto mb-8 animate-pulse" />
                    <div className="mx-auto w-24 h-[2px] bg-slate-100 animate-pulse" />
                </div>

                {/* Featured post skeleton */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="aspect-video md:aspect-auto md:min-h-[300px] bg-slate-100 animate-pulse" />
                        <div className="p-8 md:p-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
                                <div className="w-8 h-px bg-slate-200" />
                            </div>
                            <div className="flex gap-2">
                                <div className="h-6 w-16 bg-slate-100 rounded-full animate-pulse" />
                                <div className="h-6 w-20 bg-slate-100 rounded-full animate-pulse" />
                            </div>
                            <div className="h-8 w-full bg-slate-100 rounded animate-pulse" />
                            <div className="h-8 w-3/4 bg-slate-100 rounded animate-pulse" />
                            <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
                            <div className="h-4 w-2/3 bg-slate-100 rounded animate-pulse" />
                            <div className="flex justify-between pt-4">
                                <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
                                <div className="h-4 w-20 bg-slate-100 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-slate-100" />
                            <div className="aspect-video bg-slate-100 animate-pulse" />
                            <div className="p-6 space-y-3">
                                <div className="flex gap-2">
                                    <div className="h-6 w-16 bg-slate-100 rounded-full animate-pulse" />
                                    <div className="h-6 w-20 bg-slate-100 rounded-full animate-pulse" />
                                </div>
                                <div className="h-6 w-full bg-slate-100 rounded animate-pulse" />
                                <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
