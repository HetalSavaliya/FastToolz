"use client";

import { useState, useRef, useEffect } from "react";
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
import { motion } from "framer-motion";
import UploadArea from "@/components/UploadArea";

export default function PdfMergePage() {
  const [files, setFiles] = useState<{ file: File; locked?: boolean }[]>([]);
  const [merging, setMerging] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Detect locked/corrupted PDFs
  const detectLockedPdf = async (file: File): Promise<boolean> => {
    try {
      const buffer = await file.arrayBuffer();
      await PDFDocument.load(buffer, { ignoreEncryption: true });
      return false;
    } catch {
      return true;
    }
  };

  // ✅ Add files
  const addFiles = async (selectedFiles: File[]) => {
    const checkedFiles = await Promise.all(
      selectedFiles.map(async (file) => ({
        file,
        locked: await detectLockedPdf(file),
      }))
    );
    setFiles((prev) => [...prev, ...checkedFiles]);
  };

  // ✅ File selection
  const handleFileChange = async (file: FileList) => {
    const selected = Array.from(file || []);
    await addFiles(selected);
    setDownloadUrl(null);
  };

  // ✅ Drag & Drop handlers
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    await addFiles(droppedFiles);
    setDownloadUrl(null);
  };

  // ✅ Remove & Reset
  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

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
    <main className="w-full max-w-4xl mx-auto text-[var(--foreground)] transition-colors duration-500 min-h-screen px-4 py-8">
      {/* 🔙 Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[var(--accent)] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Title & Description */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
          <FontAwesomeIcon icon={faFilePdf} className="text-[var(--accent)]" />
          Merge PDF Files
        </h1>
        <p className="mt-2 opacity-90">
          Combine multiple PDF files into one — secure, free, and processed
          fully in your browser.
        </p>
        <p className="text-sm opacity-70 mt-2">
          ⚠️ Password-protected or corrupted PDFs will be skipped automatically.
        </p>
      </div>

      {/* ✨ Upload Area (modern glassmorphism + glow) */}

      <UploadArea
        title="Drag & drop your PDFs here"
        subtitle="or click to browse — supports multiple files"
        icon={faFilePdf}
        accept="application/pdf"
        multiple={true}
        onFileChange={(file) => handleFileChange(file as FileList)}
        onDrop={handleDrop}
      />

      {/* 🗂️ File List Section */}
      {files.length > 0 && (
        <motion.div
          className="mt-8 mb-6 p-5  bg-[var(--card)]/90 border border-[var(--border)] rounded-2xl shadow-md backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faFilePdf}
              className="text-[var(--accent)]"
            />
            Files to Merge:
          </h2>

          <ul className="space-y-2 text-sm">
            {files.map(({ file, locked }, idx) => (
              <motion.li
                key={idx}
                className="flex items-center justify-between bg-[var(--background)]/40 border border-[var(--border)] p-3 rounded-lg hover:border-[var(--accent)] transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <span className="flex items-center gap-2">
                  {file.name}
                  {locked && (
                    <span className="text-red-400 flex items-center gap-1">
                      <FontAwesomeIcon icon={faLock} />
                      Locked
                    </span>
                  )}
                </span>
                <button
                  onClick={() => removeFile(idx)}
                  className="text-red-400 hover:text-red-500"
                  title="Remove"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <button
              onClick={mergePDFs}
              disabled={merging || files.filter((f) => !f.locked).length < 2}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--accent)] text-white font-medium
        hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <FontAwesomeIcon icon={faFilePdf} />
              {merging ? "Merging..." : "Merge PDFs"}
            </button>

            <button
              onClick={resetFiles}
              className="flex items-center gap-2 px-6 py-2 rounded-lg border border-[var(--border)]
        text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              Reset
            </button>
          </div>
        </motion.div>
      )}

      {/* ✅ Download Section */}
      {downloadUrl && (
        <motion.div
          className="mt-8 p-6 border border-[var(--accent)] rounded-xl text-center bg-[var(--card)]/90 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-lg font-medium text-[var(--accent)] mb-3">
            🎉 Merge Complete! Your file is ready to download.
          </p>
          <a
            href={downloadUrl}
            download="merged_xorotools.pdf"
            className="inline-flex items-center gap-2 border border-[var(--accent)] text-white px-6 py-2 rounded-lg font-semibold  transition-all shadow-md hover:shadow-[0_0_15px_var(--accent)]"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download PDF
          </a>
        </motion.div>
      )}

      {/* SEO Section */}
      <section className="mt-12 pt-8 border-t border-[var(--border)] opacity-90">
        <h2 className="text-2xl font-bold mb-4">
          The Easiest Way to Combine PDF Files Online
        </h2>
        <p className="mb-4">
          Our <strong>PDF Merge</strong> tool lets you compile multiple
          documents into one — no uploads, no tracking, 100% browser-based.
        </p>
        <h3 className="text-xl font-semibold mb-3 mt-6">
          Key Features of the Toolzy PDF Merger
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>All processing is local — files never leave your device.</li>
          <li>High-quality merged output with original layout preserved.</li>
          <li>Free, secure, and unlimited use.</li>
        </ul>
      </section>
    </main>
  );
}
