"use client";

import { motion } from "framer-motion";

export default function TermsOfUsePage() {
  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Terms of Use
        </motion.h1>

        <motion.p
          className="text-center text-lg mb-12 text-[var(--card-text)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Welcome to <strong>XoroTools.com</strong>. By accessing or using our
          website, you agree to comply with and be bound by these Terms of Use.
          Please read them carefully.
        </motion.p>

        <div className="space-y-10 text-[var(--card-text)] leading-relaxed">
          {/* Section 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By using XoroTools.com, you confirm that you have read,
              understood, and agree to be bound by these Terms of Use and our
              Privacy Policy. If you do not agree, please discontinue using our
              website.
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">
              2. Use of Our Website
            </h2>
            <p>
              XoroTools.com provides a variety of online tools designed to
              improve your productivity. You agree to use our website only for
              lawful purposes and in accordance with these Terms. You may not:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>
                Use the website in a way that violates any laws or regulations.
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the website
                or its systems.
              </li>
              <li>Use automated scripts or bots to access or collect data.</li>
              <li>Upload or distribute harmful code, malware, or viruses.</li>
            </ul>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">
              3. Intellectual Property Rights
            </h2>
            <p>
              All content, logos, graphics, and materials available on
              XoroTools.com are owned by us or our licensors and are protected
              by copyright, trademark, and other intellectual property laws. You
              may not copy, reproduce, or distribute any material without prior
              written permission.
            </p>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">4. User Accounts</h2>
            <p>
              Some features of XoroTools.com may require you to create an
              account. You agree to provide accurate and complete information
              and to keep your credentials secure. You are responsible for all
              activities that occur under your account.
            </p>
          </motion.div>

          {/* Section 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">
              5. Third-Party Links
            </h2>
            <p>
              XoroTools.com may include links to third-party websites or
              services. We do not control or endorse such external sites and are
              not responsible for their content, policies, or practices.
              Accessing them is at your own risk.
            </p>
          </motion.div>

          {/* Section 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              XoroTools.com and its team shall not be liable for any direct,
              indirect, incidental, or consequential damages arising from your
              use of the website or tools provided. All tools are offered “as
              is” without any warranty or guarantee.
            </p>
          </motion.div>

          {/* Section 7 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">
              7. Disclaimer of Warranties
            </h2>
            <p>
              XoroTools.com provides tools and content for general use. While we
              strive for accuracy and reliability, we do not warrant that the
              website, tools, or content will be error-free, uninterrupted, or
              available at all times.
            </p>
          </motion.div>

          {/* Section 8 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">8. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to
              XoroTools.com at any time, without notice, for any reason,
              including violation of these Terms.
            </p>
          </motion.div>

          {/* Section 9 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">9. Changes to Terms</h2>
            <p>
              We may modify these Terms of Use at any time without prior notice.
              Any changes will be reflected on this page, and your continued use
              of the website after modifications constitutes acceptance of the
              updated terms.
            </p>
          </motion.div>

          {/* Section 10 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:support@xorotools.com"
                className="text-[var(--accent)] hover:text-[var(--accent-hover)]"
              >
                support@xorotools.com
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
