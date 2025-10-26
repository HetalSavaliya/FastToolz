// src/app/about/page.tsx
export const metadata = {
  title: "About | HJ Tools Hub",
  description:
    "Learn about HJ Tools Hub — a collection of free, browser-based utilities to make your work easier.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        About HJ Tools Hub
      </h1>

      <p className="text-lg mb-4 leading-relaxed text-gray-700">
        HJ Tools Hub is your one-stop destination for simple, free, and
        efficient online utilities. Whether you need to merge PDFs, compress
        images, or download videos, our browser-based tools are designed to save
        your time and make your workflow seamless — no login or installation
        required.
      </p>

      <p className="text-lg mb-4 leading-relaxed text-gray-700">
        Our goal is to provide high-quality tools that are:
      </p>

      <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
        <li>🧩 Easy to use and completely free</li>
        <li>🔒 Privacy-focused — no data stored on our servers</li>
        <li>⚡ Fast and accessible from any device</li>
      </ul>

      <p className="text-lg leading-relaxed text-gray-700">
        Built by passionate developers who believe in open and accessible
        technology for everyone.
      </p>
    </main>
  );
}
