"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faRotateLeft,
  faImage,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import NextImage from "next/image";
import UploadArea from "@/components/UploadArea";

export default function ImageCompressorPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [loading, setLoading] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    setImageFile(file);
    setCompressedUrl(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setOriginalSize(file.size / 1024); // KB
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleCompress = async () => {
    if (!imageFile) return;
    setLoading(true);

    try {
      const compressedImage = await imageCompression(imageFile, {
        maxSizeMB: quality / 100,
        useWebWorker: true,
      });

      setCompressedSize(compressedImage.size / 1024);

      const reader = new FileReader();
      reader.onloadend = () => {
        setCompressedUrl(reader.result as string);
        setLoading(false);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      };
      reader.readAsDataURL(compressedImage);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert(`Failed to compress image: ${message}`);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setCompressedUrl(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setQuality(80);
  };

  return (
    <main className="w-full px-4 py-6 transition-colors duration-500 text-[var(--foreground)]">
      {/* 🡸 Back Link */}
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
          📉 Image Compressor
        </h1>
        <p className="opacity-80">
          Upload an image, adjust compression quality, and download an optimized
          version — all securely within your browser.
        </p>
      </div>

      {/* Upload Area */}
      <UploadArea
        title="Drag & drop your images here"
        subtitle="or click to browse — supports JPEG, PNG, and more"
        icon={faImage}
        accept="image/*"
        multiple={false}
        onFileChange={(file) => handleFileChange(file as File)}
        onDrop={handleDrop}
      />

      {/* File Details */}
      {imageFile && (
        <div className="mt-6 mb-6 p-4 border border-[var(--border)] rounded-lg bg-[var(--card)] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faImage}
              className="text-[var(--accent)] text-2xl"
            />
            <div>
              <p className="font-medium">{imageFile.name}</p>
              <p className="text-sm opacity-70">
                {(imageFile.size / 1024).toFixed(1)} KB
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

      {/* Compression Controls */}
      {imageFile && (
        <div className="mt-6 mb-6">
          <h3 className="font-semibold mb-2 text-[var(--foreground)]">
            ⚙️ Compression Settings
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <label className="flex flex-col text-sm">
              Quality (%)
              <input
                type="number"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 mt-1 w-32 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
              />
            </label>
            <button
              onClick={handleCompress}
              disabled={loading}
              className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-all"
            >
              {loading ? "Compressing..." : "Compress Image"}
            </button>
          </div>
        </div>
      )}

      {/* Preview */}
      {previewUrl && !compressedUrl && (
        <div className="mt-6">
          <h3 className="font-semibold text-[var(--foreground)] mb-2">
            📷 Original Preview
          </h3>
          <NextImage
            src={previewUrl}
            alt="Original"
            width={400}
            height={400}
            className="border rounded-lg shadow-sm max-w-full"
          />
          <p className="text-sm opacity-70 mt-2">
            Size: {originalSize.toFixed(2)} KB
          </p>
        </div>
      )}

      {/* Comparison */}
      {compressedUrl && (
        <div
          ref={resultRef}
          className="mt-8 p-4 border border-[var(--accent)] bg-[var(--card)] rounded-lg shadow-md"
        >
          <h3 className="font-medium text-[var(--accent)] mb-2">
            ✅ Compression Complete!
          </h3>
          <div className="grid md:grid-cols-2 gap-8 mt-4">
            {/* Original */}
            <div>
              <h4 className="font-semibold text-[var(--foreground)] mb-2">
                Original
              </h4>
              <NextImage
                src={previewUrl!}
                alt="Original"
                width={400}
                height={400}
                className="border rounded-lg shadow-sm"
              />
              <p className="text-sm opacity-70 mt-2">
                {originalSize.toFixed(2)} KB
              </p>
            </div>

            {/* Compressed */}
            <div>
              <h4 className="font-semibold text-[var(--foreground)] mb-2">
                Compressed
              </h4>
              <NextImage
                src={compressedUrl}
                alt="Compressed"
                width={400}
                height={400}
                className="border rounded-lg shadow-sm"
              />
              <p className="text-sm opacity-70 mt-2">
                {compressedSize.toFixed(2)} KB
              </p>
              <a
                href={compressedUrl}
                download="compressed-image.jpg"
                className="inline-flex items-center gap-2 text-[var(--accent)] font-medium underline mt-3"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download Compressed Image
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SEO Rich Content */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2">
          📉 Image Compressor: Optimize Without Losing Quality
        </h2>
        <p className="text-lg mb-6 opacity-90">
          Large image files slow down websites and consume unnecessary storage.
          With our **browser-based image compressor**, you can reduce file sizes
          while keeping your images sharp and vibrant — all without uploading
          anything to a server.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🌟 Why Compress Images?
            </h3>
            <ul className="space-y-3 list-none pl-0">
              <li>• Faster website load times for better SEO and UX.</li>
              <li>• Save storage and bandwidth without losing clarity.</li>
              <li>• Perfect for uploading to websites, apps, and emails.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              ⚙️ How It Works
            </h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Upload an image using drag & drop or the file picker.</li>
              <li>Set your desired compression **Quality (%)**.</li>
              <li>Click **Compress Image**, then download instantly.</li>
            </ol>
          </div>
        </div>
        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Save space. Speed up your site. Keep your visuals stunning. 🌈
        </p>
      </section>
    </main>
  );
}
