"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faImage,
  faCode,
  faFont,
  faScissors,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function HomeHero() {
  return (
    <section className="relative w-full overflow-hidden text-[var(--foreground)] transition-colors py-14 md:py-18 px-6 bg-gradient-to-b from-[var(--background)] to-[color-mix(in srgb, var(--background) 85%, #eaeaff 15%)] dark:to-[color-mix(in srgb, var(--background) 90%, #1a1a28 10%)]">
      {/* === Animated Background Glow === */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[650px] h-[650px] bg-[var(--accent)] opacity-[0.08] blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* === Floating Icons === */}
      {[faFilePdf, faImage, faCode, faFont, faScissors, faLock].map(
        (icon, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-4xl"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
              color: "color-mix(in srgb, var(--accent) 70%, white 30%)",
              opacity: 0.4,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.35, 0.75, 0.35],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </motion.div>
        )
      )}

      {/* === Hero Content === */}
      <motion.div
        className="text-center max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight drop-shadow-md"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          Boost Your Workflow with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent)] via-emerald-500 to-teal-500 animate-gradient-x">
            XORO Tools
          </span>
        </motion.h1>

        <motion.p
          className="text-sm md:text-lg opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Elevate your productivity with <strong>smart, privacy-first</strong>{" "}
          tools for PDFs, images, and text — built for speed, simplicity, and
          creativity.
        </motion.p>

        {/* === Buttons (Compact & Balanced) === */}
        <motion.div
          className="flex justify-center gap-4 flex-wrap mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Primary Gradient Button */}
          <Link
            href="/tools"
            className="group relative bg-gradient-to-r from-[var(--accent)] via-emerald-500 to-teal-500 text-white font-bold px-7 py-2.5 rounded-lg 
            transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <span className="relative z-10">Explore Tools</span>
            <span className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>

          {/* Outlined Button */}
          <Link
            href="/about"
            className="group relative border border-[var(--accent)] text-[var(--accent)] font-semibold px-7 py-2.5 rounded-lg 
            hover:bg-[var(--accent)] hover:text-white transition-all duration-300 hover:scale-105 
            hover:shadow-[0_0_15px_color-mix(in srgb,var(--accent) 70%,white 30%)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <span className="relative z-10">Learn More</span>
            <span className="absolute inset-0 rounded-lg bg-[var(--accent)] opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
        </motion.div>
      </motion.div>

      {/* === Decorative Bottom Wave === */}
      <svg
        className="absolute bottom-0 left-0 w-full h-14 text-[var(--accent)] opacity-10"
        viewBox="0 0 1440 320"
        fill="currentColor"
      >
        <path d="M0,224L30,213.3C60,203,120,181,180,186.7C240,192,300,224,360,229.3C420,235,480,213,540,186.7C600,160,660,128,720,138.7C780,149,840,203,900,197.3C960,192,1020,128,1080,117.3C1140,107,1200,149,1260,165.3C1320,181,1380,171,1410,165.3L1440,160L1440,320L0,320Z" />
      </svg>
    </section>
  );
}
