import { generateToolSEO } from "@/lib/seo";
import PdfToWordConverter from "./PdfToWordConverter";

export const metadata = generateToolSEO({
  title: "PDF to Word Converter",
  description:
    "Upload your PDF file and convert it to an editable Word document quickly and easily.",
  slug: "/pdf-to-word",
  keywords: ["PDF", "Word", "convert", "PDF to Word", "online tool"],
});

export default function Page() {
  return <PdfToWordConverter />;
}
