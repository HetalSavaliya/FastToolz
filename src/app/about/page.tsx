"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* ✅ Banner */}
      <div className="relative w-full h-72 mb-12 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/images/about-banner.jpg" // Replace with a real image
          alt="About Stories, Colors, and Learning for Young Minds"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center px-4 drop-shadow">
            About Stories, Colors, and Learning for Young Minds
          </h1>
        </div>
      </div>

      {/* ✅ About Us Content */}
      <section className="mb-16 text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-[#66AF85]">Our Mission</h2>
        <p className="mb-4 leading-relaxed">
          <strong>Stories, Colors, and Learning for Young Minds</strong> is a free, fun, and easy-to-use learning platform designed especially for young children aged 2 to 9 years.
          Instead of rigid classes, we organize our resources by categories like Stories, Learning Basics, Coloring, and more — making it simple for kids to explore and learn in ways that suit them best.
        </p>
        <p className="mb-4 leading-relaxed">
          Our colorful books, interactive worksheets, and fun quizzes cover multiple languages including English, Hindi, and Gujarati — all curated to support early learning and creativity.
        </p>
        <p className="leading-relaxed">
          We believe learning should be joyful, free, and accessible to everyone. That’s why all our materials are 100% free, ad-free, and require no login, offering a safe and welcoming space for kids, parents, and teachers alike.
        </p>
      </section>

      {/* ✅ What We Offer Section */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6 text-[#66AF85]">What You’ll Find Here</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <li className="bg-green-50 border border-green-200 p-4 rounded shadow-sm">
            📚 Books and resources sorted by fun categories like Stories, Learning, Coloring & more
          </li>
          <li className="bg-green-50 border border-green-200 p-4 rounded shadow-sm">
            🧠 Easy-to-understand lessons that build vocabulary and reading skills
          </li>
          <li className="bg-green-50 border border-green-200 p-4 rounded shadow-sm">
            📝 Printable worksheets and engaging quizzes for practice
          </li>
          <li className="bg-green-50 border border-green-200 p-4 rounded shadow-sm">
            🎨 Creative arts and games to spark imagination and learning
          </li>
          <li className="bg-green-50 border border-green-200 p-4 rounded shadow-sm">
            🧑‍🏫 Helpful tools and guides for parents and teachers
          </li>
        </ul>
      </section>

      {/* ✅ Call to Action */}
      <section className="text-center mb-20">
        <h3 className="text-xl font-bold mb-3 text-[#66AF85]">Explore by Category</h3>
        <p className="text-gray-700 mb-5">
          Choose from fun categories to find books and activities perfect for your child’s learning journey.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#66AF85] text-white px-5 py-2 rounded hover:bg-[#55966e] transition"
        >
          Go to Home →
        </Link>
      </section>
    </main>
  );
}
