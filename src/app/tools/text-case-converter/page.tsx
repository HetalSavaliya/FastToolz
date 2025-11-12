import { generateToolSEO } from "@/lib/seo";
import TextCaseConverterPage from "./TextCaseConverterPage";

export const metadata = generateToolSEO({
  title: "Text Case Converter",
  description:
    "Convert your text to UPPERCASE, lowercase, Title Case, and more instantly with this online tool.",
  slug: "/text-case-converter",
  keywords: [
    "text case",
    "uppercase",
    "lowercase",
    "title case",
    "text converter",
    "online tool",
  ],
});

export default function Page() {
  return <TextCaseConverterPage />;
}
