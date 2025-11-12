import { generateToolSEO } from "@/lib/seo";
import TextToPdfPage from "./TextToPdfPage";

export const metadata = generateToolSEO({
  title: "Text to PDF Converter",
  description:
    "Convert your text or .txt files into clean, downloadable PDF documents instantly with this online tool.",
  slug: "/text-to-pdf",
  keywords: [
    "text to PDF",
    "PDF converter",
    "text file to PDF",
    "online PDF tool",
    "export PDF",
  ],
});

export default function Page() {
  return <TextToPdfPage />;
}
