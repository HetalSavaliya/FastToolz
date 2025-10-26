"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRulerCombined,
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
        <FontAwesomeIcon icon={faRulerCombined} />
        Unit Converter
      </h1>
      <p className="text-gray-600 mb-6">
        Convert between length units like meters, kilometers, miles, and more.
      </p>

      {/* Input & Unit Selection */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="border rounded-lg px-4 py-2 w-full sm:w-48 focus:ring-2 focus:ring-[#66AF85] outline-none"
        />
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-48"
        >
          {Object.keys(lengthUnits).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full sm:w-48"
        >
          {Object.keys(lengthUnits).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleConvert}
          className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#589c71]"
        >
          Convert
        </button>
        <button
          onClick={handleReset}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="bg-gray-50 border rounded-lg p-4 text-gray-800 font-semibold">
          {value} {fromUnit} = {result} {toUnit}
        </div>
      )}
      <section>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
            📏 The Ultimate Length Unit Converter
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Dealing with international specifications, academic problems, or DIY
            projects often requires converting units of measurement. Our **Unit
            Converter** simplifies this process, providing instant and accurate
            conversions between common length units, eliminating manual
            calculations and potential errors.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🌎 Bridging Metric and Imperial
              </h3>
              <p className="text-gray-600 mb-4">
                Easily navigate between the world's two major measurement
                systems—the **Metric System** (meters, kilometers) and the
                **Imperial/US System** (miles, feet, inches). This is crucial
                for:
              </p>
              <ul className="space-y-3 text-gray-600 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">✓</span>
                  **Travel & Geography:** Convert miles to kilometers for
                  distance planning.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">✓</span>
                  **Engineering & Construction:** Switch between feet/inches and
                  metric units for blueprints.
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 font-bold mr-3">✓</span>
                  **Education:** Verify homework answers or solve physics
                  problems with consistent units.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                🔢 Simple, Accurate Conversion
              </h3>
              <ol className="space-y-4 text-gray-600 list-decimal pl-5">
                <li>
                  **Enter Your Value:** Input the number you wish to convert.
                </li>
                <li>
                  **Select "From" Unit:** Choose the unit your value is
                  currently in (e.g., `mile`).
                </li>
                <li>
                  **Select "To" Unit:** Choose the unit you want to convert to
                  (e.g., `kilometer`).
                </li>
                <li>
                  **Instant Result:** Click "Convert" to see the precise,
                  calculated value displayed instantly below.
                </li>
              </ol>
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <p className="text-sm font-medium text-gray-500">
                  **Supported Length Units:** Meter, Kilometer, Centimeter,
                  Millimeter, Mile, Yard, Foot, Inch.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-lg text-green-700 font-medium mt-10">
            Say goodbye to conversion factors and calculators—get your precise
            answer now!
          </p>
        </div>
      </section>
    </main>
  );
}
