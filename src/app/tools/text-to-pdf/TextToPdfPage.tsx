"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRotateLeft,
  faDownload,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  pdf,
  Document,
  Page,
  Text as PdfText,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import UploadArea from "@/components/UploadArea";

const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

const MyPDF = ({ content }: { content: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PdfText style={styles.text}>{content}</PdfText>
    </Page>
  </Document>
);

export default function TextToPdfPage() {
  const [textContent, setTextContent] = useState("");
  const [fileName, setFileName] = useState("converted.pdf");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = (file: File) => {
    if (file.type !== "text/plain") {
      setErrorMessage("Please upload a valid .txt file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTextContent(reader.result as string);
      setFileName(file.name.replace(/\.[^/.]+$/, ".pdf"));
    };
    reader.readAsText(file);
    setErrorMessage(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const generatePDF = async () => {
    if (!textContent.trim()) {
      setErrorMessage("Please add or upload some text to convert.");
      return;
    }

    setLoading(true);
    const blob = await pdf(<MyPDF content={textContent} />).toBlob();
    saveAs(blob, fileName);
    setLoading(false);
  };

  const handleReset = () => {
    setTextContent("");
    setFileName("converted.pdf");
    setErrorMessage(null);
  };

  return (
    <main className="w-full px-4 py-6 text-[var(--foreground)] transition-colors duration-500">
      {/* 🡸 Back Link */}
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
          📄 Text to PDF Converter
        </h1>
        <p className="opacity-80">
          Upload a .txt file or paste your content below — easily generate a
          clean, portable PDF file.
        </p>
      </div>

      {/* Upload Area */}
      <UploadArea
        title="Drag & drop your .txt file here"
        subtitle="or click to browse — supports single text files"
        icon={faFileAlt}
        accept=".txt"
        multiple={false}
        onFileChange={(file) => handleFileChange(file as File)}
        onDrop={handleDrop}
      />

      {/* Text Area */}
      <div className="mt-6 mb-6">
        <h3 className="font-semibold mb-2 text-[var(--foreground)]">
          📝 Edit Content
        </h3>
        <textarea
          ref={textAreaRef}
          rows={12}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Enter or paste your text here..."
          className="w-full border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded-lg p-3 text-sm font-mono resize-none placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
        />
      </div>

      {/* Controls */}
      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={generatePDF}
          disabled={loading || !textContent.trim()}
          className={`relative bg-[var(--accent)] text-white px-5 py-2 rounded-lg transition-all flex items-center gap-2 ${
            loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-[var(--accent-hover)]"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faDownload} />
              Download as PDF
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card)] transition-all flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          Reset
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-500 mt-4 text-sm">{errorMessage}</div>
      )}

      {/* Info Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2 flex items-center gap-2">
          📄 Convert Plain Text to Professional PDF
        </h2>
        <p className="text-lg text-[var(--foreground)] mb-8">
          Converting text to PDF ensures that your content stays consistent
          across devices. Our **Text to PDF Converter** creates clean,
          print-ready A4 documents from your raw text — perfect for notes,
          scripts, or reports.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🚀 Why Use the PDF Format?
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Universal Compatibility:** PDFs display the same everywhere,
                no matter the OS or device.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Professional Layout:** Ideal for sharing resumes, reports, or
                manuscripts that must retain structure.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Print-Ready:** Output follows A4 format for perfect printing.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              💡 Fast and Simple Workflow
            </h3>
            <ol className="space-y-4 text-[var(--foreground)] list-decimal pl-5">
              <li>**Upload:** Drag and drop or select a .txt file.</li>
              <li>**Edit:** Review and make final tweaks to your text.</li>
              <li>**Generate:** Click download to instantly get your PDF.</li>
            </ol>

            <div className="mt-6 p-4 border border-dashed border-[var(--accent)] rounded-lg text-center">
              <div className="flex justify-center items-center gap-4 text-[var(--foreground)] text-3xl">
                ⌨️ ➡️ 📄
              </div>
              <p className="text-sm text-[var(--foreground)] mt-2">
                Convert your raw keyboard input (⌨️) into a professional,
                portable document (📄).
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Create polished PDFs instantly — upload, edit, and download in one
          smooth workflow!
        </p>
      </section>
    </main>
  );
}
