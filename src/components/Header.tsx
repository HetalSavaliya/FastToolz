"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Tools", path: "/tools" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // 🌙 default dark
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"; // default dark
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="bg-[var(--background)] border-b border-[var(--border)] text-[var(--foreground)] sticky top-0 z-50 shadow-sm transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/logo.svg"
            alt="XORO Tools"
            width={40}
            height={40}
            className="rounded-full border border-[var(--border)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          />
          <span className="text-2xl font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
            XORO Tools
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[var(--accent)] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 ${
                pathname === link.path
                  ? "text-[var(--accent)] font-semibold after:scale-x-100"
                  : "hover:text-[var(--accent-hover)] hover:after:scale-x-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="focus:outline-none hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              size="lg"
            />
          </button>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--card)] border-t border-[var(--border)] text-[var(--card-text)] transition-all duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 border-b border-[var(--border)] hover:bg-[var(--accent)] hover:text-white transition-all ${
                pathname === link.path
                  ? "font-semibold text-[var(--accent)]"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
