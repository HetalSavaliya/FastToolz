// src/components/Footer.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 via-white to-gray-100 border-t text-gray-700 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center space-y-5">
        {/* 🔗 Footer Links */}
        <div className="space-x-5 text-sm">
          <Link
            href="/privacy-policy"
            className="hover:text-blue-600 transition"
          >
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-blue-600 transition">
            Terms of Use
          </Link>
          <span>|</span>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        {/* 🌍 Social Icons */}
        <div className="flex justify-center space-x-6 text-gray-500">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
          <a href="mailto:support@hjtools.com">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </a>
        </div>

        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">HJ Tools Hub</span>. All rights
          reserved.
        </p>

        <p className="text-xs text-gray-400">
          Powered by <span className="font-medium">HJ Tools</span> | Designed
          for Everyone
        </p>
      </div>
    </footer>
  );
}
