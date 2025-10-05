import { generateToolSEO } from "@/lib/seo";
import PdfSplitterPage from "./PdfSplitterPage";

export const metadata = generateToolSEO({
  title: "PDF Splitter Tool",
  description:
    "Split your PDF files into multiple parts by specifying page ranges. Any remaining pages will be auto-split.",
  slug: "/pdf-splitter",
  keywords: ["PDF", "split", "page ranges", "online tool"],
});

export default function Page() {
  return <PdfSplitterPage />;
}
