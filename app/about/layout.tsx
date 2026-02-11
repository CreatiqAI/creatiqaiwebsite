import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Meet the team behind Creatiq AI - AI solutions for businesses.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
