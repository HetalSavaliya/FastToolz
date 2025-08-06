import Link from "next/link";

export default function ToolsFooter() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 via-white to-gray-50 text-center text-sm text-gray-600 border-t shadow-inner">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <p className="mb-2">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">HJ Tools</span>. All rights reserved.
        </p>
        <div className="space-x-4">
          <Link
            href="/privacy-policy"
            className="hover:underline hover:text-blue-600 transition"
          >
            Privacy Policy
          </Link>
          <span>|</span>
          <Link
            href="/terms"
            className="hover:underline hover:text-blue-600 transition"
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
