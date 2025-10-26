"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import AdSlot from "@/components/AdSlot";
import { categories } from "@/data/categories";

export default function MainContentPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.map((category) => ({
    ...category,
    tools: category.tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase())
    ),
  }));

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
          className="w-full sm:w-2/3 lg:w-1/2 px-6 py-3 border border-gray-300 rounded-3xl shadow-sm focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all text-gray-700"
        />
      </motion.div>

      {/* 🧰 Tools Categories */}
      {filteredCategories.map(
        (category) =>
          category.tools.length > 0 && (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10 border-b-4 border-green-400 inline-block pb-2">
                {category.title}
              </h2>

              {/* Grid of Tools */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
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
                  >
                    <Link
                      href={tool.path}
                      className="block bg-white rounded-2xl border border-gray-200 shadow hover:shadow-2xl hover:border-green-300 hover:-translate-y-1 transform transition-all duration-300 p-6 group"
                    >
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                            <FontAwesomeIcon icon={tool.icon} />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-200">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          )
      )}

      {/* 📢 Side Ad (Large Screens) */}
      <div className="hidden lg:block fixed right-6 top-40 w-72">
        <AdSlot
          adClient="ca-pub-8822732191267343"
          adSlot="2856658891"
          style={{ minHeight: "250px" }}
        />
      </div>

      {/* 📦 Bottom Ad Slot */}
      <div className="mt-20">
        <AdSlot adClient="ca-pub-8822732191267343" adSlot="1234567890" />
      </div>
    </motion.main>
  );
}
