"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRulerCombined,
  faRotateLeft,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function UnitConverterPage() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [result, setResult] = useState<number | null>(null);

  const lengthUnits: { [key: string]: number } = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
  };

  const handleConvert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      alert("Please enter a valid number");
      return;
    }
    const converted = (num * lengthUnits[fromUnit]) / lengthUnits[toUnit];
    setResult(converted);
  };

  const handleReset = () => {
    setValue("");
    setFromUnit("meter");
    setToUnit("kilometer");
    setResult(null);
  };

  return (
    <main className="w-full px-4 py-6 text-[var(--foreground)] transition-colors duration-500">
      {/* Back Link */}
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
          <FontAwesomeIcon
            icon={faRulerCombined}
            className="text-[var(--accent)]"
          />
          Unit Converter
        </h1>
        <p className="opacity-80">
          Convert between common length units like meters, kilometers, miles,
          and more — quickly and accurately.
        </p>
      </div>

      {/* Input & Unit Selection */}
      <div className="p-6 border border-[var(--border)] bg-[var(--card)] rounded-xl shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="border border-[var(--accent)] bg-[var(--background)] text-[var(--foreground)] rounded-lg px-4 py-2 w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />

          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded-lg px-4 py-2 w-full sm:w-56"
          >
            {Object.keys(lengthUnits).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>

          <FontAwesomeIcon
            icon={faExchangeAlt}
            className="text-[var(--accent)] text-xl hidden sm:block"
          />

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="border border-[var(--accent)] bg-[var(--card)] text-[var(--foreground)] rounded-lg px-4 py-2 w-full sm:w-56"
          >
            {Object.keys(lengthUnits).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handleConvert}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-all"
          >
            Convert
          </button>
          <button
            onClick={handleReset}
            className="border border-[var(--border)] text-[var(--foreground)] px-5 py-2 rounded-lg hover:bg-[var(--card)] flex items-center gap-2 transition-all"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
            Reset
          </button>
        </div>

        {/* Result */}
        {result !== null && (
          <div className="mt-6 p-4 border border-[var(--accent)] bg-[var(--card)] rounded-lg shadow-md">
            <h3 className="font-medium text-[var(--accent)] mb-2">
              ✅ Conversion Result
            </h3>
            <p className="text-lg font-semibold">
              {value} {fromUnit} = {result} {toUnit}
            </p>
          </div>
        )}
      </div>

      {/* Rich Info Section */}
      <section className="rich-content text-[var(--foreground)] mt-16 pt-8 border-t border-gray-200 max-w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 pb-2">
          📏 The Ultimate Length Unit Converter
        </h2>
        <p className="text-lg text-[var(--foreground)] mb-8">
          Whether you’re tackling international measurements, academic
          assignments, or DIY projects, our **Unit Converter** delivers instant,
          accurate conversions between metric and imperial systems — no formulas
          or manual calculations needed.
        </p>

        <div className="grid md:grid-cols-2 p-4 border border-[var(--accent)] rounded-lg gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🌎 Bridging Metric and Imperial
            </h3>
            <ul className="space-y-4 text-[var(--foreground)] list-none pl-0">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Travel & Geography:** Convert miles to kilometers for distance
                planning.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Engineering & Construction:** Switch between feet/inches and
                metric units for blueprints.
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                **Education:** Quickly check your homework or scientific
                conversions with precision.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
              🔢 Simple, Accurate Conversion
            </h3>
            <ol className="space-y-4 text-[var(--foreground)] list-decimal pl-5">
              <li>**Enter a Value:** Input the number to be converted.</li>
              <li>**Select “From” Unit:** Choose the current unit.</li>
              <li>**Select “To” Unit:** Choose the desired output unit.</li>
              <li>**Instant Result:** See the calculated value immediately.</li>
            </ol>
            <div className="mt-6 p-4 border border-dashed border-[var(--accent)] rounded-lg text-center">
              <p className="text-sm text-[var(--foreground)]">
                **Supported Units:** Meter, Kilometer, Centimeter, Millimeter,
                Mile, Yard, Foot, Inch.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-[var(--accent)] font-medium mt-10">
          Say goodbye to conversion tables — get accurate results instantly with
          our smart converter!
        </p>
      </section>
    </main>
  );
}
