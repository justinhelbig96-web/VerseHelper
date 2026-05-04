import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VersePilot — UEFN Verse Code Generator",
    template: "%s | VersePilot",
  },
  description:
    "Generate Verse systems for UEFN in seconds. AI-powered code generation, device setup guides, and compile error fixing for Fortnite Creative creators.",
  keywords: [
    "UEFN",
    "Verse",
    "Fortnite Creative",
    "code generator",
    "UEFN tools",
    "Verse code",
    "AI",
  ],
  authors: [{ name: "VersePilot" }],
  openGraph: {
    title: "VersePilot — UEFN Verse Code Generator",
    description: "Generate Verse systems for UEFN in seconds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VersePilot — UEFN Verse Code Generator",
    description: "Generate Verse systems for UEFN in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
