"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUpload,
  faRotateLeft,
  faDownload,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { Buffer } from "buffer";
import axios, { AxiosError } from "axios";

global.Buffer = Buffer;

export default function PDFSignPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [signedBlob, setSignedBlob] = useState<Blob | null>(null);
  const [pdfName, setPdfName] = useState("signed.pdf");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [signatureText, setSignatureText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  const resultRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (file: File) => {
    if (file.type !== "application/pdf") {
      setErrorMessage("Please upload a valid PDF file.");
      return;
    }
    setErrorMessage(null);
    setPdfFile(file);
    setPdfName(file.name.replace(/\.pdf$/, "-signed.pdf"));
    setSignedBlob(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleSign = async () => {
    if (!pdfFile || !signatureText) {
      setErrorMessage("Please upload a PDF and enter a signature.");
      return;
    }
    setErrorMessage(null);
    setLoading(true);

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfBytesBase64 = Buffer.from(pdfBytes).toString("base64");

      const { data } = await axios.post("/api/pdf-sign", {
        pdfBytes: pdfBytesBase64,
        signatureText,
        pageNumber: pageNumber - 1,
        x,
        y,
        filename: pdfName,
      });

      const signedPdfBytes = new Uint8Array(
        Buffer.from(data.signedPdfBytesBase64, "base64")
      );
      const blob = new Blob([signedPdfBytes], { type: "application/pdf" });

      setSignedBlob(blob);
      setPdfName(data.filename);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error: unknown) {
      let message = "Unknown error";
      if (error instanceof Error) message = error.message;
      if (
        (error as AxiosError).response &&
        typeof (error as AxiosError).response?.data === "object" &&
        typeof ((error as AxiosError).response?.data as any).message ===
          "string"
      ) {
        message = ((error as AxiosError).response?.data as any).message;
      }
      setErrorMessage(`Failed to sign PDF: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setSignedBlob(null);
    setErrorMessage(null);
    setSignatureText("");
    setPageNumber(1);
    setX(50);
    setY(50);
  };

  const handleDownload = () => {
    if (signedBlob) {
      saveAs(signedBlob, pdfName);
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

      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
        ✍️ PDF Sign
      </h1>
      <p className="text-gray-600 mb-6">Digitally sign PDF documents.</p>

      {/* Upload */}
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
            onChange={(e) =>
              e.target.files?.[0] && handleFileChange(e.target.files[0])
            }
          />
          <div className="text-gray-600">
            <FontAwesomeIcon icon={faUpload} className="text-2xl mb-2" />
            <p className="text-sm font-medium">
              Click to upload or drag a PDF here
            </p>
          </div>
        </label>
      </div>

      {/* Signature Form */}
      {pdfFile && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium">
              Signature Text
            </label>
            <input
              type="text"
              value={signatureText}
              onChange={(e) => setSignatureText(e.target.value)}
              className="border rounded px-3 py-2 mt-1 w-full"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <div>
              <label className="block text-gray-700 font-medium">
                Page Number
              </label>
              <input
                type="number"
                min={1}
                value={pageNumber}
                onChange={(e) => setPageNumber(Number(e.target.value))}
                className="border rounded px-3 py-2 mt-1 w-28"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                X Position
              </label>
              <input
                type="number"
                value={x}
                onChange={(e) => setX(Number(e.target.value))}
                className="border rounded px-3 py-2 mt-1 w-28"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Y Position
              </label>
              <input
                type="number"
                value={y}
                onChange={(e) => setY(Number(e.target.value))}
                className="border rounded px-3 py-2 mt-1 w-28"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleSign}
              disabled={loading}
              className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] disabled:opacity-50 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPenNib} />
              {loading ? "Signing..." : "Sign PDF"}
            </button>

            <button
              onClick={handleReset}
              className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Download */}
      {signedBlob && (
        <div
          ref={resultRef}
          className="mt-6 p-4 border border-green-300 bg-green-50 rounded"
        >
          <h3 className="text-green-700 font-medium mb-2">
            ✅ PDF signed successfully and ready to download!
          </h3>
          <button
            onClick={handleDownload}
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download Signed PDF
          </button>
        </div>
      )}

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </main>
  );
}
