"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faRotateLeft,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { Buffer } from "buffer";
import axios from "axios";

globalThis.Buffer = Buffer;

export default function PDFToWordPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [docxName, setDocxName] = useState("converted.docx");
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      console.log(res.data.message); // "Hello from API!"
    });
  }, []);

  const handleFileChange = async (file: File) => {
    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload a valid PDF file.");
      return;
    }
    setErrorMessage(null);
    setPdfFile(file);
    setDocxName(file.name.replace(/\.pdf$/, ".docx"));
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
      const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

      const response = await axios.post("/api/pdf-to-word", {
        pdfBytes: pdfBase64,
        filename: pdfFile.name,
      });

      const data = response.data;
      const wordBytes = new Uint8Array(
        Buffer.from(data.wordBytesBase64, "base64")
      );
      const blob = new Blob([wordBytes], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      setConvertedBlob(blob);
      setDocxName(data.filename);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: any) {
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
      saveAs(convertedBlob, docxName);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
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
          Upload your PDF and convert it into a Word (.docx) file.
        </p>
      </div>

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

      {pdfFile && (
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <button
              onClick={handleConvert}
              disabled={loading}
              className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50"
            >
              Convert to Word
            </button>
            <button
              onClick={handleReset}
              className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              Reset
            </button>
          </div>
        </div>
      )}

      {convertedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-green-300 bg-green-50 rounded"
        >
          <h3 className="text-green-700 font-medium mb-2">
            ✅ Word file is ready to download!
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download Word File
          </button>
        </div>
      )}

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </main>
  );
}
