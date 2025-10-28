"use client";

import { motion } from "framer-motion";
import { FaLock, FaUserShield, FaGlobe, FaCookieBite } from "react-icons/fa";

export default function PrivacyPolicyPage() {
  return (
    <section className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden py-20 px-6 md:px-16">
      {/* 🔐 Floating Icons Cluster (Right Side) */}
      <div className="absolute inset-y-0 right-6 flex flex-col justify-start gap-10 mt-12">
        <motion.div
          className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <FaLock size={22} />
        </motion.div>

        <motion.div
          className="w-14 h-14 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <FaUserShield size={22} />
        </motion.div>

        <motion.div
          className="w-14 h-14 rounded-full bg-emerald-400 text-white flex items-center justify-center shadow-xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        >
          <FaCookieBite size={22} />
        </motion.div>
      </div>

      {/* 🧠 Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-lg text-[var(--card-text)]">
          Last updated: <strong>October 2025</strong>
        </p>
      </motion.div>

      {/* 📜 Policy Content */}
      <div className="max-w-5xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-md leading-relaxed space-y-8 text-[var(--card-text)]">
        {/* 1. Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            1. Introduction
          </h2>
          <p>
            Welcome to <strong>XoroTools.com</strong>. We value your privacy and
            are committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, and safeguard information when you use
            our website and services.
          </p>
        </motion.div>

        {/* 2. Information We Collect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            2. Information We Collect
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Such as name and email if
              you contact us voluntarily through our contact form.
            </li>
            <li>
              <strong>Usage Data:</strong> Non-identifiable data like browser
              type, device information, pages visited, and session duration.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to improve user
              experience, store preferences, and measure site performance.
            </li>
          </ul>
        </motion.div>

        {/* 3. How We Use Your Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>To improve our tools, features, and user experience.</li>
            <li>To respond to your inquiries and provide customer support.</li>
            <li>
              To monitor site usage and protect against fraudulent activity.
            </li>
            <li>To display relevant advertisements through Google AdSense.</li>
          </ul>
        </motion.div>

        {/* 4. Cookies and Tracking */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            4. Cookies and Tracking Technologies
          </h2>
          <p>
            XoroTools.com uses cookies and similar technologies to enhance
            performance and analyze traffic. You can control cookie settings in
            your browser preferences. We may also use third-party analytics
            tools such as Google Analytics.
          </p>
        </motion.div>

        {/* 5. Third-Party Services */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            5. Third-Party Services
          </h2>
          <p>
            We may use trusted third-party partners such as Google AdSense,
            Google Analytics, and similar platforms for analytics and
            monetization. These services may use cookies or tracking pixels to
            deliver relevant ads and measure engagement.
          </p>
        </motion.div>

        {/* 6. Data Security */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            6. Data Security
          </h2>
          <p>
            We adopt strict security practices to protect your data. All
            processing happens within your browser where possible — XoroTools
            does not store or access your files or private data.
          </p>
        </motion.div>

        {/* 7. Data Retention */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            7. Data Retention
          </h2>
          <p>
            We only retain personal information as long as necessary to fulfill
            the purposes outlined in this policy or comply with legal
            requirements.
          </p>
        </motion.div>

        {/* 8. Your Rights */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            8. Your Rights
          </h2>
          <p>
            Depending on your location, you may have the right to access,
            modify, delete, or restrict the use of your personal data. To
            exercise these rights, contact us at{" "}
            <strong>support@xorotools.com</strong>.
          </p>
        </motion.div>

        {/* 9. Google AdSense & Ads */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            9. Google AdSense & Advertising
          </h2>
          <p>
            XoroTools.com uses Google AdSense for displaying ads. Google may use
            cookies (such as the DART cookie) to serve ads based on your visit
            to our site and other websites. You can opt out of personalized ads
            by visiting{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline"
            >
              Google’s Ad Settings
            </a>
            .
          </p>
        </motion.div>

        {/* 10. Children's Privacy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            10. Children’s Privacy
          </h2>
          <p>
            XoroTools.com is not directed toward children under 13. We do not
            knowingly collect personal information from minors. If you believe a
            child has provided us with data, contact us to remove it.
          </p>
        </motion.div>

        {/* 11. Policy Updates */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            11. Policy Updates
          </h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in
            our practices. The updated version will always be posted on this
            page with the latest revision date.
          </p>
        </motion.div>

        {/* 12. Contact Us */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            12. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="mt-2">
            📧 <strong>support@xorotools.com</strong>
            <br />
            📍 Surat, Gujarat, India
          </p>
        </motion.div>
      </div>
    </section>
  );
}
