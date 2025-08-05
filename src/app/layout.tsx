// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stories, Colors, and Learning for Young Minds",
  description: "A fun and free way for kids to learn basic English! Books, games, and activities for Std 1 to 5.",
  keywords: "kids learning, english for kids, std 1 to 5, reading practice, free worksheets, gujarati hindi english",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8822732191267343"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-gray-900 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow mx-auto max-w-6xl px-6 py-10 ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
