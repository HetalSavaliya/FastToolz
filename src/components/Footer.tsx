"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import FloatingIcons from "@/components/FloatingIcons"; // ✅ Import

export default function Footer() {
  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/xorotools.com/visits")
      .then((res) => res.json())
      .then((data) => {
        const el = document.getElementById("visitor-count");
        if (el) el.textContent = data.value;
      })
      .catch(() => {
        const el = document.getElementById("visitor-count");
        if (el) el.textContent = "100+";
      });
  }, []);

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] mt-10 py-10 text-center overflow-hidden">
      {/* ✨ Floating Icons (Optional background animation) */}
      <FloatingIcons
        icons={[faFacebook, faTwitter, faGithub, faEnvelope]}
        iconSize="text-2xl"
        density={1}
      />

      <div className="relative z-10">
        <div className="text-sm mb-4 space-x-5">
          <Link href="/privacy-policy" className="hover:text-[var(--accent)]">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-[var(--accent)]">
            Terms of Use
          </Link>
          <span>|</span>
          <Link href="/contact" className="hover:text-[var(--accent)]">
            Contact
          </Link>
        </div>

        <div className="flex justify-center space-x-6 mb-4 text-[var(--accent)]">
          <FontAwesomeIcon icon={faFacebook} size="lg" />
          <FontAwesomeIcon icon={faTwitter} size="lg" />
          <FontAwesomeIcon icon={faGithub} size="lg" />
          <a href="mailto:support@xorotools.com">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </a>
        </div>

        <p className="text-xs opacity-75 mb-2">
          👀 <span id="visitor-count">Loading...</span> visitors today
        </p>
        <p className="text-xs opacity-75">
          Made with ❤️ in <span className="text-[var(--accent)]">India</span>
        </p>
        <p className="text-xs opacity-60 mt-2">
          &copy; {new Date().getFullYear()} XORO Tools — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
