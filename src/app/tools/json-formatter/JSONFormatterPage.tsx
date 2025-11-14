"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCode,
  faCopy,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // 🧮 Update word count dynamically
  useEffect(() => {
    const words = input.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  }, [input]);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch (err) {
      alert("⚠️ Invalid JSON. Please check your input.");
    }
  };

  const handleCopy = () => {
    if (!formatted) return;
    navigator.clipboard.writeText(formatted);
    alert("✅ Formatted JSON copied to clipboard!");
  };

  const handleReset = () => {
    setInput("");
    setFormatted("");
  };

  return (
    <main className="w-full px-4 py-8 md:px-8 lg:px-16 text-[var(--foreground)] transition-colors duration-500">
      {/* 🡸 Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[var(--accent)] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faCode} className="text-[var(--accent)]" />
          JSON Formatter
        </h1>
        <p className="opacity-80">
          Paste your JSON data below and format it for better readability.
        </p>
      </div>

      {/* JSON Input */}
      <div className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded-lg p-4 font-mono text-sm h-48 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition resize-none"
        />
        <div className="text-sm opacity-70 mt-2 text-right">
          🧾 Word Count: <span className="font-semibold">{wordCount}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleFormat}
          className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-all"
        >
          Format JSON
        </button>
        <button
          onClick={handleCopy}
          disabled={!formatted}
          className="bg-[var(--accent)]/90 text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)]/90 flex items-center gap-2 disabled:opacity-50 transition-all"
        >
          <FontAwesomeIcon icon={faCopy} /> Copy
        </button>
        <button
          onClick={handleReset}
          className="border border-[var(--border)] text-[var(--foreground)] px-4 py-2 rounded-lg hover:bg-[var(--card)] transition-all flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          Reset
        </button>
      </div>

      {/* Formatted Output */}
      {formatted && (
        <div className="bg-[var(--card)] border border-[var(--accent)] rounded-lg p-4 font-mono text-sm whitespace-pre-wrap shadow-sm">
          {formatted}
        </div>
      )}

      {/* Informational Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2">
          🧠 The Essential Online JSON Formatter and Validator
        </h2>
        <p className="text-lg text-[var(--foreground)] mb-8">
          Our <strong>JSON Formatter and Validator</strong> provides a
          lightweight, secure, and beautifully responsive interface for
          transforming compact or minified JSON into a clear and indented
          structure. Perfect for developers debugging APIs, data engineers
          analyzing configurations, or anyone working with structured data.
        </p>

        <div className="grid md:grid-cols-2 gap-8 p-4 border border-[var(--accent)] rounded-lg">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3">
              ⚙️ Why Use a JSON Formatter?
            </h3>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Readability:</strong> Proper indentation makes nested
                data easy to follow.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Debugging:</strong> Identify syntax issues instantly
                while parsing JSON.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Validation:</strong> Ensures the JSON follows correct
                structural rules.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3">
              🔒 100% Secure & Client-Side
            </h3>
            <ol className="space-y-3 list-decimal pl-5">
              <li>
                All processing happens directly in your browser — your data
                never leaves your device.
              </li>
              <li>
                Works offline once loaded; no internet connection needed after
                page load.
              </li>
              <li>
                Great for developers handling private or sensitive JSON data.
              </li>
            </ol>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          ✨ Paste your JSON, format it beautifully, and work smarter — all in
          your browser!
        </p>
      </section>
    </main>
  );
}
