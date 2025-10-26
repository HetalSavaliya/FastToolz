"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faDownload,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import NextImage from "next/image";

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
    setImageFile(file);
    setCompressedUrl(null);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setOriginalSize(file.size / 1024); // KB
  };

  const handleCompress = async () => {
    if (!imageFile) return;
    setLoading(true);

    try {
      const compressedImage = await imageCompression(imageFile, {
        maxSizeMB: quality / 100, // dynamic compression
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        handleFileChange(file);
      } else {
        alert("Please drop an image file.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    <main className="w-full px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[#66AF85] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          📉 Image Compressor
        </h1>
        <p className="text-gray-600">
          Upload or drag an image, adjust compression quality, and download the
          optimized image directly from your browser.
        </p>
      </div>
      {/* Upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center cursor-pointer bg-white hover:bg-gray-50 transition mb-6"
      >
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file);
            }}
          />
          <div className="text-gray-600">
            <FontAwesomeIcon icon={faUpload} className="text-2xl mb-2" />
            <p className="text-sm font-medium">
              Click to upload or drag an image here
            </p>
          </div>
        </label>
      </div>
      {/* Compression Controls + Preview */}
      {previewUrl && (
        <>
          <div className="mb-10 flex flex-col gap-4">
            <h3 className="font-semibold text-gray-700">⚙️ Compression</h3>
            <div className="flex gap-4 flex-wrap items-center">
              <label className="flex flex-col text-sm">
                Quality (%)
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={quality || ""} // prevent NaN showing in UI
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setQuality(0); // or some default like 80
                    } else {
                      const num = parseInt(val, 10);
                      if (!isNaN(num)) setQuality(num);
                    }
                  }}
                  className="border rounded px-2 py-1 mt-1 w-32"
                />
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCompress}
                disabled={loading}
                className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50"
              >
                {loading ? "Compressing..." : "Compress Image"}
              </button>
              <button
                onClick={handleReset}
                className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faRotateLeft} />
                Reset
              </button>
            </div>
          </div>

          {!compressedUrl && (
            <div className="mt-8">
              <h3 className="font-semibold text-gray-700 mb-2">
                📷 Original Preview
              </h3>
              <NextImage
                src={previewUrl}
                alt="Original"
                width={400}
                height={400}
                className="border rounded shadow-sm max-w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                Size: {originalSize.toFixed(2)} KB
              </p>
            </div>
          )}
        </>
      )}
      {/* Compressed Result Section */}
      {compressedUrl && (
        <div ref={resultRef} className="mt-12">
          <h2 className="font-semibold text-gray-700 mb-4">🆚 Comparison</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Original */}
            <div>
              <h3 className="text-gray-700 font-medium mb-1">Original Image</h3>
              <NextImage
                src={previewUrl!}
                alt="Original-2"
                width={400}
                height={400}
                className="border rounded shadow-sm max-w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                {originalSize.toFixed(2)} KB
              </p>
            </div>

            {/* Compressed */}
            <div>
              <h3 className="text-gray-700 font-medium mb-1">
                Compressed Image
              </h3>
              <NextImage
                src={compressedUrl}
                alt="Compressed"
                width={400}
                height={400}
                className="border rounded shadow-sm max-w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                {compressedSize.toFixed(2)} KB
              </p>
              <a
                href={compressedUrl}
                download="compressed-image.jpg"
                className="inline-flex items-center gap-2 text-[#66AF85] font-medium underline mt-2"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download Compressed Image
              </a>
            </div>
          </div>
        </div>
      )}
      {/* -------------------------------------------------------- */}     {" "}
      {/* 🖼️ ADDED: RICH, ORIGINAL CONTENT FOR GOOGLE ADS / SEO */}     {" "}
      {/* -------------------------------------------------------- */}     {" "}
      <section className="rich-content text-gray-700 mt-16 pt-8 border-t border-gray-200 max-w-4xl mx-auto">
               {" "}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Image Compression is Essential        {" "}
        </h2>
               {" "}
        <p className="mb-4">
                    In today's digital landscape, the size of your images
          directly impacts the **speed and performance** of your website or
          application. Large, unoptimized images slow down page loading,
          frustrate users, and negatively affect your SEO rankings. Our **Image
          Compressor** tool solves this by providing a simple, client-side
          solution to dramatically reduce file sizes without noticeable loss in
          visual quality.        {" "}
        </p>
               {" "}
        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                    Lossy vs. Lossless Compression        {" "}
        </h3>
               {" "}
        <p className="mb-4">
                    This tool primarily uses **lossy compression** (like JPEG),
          which intelligently removes redundant data from the image file. You
          control this process directly using the **Quality (%)** slider.
          Setting a quality level of **80%** often achieves a significant file
          size reduction (up to 80-90%) while maintaining excellent visual
          fidelity. We process the image using a **Web Worker** to ensure your
          browser remains responsive, providing a smooth and fast compression
          experience.        {" "}
        </p>
               {" "}
        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                    Benefits of Our Browser-Based Tool        {" "}
        </h3>
               {" "}
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                     {" "}
          <li>
            **Complete Privacy:** All processing happens entirely within your
            browser (client-side). Your image files are **never uploaded** to a
            server.
          </li>
                     {" "}
          <li>
            **Immediate Feedback:** See the exact file size reduction instantly
            with a clear before-and-after size comparison.
          </li>
                     {" "}
          <li>
            **Flexible Control:** Easily adjust the target quality to find the
            perfect balance between file size and image sharpness for your
            specific needs.
          </li>
                 {" "}
        </ul>
               {" "}
        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                    Simple Steps to Optimize Your Images        {" "}
        </h3>
               {" "}
        <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">
                     {" "}
          <li>
            **Upload:** Drag and drop your image (JPEG, PNG, etc.) or click to
            select a file.
          </li>
                     {" "}
          <li>
            **Adjust:** Set your desired **Quality (%)** level. Lower numbers
            mean smaller files and more compression.
          </li>
                     {" "}
          <li>
            **Download:** Click **"Compress Image"** and then download your
            optimized file to use immediately for web, email, or sharing.
          </li>
                 {" "}
        </ol>
             {" "}
      </section>
    </main>
  );
}
