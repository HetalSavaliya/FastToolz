"use client";

import AdSlot from "@/components/AdSlot";
import Image from "next/image";
import Link from "next/link";

// ✅ List of learning categories
const categories = [
  {
    key: "story",
    title: "Story Books",
    description: ["Moral Stories", "Picture Stories", "Short Tales"],
    emoji: "📖",
  },
  {
    key: "learn",
    title: "Learn English",
    description: ["Phonics", "Vocabulary", "Sentences"],
    emoji: "🧠",
  },
  {
    key: "coloring",
    title: "Coloring Fun",
    description: ["Fruits", "Animals", "Objects"],
    emoji: "🎨",
  },
  {
    key: "grammar",
    title: "Grammar Practice",
    description: ["Nouns", "Verbs", "Tenses"],
    emoji: "✏️",
  },
  {
    key: "fun",
    title: "Activity Books",
    description: ["Games", "Puzzles", "Matching"],
    emoji: "🧩",
  },
];

export default function HomePage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* ✅ Hero Banner */}
      <div className="relative w-full h-72 mb-12 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/images/home-banner.avif"
          alt="Kids Learning"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold text-center px-4 drop-shadow">
            Learn the Fun Way!
          </h1>
        </div>
      </div>

      {/* ✅ Welcome Section */}
      <section className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-3 text-[#66AF85]">
          Welcome to Stories, Colors, and Learning for Young Minds
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          This free learning platform is designed for children aged 2 to 9 years
          old. We offer stories, phonics practice, coloring books, grammar
          worksheets, and fun learning games — all in one place.
        </p>
      </section>

      {/* ✅ Explore by Category */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#66AF85]">
          📂 Explore Books by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/category/${cat.key}`}
              className="group block bg-gradient-to-br from-[#eafbf1] via-white to-[#f7f1fc] border border-gray-200 rounded-2xl p-6 shadow-md transform transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#066f55]">
                  {cat.title}
                </h3>
                <span className="text-3xl">{cat.emoji}</span>
              </div>

              <ul className="text-gray-700 space-y-1 text-sm pl-1">
                {cat.description.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>

              <div className="mt-4 text-right text-[#066f55] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ Downloadable Resources */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-4 text-[#66AF85]">
          Free Downloadable Resources
        </h2>
        <ul className="space-y-4">
          <li className="bg-green-50 p-4 rounded shadow-sm border flex justify-between items-center">
            <span>🖨️ Story Time Sample PDF</span>
            <Link
              href="/downloads/story-sample.pdf"
              download
              className="text-blue-600 underline"
            >
              Download
            </Link>
          </li>
          <li className="bg-green-50 p-4 rounded shadow-sm border flex justify-between items-center">
            <span>📚 Alphabet Tracing Worksheet</span>
            <Link
              href="/downloads/abc-tracing.pdf"
              download
              className="text-blue-600 underline"
            >
              Download
            </Link>
          </li>
        </ul>
      </section>

      {/* ✅ Feedback Section */}
      <section className="mb-20">
        <h2 className="text-xl font-semibold mb-4 text-[#66AF85]">
          Leave a Comment or Suggestion
        </h2>
        <p className="text-gray-600 mb-4">
          We’d love to hear from parents, teachers, and learners!
        </p>
        <form className="bg-gray-50 p-4 rounded shadow-sm space-y-4 border border-gray-200">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 p-2 rounded focus:ring-[#66AF85] focus:outline-none"
          />
          <textarea
            placeholder="Your message..."
            rows={4}
            className="w-full border border-gray-300 p-2 rounded focus:ring-[#66AF85] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#55966e] transition"
          >
            Submit
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          * Comment submission is currently in testing mode (no backend).
        </p>
      </section>

      {/* ✅ Google Ad Section */}
      <AdSlot />
    </main>
  );
}
