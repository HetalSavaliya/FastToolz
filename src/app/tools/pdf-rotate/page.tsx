import { generateToolSEO } from "@/lib/seo";
import PDFRotatePage from "./PDFRotatePage";

export const metadata = generateToolSEO({
  title: "PDF Rotate Tool",
  description:
    "Upload a PDF and rotate all pages, a single page, or multiple pages by any angle.",
  slug: "/pdf-rotate",
  keywords: ["PDF", "rotate", "online tool"],
});

export default function Page() {
  return <PDFRotatePage />;
}
