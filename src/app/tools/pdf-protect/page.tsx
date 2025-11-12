import { generateToolSEO } from "@/lib/seo";
import PDFPasswordProtectPage from "./PDFPasswordProtectPage";

export const metadata = generateToolSEO({
  title: "PDF Password Protect",
  description:
    "Upload your PDF and set a password to secure it. Protect PDFs instantly in your browser.",
  slug: "pdf-password-protect",
  keywords: [
    "pdf password protect",
    "secure pdf online",
    "encrypt pdf",
    "pdf password generator",
    "pdf security tool",
  ],
});

export default function Page() {
  return <PDFPasswordProtectPage />;
}
