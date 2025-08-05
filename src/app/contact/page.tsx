"use client";

import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto">
      {/* ✅ Banner */}
      <div className="relative w-full h-60 mb-12 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/images/contact-banner.avif" // You can replace this with your own image in /public/images
          alt="Contact Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center px-4 drop-shadow">
            Contact Us
          </h1>
        </div>
      </div>

      {/* ✅ Info Section */}
      <section className="mb-16 text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-[#66AF85]">
          We’d Love to Hear from You!
        </h2>
        <p className="mb-4 leading-relaxed">
          This is a free learning platform for kids in Std 1 to 5. If you have
          ideas or feedback, feel free to reach out.
        </p>

        <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm space-y-4 text-sm">
          <div>
            📧 <strong>Email:</strong>{" "}
            <span className="text-gray-600">Support email coming soon</span>
          </div>
          <div>
            🌐 <strong>Website:</strong>{" "}
            <Link
              href="https://hetal10.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              hetal10.vercel.app
            </Link>
          </div>
          <div>
            💡 <strong>Feedback:</strong> You can leave a message in the comment
            box on the{" "}
            <Link href="/" className="text-blue-600 underline">
              home page
            </Link>
            .
          </div>
        </div>
      </section>

      {/* ✅ Feedback Form (optional / placeholder) */}
      <section className="mb-20">
        <h2 className="text-xl font-semibold mb-4 text-[#66AF85]">
          Leave a Message
        </h2>
        <form className="bg-gray-50 p-6 rounded shadow-sm space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 p-3 rounded"
          />
          <textarea
            placeholder="Your Message..."
            rows={4}
            className="w-full border border-gray-300 p-3 rounded"
          />
          <button
            type="submit"
            className="bg-[#66AF85] text-white px-4 py-2 rounded hover:bg-[#55966e] transition"
          >
            Submit
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          * This message box is not connected to email yet.
        </p>
      </section>
    </main>
  );
}
