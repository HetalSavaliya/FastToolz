"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

export default function VideoToMP3Page() {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!videoUrl) return alert("Enter a YouTube video URL");
    setLoading(true);

    try {
      const response = await fetch("/api/video-to-mp3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Conversion failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      alert(err.message || "Failed to convert video");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setVideoUrl("");
    setDownloadUrl(null);
  };

  return (
    <main className="w-full min-h-screen px-6 py-10">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[#66AF85] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-gray-800">
        <FontAwesomeIcon icon={faMusic} /> Video to MP3
      </h1>
      <p className="text-gray-600 mb-6">
        Paste a YouTube URL to download audio as MP3.
      </p>

      {/* Input & Buttons */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#66AF85] outline-none"
        />
        <button
          onClick={handleConvert}
          disabled={loading}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            "Converting..."
          ) : (
            <>
              <FontAwesomeIcon icon={faDownload} /> Convert
            </>
          )}
        </button>
        <button
          onClick={handleReset}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      {/* Download Link */}
      {downloadUrl && (
        <div className="mt-6">
          <a
            href={downloadUrl}
            download="audio.mp3"
            className="inline-flex items-center gap-2 text-[#66AF85] font-medium underline"
          >
            <FontAwesomeIcon icon={faDownload} /> Download MP3
          </a>
        </div>
      )}
    </main>
  );
}
