import { generateToolSEO } from "@/lib/seo";
import WordCounterPage from "./WordCounterPage";

export const metadata = generateToolSEO({
  title: "Word Counter Tool",
  description:
    "Quickly count words, characters, and estimate reading time for any text. Paste or type your content and get instant results.",
  slug: "/word-counter",
  keywords: [
    "word counter",
    "character count",
    "reading time",
    "text analysis",
    "online word counter",
  ],
});

export default function Page() {
  return <WordCounterPage />;
}
