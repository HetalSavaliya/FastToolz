// app/privacy-policy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <main className="px-6 py-10 max-w-4xl mx-auto text-gray-700 leading-relaxed">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Privacy Policy for HJ Tools Hub
      </h1>

      <p className="mb-4">
        This Privacy Policy explains how HJ Tools Hub (“we”, “our”, or “us”)
        collects, uses, and protects your personal information when you use our
        website <strong>https://hjtools.com</strong> (the “Site”).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We do not collect personal files or data unless you voluntarily submit
        them through a contact form or email. Most tools on our site process
        files locally in your browser — no uploads are stored on our servers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        2. Google AdSense & Cookies
      </h2>
      <p className="mb-4">
        We use Google AdSense to display ads. Google may use cookies and web
        beacons to collect data such as your IP address, browser type, and
        browsing behavior to show personalized ads. You can learn more about how
        Google uses your data here:{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Google Ad Policies
        </a>
        .
      </p>

      <p className="mb-4">
        You can opt out of personalized advertising by visiting{" "}
        <a
          href="https://adssettings.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Google Ads Settings
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        3. Use of Information
      </h2>
      <p className="mb-4">
        We may use your information to improve user experience, respond to
        support requests, and enhance our services. We do not sell or rent your
        data to any third party.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        4. Third-Party Links
      </h2>
      <p className="mb-4">
        Our website may contain links to third-party websites. We are not
        responsible for the content or privacy practices of those websites.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        5. Your Rights
      </h2>
      <p className="mb-4">
        You may request access, correction, or deletion of your personal data at
        any time by contacting us at{" "}
        <a
          href="mailto:support@hjtools.com"
          className="text-blue-600 underline"
        >
          support@hjtools.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        6. Updates to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy periodically. Updates will be posted
        on this page with the latest revision date.
      </p>

      <p className="mt-10 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </main>
  );
}
