import { generateToolSEO } from "@/lib/seo";
import ImageCompressorPage from "./ImageCompressorPage";

export const metadata = generateToolSEO({
  title: "Image Compressor",
  description:
    "Compress images online with adjustable quality and download the optimized image directly from your browser. Fast, free, and no login required.",
  slug: "image-compressor",
  keywords: [
    "image compressor",
    "compress images",
    "online image optimizer",
    "reduce image size",
  ],
});
export default function Page() {
  return <ImageCompressorPage />;
}
