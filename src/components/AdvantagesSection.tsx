"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHelping,
  faBolt,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import FloatingIcons from "@/components/FloatingIcons";

export default function AdvantagesSection() {
  const advantages = [
    {
      icon: faHandsHelping,
      title: "Totally Free to Use",
      text: "We believe tools should be free for everyone. No paywalls, no hidden costs — just value.",
    },
    {
      icon: faBolt,
      title: "Do More with Less",
      text: "All your tools in one place. Simple, fast, and beautifully designed for productivity.",
    },
    {
      icon: faLaptopCode,
      title: "Works Everywhere",
      text: "XORO Tools runs in your browser. 100% web-based and compatible across all devices.",
    },
  ];

  return (
    <section className="relative py-12 border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* ✨ Floating Background Icons */}
      <FloatingIcons
        icons={[faHandsHelping, faBolt, faLaptopCode]}
        iconSize="text-4xl"
        density={1}
      />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* 🪄 Animated Heading */}
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose <span className="text-[var(--accent)]">XORO Tools</span>?
        </motion.h2>

        {/* ⚡ Animated Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              className="group p-6 rounded-2xl bg-[var(--card)] text-[var(--card-text)] border border-[var(--border)] shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-[var(--accent)] mb-3 text-3xl">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm opacity-90">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
