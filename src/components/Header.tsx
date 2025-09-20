"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

// 🔧 Add more tools as needed
const navLinks = [{ name: "All Tools", path: "/" }];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white sticky top-0 z-50 shadow-md">
      <div className=" mx-auto px-4 py-4 flex justify-between items-center">
        {/* 🔰 Logo & Title */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.svg"
            alt="Tools Logo"
            width={40}
            height={40}
            className="rounded-full border border-white"
          />
          <span className="text-xl font-bold tracking-tight">
            Cyarmor Tools Hub
          </span>
        </Link>

        {/* 💻 Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`hover:underline transition ${
                pathname === link.path ? "font-bold underline" : ""
              }`}
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
          <svg
            className="w-6 h-6 text-white"
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

      {/* 📱 Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 bg-white text-gray-800 border-t">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm ${
                pathname === link.path ? "text-blue-600 font-semibold" : ""
              } hover:text-blue-500 transition`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
