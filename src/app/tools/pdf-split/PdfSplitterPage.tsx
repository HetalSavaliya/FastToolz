"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faRotateLeft,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

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

      // Parse all ranges
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
          ✂️ PDF Splitter
        </h1>
        <p className="text-gray-600">
          Upload a PDF, enter page ranges like{" "}
          <code className="bg-gray-100 px-1 mx-1 rounded">1-3,5-10</code>, and
          the rest of the pages will be auto-split.
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

      {/* Split Controls */}
      {pdfFile && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">📄 Enter Ranges</h3>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <label className="flex flex-col text-sm">
              Page Ranges (e.g. 1-3,5-10)
              <input
                type="text"
                value={pageRanges}
                onChange={(e) => setPageRanges(e.target.value)}
                className="border rounded px-3 py-2 mt-1 w-64"
              />
            </label>

            <button
              onClick={handleSplit}
              disabled={loading}
              className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50"
            >
              {loading ? "Splitting..." : "Split PDF"}
            </button>

            <button
              onClick={handleReset}
              className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              Reset
            </button>
          </div>
          {totalPages !== null && (
            <p className="text-sm text-gray-500 mt-2">
              Total Pages in PDF: <strong>{totalPages}</strong>
            </p>
          )}
        </div>
      )}

      {/* Split Cards */}
      {splitParts.length > 0 && (
        <div ref={resultRef} className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            🧾 Split Results
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {splitParts.map((part) => (
              <div
                key={part.partNumber}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <h3 className="font-semibold text-gray-700 mb-2">
                  📄 Part {part.partNumber}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Pages: {part.pages.join(", ")}
                </p>
                <button
                  onClick={() => handleDownload(part.partNumber, part.blob)}
                  className="bg-[#66AF85] text-white px-3 py-2 rounded hover:bg-[#589c71] text-sm flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faDownload} />
                  Download Part {part.partNumber}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* -------------------------------------------------------- */}
      {/* 📚 RICH CONTENT SECTION */}
      {/* -------------------------------------------------------- */}
      <section className="mt-16 pt-8 border-t border-gray-200 text-gray-700">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why Use a PDF Splitter?
        </h2>
        <p className="mb-4">
          Splitting a PDF is one of the most common and powerful document
          management tasks. It allows you to transform a single, monolithic
          file—such as a large annual report, a compiled user manual, or a
          single scan of multiple agreements—into smaller, focused documents.
          This is essential for organization and collaboration.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
          Key Features and Benefits
        </h3>
        <ul className="list-disc list-inside space-y-3 mb-6 ml-4">
          <li>
            **Granular Control:** Specify exact page ranges (e.g., **1-5** for
            Chapter 1, **10-12** for the Appendix). This precision ensures each
            new file contains only the required content.
          </li>
          <li>
            **Automatic Cleanup:** Our tool handles the non-specified pages
            automatically. If you define{" "}
            <code className="bg-gray-100 px-1 rounded text-gray-800">1-5</code>{" "}
            in a 10-page document, pages 6 through 10 will be grouped into a
            final "remainder" part, ensuring no content is lost.
          </li>
          <li>
            **Easier Sharing:** Small files are faster to email and upload,
            making it easier to share only the relevant sections with colleagues
            or clients.
          </li>
          <li>
            **File Management:** Breaking a large PDF into smaller components
            simplifies indexing and archiving in document management systems.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
          How to Define Your Ranges
        </h3>
        <p>
          The range input field accepts a comma-separated list of page numbers
          and ranges. Remember these simple rules:
        </p>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-3">
          <p className="font-mono text-sm mb-2">
            <code className="bg-gray-200 px-1 rounded text-gray-800">
              1, 5, 10
            </code>
            : Creates three separate files, each containing a single page.
          </p>
          <p className="font-mono text-sm mb-2">
            <code className="bg-gray-200 px-1 rounded text-gray-800">
              2-4, 7-9
            </code>
            : Creates a file with pages 2, 3, and 4, and another file with pages
            7, 8, and 9.
          </p>
          <p className="font-mono text-sm">
            <code className="bg-gray-200 px-1 rounded text-gray-800">
              1-1, 1-1
            </code>
            : Invalid, as pages cannot be duplicated in the output ranges.
          </p>
        </div>
      </section>
    </main>
  );
}
