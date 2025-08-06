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
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected]);
    setDownloadUrl(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
    setDownloadUrl(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const resetFiles = () => {
    setFiles([]);
    setDownloadUrl(null);
    fileInputRef.current?.value && (fileInputRef.current.value = "");
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert("Please select at least two PDF files to merge.");
      return;
    }

    setMerging(true);
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setMerging(false);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* 🔙 Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[#66AF85] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Title and description */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FontAwesomeIcon icon={faFilePdf} className="text-[#66AF85]" />
          Merge PDF Files
        </h1>
        <p className="text-gray-600 mt-2">
          Combine multiple PDF files into one — secure, free, and fully in your
          browser.
        </p>
      </div>

      {/* Upload Section */}
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

      {/* Selected Files List */}
      {files.length > 0 && (
        <div className="mb-4">
          <ul className="space-y-2 text-sm text-gray-700">
            {files.map((file, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <span>{file.name}</span>
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
              disabled={merging || files.length < 2}
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

      {/* Download Link */}
      {downloadUrl && (
        <div className="mt-6">
          <a
            href={downloadUrl}
            download="merged.pdf"
            className="inline-flex items-center text-[#66AF85] underline font-medium"
          >
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Download Merged PDF
          </a>
        </div>
      )}
    </main>
  );
}
