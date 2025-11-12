"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FloatingIconsProps {
  icons: any[];
  iconSize?: string; // e.g. "text-2xl"
  density?: number; // number of icon sets to render
  colorMixLight?: string; // optional custom color mix (light)
  colorMixDark?: string; // optional custom color mix (dark)
}

export default function FloatingIcons({
  icons,
  iconSize = "text-3xl",
  density = 1,
  colorMixLight = "color-mix(in srgb, var(--accent) 70%, #ffffff 30%)",
  colorMixDark = "color-mix(in srgb, var(--accent) 80%, #000000 20%)",
}: FloatingIconsProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // detect initial theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    // listener for theme changes
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.flatMap((icon, i) =>
        Array.from({ length: density }).map((_, j) => (
          <motion.div
            key={`${i}-${j}`}
            className={`absolute ${iconSize}`}
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
              color: isDark ? colorMixDark : colorMixLight,
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
        ))
      )}
    </div>
  );
}
