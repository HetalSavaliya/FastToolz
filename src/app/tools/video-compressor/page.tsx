import { generateToolSEO } from "@/lib/seo";
import VideoCompressorPage from "./VideoCompressorPage";

export const metadata = generateToolSEO({
  title: "Video Compressor",
  description:
    "Upload and compress video files online to reduce file size without losing much quality. Supports various video formats.",
  slug: "/video-compressor",
  keywords: [
    "video compressor",
    "compress video online",
    "reduce video size",
    "video optimization",
    "online video tool",
  ],
});

export default function Page() {
  return <VideoCompressorPage />;
}
