"use client";

import { motion } from "framer-motion";
export default function HomeHero() {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl "
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          🚀 Discover Free Online Tools
        </h1>
        <p className="text-white/80 text-lg mb-6">
          Simple. Fast. Browser-based tools — no login, no limits.
        </p>
      </motion.div>
    </section>
  );
}
