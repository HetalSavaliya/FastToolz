import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600 border-t">
      <p>
        &copy; {new Date().getFullYear()} Stories, Colors, and Learning for
        Young Minds. All rights reserved.
      </p>
      <p className="mt-2">
        Made with ❤️ for kids&apos; education. |{" "}
        <Link href="/privacy-policy" className="underline text-blue-600">
          Privacy
        </Link>{" "}
        |{" "}
        <Link href="/terms" className="underline text-blue-600">
          Terms
        </Link>
      </p>
    </footer>
  );
}
