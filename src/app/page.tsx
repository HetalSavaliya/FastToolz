"use client";

import AdSlot from "@/components/AdSlot";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faDownload,
  faImage,
  faFileLines,
  faScissors,
  faLock,
  faUnlock,
  faFileSignature,
  faRotate,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";

// Tool list with FontAwesome icons and descriptions
const tools = [
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
    name: "Image Resizer",
    description: "Resize, compress, and optimize images instantly.",
    path: "/tools/image-resize",
    icon: faImage,
  },
  {
    name: "Text to PDF",
    description: "Convert plain text files into PDFs.",
    path: "/tools/text-to-pdf",
    icon: faFileLines,
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
];

export default function HomePage() {
  return (
    <main className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        🚀 Explore Free Online Tools
      </h1>
      <div className="text-center text-gray-600 mb-6">
        <p>100% free browser-based tools</p>
        <p>
          Lightweight browser tools for PDFs, images, videos, and more.
          required.
        </p>
        <p>— no login required!</p>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
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
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-[#66AF85]">
                  {tool.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Ad Slot */}
      <div className="mt-12">
        <AdSlot />
      </div>
    </main>
  );
}

// docker-compose up --build tool-app-dev
