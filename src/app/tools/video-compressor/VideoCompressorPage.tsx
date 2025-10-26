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
      <section>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
            🎞️ Why Compress Your Videos?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Large video files can be a headache when it comes to sharing,
            uploading, or storing them. Our **Video Compressor** quickly and
            efficiently reduces the file size of your clips, making them easier
            to handle across all platforms—all without a noticeable drop in
            visual quality.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🌐 Improved Shareability
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">📥</span>
                  **Faster Uploads:** Upload videos to YouTube, social media, or
                  cloud storage significantly quicker.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">📧</span>
                  **Email Attachments:** Compress videos to fit within strict
                  email size limits for easy sending.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">💻</span>
                  **Website Optimization:** Use smaller video files on your
                  website to improve loading speed and user experience.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                💾 Save Space and Time
              </h3>
              <ol className="space-y-4 text-gray-600 list-decimal pl-5">
                <li>
                  **Free Up Storage:** Save significant space on your hard
                  drives, phones, and cloud storage accounts.
                </li>
                <li>
                  **Efficient Workflow:** Avoid waiting hours for large files to
                  process or transfer.
                </li>
                <li>
                  **Quality Control:** Our compression balances size reduction
                  with visual fidelity, ensuring your audience still enjoys a
                  clear picture.
                </li>
              </ol>
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-sm font-medium text-gray-500">
                  **Tip:** We aim to reduce file sizes by up to 50% while
                  maintaining the video's original resolution.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-lg text-green-700 font-medium mt-10">
            Start compressing your videos now for hassle-free sharing and
            storage!
          </p>
        </div>
      </section>
    </main>
  );
}
