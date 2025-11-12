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
      <section>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
            🔠 Why You Need a Text Case Converter
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Are you tired of manually fixing text formatting mistakes? Whether
            you're dealing with all-caps emails, poorly structured titles, or
            text copied from inconsistent sources, our **Text Case Converter**
            is your instant solution. It allows you to transform any block of
            text into the desired case style with a single click.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                ✨ Key Case Styles Supported
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **UPPERCASE:** Converts all letters to capital letters. (e.g.,
                  "HELLO WORLD")
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **lowercase:** Converts all letters to small letters. (e.g.,
                  "hello world")
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Title Case:** Capitalizes the first letter of every word,
                  perfect for headlines and titles. (e.g., "This Is My New
                  Article Title")
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                💡 Perfect for Any Task
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Writers & Editors:** Quickly standardize the case across
                  documents, blog posts, and academic papers.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Programmers:** Ensure variables and constants adhere to
                  specific coding standards (like screaming snake case).
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">•</span>
                  **Students:** Format assignment titles and headings
                  professionally without hassle.
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-lg text-green-700 font-medium mt-10">
            Paste your text now and let the tool handle the formatting
            instantly!
          </p>
        </div>
      </section>
    </main>
  );
}
