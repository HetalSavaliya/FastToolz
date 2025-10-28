"use client";

import { motion } from "framer-motion";
import {
  FaTools,
  FaHeart,
  FaRocket,
  FaShieldAlt,
  FaLightbulb,
  FaGlobe,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <section className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden py-20 px-6 md:px-16">
      {/* 🌟 Single Floating Animated Icon Cluster */}
      <div className="absolute inset-y-0 left-5 flex flex-col justify-start gap-10 mt-12">
        <motion.div
          className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <FaTools size={22} />
        </motion.div>

        <motion.div
          className="w-14 h-14 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <FaShieldAlt size={22} />
        </motion.div>

        <motion.div
          className="w-14 h-14 rounded-full bg-emerald-400 text-white flex items-center justify-center shadow-xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        >
          <FaGlobe size={22} />
        </motion.div>
      </div>

      {/* 🧠 Main About Section */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About XoroTools.com
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-[var(--card-text)] leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <strong>XoroTools.com</strong> is your all-in-one platform for smart,
          reliable, and privacy-focused online tools. From quick PDF operations
          to text converters, AI-powered utilities, and image editors, our goal
          is to make everyday digital tasks effortless and fast — directly in
          your browser without any sign-up or installation.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-[var(--card-text)] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Our tools are designed for{" "}
          <strong>creators, developers, students,</strong> and professionals who
          need instant, secure, and user-friendly solutions. We prioritize
          performance and accessibility, ensuring a seamless experience whether
          you’re splitting PDFs, resizing images, or working with AI text tools
          — everything runs securely in your browser.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-[var(--card-text)] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          At <strong>XoroTools.com</strong>, your privacy and productivity come
          first. No data is stored or tracked — every process happens on your
          device, giving you complete control. Our mission is simple:{" "}
          <em>Smart Tools. Simple Life.</em>
        </motion.p>

        <motion.div
          className="inline-block mt-6 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          Empowering Productivity for Everyone.
        </motion.div>
      </div>

      {/* 🚀 Mission & Vision Section */}
      <div className="mt-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center relative z-10">
        {[
          {
            icon: <FaHeart className="text-3xl text-[var(--accent)] mb-4" />,
            title: "Our Mission",
            desc: "To build powerful, free, and easy-to-use tools that enhance productivity and creativity for people around the world.",
          },
          {
            icon: <FaRocket className="text-3xl text-[var(--accent)] mb-4" />,
            title: "Our Vision",
            desc: "To become the leading online tool ecosystem where innovation meets simplicity — trusted by millions globally.",
          },
          {
            icon: (
              <FaShieldAlt className="text-3xl text-[var(--accent)] mb-4" />
            ),
            title: "Our Promise",
            desc: "We guarantee complete privacy. Your files never leave your browser, ensuring 100% secure and transparent processing.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex flex-col items-center">
              {item.icon}
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="text-[var(--card-text)] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
