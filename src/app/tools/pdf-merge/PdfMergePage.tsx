"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFilePdf,
  faDownload,
  faTrash,
  faRotateLeft,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function PdfMergePage() {
  const [files, setFiles] = useState<{ file: File; locked?: boolean }[]>([]);
  const [merging, setMerging] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Handle File Selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    await addFiles(selected);
    setDownloadUrl(null);
  };

  // ✅ Handle Drag & Drop
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    await addFiles(droppedFiles);
    setDownloadUrl(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  // ✅ Detect if a PDF is password-protected or corrupted
  const detectLockedPdf = async (file: File): Promise<boolean> => {
    try {
      const buffer = await file.arrayBuffer();
      await PDFDocument.load(buffer, { ignoreEncryption: true });
      return false; // Not locked
    } catch {
      return true; // Locked or invalid
    }
  };

  // ✅ Add and check files
  const addFiles = async (selectedFiles: File[]) => {
    const checkedFiles = await Promise.all(
      selectedFiles.map(async (file) => ({
        file,
        locked: await detectLockedPdf(file),
      }))
    );
    setFiles((prev) => [...prev, ...checkedFiles]);
  };

  // ✅ Remove file from list
  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  // ✅ Reset all files
  const resetFiles = () => {
    setFiles([]);
    setDownloadUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ Merge PDFs
  const mergePDFs = async () => {
    const validFiles = files.filter((f) => !f.locked).map((f) => f.file);

    if (validFiles.length < 2) {
      alert("Please select at least two unlocked PDF files to merge.");
      return;
    }

    setMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of validFiles) {
        try {
          const buffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(buffer, {
            ignoreEncryption: true,
          });
          const copiedPages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
          );
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        } catch {
          console.warn(`Skipping corrupted file: ${file.name}`);
          continue;
        }
      }

      if (mergedPdf.getPageCount() === 0) {
        alert("No valid pages found to merge.");
        return;
      }

      const mergedPdfBytes = await mergedPdf.save();
      // mergedPdfBytes is a Uint8Array; use it directly to construct the Blob
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Merging error:", error);
      alert("An error occurred while merging PDFs.");
    } finally {
      setMerging(false);
    }
  };

  return (
    <main className="w-full px-4 py-6 max-w-4xl mx-auto">
      {/* 🔙 Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[#66AF85] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Title & Description */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FontAwesomeIcon icon={faFilePdf} className="text-[#66AF85]" />
          Merge PDF Files
        </h1>
        <p className="text-gray-600 mt-2">
          Combine multiple PDF files into one — secure, free, and processed
          fully in your browser.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          ⚠️ Password-protected or corrupted PDFs will be skipped automatically.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#66AF85] transition mb-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          hidden
        />
        <p className="text-gray-500">
          📂 Drag & drop your PDF files here or click to select.
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Files to Merge:</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {files.map(({ file, locked }, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <span className="flex items-center gap-2">
                  {file.name}
                  {locked && (
                    <span className="text-red-500 flex items-center gap-1">
                      <FontAwesomeIcon icon={faLock} />
                      Locked
                    </span>
                  )}
                </span>
                <button
                  onClick={() => removeFile(idx)}
                  className="text-red-500 hover:text-red-600"
                  title="Remove"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-4">
            <button
              onClick={mergePDFs}
              disabled={merging || files.filter((f) => !f.locked).length < 2}
              className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#58a277] disabled:opacity-50"
            >
              {merging ? "Merging..." : "Merge PDFs"}
            </button>
            <button
              onClick={resetFiles}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="mr-2" />
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Download Section */}
      {downloadUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium text-green-700 mb-2">
            ✅ Merging complete! Your files are ready.
          </p>
          <a
            href={downloadUrl}
            download="merged_hjtools.pdf"
            className="inline-flex items-center bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Download Merged PDF
          </a>
        </div>
      )}

      {/* SEO Content */}
      <section className="rich-content text-gray-700 mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          The Easiest Way to Combine PDF Files Online
        </h2>
        <p className="mb-4">
          Our **PDF Merge** tool lets you quickly compile multiple documents
          into one — no installations, no uploads, and no privacy risk. All
          processing happens locally in your browser.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
          Key Features of the HJ Tools PDF Merger
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>Client-side only processing for complete privacy.</li>
          <li>High-quality output with original formatting preserved.</li>
          <li>Completely free, secure, and unlimited usage.</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
          How to Use the Tool
        </h3>
        <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">
          <li>Select or drag your PDF files into the upload area.</li>
          <li>Check that your files appear correctly and aren’t locked.</li>
          <li>Click “Merge PDFs” to generate and download your merged file.</li>
        </ol>
      </section>
    </main>
  );
}
