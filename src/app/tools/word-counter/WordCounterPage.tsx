"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFileLines,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

  const handleClear = () => setText("");

  return (
    <main className="w-full px-4 py-8 text-[var(--foreground)] transition-colors duration-500">
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
          <FontAwesomeIcon icon={faFileLines} />
          Word Counter
        </h1>
        <p className="opacity-80">
          Count words, characters, and estimate reading time instantly.
        </p>
      </div>

      {/* Text Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Paste or type your text here..."
        className="w-full border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[var(--accent)] outline-none mb-4"
      />

      {/* Clear Button */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleClear}
          className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          Reset
        </button>
      </div>

      {/* Output Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-[var(--card)] border border-[var(--accent)] rounded-lg p-4 shadow text-center">
          <h3 className="font-semibold mb-1 text-[var(--foreground)]">Words</h3>
          <p className="text-2xl font-bold text-[var(--accent)]">{wordCount}</p>
        </div>
        <div className="bg-[var(--card)] border border-[var(--accent)] rounded-lg p-4 shadow text-center">
          <h3 className="font-semibold mb-1 text-[var(--foreground)]">
            Characters
          </h3>
          <p className="text-2xl font-bold text-[var(--accent)]">{charCount}</p>
        </div>
        <div className="bg-[var(--card)] border border-[var(--accent)] rounded-lg p-4 shadow text-center">
          <h3 className="font-semibold mb-1 text-[var(--foreground)]">
            Reading Time
          </h3>
          <p className="text-2xl font-bold text-[var(--accent)]">
            {readingTime} min
          </p>
        </div>
      </div>

      {/* Informational Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2">
          🧮 Instant Word Count and Readability Metrics
        </h2>
        <p className="text-lg text-[var(--foreground)] mb-8">
          Whether you're crafting an essay, composing an email, or optimizing
          web content, having **accurate word and character counts** is vital.
          Our **Word Counter** tool provides instant and precise metrics for
          everything you type.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          {/* Left Side */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🎯 Meet Your Writing Targets
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Word Count:** Track words for essays, reports, and blog posts.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Character Count:** Perfect for X/Twitter, SEO, or meta tags
                with length limits.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Reading Time:** Estimate how long your readers will take based
                on an average reading speed.
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🚀 Features for Efficiency
            </h3>
            <ol className="space-y-4 text-[var(--foreground)] list-decimal pl-5">
              <li>
                **Real-Time Updates:** Counts refresh instantly as you type or
                paste.
              </li>
              <li>
                **Offline & Private:** Everything happens in your browser—no
                data uploads, ensuring privacy.
              </li>
              <li>
                **Whitespace Aware:** Handles extra spaces and line breaks
                accurately for correct word counts.
              </li>
            </ol>
            <div className="mt-6 p-4 border border-dashed border-[var(--accent)] rounded-lg text-center">
              <p className="text-sm text-[var(--foreground)] mt-2">
                Designed for students, journalists, creators, and professionals
                who value clarity and precision.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Start analyzing your text today — write smarter, faster, and better!
        </p>
      </section>
    </main>
  );
}
