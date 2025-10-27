"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFileLines,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function OnlineNotepadPage() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  // Load saved note on mount
  useState(() => {
    const saved = localStorage.getItem("onlineNotepad");
    if (saved) setText(saved);
  });

  const handleSave = () => {
    localStorage.setItem("onlineNotepad", text);
    setStatus("Note saved!");
    setTimeout(() => setStatus(""), 2000);
  };

  const handleClear = () => {
    setText("");
    localStorage.removeItem("onlineNotepad");
    setStatus("Note cleared!");
    setTimeout(() => setStatus(""), 2000);
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
        <FontAwesomeIcon icon={faFileLines} />
        Online Notepad
      </h1>
      <p className="text-gray-600 mb-6">
        Write, edit, and autosave your notes directly in your browser.
      </p>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        placeholder="Start typing your notes here..."
        className="w-full border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[#66AF85] outline-none mb-4"
      />

      {/* Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#5a9d77]"
        >
          <FontAwesomeIcon icon={faSave} /> Save Note
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faTrash} /> Clear
        </button>
      </div>

      {/* Status */}
      {status && (
        <p className="text-sm text-green-600 font-medium mb-4">{status}</p>
      )}

      {/* Info Section */}
      <section>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
            📝 Simple & Secure Online Notepad
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Keep your notes handy with our **Online Notepad**, designed for
            quick and secure note-taking. Everything you write is stored
            **locally in your browser**, meaning no data ever leaves your
            device.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🚀 Why Use This Notepad?
              </h3>
              <ul className="space-y-4 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">🔒</span>
                  **Privacy First:** Your notes never leave your device.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">⚡</span>
                  **Autosave Ready:** Notes stay saved even if you close the
                  tab.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">🖊️</span>
                  **Distraction-Free Writing:** Simple interface built for
                  focus.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🧠 Tips for Better Use
              </h3>
              <ol className="space-y-4 text-gray-600 list-decimal pl-5">
                <li>
                  Save frequently with the “Save Note” button for peace of mind.
                </li>
                <li>
                  Use keyboard shortcuts like <strong>Ctrl + S</strong> to save.
                </li>
                <li>
                  Notes are stored locally in your browser’s storage (no server
                  required).
                </li>
              </ol>
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-sm font-medium text-gray-500">
                  Perfect for jotting ideas, drafts, reminders, or quick notes
                  on any device.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-lg text-green-700 font-medium mt-10">
            Start writing your thoughts now — everything stays private and
            secure.
          </p>
        </div>
      </section>
    </main>
  );
}
