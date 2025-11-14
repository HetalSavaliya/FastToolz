import { generateToolSEO } from "@/lib/seo";
import YoutubeDownloaderPage from "./YoutubeDownloaderPage";

export const metadata = generateToolSEO({
  title: "Free YouTube Downloader – Convert & Download Videos in HD MP4 or MP3",
  description:
    "Download YouTube videos in full HD or convert them to MP3 for free. No registration required — just paste the link, choose format (MP4 or MP3), and enjoy instant, high-quality downloads.",
  slug: "youtube-downloader", // ✅ Remove the leading slash here
  keywords: [
    "YouTube downloader",
    "free YouTube video downloader",
    "HD video download",
    "YouTube to MP4 converter",
    "YouTube to MP3 converter",
    "online YouTube downloader",
    "download YouTube videos in HD",
    "convert YouTube to audio",
    "free MP3 and MP4 download",
    "best YouTube converter 2025",
  ],
});

export default function Page() {
  return <YoutubeDownloaderPage />;
}
