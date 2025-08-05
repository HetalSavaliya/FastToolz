"use client";

import Image from "next/image";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto text-gray-800">
      {/* ✅ Optional Banner */}
      <div className="relative w-full h-60 mb-10 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/images/terms-banner.avif"
          alt="Terms Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center px-4 drop-shadow">
            Terms & Conditions
          </h1>
        </div>
      </div>

      {/* ✅ Terms Content */}
      <section className="space-y-6 text-sm sm:text-base leading-relaxed">
        <p>
          By accessing and using <strong>Stories, Colors, and Learning</strong>,
          you agree to be bound by these terms and conditions. Please read them
          carefully before using this website.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          1. Educational Purpose
        </h2>
        <p>
          All content provided on this site — including storybooks, coloring
          pages, learning sheets, and activity resources — is created solely for
          educational use by young children (ages 3 to 10).
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          2. Personal & Non-commercial Use
        </h2>
        <p>
          You are free to view, download, and print the materials for personal
          use in homes or classrooms. You may not redistribute, resell, or
          modify the content for commercial purposes without prior written
          permission.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          3. Respectful Use
        </h2>
        <p>
          Our platform is designed for children and their families or educators.
          Users must refrain from uploading or linking to any harmful,
          offensive, or misleading material. All interactions should support a
          safe and respectful learning space.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          4. Content Accuracy
        </h2>
        <p>
          We aim to provide age-appropriate and accurate materials. However, we
          do not guarantee the completeness or accuracy of every resource and
          are not liable for how the content is used.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          5. Modifications to Terms
        </h2>
        <p>
          These terms may be updated from time to time. Continued use of the
          website after updates means you accept the revised terms.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">6. Contact</h2>
        <p>
          For any questions about these terms, please visit our{" "}
          <Link href="/contact" className="text-blue-600 underline">
            Contact Page
          </Link>
          .
        </p>

        <p className="text-xs text-gray-500 mt-6">Last updated: August 2025</p>
      </section>
    </main>
  );
}
