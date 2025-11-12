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
import axios from "axios";

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

  const handleConvert = async () => {
    if (!pdfFile) {
      setErrorMessage("Please upload a PDF file.");
      return;
    }
    setErrorMessage(null);
    setLoading(true);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const uint8Array = new Uint8Array(pdfBytes);
      let binaryString = "";
      for (const byte of uint8Array) {
        binaryString += String.fromCharCode(byte);
      }
      const pdfBase64 = btoa(binaryString);

      const response = await axios.post("/api/pdf-to-word", {
        pdfBytes: pdfBase64,
        filename: pdfFile.name,
      });

      const data = response.data;
      const wordBytes = Uint8Array.from(atob(data.wordBytesBase64), (c) =>
        c.charCodeAt(0)
      );

      const blob = new Blob([wordBytes], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      setConvertedBlob(blob);
      setDocxName(data.filename || docxName);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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
          📄 PDF to Word Converter
        </h1>
        <p className="text-gray-600">
          Upload your PDF and convert it to an editable Word document.
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

      {/* Controls */}
      {pdfFile && (
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={handleConvert}
            disabled={loading}
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50"
          >
            {loading ? "Converting..." : "Convert to Word"}
          </button>

          <button
            onClick={handleReset}
            className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
            Reset
          </button>
        </div>
      )}

      {/* Download */}
      {convertedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-green-300 bg-green-50 rounded"
        >
          <h3 className="text-green-700 font-medium mb-2">
            ✅ Conversion successful! Your Word document is ready.
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download {docxName}
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      <section>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
            📝 Transform Your Documents: PDF to Word Converter
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            PDFs are excellent for secure viewing and consistent sharing, but
            they become frustrating when you need to make corrections or major
            updates. Our **PDF to Word Converter** is designed to unlock the
            editability of your documents, seamlessly turning static PDFs into
            flexible, fully editable **.docx** files.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                ✅ Why Convert Your PDF to Word?
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Full Editability:** Edit text, rearrange paragraphs, change
                  fonts, and insert or delete images directly using Microsoft
                  Word.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Content Reusability:** Easily extract structured data like
                  tables and complex layouts without tedious reformatting.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Preserved Formatting:** Our tool analyzes the PDF structure
                  to preserve the original layout, headings, and images as
                  accurately as possible.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                ⬇️ Simple and Secure Conversion Process
              </h3>
              <ol className="space-y-4 text-gray-600 list-decimal pl-5">
                <li>
                  **Upload:** Drag and drop your PDF file or click the upload
                  area to select it.
                </li>
                <li>
                  **Convert:** Click the **"Convert to Word"** button to
                  initiate the process.
                </li>
                <li>
                  **Download:** Once the conversion is successful, you can
                  instantly download your new, editable **.docx** file.
                </li>
              </ol>
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <div className="flex justify-center items-center gap-4 text-green-600 text-3xl">
                  📄 ➡️ 📝
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Convert your non-editable PDF (📄) into a fully editable Word
                  document (📝).
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-lg text-green-700 font-medium mt-10">
            Stop retyping! Upload your PDF and get your editable Word file in
            seconds.
          </p>
        </div>
      </section>
    </main>
  );
}
