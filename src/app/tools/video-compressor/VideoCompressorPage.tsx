"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCompress } from "@fortawesome/free-solid-svg-icons";

export default function VideoCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCompressed(false);
    }
  };

  const handleCompress = () => {
    if (file) {
      // Here you can integrate ffmpeg.wasm or backend API
      setTimeout(() => setCompressed(true), 1000); // simulate
    }
  };

  const handleClear = () => {
    setFile(null);
    setCompressed(false);
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
        <FontAwesomeIcon icon={faCompress} />
        Video Compressor
      </h1>
      <p className="text-gray-600 mb-6">
        Upload and compress video files to reduce size without losing much
        quality.
      </p>

      {/* File Input */}
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleCompress}
          disabled={!file}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#559970] disabled:opacity-50"
        >
          Compress
        </button>
        <button
          onClick={handleClear}
          disabled={!file}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Clear
        </button>
      </div>

      {/* Output */}
      {file && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="bg-white border rounded-lg p-4 shadow text-center">
            <h3 className="font-semibold mb-1">Original File</h3>
            <p className="text-sm">{file.name}</p>
            <p className="text-sm text-gray-500">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>

          {compressed && (
            <div className="bg-white border rounded-lg p-4 shadow text-center">
              <h3 className="font-semibold mb-1">Compressed File</h3>
              <p className="text-sm">
                {file.name.replace(".", "-compressed.")}
              </p>
              <p className="text-sm text-gray-500">
                ~{(file.size / (1024 * 1024) / 2).toFixed(2)} MB
              </p>
              <button className="mt-3 bg-[#66AF85] text-white px-3 py-1 rounded hover:bg-[#559970]">
                Download
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
