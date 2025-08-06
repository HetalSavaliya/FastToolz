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
    } catch (err) {
      alert("Failed to resize image.");
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
    setResizedUrl(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth(300);
    setHeight(300);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[#66AF85] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          🖼️ Image Resizer
        </h1>
        <p className="text-gray-600">
          Upload or drag an image, set your desired dimensions, and download the
          resized image directly from your browser.
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

      {/* Resize Controls + Preview */}
      {previewUrl && (
        <>
          <div className="mb-10 flex flex-col gap-4">
            <h3 className="font-semibold text-gray-700">📐 Resize</h3>
            <div className="flex gap-4 flex-wrap">
              <label className="flex flex-col text-sm">
                Width (px)
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="border rounded px-2 py-1 mt-1 w-32"
                />
              </label>
              <label className="flex flex-col text-sm">
                Height (px)
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="border rounded px-2 py-1 mt-1 w-32"
                />
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleResize}
                disabled={loading}
                className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50"
              >
                {loading ? "Resizing..." : "Resize Image"}
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

          {!resizedUrl && (
            <div className="mt-8">
              <h3 className="font-semibold text-gray-700 mb-2">
                📷 Original Preview
              </h3>
              <img
                src={previewUrl}
                alt="Original"
                className="border rounded shadow-sm max-w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                Dimensions: {originalWidth}px × {originalHeight}px
              </p>
            </div>
          )}
        </>
      )}

      {/* Resized Result Section */}
      {resizedUrl && (
        <div ref={resultRef} className="mt-12">
          <h2 className="font-semibold text-gray-700 mb-4">🆚 Comparison</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Original */}
            <div>
              <h3 className="text-gray-700 font-medium mb-1">Original Image</h3>
              <img
                src={previewUrl!}
                alt="Original"
                className="border rounded shadow-sm max-w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                {originalWidth}px × {originalHeight}px
              </p>
            </div>

            {/* Resized */}
            <div>
              <h3 className="text-gray-700 font-medium mb-1">Resized Image</h3>
              <img
                src={resizedUrl}
                alt="Resized"
                className="border rounded shadow-sm max-w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                {width}px × {height}px
              </p>
              <a
                href={resizedUrl}
                download="resized-image.jpg"
                className="inline-flex items-center gap-2 text-[#66AF85] font-medium underline mt-2"
              >
                <FontAwesomeIcon icon={faDownload} />
                Download Resized Image
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
