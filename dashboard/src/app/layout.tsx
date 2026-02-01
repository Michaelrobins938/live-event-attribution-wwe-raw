import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
    title: "Live Event Attribution | Causal Engine",
    description: "Real-time correlation for broadcast events",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${mono.variable} ${mono.className} font-mono antialiased`}>{children}</body>
        </html>
    );
}
