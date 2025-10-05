"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AdSlot from "@/components/AdSlot";

import { defaultSEO } from "@/lib/seo";
import { categories } from "@/data/categories";

export const metadata = defaultSEO;

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
    <main className="px-6 py-10 max-w-6xl mx-auto">
      {/* Top ad */}
      <div className="mb-8">
        <AdSlot adClient="ca-pub-8822732191267343" adSlot="7404255757" />
      </div>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        🚀 Explore Free Online Tools
      </h1>
      <div className="text-center text-gray-600 mb-8">
        <p>100% free browser-based tools</p>
        <p>
          Lightweight browser tools for PDFs, images, videos, and more — no
          login required!
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#66AF85] focus:outline-none"
        />
      </div>

      {/* Categories */}
      {filteredCategories.map(
        (category) =>
          category.tools.length > 0 && (
            <section key={category.title} className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.path}
                    className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-xl hover:bg-gradient-to-br hover:from-[#f0fdf4] hover:to-[#ecfdf5] transition-all duration-200 p-6 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 flex items-center justify-center bg-[#66AF85]/10 text-[#66AF85] rounded-full text-xl group-hover:scale-110 transition-transform duration-200">
                          <FontAwesomeIcon icon={tool.icon} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#66AF85]">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
      )}

      {/* Side ad (for large screens) */}
      <div className="hidden lg:block fixed right-0 top-32 w-72">
        <AdSlot
          adClient="ca-pub-8822732191267343"
          adSlot="2856658891"
          style={{ minHeight: "250px" }}
        />
      </div>

      {/* Bottom Ad Slot */}
      <div className="my-8">
        <AdSlot adClient="ca-pub-8822732191267343" adSlot="1234567890" />
      </div>
    </main>
  );
}
