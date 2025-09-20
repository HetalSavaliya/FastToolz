"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faKey,
  faCopy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const handleClear = () => {
    setPassword("");
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
        <FontAwesomeIcon icon={faKey} />
        Password Generator
      </h1>
      <p className="text-gray-600 mb-6">
        Generate secure random passwords quickly.
      </p>

      {/* Password Display */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={password}
          readOnly
          placeholder="Your password will appear here"
          className="flex-1 border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[#66AF85] outline-none"
        />
        <button
          onClick={handleCopy}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faCopy} /> Copy
        </button>
      </div>

      {/* Length Selector & Buttons */}
      <div className="flex gap-3 items-center mb-6">
        <label className="flex flex-col text-sm">
          Length
          <input
            type="number"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value) || 12)}
            className="border rounded px-2 py-1 mt-1 w-24"
          />
        </label>
        <button
          onClick={generatePassword}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71]"
        >
          Generate
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faTrash} /> Clear
        </button>
      </div>
    </main>
  );
}
