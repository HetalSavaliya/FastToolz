"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRotateLeft,
  faDownload,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";
import NextImage from "next/image";
import UploadArea from "@/components/UploadArea";

export default function ImageResizerPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    setImageFile(file);
    setResizedUrl(null);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = url;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleResize = async () => {
    if (!imageFile) return;
    setLoading(true);

    try {
      const resizedImage = await imageCompression(imageFile, {
        maxWidthOrHeight: Math.max(width, height),
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setResizedUrl(reader.result as string);
        setLoading(false);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      };
      reader.readAsDataURL(resizedImage);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert(`Failed to resize image: ${message}`);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setResizedUrl(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth(300);
    setHeight(300);
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
          🖼️ Image Resizer
        </h1>
        <p className="opacity-80">
          Upload or drag an image, adjust dimensions, and download the resized
          version instantly.
        </p>
      </div>

      {/* Upload Area */}
      <UploadArea
        title="Drag & drop your image here"
        subtitle="or click to browse — supports single image files"
        icon={faFileImage}
        accept="image/*"
        multiple={false}
        onFileChange={(file) => handleFileChange(file as File)}
        onDrop={handleDrop}
      />

      {/* File info + Controls */}
      {imageFile && (
        <div className="mt-6 mb-6 p-4 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Dimensions Input */}
            <div className="flex flex-wrap gap-4">
              <label className="flex flex-col text-sm">
                Width (px)
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="border border-[var(--accent)] bg-[var(--card)] rounded px-3 py-2 mt-1 w-32 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
              <label className="flex flex-col text-sm">
                Height (px)
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="border border-[var(--accent)] bg-[var(--card)] rounded px-3 py-2 mt-1 w-32 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleResize}
                disabled={loading}
                className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-all"
              >
                {loading ? "Resizing..." : "Resize Image"}
              </button>

              <button
                onClick={handleReset}
                className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card)] transition-all flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faRotateLeft} />
                Reset
              </button>
            </div>

            {/* Preview */}
            {previewUrl && !resizedUrl && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2 text-[var(--foreground)]">
                  📷 Original Preview
                </h3>
                <NextImage
                  src={previewUrl}
                  alt="Original"
                  width={400}
                  height={400}
                  className="border border-[var(--border)] rounded shadow-sm max-w-full"
                />
                <p className="text-xs opacity-70 mt-2">
                  {originalWidth}px × {originalHeight}px
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comparison + Download */}
      {resizedUrl && (
        <div
          ref={resultRef}
          className="mt-10 p-4 border border-[var(--accent)] bg-[var(--card)] rounded-lg shadow-md"
        >
          <h3 className="font-medium text-[var(--accent)] mb-3">
            🆚 Comparison
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[var(--foreground)] mb-2">
                Original Image
              </h4>
              <NextImage
                src={previewUrl!}
                alt="Original"
                width={400}
                height={400}
                className="border border-[var(--border)] rounded shadow-sm max-w-full"
              />
              <p className="text-xs opacity-70 mt-2">
                {originalWidth}px × {originalHeight}px
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--foreground)] mb-2">
                Resized Image
              </h4>
              <NextImage
                src={resizedUrl}
                alt="Resized"
                width={400}
                height={400}
                className="border border-[var(--border)] rounded shadow-sm max-w-full"
              />
              <p className="text-xs opacity-70 mt-2">
                {width}px × {height}px
              </p>
              <a
                href={resizedUrl}
                download="resized-image.jpg"
                className="inline-flex items-center gap-2 text-[var(--accent)] font-medium underline mt-3"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download Resized Image
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Rich content (SEO / Google Ads section) */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-[var(--border)] max-w-full">
        <h2 className="text-3xl font-bold mb-6 pb-2">
          🖼️ Resize Images Instantly – Fast, Secure & Private
        </h2>
        <p className="text-lg mb-8">
          Need to quickly resize images for your website, presentation, or
          social media post? Our **Image Resizer** lets you adjust width and
          height instantly — right in your browser — ensuring your data never
          leaves your device.
        </p>

        <div className="grid md:grid-cols-2 gap-8 border border-[var(--accent)] rounded-lg p-4">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3">
              🚀 Benefits of Browser-Based Resizing
            </h3>
            <ul className="space-y-3 list-none">
              <li>• No Uploads — 100% Client-Side Privacy</li>
              <li>• Lightning-Fast Processing with Web Workers</li>
              <li>• Preserve Image Clarity & Aspect Ratio</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3">
              🧭 How It Works
            </h3>
            <ol className="space-y-3 list-decimal pl-5">
              <li>Upload an image or drag it into the box above.</li>
              <li>Set your desired width and height.</li>
              <li>Click “Resize Image” to instantly process.</li>
              <li>Download the optimized image right away.</li>
            </ol>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Optimize your visuals — resize images instantly with privacy and
          precision!
        </p>
      </section>
    </main>
  );
}
