"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRotateLeft,
  faDownload,
  faPenNib,
  faFilePdf,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { Buffer } from "buffer";
import UploadArea from "@/components/UploadArea";
import { ApiPostFormData } from "@/utils/apiHelper";

global.Buffer = Buffer;

export default function PDFSignPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [signedBlob, setSignedBlob] = useState<Blob | null>(null);
  const [pdfName, setPdfName] = useState("signed.pdf");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [signatureText, setSignatureText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (file: File) => {
    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload a valid PDF file.");
      return;
    }
    setErrorMessage(null);
    setPdfFile(file);
    setPdfName(file.name.replace(/\.pdf$/, "-signed.pdf"));
    setSignedBlob(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleSign = async () => {
    if (!pdfFile || !signatureText.trim()) {
      setErrorMessage("Please upload a PDF and enter a signature text.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      formData.append("signature_text", signatureText);
      formData.append("page_number", pageNumber.toString());
      formData.append("x", x.toString());
      formData.append("y", y.toString());

      const { success, data, error } = await ApiPostFormData(
        "/pdf/pdf-sign",
        formData
      );

      if (!success) {
        setErrorMessage(`Failed to sign PDF: ${error}`);
        return;
      }

      const signedPdfBytes = new Uint8Array(
        Buffer.from(data.signedPdfBytesBase64, "base64")
      );

      const blob = new Blob([signedPdfBytes], { type: "application/pdf" });
      setSignedBlob(blob);
      setPdfName(data.filename);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("Failed to sign PDF:", err);
      setErrorMessage("Failed to sign PDF: Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setSignedBlob(null);
    setErrorMessage(null);
    setSignatureText("");
    setPageNumber(1);
    setX(50);
    setY(50);
  };

  const handleDownload = () => {
    if (signedBlob) {
      saveAs(signedBlob, pdfName);
    }
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

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-[var(--foreground)]">
          ✍️ PDF Sign
        </h1>
        <p className="opacity-80">
          Digitally sign your PDF with text-based signatures at any position.
        </p>
      </div>

      {/* Upload Area */}
      <UploadArea
        title="Drag & drop your PDFs here"
        subtitle="or click to browse — supports single files"
        icon={faFilePdf}
        accept="application/pdf"
        multiple={false}
        onFileChange={(file) => handleFileChange(file as File)}
        onDrop={handleDrop}
      />

      {/* Selected File Info */}
      {pdfFile && (
        <div className="mt-6 mb-6 p-4 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] shadow-sm flex items-center justify-between">
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
            <FontAwesomeIcon icon={faTrashAlt} />
            Delete
          </button>
        </div>
      )}

      {/* Form Fields */}
      {pdfFile && (
        <div className="mt-6 mb-6">
          <h3 className="font-semibold mb-2 text-[var(--foreground)]">
            🖋️ Signature Details
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1 text-[var(--foreground)]">
                Signature Text
              </label>
              <input
                type="text"
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                placeholder="e.g., John Doe"
                className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-[var(--foreground)]">
                Page Number
              </label>
              <input
                type="number"
                min={1}
                value={pageNumber}
                onChange={(e) => setPageNumber(Number(e.target.value))}
                className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1 text-[var(--foreground)]">
                  X Position
                </label>
                <input
                  type="number"
                  value={x}
                  onChange={(e) => setX(Number(e.target.value))}
                  className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm mb-1 text-[var(--foreground)]">
                  Y Position
                </label>
                <input
                  type="number"
                  value={y}
                  onChange={(e) => setY(Number(e.target.value))}
                  className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={handleSign}
              disabled={loading}
              className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 flex items-center gap-2 transition-all"
            >
              <FontAwesomeIcon icon={faPenNib} />
              {loading ? "Signing..." : "Sign PDF"}
            </button>

            <button
              onClick={handleReset}
              className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card)] transition-all flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Download Section */}
      {signedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-[var(--accent)] bg-[var(--card)] rounded-lg shadow-md"
        >
          <h3 className="font-medium text-[var(--accent)] mb-2">
            ✅ PDF signed successfully and ready to download!
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download Signed PDF
          </button>
        </div>
      )}

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}

      {/* Info Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold mb-6 pb-2 text-[var(--foreground)]">
          ✍️ Digitally Sign PDFs with Precision
        </h2>
        <p className="text-lg mb-8 text-[var(--foreground)]">
          Digitally sign your PDF files easily — no printing, scanning, or
          manual effort required. Add a text-based signature anywhere on any
          page using precise X and Y coordinates.
        </p>

        <div className="grid md:grid-cols-2 gap-8 border border-[var(--accent)] rounded-lg p-4">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🎯 Signature Placement
            </h3>
            <ul className="space-y-4 list-none pl-0 text-[var(--foreground)]">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Custom Page:** Choose exactly which page to sign.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Position Control:** Adjust X/Y values for precise placement.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Professional Output:** Perfect for contracts, approvals, and
                certificates.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🧭 Coordinate System
            </h3>
            <ol className="space-y-3 list-decimal pl-5 text-[var(--foreground)]">
              <li>**X = 0** → Left edge; **X = 100** → Right edge.</li>
              <li>**Y = 0** → Bottom edge; **Y = 100** → Top edge.</li>
              <li>
                A signature at **(50, 50)** appears in the center of the page.
              </li>
            </ol>
            <p className="mt-4 opacity-80">
              Coordinates are normalized, so your signature stays consistent
              across any paper size — A4, Letter, or others.
            </p>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Sign smarter — place your signature exactly where it belongs with full
          control.
        </p>
      </section>
    </main>
  );
}
