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
      <section>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
            ✨ The Versatile QR Code Generator
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Quick Response (QR) codes are powerful tools for bridging the gap
            between physical and digital worlds. Our generator allows you to
            create high-quality, scannable QR codes for any text, URL, contact
            information, or Wi-Fi network details—instantly and free of charge.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🚀 Practical Applications
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Business Cards & Networking:** Embed your contact details
                  (VCard) so people can save them with a single scan.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Marketing & Promotions:** Link directly to product pages,
                  social media profiles, or special offers from print materials.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Wi-Fi Access:** Generate a code that instantly connects
                  guests to your Wi-Fi without typing a password.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Event Sign-ups:** Direct attendees to an online registration
                  or ticketing page.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                ⚙️ Features and Customization
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Flexible Input:** Works with simple text, complex URLs,
                  email addresses, and phone numbers.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Adjustable Size:** Use the slider to set the exact pixel
                  size of the QR code for perfect display on any medium.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **High Error Correction (Level H):** Ensures the code remains
                  scannable even if partially damaged or obscured.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **PNG Download:** Download the final image as a portable
                  network graphic (.png) for clean, high-resolution usage.
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-lg text-green-700 font-medium mt-10">
            Start generating now! Simply paste your link or message into the
            text area to see your QR code appear instantly.
          </p>
        </div>
      </section>
    </main>
  );
}
