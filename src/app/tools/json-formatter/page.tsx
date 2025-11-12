import { generateToolSEO } from "@/lib/seo";
import JSONFormatterPage from "./JSONFormatterPage";

export const metadata = generateToolSEO({
  title: "JSON Formatter",
  description:
    "Paste and format your JSON data for better readability. Free online JSON formatter with copy and reset options.",
  slug: "json-formatter",
  keywords: [
    "json formatter",
    "format json online",
    "pretty json",
    "json beautifier",
    "json online tool",
  ],
});

export default function Page() {
  return <JSONFormatterPage />;
}
