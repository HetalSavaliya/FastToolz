// app/terms/page.tsx
export default function TermsOfUsePage() {
  return (
    <main className="px-6 py-10 max-w-4xl mx-auto text-gray-700 leading-relaxed">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Terms of Use for HJ Tools Hub
      </h1>

      <p className="mb-4">
        Welcome to <strong>HJ Tools Hub</strong>. By accessing or using our
        website, you agree to comply with and be bound by these Terms of Use.
        Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        1. Use of Our Services
      </h2>
      <p className="mb-4">
        You agree to use our online tools only for lawful purposes and in a way
        that does not infringe upon the rights of others or restrict their use
        and enjoyment of the website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        2. Intellectual Property
      </h2>
      <p className="mb-4">
        All content, including logos, design, and text on this site, are
        protected by copyright and owned by HJ Tools Hub. You may not reproduce
        or distribute our content without permission.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        3. Disclaimer
      </h2>
      <p className="mb-4">
        The tools on this site are provided “as is” without any warranties. We
        make no guarantees about the accuracy or reliability of the output.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        4. Limitation of Liability
      </h2>
      <p className="mb-4">
        HJ Tools Hub is not responsible for any loss or damage resulting from
        the use of our website or tools.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        5. Modifications
      </h2>
      <p className="mb-4">
        We reserve the right to modify or replace these Terms at any time.
        Continued use of the site constitutes your acceptance of such changes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        6. Contact Information
      </h2>
      <p className="mb-4">
        For any questions about these Terms, please contact us at{" "}
        <a
          href="mailto:support@hjtools.com"
          className="text-blue-600 underline"
        >
          support@hjtools.com
        </a>
        .
      </p>

      <p className="mt-10 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </main>
  );
}
