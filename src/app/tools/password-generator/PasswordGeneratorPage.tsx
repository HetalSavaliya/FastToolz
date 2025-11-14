"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faKey,
  faCopy,
  faTrash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  // Function to generate random password
  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  // Copy password to clipboard
  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  // Clear password
  const handleClear = () => {
    setPassword("");
  };

  // Word counter (character count here)
  const charCount = useMemo(() => password.length, [password]);

  return (
    <main className="w-full px-6 py-10 transition-colors duration-500 text-[var(--foreground)]">
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
          <FontAwesomeIcon icon={faKey} className="text-[var(--accent)]" />
          Password Generator
        </h1>
        <p className="opacity-80">
          Generate secure, random passwords quickly — safe, local, and private.
        </p>
      </div>

      {/* Password Display */}
      <div className="p-4 border border-[var(--border)] bg-[var(--card)] rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Your password will appear here"
            className="flex-1 border border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)] rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[var(--accent)] outline-none"
          />
          <button
            onClick={handleCopy}
            disabled={!password}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faCopy} /> Copy
          </button>
        </div>

        {/* Word Count */}
        <div className="text-sm text-[var(--foreground)] opacity-80 text-right">
          Characters: <span className="font-semibold">{charCount}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-10">
        <label className="flex flex-col text-sm text-[var(--foreground)]">
          Password Length
          <input
            type="number"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value) || 12)}
            className="border border-[var(--accent)] bg-[var(--card)] rounded-lg px-3 py-2 mt-1 w-28 text-[var(--foreground)]"
          />
        </label>

        <button
          onClick={generatePassword}
          className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-all"
        >
          Generate
        </button>

        <button
          onClick={handleClear}
          className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card)] transition-all flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faTrash} /> Clear
        </button>
      </div>

      {/* Info Section (Styled Like PDFUnlockPage) */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2 flex items-center gap-2">
          <FontAwesomeIcon icon={faLock} className="text-[var(--accent)]" />
          Strengthen Your Security with Smart Passwords
        </h2>

        <p className="text-lg text-[var(--foreground)] mb-8 leading-relaxed">
          A strong password is your first defense against cyber threats. Our{" "}
          <strong>Password Generator</strong> ensures your credentials are truly
          random and unguessable — with combinations of letters, numbers, and
          symbols that make brute-force attacks nearly impossible.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          {/* Benefits */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3">
              🧠 Why Use a Random Password Generator
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Unbreakable Security:</strong> Randomized passwords are
                virtually impossible to guess or crack.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Full Privacy:</strong> Generated passwords are created
                locally in your browser — never stored or sent online.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <strong>Convenient & Fast:</strong> Create strong passwords for
                all your accounts in seconds.
              </li>
            </ul>
          </div>

          {/* How It Works */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3">
              ⚙️ How It Works
            </h3>
            <ol className="space-y-4 text-[var(--foreground)] list-decimal pl-5">
              <li>Set your desired password length.</li>
              <li>Click “Generate” to instantly create a secure password.</li>
              <li>Copy it safely and store it in your password manager.</li>
            </ol>

            <div className="mt-6 p-4 border border-dashed border-[var(--accent)] rounded-lg text-center">
              <div className="flex justify-center items-center gap-4 text-[var(--foreground)] text-3xl">
                🔒 ➡️ 🧩 ➡️ 🔑
              </div>
              <p className="text-sm text-[var(--foreground)] mt-2">
                Transform simple phrases into cryptographically strong keys.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Build smarter security habits today — generate strong passwords that
          protect your identity and privacy effortlessly.
        </p>
      </section>
    </main>
  );
}
