"use client";

import AdSlot from "@/components/AdSlot";
import { motion } from "framer-motion";
import Script from "next/script";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      {/* Google AdSense Script */}
      <Script
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous"
      />

      {/* Animated Page Content */}
      <motion.main
        className="flex-grow w-full max-w-5xl mx-auto p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-md transition-colors duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
        <div className="hidden lg:block fixed right-6 top-40 w-72">
          <AdSlot
            adClient="ca-pub-8822732191267343"
            adSlot="2856658891"
            style={{ minHeight: "250px" }}
          />
        </div>
        <div className="mt-10">
          <AdSlot
            adClient="ca-pub-8822732191267343"
            adSlot="1234567890"
            style={{ minHeight: "250px" }}
          />
        </div>
      </motion.main>
    </div>
  );
}
