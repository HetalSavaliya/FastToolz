"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFont } from "@fortawesome/free-solid-svg-icons";

export default function TextCaseConverterPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleUpperCase = () => setResult(text.toUpperCase());
  const handleLowerCase = () => setResult(text.toLowerCase());
  const handleTitleCase = () =>
    setResult(
      text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  const handleClear = () => {
    setText("");
    setResult("");
  };

  return (
    <main className="w-full min-h-screen px-6 py-10">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[#66AF85] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-gray-800">
        <FontAwesomeIcon icon={faFont} />
        Text Case Converter
      </h1>
      <p className="text-gray-600 mb-6">
        Convert your text to UPPERCASE, lowercase, Title Case, and more
        instantly.
      </p>

      {/* Text Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Enter your text here..."
        className="w-full border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[#66AF85] outline-none mb-4"
      />

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap mb-6">
        <button
          onClick={handleUpperCase}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71]"
        >
          UPPERCASE
        </button>
        <button
          onClick={handleLowerCase}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71]"
        >
          lowercase
        </button>
        <button
          onClick={handleTitleCase}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71]"
        >
          Title Case
        </button>
        <button
          onClick={handleClear}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {/* Output */}
      <div>
        <h2 className="font-medium text-gray-700 mb-2">Output:</h2>
        <pre className="bg-black text-green-400 p-4 rounded-lg overflow-auto text-sm min-h-[150px] whitespace-pre-wrap">
          {result || "➡️ Your converted text will appear here"}
        </pre>
      </div>
    </main>
  );
}
