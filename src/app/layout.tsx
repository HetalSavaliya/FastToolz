// src/app/tools/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css"; // Make sure to go up to root if needed
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Online Tools for Everyone",
  description:
    "Useful tools like PDF merger, video downloader, and more for daily productivity.",
  keywords:
    "online tools, pdf merge, video downloader, free tools, productivity",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsense-script-tools"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8822732191267343"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 text-gray-900 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow w-full mx-auto px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
