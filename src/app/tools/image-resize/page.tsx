import { generateToolSEO } from "@/lib/seo";
import ImageResizerPage from "./ImageResizerPage";

export const metadata = generateToolSEO({
  title: "Image Resizer",
  description:
    "Resize images online by setting custom width and height, preview the results, and download the resized image directly from your browser. Fast, free, and no login required.",
  slug: "image-resizer",
  keywords: [
    "image resizer",
    "resize images",
    "online image resizer",
    "change image dimensions",
    "image editor",
  ],
});

export default function Page() {
  return <ImageResizerPage />;
}
