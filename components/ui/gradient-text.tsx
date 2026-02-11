"use client";

export function GradientText({
    children,
    className = "",
    from = "from-blue-600",
    to = "to-violet-600",
}: {
    children: React.ReactNode;
    className?: string;
    from?: string;
    to?: string;
}) {
    return (
        <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${from} ${to} ${className}`}
        >
            {children}
        </span>
    );
}
