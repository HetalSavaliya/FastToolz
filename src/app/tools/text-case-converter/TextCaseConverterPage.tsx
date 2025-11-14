"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFont,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

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
    <main className="w-full px-6 py-10 text-[var(--foreground)] transition-colors duration-500">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[var(--accent)] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-[var(--foreground)]">
        <FontAwesomeIcon icon={faFont} className="text-[var(--accent)]" />
        Text Case Converter
      </h1>
      <p className="opacity-80 mb-6">
        Instantly convert your text to <strong>UPPERCASE</strong>,{" "}
        <strong>lowercase</strong>, or <strong>Title Case</strong> — quickly,
        cleanly, and without manual edits.
      </p>

      {/* Input Box */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Enter your text here..."
        className="w-full border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-[var(--accent)] outline-none mb-4 transition-all"
      />

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleUpperCase}
          className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-all"
        >
          UPPERCASE
        </button>
        <button
          onClick={handleLowerCase}
          className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-all"
        >
          lowercase
        </button>
        <button
          onClick={handleTitleCase}
          className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-all"
        >
          Title Case
        </button>
        <button
          onClick={handleClear}
          className="border border-[var(--border)] text-[var(--foreground)] px-4 py-2 rounded-lg hover:bg-[var(--card)] transition-all flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          Clear
        </button>
      </div>

      {/* Output */}
      <div>
        <h2 className="font-semibold text-[var(--foreground)] mb-2">Output:</h2>
        <pre className="bg-[var(--card)] border border-[var(--accent)] text-[var(--accent)] p-4 rounded-lg overflow-auto text-sm min-h-[150px] whitespace-pre-wrap shadow-sm">
          {result || "➡️ Your converted text will appear here"}
        </pre>
      </div>

      {/* Informational Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2">
          🔠 Why You Need a Text Case Converter
        </h2>
        <p className="text-lg text-[var(--foreground)] mb-8">
          Tired of manually fixing inconsistent text styles? Whether it’s an
          all-caps email, a mixed-case blog post, or unformatted academic text,
          our <strong>Text Case Converter</strong> helps you instantly reformat
          and standardize your writing in seconds.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              ✨ Key Case Styles Supported
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>UPPERCASE:</strong> Converts all letters to capital
                letters. (e.g., "HELLO WORLD")
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>lowercase:</strong> Converts all letters to small
                letters. (e.g., "hello world")
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Title Case:</strong> Capitalizes the first letter of
                every word — ideal for professional headings.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              💡 Perfect for Any Task
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Writers & Editors:</strong> Standardize case across
                drafts and publications effortlessly.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Developers:</strong> Format constants, variables, and
                text according to project naming conventions.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Students:</strong> Quickly polish assignments, titles,
                and reports with consistent case usage.
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Paste your text below, select your preferred case style, and let our
          converter handle the rest!
        </p>
      </section>
    </main>
  );
}
