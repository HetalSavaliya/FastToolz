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
      <section>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
            🧮 Instant Word Count and Readability Metrics
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're writing an essay with a strict limit, drafting an
            email, or optimizing content for web reading, having **accurate word
            and character counts** is essential. Our **Word Counter** provides
            instant, precise metrics for any text you paste or type.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🎯 Meet Your Writing Targets
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">✍️</span>
                  **Word Count:** The primary metric for essays, articles, and
                  reports. Ensure you stay within minimum and maximum
                  requirements effortlessly.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">🅰️</span>
                  **Character Count:** Crucial for social media (like
                  X/Twitter), titles, meta descriptions, and fields with
                  specific character limits.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">⏱️</span>
                  **Estimated Reading Time:** Gauge the engagement level of your
                  content by providing an estimated time based on an average
                  reading speed (200 words per minute).
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🚀 Features for Efficiency
              </h3>
              <ol className="space-y-4 text-gray-600 list-decimal pl-5">
                <li>
                  **Real-Time Updates:** Counts are updated the moment you type
                  or paste, giving you immediate feedback.
                </li>
                <li>
                  **Zero Uploads:** All counting is done instantly in your
                  browser—no need to upload files, ensuring your privacy.
                </li>
                <li>
                  **Whitespace Handling:** The word count intelligently handles
                  multiple spaces and line breaks, giving you an accurate count
                  of usable words.
                </li>
              </ol>
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-sm font-medium text-gray-500">
                  This tool is perfect for students, journalists, content
                  creators, and anyone needing precise text analysis.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-lg text-green-700 font-medium mt-10">
            Start analyzing your text today and perfect your word count!
          </p>
        </div>
      </section>
    </main>
  );
}
