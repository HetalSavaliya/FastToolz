"use client";

import { useState } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";

export default function QRCodeGeneratorPage() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(220);

  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    a.click();
  };

  return (
    <main className="w-full px-4 py-8 transition-colors duration-500 text-[var(--foreground)]">
      {/* 🔙 Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[var(--accent)] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* 🧩 Title Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faQrcode} className="text-[var(--accent)]" />
          QR Code Generator
        </h1>
        <p className="opacity-80">
          Instantly generate scannable QR codes for URLs, text, Wi-Fi, or any
          data.
        </p>
      </div>

      {/* 🧱 Tool Container */}
      <div className="grid md:grid-cols-2 gap-8 p-6 border border-[var(--border)] rounded-2xl bg-[var(--card)] shadow-sm">
        {/* Left Side - Input */}
        <div className="flex flex-col gap-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full border border-[var(--accent)] bg-transparent rounded-lg p-3 text-[var(--foreground)] font-mono text-sm placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            placeholder="Enter text, URL, Wi-Fi details, or anything..."
          />

          <div>
            <label className="text-[var(--foreground)] font-medium block mb-2">
              Size: <span className="text-[var(--accent)]">{size}px</span>
            </label>
            <input
              type="range"
              min={100}
              max={500}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <button
            onClick={downloadQR}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] flex items-center gap-2 w-fit transition-all"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download QR
          </button>
        </div>

        {/* Right Side - Preview */}
        <div className="flex items-center justify-center bg-[var(--background-secondary)] border border-[var(--border)] rounded-lg p-4">
          <QRCodeCanvas
            id="qr-gen"
            value={text || " "}
            size={size}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin
          />
        </div>
      </div>

      {/* 📘 Info Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2">
          ✨ QR Code Generator: Simplify Your Digital Sharing
        </h2>
        <p className="text-lg text-[var(--foreground)] mb-8">
          QR codes have become an essential part of modern communication,
          bridging physical and digital spaces seamlessly. With our{" "}
          <strong>QR Code Generator</strong>, you can instantly create
          high-quality, scannable QR codes for any link, message, or information
          — no registration required.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          {/* Left Column */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🚀 Practical Use Cases
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Business Cards:</strong> Add QR codes with your
                portfolio or contact links for instant connections.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Marketing Materials:</strong> Print QR codes that lead
                to landing pages, campaigns, or product demos.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Wi-Fi Sharing:</strong> Allow guests to connect
                automatically without typing credentials.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Event Registration:</strong> Instantly redirect users to
                your online sign-up or ticketing form.
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              ⚙️ Customization Features
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Flexible Input:</strong> Supports text, URLs, phone
                numbers, and more.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Adjustable Size:</strong> Fine-tune your QR resolution
                using the slider.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>High Error Correction (H):</strong> Keeps the code
                scannable even if partially obscured.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Instant PNG Download:</strong> Save high-resolution QR
                images directly.
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Create your personalized QR code today — it’s fast, easy, and
          completely free!
        </p>
      </section>
    </main>
  );
}
