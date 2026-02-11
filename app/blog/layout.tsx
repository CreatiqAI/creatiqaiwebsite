import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Latest insights on AI chatbots, WhatsApp automation, business digitalization, and AI solutions from Creatiq AI.",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
