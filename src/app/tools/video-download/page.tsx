"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faLink,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const categories = ["YouTube", "Vimeo", "Facebook", "Instagram"];

export default function VideoDownloadPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [url, setUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetDownloadLink = async () => {
    if (!selectedCategory || !url) {
      alert("Please select a category and enter a valid URL.");
      return;
    }

    setLoading(true);
    setDownloadLink(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selectedCategory, url }),
      });

      const data = await res.json();

      if (res.ok) {
        setDownloadLink(data.downloadLink);
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      alert("Failed to contact the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      {/* 🔙 Back */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[#66AF85] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* 🔧 Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FontAwesomeIcon icon={faVideo} className="text-[#66AF85]" />
          Download Videos
        </h1>
        <p className="text-gray-600 mt-2">
          Select a platform, paste your video link, and download it easily.
        </p>
      </div>

      {/* 🧩 Category Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Video Platform:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setDownloadLink(null);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#66AF85]"
        >
          <option value="">-- Choose platform --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 🌐 URL Input */}
      {selectedCategory && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paste video URL:
          </label>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faLink} className="text-gray-400" />
            <input
              type="url"
              placeholder={`https://${selectedCategory}.com/video...`}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#66AF85]"
            />
          </div>
        </div>
      )}

      {/* 🔘 Get Link Button */}
      {selectedCategory && (
        <button
          onClick={handleGetDownloadLink}
          disabled={loading || !url}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#58a277] disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Get Download Link"}
        </button>
      )}

      {/* ✅ Download Link */}
      {downloadLink && (
        <div className="mt-6">
          <a
            href={downloadLink}
            download
            className="inline-flex items-center text-[#66AF85] underline font-medium"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Download Video
          </a>
        </div>
      )}
    </main>
  );
}
