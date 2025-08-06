"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faDownload,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { pdf } from "@react-pdf/renderer";
import {
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
    <main className="max-w-5xl mx-auto px-6 py-10">
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
    </main>
  );
}
