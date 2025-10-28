"use client";

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
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8822732191267343"
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
      </motion.main>
    </div>
  );
}
