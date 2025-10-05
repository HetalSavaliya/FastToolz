"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faRotateLeft,
  faDownload,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { Buffer } from "buffer";
import axios, { AxiosError } from "axios";

global.Buffer = Buffer;

export default function PDFRotatePage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [rotatedBlob, setRotatedBlob] = useState<Blob | null>(null);
  const [pdfName, setPdfName] = useState("rotated.pdf");
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [rotation, setRotation] = useState<number>(90); // default angle
  const [applyTo, setApplyTo] = useState<"all" | "single" | "multiple">("all");
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const handleFileChange = async (file: File) => {
    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload a valid PDF file.");
      return;
    }
    setErrorMessage(null);
    setPdfFile(file);
    setPdfName(file.name.replace(/\.pdf$/, "-rotated.pdf"));
    setRotatedBlob(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleRotate = async () => {
    if (!pdfFile) {
      setErrorMessage("Please upload a PDF file first.");
      return;
    }
    setErrorMessage(null);
    setLoading(true);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfBytesBase64 = Buffer.from(pdfBytes).toString("base64");

      const payload: any = {
        pdfBytes: pdfBytesBase64,
        rotation,
        filename: pdfName,
        applyTo,
      };

      if (applyTo === "single" || applyTo === "multiple") {
        payload.pageNumbers = pageNumbers;
      }

      const { data } = await axios.post("/api/pdf-rotate", payload);

      const rotatedPdfBytes = new Uint8Array(
        Buffer.from(data.rotatedPdfBytesBase64, "base64")
      );
      const blob = new Blob([rotatedPdfBytes], { type: "application/pdf" });

      setRotatedBlob(blob);
      setPdfName(data.filename);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error: unknown) {
      console.error("Error rotating PDF:", error);

      let message = "Unknown error";

      if (error instanceof Error) {
        message = error.message;
      }

      if (
        (error as AxiosError).response &&
        typeof (error as AxiosError).response?.data === "object" &&
        typeof ((error as AxiosError).response?.data as any).message ===
          "string"
      ) {
        message = ((error as AxiosError).response?.data as any).message;
      }

      setErrorMessage(`Failed to rotate PDF: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setRotatedBlob(null);
    setErrorMessage(null);
    setRotation(90);
    setApplyTo("all");
    setPageNumbers([]);
  };

  const handleDownload = () => {
    if (rotatedBlob) {
      saveAs(rotatedBlob, pdfName);
    }
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
          🔄 PDF Rotate
        </h1>
        <p className="text-gray-600">
          Upload a PDF and rotate all pages, a single page, or multiple pages by
          any angle.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center cursor-pointer bg-white hover:bg-gray-50 transition mb-6"
      >
        <label className="cursor-pointer">
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file);
            }}
          />
          <div className="text-gray-600">
            <FontAwesomeIcon icon={faUpload} className="text-2xl mb-2" />
            <p className="text-sm font-medium">
              Click to upload or drag a PDF here
            </p>
          </div>
        </label>
      </div>

      {/* Controls */}
      {pdfFile && (
        <div className="mb-6 space-y-4">
          {/* Rotation Input */}
          <div>
            <label className="block text-gray-700 font-medium">
              Rotation Angle (any number)
            </label>
            <input
              type="number"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="border rounded px-3 py-2 mt-1 w-40"
            />
          </div>

          {/* Apply To */}
          <div>
            <label className="block text-gray-700 font-medium">Apply To</label>
            <select
              value={applyTo}
              onChange={(e) =>
                setApplyTo(e.target.value as "all" | "single" | "multiple")
              }
              className="border rounded px-3 py-2 mt-1 w-40"
            >
              <option value="all">All Pages</option>
              <option value="single">Single Page</option>
              <option value="multiple">Multiple Pages</option>
            </select>
          </div>

          {/* Page Input */}
          {applyTo === "single" && (
            <div>
              <label className="block text-gray-700 font-medium">
                Page Number (starting from 1)
              </label>
              <input
                type="number"
                min={1}
                onChange={(e) => setPageNumbers([Number(e.target.value) - 1])}
                className="border rounded px-3 py-2 mt-1 w-40"
              />
            </div>
          )}

          {applyTo === "multiple" && (
            <div>
              <label className="block text-gray-700 font-medium">
                Page Numbers (comma-separated, starting from 1)
              </label>
              <input
                type="text"
                placeholder="e.g. 2,4,7"
                onChange={(e) =>
                  setPageNumbers(
                    e.target.value
                      .split(",")
                      .map((n) => Number(n.trim()) - 1)
                      .filter((n) => !isNaN(n) && n >= 0)
                  )
                }
                className="border rounded px-3 py-2 mt-1 w-60"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleRotate}
              disabled={loading}
              className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowsRotate} />
              {loading ? "Rotating..." : "Rotate PDF"}
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
      )}

      {/* Download */}
      {rotatedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-green-300 bg-green-50 rounded"
        >
          <h3 className="text-green-700 font-medium mb-2">
            ✅ PDF rotated successfully and ready to download!
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download Rotated PDF
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </main>
  );
}
