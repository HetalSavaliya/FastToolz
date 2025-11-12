"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faRotateLeft,
  faDownload,
  faFilePdf,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { Buffer } from "buffer";
import axios, { AxiosError } from "axios";
import UploadArea from "@/components/UploadArea";

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
    <main className="w-full px-4 py-6 transition-colors duration-500 text-[var(--foreground)] ">
      {/* 🡸 Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[var(--accent)] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
          🔓 PDF Unlock
        </h1>
        <p className="opacity-80">
          Upload a password-protected PDF and enter its password to unlock it.
        </p>
      </div>

      {/* Upload Area */}
      <UploadArea
        title="Drag & drop your PDFs here"
        subtitle="or click to browse — supports single files"
        icon={faFilePdf}
        accept="application/pdf"
        multiple={false}
        onFileChange={(file) => handleFileChange(file as File)}
        onDrop={handleDrop}
      />

      {pdfFile && (
        <div className="mt-6 mb-6 p-4 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faFilePdf}
              className="text-[var(--accent)] text-2xl"
            />
            <div>
              <p className="font-medium">{pdfFile.name}</p>
              <p className="text-sm opacity-70">
                {(pdfFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>

          <button
            onClick={() => setPdfFile(null)}
            className="text-red-500 hover:text-red-700 transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            Delete
          </button>
        </div>
      )}

      {/* Controls */}
      {pdfFile && (
        <div className="mt-6 mb-6">
          <h3 className="font-semibold mb-2 text-[var(--foreground)]">
            🔑 Enter Password
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 mt-1 w-64 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            />

            <button
              onClick={handleUnlock}
              disabled={loading}
              className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-all"
            >
              {loading ? "Protecting..." : "Unlock PDF"}
            </button>

            <button
              onClick={handleReset}
              className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card)] transition-all flex items-center gap-2"
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
          className="mt-6 p-4 border border-[var(--accent)] bg-[var(--card)] rounded-lg shadow-md"
        >
          <h3 className="font-medium text-[var(--accent)] mb-2">
            ✅ PDF is unlocked and ready to download!
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download Unlocked PDF
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2">
          🔓 PDF Unlocker: Regain Access to Your Documents
        </h2>
        <p className="text-lg text-[var(--foreground)] mb-8">
          Password-protected PDFs are great for security, but they can become
          restrictive when you need to share or edit them freely. Our **PDF
          Unlock** tool allows you to permanently remove the password protection
          from your documents, giving you full access once you provide the
          correct, original password.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg  gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🔑 Key Benefits of Unlocking
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Seamless Sharing:** Share the document with colleagues or
                friends without needing to send the password separately every
                time.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Full Functionality:** Enable printing, copying, and editing
                features that may have been restricted by the protection
                settings.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Permanent Solution:** Once unlocked, the document stays open,
                ready for use or archival without future password prompts.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🔑 How It Works (Securely)
            </h3>
            <ol className="space-y-4 text-[var(--foreground)] list-decimal pl-5">
              <li>**Upload:** Upload your password-protected PDF file.</li>
              <li>
                **Authenticate:** Enter the **original password** into the input
                field. This is the only way to decrypt the file.
              </li>
              <li>
                **Process:** The tool securely uses your password to remove the
                encryption.
              </li>
              <li>
                **Download:** Your unlocked PDF file is generated, ready for
                immediate download and future use.
              </li>
            </ol>
            <div className="mt-6 p-4 border  border-dashed border-[var(--accent)] rounded-lg text-center">
              <div className="flex justify-center items-center gap-4 text-[var(--foreground)] text-3xl">
                🔒 ➡️ 🔓
              </div>
              <p className="text-sm text-[var(--foreground)] mt-2">
                Convert a restricted file (🔒) into an unrestricted one (🔓)
                with the correct password.
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Stop fighting with locked files. Upload your PDF, enter the key, and
          enjoy unrestricted access today!
        </p>
      </section>
    </main>
  );
}
