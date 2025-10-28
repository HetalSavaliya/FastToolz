"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFilePdf,
  faRotateLeft,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import UploadArea from "@/components/UploadArea";

export default function PdfSplitterPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageRanges, setPageRanges] = useState("1-3,4-6");
  const [loading, setLoading] = useState(false);
  const [splitParts, setSplitParts] = useState<
    { partNumber: number; pages: number[]; blob: Blob }[]
  >([]);
  const [pdfName, setPdfName] = useState("split.pdf");
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    const pdfBytes = await file.arrayBuffer();
    const sourcePdf = await PDFDocument.load(pdfBytes);
    const total = sourcePdf.getPageCount();
    setTotalPages(total);

    setPdfFile(file);
    setSplitParts([]);
    setPdfName(file.name.replace(/\.pdf$/, "") + ".pdf");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleSplit = async () => {
    if (!pdfFile || !pageRanges.trim() || totalPages === null) return;
    setLoading(true);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const sourcePdf = await PDFDocument.load(pdfBytes);

      const { parsedRanges, usedPages } = parseMultipleRanges(
        pageRanges,
        totalPages
      );

      const remainingPages = getRemainingPages(usedPages, totalPages);
      if (remainingPages.length > 0) {
        parsedRanges.push(remainingPages);
      }

      const parts: { partNumber: number; pages: number[]; blob: Blob }[] = [];

      for (let i = 0; i < parsedRanges.length; i++) {
        const range = parsedRanges[i];
        const newPdf = await PDFDocument.create();

        for (const pageNumber of range) {
          const [copiedPage] = await newPdf.copyPages(sourcePdf, [
            pageNumber - 1,
          ]);
          newPdf.addPage(copiedPage);
        }

        const newPdfBytes = await newPdf.save();
        const blob = new Blob([new Uint8Array(newPdfBytes)], {
          type: "application/pdf",
        });

        parts.push({
          partNumber: i + 1,
          pages: range,
          blob,
        });
      }

      setSplitParts(parts);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Split PDF error:", message);
      alert("Failed to split PDF.");
    }

    setLoading(false);
  };

  const parseMultipleRanges = (
    rangeStr: string,
    totalPages: number
  ): { parsedRanges: number[][]; usedPages: Set<number> } => {
    const parts = rangeStr
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part !== "");

    const ranges: number[][] = [];
    const usedPages = new Set<number>();

    for (const part of parts) {
      const [startStr, endStr] = part.split("-");
      const start = parseInt(startStr, 10);
      const end = endStr ? parseInt(endStr, 10) : start;

      if (
        isNaN(start) ||
        isNaN(end) ||
        start < 1 ||
        end > totalPages ||
        start > end
      ) {
        alert(`Invalid range: ${part}`);
        continue;
      }

      const pages = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      );
      pages.forEach((p) => usedPages.add(p));
      ranges.push(pages);
    }

    return { parsedRanges: ranges, usedPages };
  };

  const getRemainingPages = (
    usedPages: Set<number>,
    total: number
  ): number[] => {
    const remaining: number[] = [];
    for (let i = 1; i <= total; i++) {
      if (!usedPages.has(i)) {
        remaining.push(i);
      }
    }
    return remaining;
  };

  const handleDownload = (partNumber: number, blob: Blob) => {
    const filename = `${pdfName.replace(/\.pdf$/, "")}-part${partNumber}.pdf`;
    saveAs(blob, filename);
  };

  const handleReset = () => {
    setPdfFile(null);
    setPageRanges("1-3,4-6");
    setSplitParts([]);
    setTotalPages(null);
  };

  return (
    <main className="w-full max-w-4xl mx-auto text-[var(--foreground)] transition-colors duration-500 min-h-screen px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[var(--accent)] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
          ✂️ PDF Splitter
        </h1>
        <p className="mt-2 opacity-90">
          Upload a PDF, enter page ranges like{" "}
          <code className="bg-[var(--card)] px-1 mx-1 rounded text-[var(--card-text)]">
            1-3,5-10
          </code>{" "}
          and the rest of the pages will be auto-split.
        </p>
      </div>

      {/* ✨ Enhanced Upload Section */}
      <UploadArea
        title="Drag & drop your PDFs here"
        subtitle="or click to browse — supports single files"
        icon={faFilePdf}
        accept="application/pdf"
        multiple={false}
        onFileChange={(file) => handleFileChange(file as File)}
        onDrop={handleDrop}
      />

      {/* 🔽 Split Controls */}
      {pdfFile && (
        <div className="mb-6 mt-6">
          <h3 className="font-semibold text-[var(--foreground)] mb-2">
            📄 Enter Ranges
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <label className="flex flex-col text-sm text-[var(--foreground)]">
              Page Ranges (e.g. 1-3,5-10)
              <input
                type="text"
                value={pageRanges}
                onChange={(e) => setPageRanges(e.target.value)}
                className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 mt-1 w-64"
              />
            </label>

            <button
              onClick={handleSplit}
              disabled={loading}
              className="bg-[var(--accent)] text-white px-4 py-2 rounded hover:bg-[var(--accent-hover)] disabled:opacity-50"
            >
              {loading ? "Splitting..." : "Split PDF"}
            </button>

            <button
              onClick={handleReset}
              className="border border-[var(--border)] px-4 py-2 rounded text-[var(--foreground)] hover:bg-[var(--border)]/20 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              Reset
            </button>
          </div>
          {totalPages !== null && (
            <p className="text-sm opacity-80 mt-2">
              Total Pages in PDF: <strong>{totalPages}</strong>
            </p>
          )}
        </div>
      )}

      {/* 📄 Split Results */}
      {splitParts.length > 0 && (
        <div ref={resultRef} className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
            🧾 Split Results
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {splitParts.map((part) => (
              <div
                key={part.partNumber}
                className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card)] shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-[var(--card-text)] mb-2">
                  📄 Part {part.partNumber}
                </h3>
                <p className="text-sm opacity-80 mb-3">
                  Pages: {part.pages.join(", ")}
                </p>
                <button
                  onClick={() => handleDownload(part.partNumber, part.blob)}
                  className="bg-[var(--accent)] text-white px-3 py-2 rounded hover:bg-[var(--accent-hover)] text-sm flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  Download Part {part.partNumber}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="mt-16 pt-8 border-t border-[var(--border)] text-[var(--foreground)] transition-colors duration-500">
        <h2 className="text-3xl font-bold mb-4">Why Use a PDF Splitter?</h2>
        <p className="mb-4 opacity-90">
          Splitting a PDF is one of the most useful and practical document
          management tasks. It allows you to transform a single, large file —
          such as an annual report, combined contracts, or scanned forms — into
          smaller, focused documents. This helps improve organization,
          collaboration, and sharing.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">
          Key Features and Benefits
        </h3>
        <ul className="list-disc list-inside space-y-3 mb-6 ml-4 opacity-90">
          <li>
            <span className="font-semibold text-[var(--foreground)]">
              Granular Control:
            </span>{" "}
            Specify exact page ranges (e.g.,{" "}
            <code className="bg-[var(--card)] px-1 rounded text-[var(--foreground)]">
              1-5
            </code>{" "}
            for Chapter 1,{" "}
            <code className="bg-[var(--card)] px-1 rounded text-[var(--foreground)]">
              10-12
            </code>{" "}
            for the Appendix). Each file contains only the content you need.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">
              Automatic Cleanup:
            </span>{" "}
            The tool intelligently handles pages outside your defined ranges. If
            you extract{" "}
            <code className="bg-[var(--card)] px-1 rounded text-[var(--foreground)]">
              1-5
            </code>{" "}
            from a 10-page file, pages 6–10 become a separate “remainder” file.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">
              Easier Sharing:
            </span>{" "}
            Smaller PDFs are faster to email or upload — perfect for sending
            only relevant pages.
          </li>
          <li>
            <span className="font-semibold text-[var(--foreground)]">
              Better File Management:
            </span>{" "}
            Dividing large PDFs simplifies storage, indexing, and retrieval
            within document systems.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6">
          How to Define Your Ranges
        </h3>
        <p className="opacity-90">
          The range input accepts a comma-separated list of page numbers and
          ranges. Here’s how it works:
        </p>
        <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl mt-3 space-y-2">
          <p className="font-mono text-sm">
            <code className="bg-[var(--border)] px-1 rounded text-[var(--foreground)]">
              1, 5, 10
            </code>{" "}
            — Creates three separate files, each containing a single page.
          </p>
          <p className="font-mono text-sm">
            <code className="bg-[var(--border)] px-1 rounded text-[var(--foreground)]">
              2-4, 7-9
            </code>{" "}
            — Creates one file with pages 2–4, and another with pages 7–9.
          </p>
          <p className="font-mono text-sm">
            <code className="bg-[var(--border)] px-1 rounded text-[var(--foreground)]">
              1-1, 1-1
            </code>{" "}
            — Invalid: Pages cannot be duplicated in output ranges.
          </p>
        </div>
      </section>
    </main>
  );
}
