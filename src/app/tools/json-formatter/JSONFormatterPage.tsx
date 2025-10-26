"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCode, faCopy } from "@fortawesome/free-solid-svg-icons";

export default function JSONFormatterPage() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch (err) {
      alert("Invalid JSON. Please check your input.");
    }
  };

  const handleCopy = () => {
    if (!formatted) return;
    navigator.clipboard.writeText(formatted);
    alert("Formatted JSON copied to clipboard!");
  };

  const handleReset = () => {
    setInput("");
    setFormatted("");
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
        <FontAwesomeIcon icon={faCode} />
        JSON Formatter
      </h1>
      <p className="text-gray-600 mb-6">
        Paste your JSON and format it for readability.
      </p>

      {/* JSON Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JSON here..."
        className="w-full border rounded-lg p-4 font-mono text-sm mb-4 h-48 focus:ring-2 focus:ring-[#66AF85] outline-none resize-none"
      />

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleFormat}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71]"
        >
          Format JSON
        </button>
        <button
          onClick={handleCopy}
          className="bg-[#66AF85]/80 text-white px-4 py-2 rounded hover:bg-[#589c71]/90 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faCopy} /> Copy
        </button>
        <button
          onClick={handleReset}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      {/* Formatted Output */}
      {formatted && (
        <div className="bg-gray-50 border rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
          {formatted}
        </div>
      )}
      <section className="rich-content text-gray-700 mt-16 pt-8 border-t border-gray-200 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          The Essential Online JSON Formatter and Validator
        </h2>
        <p className="mb-4">
          Our **JSON Formatter and Validator** provides a clean, user-friendly
          interface for transforming compact or hard-to-read JSON strings into
          beautifully formatted, indented text. This tool is crucial for
          **debugging APIs**, analyzing configuration files, and ensuring data
          structures adhere to strict JSON standards. By automatically applying
          indentation, it saves developers countless hours spent manually
          scanning for syntax errors.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
          Built-in JSON Validation
        </h3>
        <p className="mb-4">
          Beyond mere formatting, this tool acts as a real-time **JSON
          validator**. When you click "Format & Validate," the application
          attempts to parse the input using the browser's native JavaScript
          parser. If your input contains any syntax errors—such as trailing
          commas, unquoted property names, or mismatched braces—it will fail
          gracefully and notify you with a specific error message. This helps
          you **troubleshoot data issues instantly** before sending requests to
          your server or pipeline.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
          Key Features for Productivity
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
          <li>
            **Client-Side Processing:** All parsing and formatting occur
            entirely in your browser. **No data is sent to our servers**,
            ensuring your sensitive payloads remain 100% private.
          </li>
          <li>
            **Pretty Print:** Formats the output with two-space indentation
            (standard setting) for maximum readability.
          </li>
          <li>
            **One-Click Copy:** Easily copy the beautifully formatted code
            directly to your clipboard using the dedicated "Copy Output" button.
          </li>
          <li>
            **Error Isolation:** Provides instant feedback on invalid syntax to
            streamline your debugging process.
          </li>
        </ul>
      </section>
    </main>
  );
}
