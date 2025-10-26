"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import AdSlot from "@/components/AdSlot";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Google AdSense script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8822732191267343"
        crossOrigin="anonymous"
      />

      {/* Page content with animation */}
      <motion.main
        className="flex-grow w-full mx-auto px-6 py-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.main>

      {/* Optional bottom ad */}
      <div className="mt-16">
        <AdSlot adClient="ca-pub-8822732191267343" adSlot="1234567890" />
      </div>
    </div>
  );
}
