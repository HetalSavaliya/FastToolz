"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faRotateLeft,
  faDownload,
  faFilePdf,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ApiPostFormData } from "@/utils/apiHelper";
import UploadArea from "@/components/UploadArea";

export default function PdfToWordConverter() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [docxName, setDocxName] = useState<string>("converted.docx");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (file: File) => {
    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload a valid PDF file.");
      return;
    }
    setErrorMessage(null);
    setPdfFile(file);
    setDocxName(file.name.replace(/\.pdf$/i, ".docx"));
    setConvertedBlob(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handlePdfToWord = async () => {
    if (!pdfFile) {
      setErrorMessage("Please upload a PDF file.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", pdfFile);

      const { success, data, error } = await ApiPostFormData(
        "/pdf/pdf-to-word",
        formData
      );

      if (!success) {
        setErrorMessage(`Failed to convert PDF: ${error}`);
        return;
      }

      const wordBytes = new Uint8Array(
        Buffer.from(data.wordBytesBase64, "base64")
      );

      const blob = new Blob([wordBytes], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // ✅ Instead of auto-download, we now show the download button
      setConvertedBlob(blob);
      setDocxName(data.filename || docxName);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to convert PDF to Word.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setConvertedBlob(null);
    setErrorMessage(null);
  };

  const handleDownload = () => {
    if (convertedBlob) {
      const url = URL.createObjectURL(convertedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = docxName;
      a.click();
      URL.revokeObjectURL(url);
    }
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
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          📄 PDF to Word Converter
        </h1>
        <p className="opacity-80">
          Upload your PDF and convert it to an editable Word document.
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

      {/* Uploaded PDF Preview */}
      {pdfFile && (
        <div className="mt-6 mb-6 p-4 border border-[var(--border)] rounded-lg bg-[var(--card)] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faFilePdf} className="text-[var(--accent)] text-2xl" />
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

      {/* Controls */}
      {pdfFile && (
        <div className="mt-6 mb-6 flex flex-wrap gap-4">
          <button
            onClick={handlePdfToWord}
            disabled={loading}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50"
          >
            {loading ? "Converting..." : "Convert to Word"}
          </button>

          <button
            onClick={handleReset}
            className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card-hover)] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
            Reset
          </button>
        </div>
      )}

      {/* ✅ Download Result Section */}
      {convertedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-[var(--accent)] bg-[var(--card)] rounded-lg shadow-md"
        >
          <h3 className="font-medium text-[var(--accent)] mb-3">
            ✅ Conversion Successful! Your Word file is ready to download.
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download {docxName}
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-400 mt-4 font-medium">{errorMessage}</div>
      )}

      {/* Info Section */}
      <section className="rich-content mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-2xl font-bold mb-4">
          📝 Transform Your Documents: PDF to Word Converter
        </h2>
        <p className="mb-4">
          PDFs are excellent for secure viewing and consistent sharing, but they
          become frustrating when you need to make updates. Our converter makes
          PDFs editable instantly!
        </p>
      </section>
    </main>
  );
}
