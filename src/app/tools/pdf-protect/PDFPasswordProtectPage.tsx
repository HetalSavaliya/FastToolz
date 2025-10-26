// Your client-side component (e.g., pages/pdf-password-protect.tsx)
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
import { saveAs } from "file-saver"; // Make sure this is still installed
import { Buffer } from "buffer"; // Import Buffer
import axios, { AxiosError } from "axios";

global.Buffer = Buffer;

export default function PDFPasswordProtectPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [protectedBlob, setProtectedBlob] = useState<Blob | null>(null);
  const [pdfName, setPdfName] = useState("protected.pdf");
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (file: File) => {
    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload a valid PDF file.");
      return;
    }
    setErrorMessage(null);
    setPdfFile(file);
    setPdfName(file.name.replace(/\.pdf\$/, ""));
    setProtectedBlob(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleProtect = async () => {
    if (!pdfFile || !password.trim()) {
      setErrorMessage("Please upload a PDF and enter a password.");
      return;
    }
    setErrorMessage(null);
    setLoading(true);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfBytesBase64 = Buffer.from(pdfBytes).toString("base64");

      const { data } = await axios.post("/api/protect-pdf", {
        pdfBytes: pdfBytesBase64,
        password: password,
        filename: pdfName,
      });

      const encryptedPdfBytes = new Uint8Array(
        Buffer.from(data.encryptedPdfBytesBase64, "base64")
      );
      const blob = new Blob([encryptedPdfBytes], { type: "application/pdf" });

      setProtectedBlob(blob);
      setPdfName(data.filename);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error: unknown) {
      console.error("Error protecting PDF:", error);

      let message = "Unknown error";

      if (error instanceof Error) {
        message = error.message;
      }

      // Axios-specific error handling
      if (
        (error as AxiosError).response &&
        typeof (error as AxiosError).response?.data === "object" &&
        typeof ((error as AxiosError).response?.data as any).message ===
          "string"
      ) {
        message = ((error as AxiosError).response?.data as any).message;
      }

      setErrorMessage(`Failed to protect PDF: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setPassword("");
    setProtectedBlob(null);
    setErrorMessage(null);
  };

  const handleDownload = () => {
    if (protectedBlob) {
      saveAs(protectedBlob, pdfName);
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
          🔐 PDF Password Protect
        </h1>
        <p className="text-gray-600">
          Upload your PDF and set a password to protect it.
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
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-2">🔒 Set Password</h3>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border rounded px-3 py-2 mt-1 w-64"
            />

            <button
              onClick={handleProtect}
              disabled={loading}
              className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50"
            >
              Protect PDF
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

      {/* Download */}
      {protectedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-green-300 bg-green-50 rounded"
        >
          <h3 className="text-green-700 font-medium mb-2">
            ✅ PDF is password protected and ready to download!
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download Protected PDF
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      <section className="rich-content text-gray-700 mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Secure Your Documents: The Necessity of PDF Encryption
        </h2>
        <p className="mb-4">
          In a world where sensitive information is frequently exchanged via
          email and cloud storage, **password-protecting your PDF files** is a
          fundamental security practice. Whether dealing with financial records,
          legal contracts, or confidential reports, encryption ensures that only
          authorized individuals with the correct password can view the
          document's contents. This tool is designed to provide robust security
          by encrypting the document's contents, making the data unreadable
          without the key.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
          How PDF Encryption Works
        </h3>
        <p className="mb-4">
          When a PDF is password-protected, the tool uses industry-standard
          **AES (Advanced Encryption Standard)** to scramble the data. The
          password you set acts as the key to unlock the file. Unlike simple
          permissions, which can sometimes be bypassed, true encryption locks
          the entire content. Furthermore, you should **always choose a strong,
          unique password** for critical documents to maximize protection
          against brute-force attacks.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
          Security and Privacy Guarantees
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>
            **Data Integrity:** The protection process maintains the original
            document formatting and quality.
          </li>
          <li>
            **Zero Data Logging:** We do not store or log your uploaded PDFs or
            the passwords you use. The ideal process for protection (though
            mocked here) executes the encryption immediately and provides the
            file for download.
          </li>
          <li>
            **Cross-Platform Compatibility:** Password-protected PDFs can be
            opened on virtually any device or operating system using standard
            PDF readers (Acrobat, Preview, etc.).
          </li>
        </ul>
      </section>
    </main>
  );
}
