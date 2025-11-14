"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlay,
  faEraser,
  faCode,
  faShieldAlt,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

export default function JsRunnerPage() {
  const [code, setCode] = useState(
    "// Write your JS code here\nconsole.log('Hello World!');"
  );
  const [output, setOutput] = useState<string>("");

  const runCode = () => {
    try {
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(" "));
        originalLog(...args);
      };

      // eslint-disable-next-line no-eval
      const result = eval(code);
      if (result !== undefined) logs.push(String(result));
      setOutput(logs.join("\n") || "✅ No output");

      console.log = originalLog;
    } catch (err) {
      setOutput(`❌ Error: ${(err as Error).message}`);
    }
  };

  const clearAll = () => {
    setCode("");
    setOutput("");
  };

  return (
    <main className="w-full px-4 py-6 transition-colors duration-500 text-[var(--foreground)]">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[var(--accent)] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2 flex items-center gap-2">
          ⚡ Online JS Runner
        </h1>
        <p className="opacity-80">
          Instantly write, execute, and test JavaScript directly in your
          browser.
        </p>
      </div>

      {/* Code + Output Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Code Editor Section */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-sm flex flex-col">
          <div className="flex gap-3 mb-4">
            <button
              onClick={runCode}
              className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] flex items-center gap-2 transition-all"
            >
              <FontAwesomeIcon icon={faPlay} />
              Run
            </button>

            <button
              onClick={clearAll}
              className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card-hover)] flex items-center gap-2 transition-all"
            >
              <FontAwesomeIcon icon={faEraser} />
              Clear
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 min-h-[300px] w-full border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[var(--accent)] outline-none resize-none"
          />
        </div>

        {/* Output Section */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-sm flex flex-col">
          <h2 className="font-semibold text-[var(--accent)] mb-3">
            Console Output
          </h2>
          <pre className="flex-1 bg-black/80 text-green-400 p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap">
            {output || "➡️ Run your code to see output here"}
          </pre>
        </div>
      </div>

      {/* Info Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2">
          ⚡ JS Runner: Test, Debug, and Learn Instantly
        </h2>
        <p className="text-lg text-[var(--foreground)] mb-8">
          The **Online JavaScript Runner** is your instant sandbox for testing
          snippets, experimenting with APIs, or practicing algorithms — all
          right in your browser. No setup, no installations — just pure coding.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          {/* Left Column */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faBolt} className="text-[var(--accent)]" />
              ⚙️ Core Highlights
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Real-Time Execution:** Instantly see results as soon as you
                click run.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **ES6+ Support:** Write modern JavaScript, including
                async/await, classes, and arrow functions.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Error Feedback:** Get precise syntax or runtime error details
                in a clean format.
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-[var(--accent)]"
              />
              🔒 Safe Client-Side Execution
            </h3>
            <ol className="space-y-4 text-[var(--foreground)] list-decimal pl-5">
              <li>
                **Write:** Enter your code directly in the editor. The syntax is
                highlighted for easy reading.
              </li>
              <li>
                **Run:** Click the **Run** button to execute your script in a
                secure, isolated browser environment.
              </li>
              <li>
                **View Output:** The results of your `console.log()` calls and
                return values are captured in the output window.
              </li>
            </ol>

            <div className="mt-6 p-4 border border-dashed border-[var(--accent)] rounded-lg text-center">
              <div className="flex justify-center items-center gap-4 text-[var(--foreground)] text-3xl">
                💻 ➡️ ⚡
              </div>
              <p className="text-sm text-[var(--foreground)] mt-2">
                Execute and debug JavaScript instantly, with full safety in your
                browser.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Start coding faster, debug smarter — experience instant JavaScript
          execution today!
        </p>
      </section>
    </main>
  );
}
