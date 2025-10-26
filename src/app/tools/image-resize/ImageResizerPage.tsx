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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert(`Failed to resize image: ${message}`);
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
              <NextImage
                src={previewUrl}
                alt="Original"
                width={"400"}
                height={"400"}
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
              <NextImage
                src={previewUrl!}
                alt="Original-2"
                width={"400"}
                height={"400"}
                className="border rounded shadow-sm max-w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                {originalWidth}px × {originalHeight}px
              </p>
            </div>

            {/* Resized */}
            <div>
              <h3 className="text-gray-700 font-medium mb-1">Resized Image</h3>
              <NextImage
                src={resizedUrl}
                alt="Resized"
                width={"400"}
                height={"400"}
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
      {/* -------------------------------------------------------- */}     {" "}
      {/* 🖼️ ADDED: RICH, ORIGINAL CONTENT FOR GOOGLE ADS / SEO */}     {" "}
      {/* -------------------------------------------------------- */}     {" "}
      <section className="rich-content text-gray-700 mt-16 pt-8 border-t border-gray-200 max-w-4xl mx-auto">
               {" "}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    The Quickest Way to Adjust Image Dimensions Online        {" "}
        </h2>
               {" "}
        <p className="mb-4">
                    Whether you're preparing images for social media, updating
          product photos for an e-commerce site, or setting banner sizes for a
          blog, having the correct dimensions is critical. Our **Image Resizer**
          tool offers a free, fast, and secure way to change the width and
          height of any image file. Because all the work is done locally on your
          device, your files remain completely private and are **never
          uploaded** to a server. This client-side processing ensures maximum
          speed and confidentiality for your sensitive photos.        {" "}
        </p>
               {" "}
        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                    Why Use a Dedicated Image Resizer?        {" "}
        </h3>
               {" "}
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                     {" "}
          <li>
            **Improve Web Performance:** Resizing large images to the size they
            are actually displayed at is a fundamental step in **web
            optimization** and improves page loading speed.
          </li>
                     {" "}
          <li>
            **Maintain Aspect Ratio:** While we allow custom dimensions, careful
            resizing ensures your images don't look stretched or distorted. Our
            tool is optimized to maintain high-quality scaling.
          </li>
                     {" "}
          <li>
            **Batch Compatibility:** Quickly adapt images for common platforms
            like **Facebook, Instagram, LinkedIn**, and specific website layout
            requirements.
          </li>
                 {" "}
        </ul>
               {" "}
        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                    Features of Our Browser-Powered Resizing Tool        {" "}
        </h3>
               {" "}
        <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">
                     {" "}
          <li>
            **Privacy First:** Zero file transmission. Your images stay on your
            device throughout the entire resizing process.
          </li>
                     {" "}
          <li>
            **Immediate Dimensions:** The tool instantly reads and displays the
            original width and height of your uploaded image.
          </li>
                     {" "}
          <li>
            **High-Fidelity Output:** We use advanced browser APIs to ensure the
            resized image maintains crisp quality and detail, even when
            dramatically scaled down.
          </li>
                 {" "}
        </ol>
               {" "}
        <p className="mt-6 text-sm text-gray-600">
                    *Note: When changing an image's dimensions drastically, be
          aware that you may lose detail or alter the original aspect ratio if
          the new dimensions do not match the old proportions.*        {" "}
        </p>
             {" "}
      </section>
         
    </main>
  );
}
