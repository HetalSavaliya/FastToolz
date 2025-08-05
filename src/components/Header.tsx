// src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Privacy", path: "/privacy-policy" },
  { name: "Terms", path: "/terms" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* ✅ Logo & Site Title */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/logo.png" // Make sure logo.png is in /public/images
            alt="Stories, Colors, and Learning for Young Minds Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight text-[#66AF85]">
            Stories, Colors, and Learning for Young Minds
          </span>
        </Link>

        {/* ✅ Desktop Navigation */}
        <nav className="hidden md:flex space-x-5 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`hover:text-[#66AF85] transition ${
                pathname === link.path ? "text-[#66AF85] font-semibold" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ✅ Mobile Nav Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 bg-white border-t">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm ${
                pathname === link.path ? "text-[#66AF85] font-semibold" : "text-gray-700"
              } hover:text-[#66AF85] transition`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
