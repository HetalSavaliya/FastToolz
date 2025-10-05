"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileLines } from "@fortawesome/free-solid-svg-icons";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const readingTime = Math.ceil(wordCount / 200); // Average 200 wpm

  const handleClear = () => setText("");

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
        <FontAwesomeIcon icon={faFileLines} />
        Word Counter
      </h1>
      <p className="text-gray-600 mb-6">
        Count words, characters, and estimate reading time quickly.
      </p>

      {/* Text Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Paste or type your text here..."
        className="w-full border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[#66AF85] outline-none mb-4"
      />

      {/* Clear Button */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleClear}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {/* Output */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
        <div className="bg-white border rounded-lg p-4 shadow text-center">
          <h3 className="font-semibold mb-1">Words</h3>
          <p className="text-2xl font-bold">{wordCount}</p>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow text-center">
          <h3 className="font-semibold mb-1">Characters</h3>
          <p className="text-2xl font-bold">{charCount}</p>
        </div>
        <div className="bg-white border rounded-lg p-4 shadow text-center">
          <h3 className="font-semibold mb-1">Reading Time</h3>
          <p className="text-2xl font-bold">{readingTime} min</p>
        </div>
      </div>
    </main>
  );
}
