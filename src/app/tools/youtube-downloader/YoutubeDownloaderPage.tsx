"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faRotateLeft,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function YoutubeDownloaderPage() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"mp3" | "mp4">("mp3");
  const [category, setCategory] = useState("music"); // optional - customize if needed
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!url.trim()) {
      setErrorMessage("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const apiUrl = `http://localhost:8000/video/download?url=${encodeURIComponent(
        url
      )}&format=${format}&category=${category}`;

      // ✅ Directly use axios instead of ApiGet for blob response
      const response = await axios.get(apiUrl, { responseType: "blob" });

      // ✅ Extract filename from headers
      let filename =
        format === "mp3" ? "youtube-audio.mp3" : "youtube-video.mp4";

      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="?(.+?)"?$/i);
        if (matches?.[1]) filename = decodeURIComponent(matches[1]);
      }

      // ✅ Create blob and trigger download
      const blob = new Blob([response.data], {
        type: format === "mp3" ? "audio/mpeg" : "video/mp4",
      });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.setAttribute("download", filename);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);

      console.log(`✅ Downloaded file: ${filename}`);
    } catch (err: unknown) {
      console.error("❌ Download error:", err);

      let message = "Download failed. Please try again.";

      if (axios.isAxiosError(err)) {
        // Axios-specific error
        if (err.response?.data) {
          try {
            const text = await err.response.data.text();
            const json = JSON.parse(text);
            if (json.error) message = json.error;
          } catch {
            message = `Request failed with status ${err.response?.status}`;
          }
        } else if (err.message) {
          message = err.message;
        }
      } else if (err instanceof Error) {
        // Generic JS Error
        message = err.message;
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrl("");
    setErrorMessage(null);
  };

  return (
    <main className="w-full px-4 py-8 text-[var(--foreground)] transition-colors duration-500">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[var(--accent)] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-[var(--foreground)] mb-2">
          <FontAwesomeIcon
            icon={faPlayCircle}
            className="text-[var(--accent)]"
          />
          YouTube Downloader
        </h1>
        <p className="opacity-80">
          Download YouTube videos as high-quality MP3 or MP4 — fast, safe, and
          free.
        </p>
      </div>

      {/* Input + Controls */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 bg-[var(--card)] border border-[var(--border)] p-4 rounded-lg shadow-sm">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-[var(--foreground)]">
            🎥 YouTube Video URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="w-full border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1 text-[var(--foreground)]">
            🎧 Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as "mp3" | "mp4")}
            className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
          >
            <option value="mp3">MP3 (Audio)</option>
            <option value="mp4">MP4 (Video)</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1 text-[var(--foreground)]">
            📂 Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
          >
            <option value="music">Music</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

        <div className="flex gap-3 mt-2 md:mt-0">
          <button
            onClick={handleDownload}
            disabled={loading}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <FontAwesomeIcon icon={faDownload} /> Download
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card)] transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
            Reset
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-500 mt-4 text-sm">{errorMessage}</p>
      )}

      <section className="mt-16 pt-8 border-t border-gray-200 text-[var(--foreground)]">
        <h2 className="text-3xl font-bold mb-4">🎬 Free YouTube Downloader</h2>
        <p className="text-lg mb-6">
          Convert and download YouTube videos in <strong>HD MP4</strong> or
          <strong> high-quality MP3</strong> format. 100% free, secure, and
          unlimited.
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>🔊 Download MP3 with crystal-clear 320kbps sound</li>
          <li>🎥 Save MP4 videos in HD (720p/1080p where available)</li>
          <li>⚡ No ads, no login — just clean conversion</li>
        </ul>
      </section>
    </main>
  );
}
