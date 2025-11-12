"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import AdSlot from "@/components/AdSlot";
import { categories } from "@/data/categories";
import ManualAd from "@/components/ManualAd";

export default function MainContentPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.map((category) => ({
    ...category,
    tools:
      search.trim() === ""
        ? category.tools
        : category.tools.filter(
            (tool) =>
              tool.name.toLowerCase().includes(search.toLowerCase()) ||
              tool.description.toLowerCase().includes(search.toLowerCase())
          ),
  }));

  const hasResults = filteredCategories.some((cat) => cat.tools.length > 0);

  return (
    <motion.main
      className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 🔍 Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center mb-16"
      >
        <input
          type="text"
          placeholder="🔍 Search for a tool..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 lg:w-1/2 px-6 py-3 border border-[var(--border)] rounded-3xl 
                     shadow-sm focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] 
                     bg-[var(--card)] text-[var(--card-text)] placeholder:text-gray-400 transition-all duration-300"
        />
      </motion.div>

      {/* 🧰 Tools Categories */}
      {hasResults ? (
        <>
          {filteredCategories.map((category, index) =>
            category.tools.length > 0 ? (
              <div key={category.title}>
                {/* Category Section */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-20"
                >
                  <h2
                    className="text-2xl md:text-3xl font-semibold mb-10 
                     border-b-4 border-[var(--accent)] inline-block pb-2 
                     text-[var(--foreground)]"
                  >
                    {category.title}
                  </h2>

                  {/* Tools Grid */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {category.tools.map((tool) => (
                      <motion.div
                        key={tool.name}
                        variants={{
                          hidden: { opacity: 0, y: 40, scale: 0.95 },
                          visible: { opacity: 1, y: 0, scale: 1 },
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="transition-transform duration-500"
                      >
                        <Link
                          href={tool.path}
                          className="group relative block rounded-2xl p-6 border border-transparent
                           bg-[var(--card)] text-[var(--card-text)] shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                           backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]
                           hover:border-[var(--accent)] hover:bg-[color-mix(in srgb,var(--card) 80%,var(--accent) 20%)]"
                        >
                          <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] rounded-2xl blur-xl pointer-events-none" />

                          <div className="flex items-start gap-5 relative z-10">
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 blur-lg opacity-40 bg-[var(--accent)] rounded-full scale-90 transition-all duration-500 group-hover:opacity-70 group-hover:scale-100"></div>
                              <div
                                className="relative w-14 h-14 flex items-center justify-center rounded-full text-2xl
                                  bg-gradient-to-br from-[var(--accent)] to-[color-mix(in srgb,var(--accent)_80%,#00ffd0_20%)]
                                  text-white shadow-lg group-hover:scale-110 transition-transform duration-500"
                              >
                                <FontAwesomeIcon icon={tool.icon} />
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--accent)]">
                                {tool.name}
                              </h3>
                              <p className="text-sm opacity-80 leading-snug">
                                {tool.description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 h-1 w-0 bg-[var(--accent)] rounded-full transition-all duration-500 group-hover:w-full"></div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>

                {/* 👇 Dynamic Ad after each category */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 my-10">
                  <ManualAd
                    adSlot={
                      index % 3 === 0
                        ? "3582034276" // In-feed
                        : index % 3 === 1
                        ? "2033697625" // Multiplex
                        : "4925129437" // Display
                    }
                    format={
                      index % 3 === 0
                        ? "fluid"
                        : index % 3 === 1
                        ? "autorelaxed"
                        : "auto"
                    }
                  />
                </div>
              </div>
            ) : null
          )}
        </>
      ) : (
        <p className="text-center text-[var(--foreground)]/70 mt-20">
          😕 No tools found for "{search}"
        </p>
      )}

      {/* 📢 Side Ad (Large Screens) */}
      <div className="hidden lg:block fixed right-6 top-40 w-72">
        <AdSlot
          adClient="ca-pub-8822732191267343"
          adSlot="7404255757"
          style={{ minHeight: "250px" }}
        />
      </div>

      {/* 📦 Bottom Ad Slot */}
      <div className="mt-20">
        <AdSlot adClient="ca-pub-8822732191267343" adSlot="2856658891" />
      </div>
    </motion.main>
  );
}
