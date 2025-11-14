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
  faFilePdf,
  faTrash,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Buffer } from "buffer";
import { saveAs } from "file-saver";
import { ApiPostFormData } from "@/utils/apiHelper";
import UploadArea from "@/components/UploadArea";

global.Buffer = Buffer;

export default function PDFRotatePage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [rotatedBlob, setRotatedBlob] = useState<Blob | null>(null);
  const [pdfName, setPdfName] = useState("rotated.pdf");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(90);
  const [applyTo, setApplyTo] = useState<"all" | "single" | "multiple">("all");
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

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
      setErrorMessage("Please upload a PDF file.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("rotation", rotation.toString());
      formData.append("applyTo", applyTo);
      if (applyTo === "single" || applyTo === "multiple") {
        formData.append(
          "pageNumbers",
          pageNumbers.map((p) => (p + 1).toString()).join(",")
        );
      }

      const { success, data, error } = await ApiPostFormData(
        "/pdf/pdf-rotate",
        formData
      );

      if (!success) {
        setErrorMessage(`Failed to rotate PDF: ${error}`);
        return;
      }

      const rotatedPdfBytes = new Uint8Array(
        Buffer.from(data.rotatedPdfBytesBase64, "base64")
      );
      const blob = new Blob([rotatedPdfBytes], { type: "application/pdf" });
      setRotatedBlob(blob);
      setPdfName(data.filename);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to rotate PDF.");
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
    if (rotatedBlob) saveAs(rotatedBlob, pdfName);
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
          🔄 Rotate PDF Pages
        </h1>
        <p className="opacity-80">
          Upload your PDF and rotate one, multiple, or all pages at any angle.
        </p>
      </div>

      {/* Upload Area */}
      <UploadArea
        title="Drag & drop your PDF here"
        subtitle="or click to browse — supports single file upload"
        icon={faFilePdf}
        accept="application/pdf"
        multiple={false}
        onFileChange={(file) => handleFileChange(file as File)}
        onDrop={handleDrop}
      />

      {/* Uploaded PDF Preview */}
      {pdfFile && (
        <div className="mt-6 mb-6 p-4 border border-[var(--border)] rounded-lg bg-[var(--card)] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faFilePdf}
              className="text-[var(--accent)] text-2xl"
            />
            <div>
              <p className="font-medium">{pdfFile.name}</p>
              <p className="text-sm opacity-70">
                {(pdfFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            onClick={() => setPdfFile(null)}
            className="text-red-500 hover:text-red-700 transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}

      {/* Rotation Settings */}
      {pdfFile && (
        <div className="mt-6 mb-6 p-4 border border-[var(--border)] rounded-lg bg-[var(--card)] shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Rotation Angle (in degrees)
            </label>
            <input
              type="number"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="mt-1 w-40 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Apply To
            </label>
            <select
              value={applyTo}
              onChange={(e) =>
                setApplyTo(e.target.value as "all" | "single" | "multiple")
              }
              className="mt-1 w-48 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
            >
              <option value="all">All Pages</option>
              <option value="single">Single Page</option>
              <option value="multiple">Multiple Pages</option>
            </select>
          </div>

          {applyTo === "single" && (
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
                Page Number (starting from 1)
              </label>
              <input
                type="number"
                min={1}
                onChange={(e) => setPageNumbers([Number(e.target.value) - 1])}
                className="mt-1 w-40 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
              />
            </div>
          )}

          {applyTo === "multiple" && (
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">
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
                className="mt-1 w-60 px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handleRotate}
              disabled={loading}
              className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowsRotate} />
              {loading ? "Rotating..." : "Rotate PDF"}
            </button>
            <button
              onClick={handleReset}
              className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card-hover)] flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Download Section */}
      {rotatedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-[var(--accent)] bg-[var(--card)] rounded-lg shadow-md"
        >
          <h3 className="font-medium text-[var(--accent)] mb-2">
            ✅ Rotation successful! Your PDF is ready.
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download {pdfName}
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-400 mt-4 font-medium">{errorMessage}</div>
      )}
      {/* Rich Content Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2 flex items-center gap-2">
          🔄 Perfecting Your Documents: The Essential Guide to PDF Rotation
        </h2>

        <p className="text-lg text-[var(--foreground)] mb-8">
          Have you ever scanned a document only to find it tilted, or received a
          professional report where one page is stuck in
          <span className="font-semibold text-[var(--accent)]">
            {" "}
            landscape mode
          </span>
          ? Misaligned pages disrupt reading flow and undermine professionalism.
          Our{" "}
          <span className="font-semibold text-[var(--accent)]">
            PDF Rotate tool
          </span>{" "}
          is designed to fix this quickly and precisely, giving you full control
          over your document’s orientation.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          {/* Left Column */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🌀 Why Rotation is More Than Just Flipping a Page
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <span>
                  <strong>Precision Matters:</strong> Most tools only rotate in
                  fixed
                  <span className="font-semibold text-[var(--accent)]">
                    {" "}
                    90° increments
                  </span>
                  , but our tool allows <strong>any custom angle</strong> for
                  perfect alignment.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <span>
                  <strong>Scanner Fixes:</strong> Correct tilted pages caused by
                  scanning errors with fine-tuned rotation adjustments.
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <span>
                  <strong>Orientation Control:</strong> Convert all pages to
                  portrait or landscape for a uniform reading experience.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              📄 Page-Level Precision
            </h3>
            <ol className="space-y-4 text-[var(--foreground)] list-decimal pl-5">
              <li>
                <strong>All Pages:</strong> Rotate every page in your PDF by the
                same degree — ideal for sideways scans.
              </li>
              <li>
                <strong>Single Page:</strong> Choose one page (e.g., page 3) to
                rotate without affecting others.
              </li>
              <li>
                <strong>Multiple Pages:</strong> Input comma-separated page
                numbers (e.g., <code>2, 4, 7</code>) for selective rotation.
              </li>
            </ol>

            <div className="mt-6 p-4 border border-dashed border-[var(--accent)] rounded-lg text-center">
              <div className="flex justify-center items-center gap-4 text-[var(--foreground)] text-3xl">
                📄 ↻ 📄
              </div>
              <p className="text-sm text-[var(--foreground)] mt-2">
                Rotate your pages individually or all at once — precision and
                flexibility at your fingertips.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Get your pages perfectly aligned — upload, rotate, and download your
          refined PDF instantly!
        </p>
      </section>
    </main>
  );
}
