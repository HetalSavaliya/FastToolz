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
  const [size, setSize] = useState(200);

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
    <main className="w-full h-screen flex flex-col px-6 py-6">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[#66AF85] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
        <FontAwesomeIcon icon={faQrcode} />
        QR Code Generator
      </h1>
      <p className="text-gray-600 mb-6">
        Enter text or a URL to instantly generate a QR code.
      </p>

      <div className="flex flex-1 gap-6">
        {/* Left side – Input */}
        <div className="flex-1 flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="w-full border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[#66AF85] outline-none"
            placeholder="Enter text, URL, or anything..."
          />

          <label className="text-gray-700 font-medium">Size: {size}px</label>
          <input
            type="range"
            min={100}
            max={500}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />

          <button
            onClick={downloadQR}
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] flex items-center gap-2 w-fit"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download QR
          </button>
        </div>

        {/* Right side – QR Preview */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 border rounded-lg">
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
    </main>
  );
}
