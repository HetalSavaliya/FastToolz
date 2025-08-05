"use client";

import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto text-gray-800">
      {/* ✅ Banner */}
      <div className="relative w-full h-60 mb-10 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/images/privacy-policy.jpg" // Optional: Add a banner image to /public/images
          alt="Privacy Policy Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl font-bold text-center px-4 drop-shadow">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* ✅ Policy Content */}
      <section className="space-y-6 text-sm sm:text-base leading-relaxed">
        <p>
          At <strong>Stories, Colors, and Learning for Young Minds</strong>,
          your privacy is very important to us. This Privacy Policy outlines the
          types of information we collect and how we use it.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          1. No Personal Data Collection
        </h2>
        <p>
          We do not collect any personal information from children using this
          site. Children can explore all learning resources without creating
          accounts or submitting private information.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          2. Cookies & Ads
        </h2>
        <p>
          We use <strong>Google AdSense</strong> to show relevant ads. Google
          may use cookies or device identifiers to personalize the ads shown
          based on your browsing activity. These cookies help us keep the
          platform free for all users.
        </p>
        <p>
          To learn more about how Google uses cookies in advertising, you can
          visit{" "}
          <Link
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            this link
          </Link>
          .
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          3. Third-party Content
        </h2>
        <p>
          We may link to third-party websites (like educational YouTube videos
          or external books). These sites are governed by their own privacy
          policies, and we are not responsible for their content or practices.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          4. Children's Privacy
        </h2>
        <p>
          This site is designed specifically for children in Std 1 to 5, with a
          focus on safety and educational content. We follow best practices to
          keep our platform safe and do not allow any user-generated content or
          messaging.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">
          5. Policy Updates
        </h2>
        <p>
          We may update this Privacy Policy occasionally. Any changes will be
          posted here with the date of the last update.
        </p>

        <h2 className="text-lg font-semibold text-[#66AF85]">6. Contact</h2>
        <p>
          If you have any questions about this policy, you can visit our{" "}
          <Link href="/contact" className="text-blue-600 underline">
            Contact Page
          </Link>
          .
        </p>
        <p className="text-xs text-gray-500">Last updated: August 2025</p>
      </section>
    </main>
  );
}
