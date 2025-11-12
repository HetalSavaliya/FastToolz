import { generateToolSEO } from "@/lib/seo";
import { Metadata } from "next";
import PdfMergePage from "./PdfMergePage";

export const metadata: Metadata = generateToolSEO({
  title: "PDF Merge",
  description: "Combine multiple PDFs into one document easily.",
  slug: "pdf-merge",
  keywords: ["pdf", "merge", "combine pdfs"],
});
export default function Page() {
  return <PdfMergePage />;
}
