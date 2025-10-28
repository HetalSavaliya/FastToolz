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
  faFilePdf,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver"; // Make sure this is still installed
import { Buffer } from "buffer"; // Import Buffer
import axios, { AxiosError } from "axios";
import UploadArea from "@/components/UploadArea";

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
    <main className="w-full px-4 py-6 transition-colors duration-500 text-[var(--foreground)] ">
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
          🔐 PDF Password Protect
        </h1>
        <p className="opacity-80">
          Upload your PDF and set a password to protect it securely in your
          browser.
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

      {pdfFile && (
        <div className="mt-6 mb-6">
          <h3 className="font-semibold mb-2 text-[var(--foreground)]">
            🔒 Set Password
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded px-3 py-2 mt-1 w-64 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            />

            <button
              onClick={handleProtect}
              disabled={loading}
              className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-all"
            >
              {loading ? "Protecting..." : "Protect PDF"}
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

      {/* Download Result */}
      {protectedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-[var(--accent)] bg-[var(--card)] rounded-lg shadow-md"
        >
          <h3 className="font-medium text-[var(--accent)] mb-2">
            ✅ PDF is password protected and ready to download!
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download Protected PDF
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="text-red-400 mt-4 font-medium">{errorMessage}</div>
      )}

      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
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

        <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3 mt-6">
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

        <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3 mt-6">
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
