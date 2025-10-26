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
import { saveAs } from "file-saver";
import { Buffer } from "buffer";
import axios, { AxiosError } from "axios";

global.Buffer = Buffer;

export default function PDFUnlockPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [unlockedBlob, setUnlockedBlob] = useState<Blob | null>(null);
  const [pdfName, setPdfName] = useState("unlocked.pdf");
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
    setPdfName(file.name.replace(/\.pdf$/, ""));
    setUnlockedBlob(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleUnlock = async () => {
    if (!pdfFile || !password.trim()) {
      setErrorMessage("Please upload a PDF and enter the password to unlock.");
      return;
    }
    setErrorMessage(null);
    setLoading(true);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfBytesBase64 = Buffer.from(pdfBytes).toString("base64");

      const { data } = await axios.post("/api/pdf-unlock", {
        pdfBytes: pdfBytesBase64,
        password: password,
        filename: pdfName,
      });

      const unlockedPdfBytes = new Uint8Array(
        Buffer.from(data.unlockedPdfBytesBase64, "base64")
      );
      const blob = new Blob([unlockedPdfBytes], { type: "application/pdf" });

      setUnlockedBlob(blob);
      setPdfName(data.filename);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error: unknown) {
      console.error("Error unlocking PDF:", error);

      let message = "Unknown error";

      if (error instanceof Error) {
        message = error.message;
      }

      if (
        (error as AxiosError).response &&
        typeof (error as AxiosError).response?.data === "object" &&
        typeof ((error as AxiosError).response?.data as any).message ===
          "string"
      ) {
        message = ((error as AxiosError).response?.data as any).message;
      }

      setErrorMessage(`Failed to unlock PDF: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setPassword("");
    setUnlockedBlob(null);
    setErrorMessage(null);
  };

  const handleDownload = () => {
    if (unlockedBlob) {
      saveAs(unlockedBlob, pdfName);
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
          🔓 PDF Unlock
        </h1>
        <p className="text-gray-600">
          Upload a password-protected PDF and enter its password to unlock it.
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
          <h3 className="font-semibold text-gray-700 mb-2">
            🔑 Enter Password
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter current password"
              className="border rounded px-3 py-2 mt-1 w-64"
            />

            <button
              onClick={handleUnlock}
              disabled={loading}
              className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50"
            >
              Unlock PDF
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
      {unlockedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-green-300 bg-green-50 rounded"
        >
          <h3 className="text-green-700 font-medium mb-2">
            ✅ PDF is unlocked and ready to download!
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download Unlocked PDF
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      <section>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
            🔓 PDF Unlocker: Regain Access to Your Documents
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Password-protected PDFs are great for security, but they can become
            restrictive when you need to share or edit them freely. Our **PDF
            Unlock** tool allows you to permanently remove the password
            protection from your documents, giving you full access once you
            provide the correct, original password.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🔑 Key Benefits of Unlocking
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Seamless Sharing:** Share the document with colleagues or
                  friends without needing to send the password separately every
                  time.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Full Functionality:** Enable printing, copying, and editing
                  features that may have been restricted by the protection
                  settings.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Permanent Solution:** Once unlocked, the document stays
                  open, ready for use or archival without future password
                  prompts.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🔑 How It Works (Securely)
              </h3>
              <ol className="space-y-4 text-gray-600 list-decimal pl-5">
                <li>**Upload:** Upload your password-protected PDF file.</li>
                <li>
                  **Authenticate:** Enter the **original password** into the
                  input field. This is the only way to decrypt the file.
                </li>
                <li>
                  **Process:** The tool securely uses your password to remove
                  the encryption.
                </li>
                <li>
                  **Download:** Your unlocked PDF file is generated, ready for
                  immediate download and future use.
                </li>
              </ol>
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <div className="flex justify-center items-center gap-4 text-green-600 text-3xl">
                  🔒 ➡️ 🔓
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Convert a restricted file (🔒) into an unrestricted one (🔓)
                  with the correct password.
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-lg text-green-700 font-medium mt-10">
            Stop fighting with locked files. Upload your PDF, enter the key, and
            enjoy unrestricted access today!
          </p>
        </div>
      </section>
    </main>
  );
}
