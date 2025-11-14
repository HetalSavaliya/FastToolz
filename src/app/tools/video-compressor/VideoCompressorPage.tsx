"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faVideo,
  faCompress,
  faRotateLeft,
  faDownload,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UploadArea from "@/components/UploadArea";

export default function VideoCompressorPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("video/")) return;
    setVideoFile(file);
    setCompressedBlob(null);
  };

  const handleCompress = async () => {
    if (!videoFile) return;
    setLoading(true);

    // Simulate compression (replace with API or ffmpeg logic)
    setTimeout(() => {
      const simulatedBlob = new Blob([new Uint8Array(1024)], {
        type: "video/mp4",
      });
      setCompressedBlob(simulatedBlob);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setVideoFile(null);
    setCompressedBlob(null);
  };

  const handleDownload = () => {
    if (!compressedBlob) return;
    const url = URL.createObjectURL(compressedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download =
      videoFile?.name.replace(".", "-compressed.") || "compressed.mp4";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="w-full px-4 py-6 transition-colors duration-500 text-[var(--foreground)]">
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
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
          🎞️ Video Compressor
        </h1>
        <p className="opacity-80">
          Upload and compress your video files to reduce size while maintaining
          quality.
        </p>
      </div>

      {/* Upload Area */}
      <UploadArea
        title="Drag & drop your videos here"
        subtitle="or click to browse — supports single video files"
        icon={faVideo}
        accept="video/*"
        multiple={false}
        onFileChange={(file) => handleFileChange(file as File)}
      />

      {/* File Info */}
      {videoFile && (
        <div className="mt-6 mb-6 p-4 border border-[var(--border)] rounded-lg bg-[var(--card)] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faVideo}
              className="text-[var(--accent)] text-2xl"
            />
            <div>
              <p className="font-medium">{videoFile.name}</p>
              <p className="text-sm opacity-70">
                {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="text-red-500 hover:text-red-700 transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </div>
      )}

      {/* Controls */}
      {videoFile && (
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
          <button
            onClick={handleCompress}
            disabled={loading}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faCompress} />
            {loading ? "Compressing..." : "Compress Video"}
          </button>

          <button
            onClick={handleReset}
            className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card)] transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
            Reset
          </button>
        </div>
      )}

      {/* Download */}
      {compressedBlob && (
        <div className="mt-6 p-4 border border-[var(--accent)] bg-[var(--card)] rounded-lg shadow-md">
          <h3 className="font-medium text-[var(--accent)] mb-2">
            ✅ Compression complete — your video is ready!
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download Compressed Video
          </button>
        </div>
      )}

      {/* Information Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2">
          🎥 Smarter Compression: Save Space Without Sacrificing Quality
        </h2>
        <p className="text-lg text-[var(--foreground)] mb-8">
          Large video files can be difficult to share or upload. Our{" "}
          <strong>Video Compressor</strong> intelligently reduces file size
          while keeping your footage crisp, clear, and ready for any platform.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🌐 Enhanced Shareability
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Faster Uploads:</strong> Quickly share your videos
                across social media, YouTube, and cloud platforms.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Email Ready:</strong> Compress large clips to easily fit
                email attachment limits.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Optimized for Web:</strong> Reduce load times and
                improve user experience on websites.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              💾 Efficient & Reliable Compression
            </h3>
            <ol className="space-y-4 text-[var(--foreground)] list-decimal pl-5">
              <li>
                <strong>Save Storage:</strong> Free up space on your devices and
                cloud accounts.
              </li>
              <li>
                <strong>Maintain Quality:</strong> Balanced compression to keep
                visuals sharp.
              </li>
              <li>
                <strong>Quick Processing:</strong> Get smaller files in seconds
                without hassle.
              </li>
            </ol>

            <div className="mt-6 p-4 border border-dashed border-[var(--accent)] rounded-lg text-center">
              <p className="text-sm text-[var(--foreground)]">
                💡 Tip: Aim for up to <strong>50%</strong> smaller size while
                preserving clarity.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Start compressing your videos and make sharing effortless today!
        </p>
      </section>
    </main>
  );
}
