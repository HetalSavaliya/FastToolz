"use client";

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] py-20 px-6 md:px-16 overflow-hidden">
      {/* 💫 Floating Icon Cluster (Right Side) */}
      <div className="absolute inset-y-0 right-6 flex flex-col justify-start gap-10 mt-12 opacity-80">
        <motion.div
          className="w-14 h-14 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaEnvelope size={22} />
        </motion.div>

        <motion.div
          className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaPhoneAlt size={22} />
        </motion.div>

        <motion.div
          className="w-14 h-14 rounded-full bg-teal-400 text-white flex items-center justify-center shadow-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaMapMarkerAlt size={22} />
        </motion.div>
      </div>

      {/* 🧭 Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-[var(--card-text)] mb-10">
          Have a question, suggestion, or business inquiry? <br />
          We’d love to hear from you at <strong>XoroTools.com</strong> — your
          partner for smarter, simpler online utilities.
        </p>
      </motion.div>

      {/* 📝 Contact Form + Info */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 relative z-10">
        {/* Left: Contact Form */}
        <motion.form
          className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-md flex flex-col gap-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="block text-sm text-[var(--card-text)] mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--card-text)] mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--card-text)] mb-2">
              Message
            </label>
            <textarea
              placeholder="Write your message..."
              rows={5}
              required
              className="w-full px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-emerald-500 transition resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 mt-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-[0_0_15px_var(--accent)] transition-all duration-300"
          >
            <FaPaperPlane />
            Send Message
          </motion.button>
        </motion.form>

        {/* Right: Contact Info */}
        <motion.div
          className="flex flex-col justify-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-[var(--foreground)]">
            Get in Touch
          </h2>
          <p className="text-[var(--card-text)] mb-6 text-base leading-relaxed">
            We value your feedback and partnership opportunities. Whether you
            want to collaborate, advertise, or just say hi — drop us a message
            anytime. Our team responds within 24 hours.
          </p>

          <div className="flex items-center gap-3 mb-3">
            <FaEnvelope className="text-emerald-500 text-xl" />
            <span className="text-[var(--card-text)]">
              support@xorotools.com
            </span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <FaPhoneAlt className="text-emerald-500 text-xl" />
            <span className="text-[var(--card-text)]">+91 98765 43210</span>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-emerald-500 text-xl" />
            <span className="text-[var(--card-text)]">
              Vadodara, Gujarat, India
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
