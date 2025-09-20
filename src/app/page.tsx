"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faScissors,
  faLock,
  faUnlock,
  faFileWord,
  faRotate,
  faFileSignature,
  faFileLines,
  faCompress,
  faImage,
  faTextHeight,
  faFont,
  faKey,
  faCode,
  faRulerCombined,
  faPlay,
  faQrcode,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import AdSlot from "@/components/AdSlot";

const categories = [
  {
    title: "📄 PDF Tools",
    tools: [
      {
        name: "PDF Merge",
        description: "Combine multiple PDFs into one document easily.",
        path: "/tools/pdf-merge",
        icon: faFilePdf,
      },
      {
        name: "PDF Splitter",
        description: "Split large PDFs into smaller files.",
        path: "/tools/pdf-split",
        icon: faScissors,
      },
      {
        name: "PDF Password Protect",
        description: "Encrypt your PDF with a secure password.",
        path: "/tools/pdf-protect",
        icon: faLock,
      },
      {
        name: "PDF Unlock",
        description: "Remove password protection from secured PDFs.",
        path: "/tools/pdf-unlock",
        icon: faUnlock,
      },
      {
        name: "PDF to Word",
        description: "Convert your PDF documents into editable Word files.",
        path: "/tools/pdf-to-word",
        icon: faFileWord,
      },
      {
        name: "PDF Rotate",
        description: "Rotate pages in your PDF document.",
        path: "/tools/pdf-rotate",
        icon: faRotate,
      },
      {
        name: "PDF Sign",
        description: "Digitally sign PDF documents.",
        path: "/tools/pdf-sign",
        icon: faFileSignature,
      },
      {
        name: "Text to PDF",
        description: "Convert plain text files into PDFs.",
        path: "/tools/text-to-pdf",
        icon: faFileLines,
      },
    ],
  },
  {
    title: "🖼️ Image Tools",
    tools: [
      {
        name: "Image Compressor",
        description: "Compress images without losing quality.",
        path: "/tools/image-compressor",
        icon: faCompress,
      },
      {
        name: "Image Resizer",
        description: "Resize, compress, and optimize images instantly.",
        path: "/tools/image-resize",
        icon: faImage,
      },
    ],
  },
  {
    title: "🎵 Audio & Video Tools",
    tools: [
      {
        name: "Video to MP3",
        description: "Download audio from YouTube videos in MP3 format.",
        path: "/tools/video-to-mp3",
        icon: faMusic, // make sure to import this icon
      },
    ],
  },
  {
    title: "📝 Text & Utility Tools",
    tools: [
      {
        name: "Text Case Converter",
        description: "Convert text to UPPERCASE, lowercase, Title Case, etc.",
        path: "/tools/text-case-converter",
        icon: faTextHeight,
      },
      {
        name: "Word Counter",
        description: "Count words, characters, and estimate reading time.",
        path: "/tools/word-counter",
        icon: faFont,
      },
      {
        name: "Password Generator",
        description: "Generate secure random passwords with one click.",
        path: "/tools/password-generator",
        icon: faKey,
      },
      {
        name: "JSON Formatter",
        description: "Validate & format JSON with syntax highlighting.",
        path: "/tools/json-formatter",
        icon: faCode,
      },
      {
        name: "Unit Converter",
        description: "Convert length, weight, temperature, and more units.",
        path: "/tools/unit-converter",
        icon: faRulerCombined,
      },
    ],
  },
  {
    title: "⚡ Developer Tools",
    tools: [
      {
        name: "JS Runner",
        description: "Write and run JavaScript code online.",
        path: "/tools/js-runner",
        icon: faPlay,
      },
      {
        name: "QR Code Generator",
        description: "Generate QR codes instantly from text or URLs.",
        path: "/tools/qr-code-generator",
        icon: faQrcode,
      },
    ],
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");

  // Filter tools by search text (case-insensitive)
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

      {/* Bottom Ad Slot */}
      <div className="my-8">
        <AdSlot />
      </div>
    </main>
  );
}
