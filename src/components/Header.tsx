"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Tools", path: "/tools" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🔰 Logo & Title */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/logo.svg"
            alt="Tools Logo"
            width={40}
            height={40}
            className="rounded-full border border-white shadow-md transition-transform duration-300 group-hover:rotate-6"
          />
          <span className="text-2xl font-semibold tracking-tight group-hover:text-yellow-200 transition">
            HJ Tools Hub
          </span>
        </Link>

        {/* 💻 Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`relative transition-all duration-200 ${
                pathname === link.path
                  ? "font-bold text-yellow-300 after:scale-x-100"
                  : "hover:text-yellow-200 after:scale-x-0"
              } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-yellow-300 after:transition-transform after:origin-left after:duration-300 hover:after:scale-x-100`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 📱 Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white text-gray-800 border-t shadow-inner animate-slideDown">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm border-b hover:bg-gray-50 transition ${
                pathname === link.path ? "text-blue-600 font-semibold" : ""
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
