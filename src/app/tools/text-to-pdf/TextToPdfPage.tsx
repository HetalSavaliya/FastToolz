"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  pdf,
  Document,
  Page,
  Text as PdfText,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      readTextFile(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/plain") {
      readTextFile(file);
    }
  };

  const readTextFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setTextContent(reader.result as string);
      setFileName(file.name.replace(/\.[^/.]+$/, ".pdf"));
    };
    reader.readAsText(file);
  };

  const generatePDF = async () => {
    if (!textContent.trim()) {
      alert("Text content is empty.");
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
          📄 Text to PDF Converter
        </h1>
        <p className="text-gray-600">
          Upload a text file or paste content below, then export it as a clean
          PDF file.
        </p>
      </div>

      {/* Upload area */}
      <div
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center cursor-pointer bg-white hover:bg-gray-50 transition mb-6"
      >
        <label className="cursor-pointer">
          <input type="file" accept=".txt" hidden onChange={handleFileChange} />
          <div className="text-gray-600">
            <FontAwesomeIcon icon={faUpload} className="text-2xl mb-2" />
            <p className="text-sm font-medium">
              Click to upload or drag a .txt file here
            </p>
          </div>
        </label>
      </div>

      {/* Text area */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">📝 Edit Content</h3>
        <textarea
          ref={textAreaRef}
          rows={12}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Enter or paste text here..."
          className="w-full border border-gray-300 rounded p-3 text-sm font-mono resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={generatePDF}
          disabled={loading || !textContent.trim()}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50"
        >
          {loading ? "Generating..." : "Download as PDF"}
        </button>
        <button
          onClick={handleReset}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          Reset
        </button>
      </div>
      <section>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
            📄 Convert Plain Text to Professional PDF
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Creating a PDF from text or a simple `.txt` file is essential for
            sharing documents that need to maintain their format and appearance
            across different devices. Our **Text to PDF Converter** takes the
            headache out of document portability, giving you a clean, standard
            A4 PDF from your raw text content.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🚀 Why Use the PDF Format?
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Universal Compatibility:** PDFs look the same regardless of
                  the operating system, device, or software used to view them.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Professional Standard:** PDF is the go-to format for
                  submitting résumés, academic papers, invoices, and legal
                  documents.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Print Ready:** The output PDF is formatted on a standard A4
                  page size, making it perfect for printing without layout
                  issues.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                💡 Fast and Simple Workflow
              </h3>
              <ol className="space-y-4 text-gray-600 list-decimal pl-5">
                <li>
                  **Input Content:** Paste your text directly into the editor or
                  drag and drop a `.txt` file.
                </li>
                <li>
                  **Review and Edit:** Use the large text area to make any final
                  adjustments to your content before conversion.
                </li>
                <li>
                  **Generate & Download:** Click **"Download as PDF"** and
                  receive your finalized PDF document instantly.
                </li>
              </ol>
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <div className="flex justify-center items-center gap-4 text-green-600 text-3xl">
                  ⌨️ ➡️ 📄
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Convert your raw keyboard input (⌨️) into a portable PDF (📄)
                  for easy sharing.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-lg text-green-700 font-medium mt-10">
            Stop worrying about formatting! Get your content into a clean PDF
            ready for the world.
          </p>
        </div>
      </section>
    </main>
  );
}
