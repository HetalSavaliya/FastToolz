"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlay,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";

export default function JsRunnerPage() {
  const [code, setCode] = useState(
    "// Write your JS code here\nconsole.log('Hello World!');"
  );
  const [output, setOutput] = useState<string>("");

  const runCode = () => {
    try {
      // Capture console.log output
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

      // Restore console.log
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
    <main className="w-full px-4 py-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-[#66AF85] hover:underline mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back to Tools
      </Link>

      <h1 className="text-3xl font-bold mb-2">⚡ Online JS Runner</h1>
      <p className="text-gray-600 mb-6">
        Write JavaScript code and run it instantly in your browser.
      </p>

      {/* Flex container for editor + output */}
      <div className="grid grid-cols-2 gap-6 h-[70vh]">
        {/* Code Editor + Buttons */}
        <div className="flex flex-col">
          {/* Buttons ABOVE editor */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={runCode}
              className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71] flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlay} />
              Run
            </button>

            <button
              onClick={clearAll}
              className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faEraser} />
              Clear
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[#66AF85] outline-none resize-none"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <h2 className="font-medium text-gray-700 mb-2">Output:</h2>
          <pre className="flex-1 bg-black text-green-400 p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap">
            {output || "➡️ Run your code to see output here"}
          </pre>
        </div>
      </div>
    </main>
  );
}
