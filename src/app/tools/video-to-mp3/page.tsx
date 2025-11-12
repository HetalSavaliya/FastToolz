import { generateToolSEO } from "@/lib/seo";
import VideoToMP3Page from "./VideoToMP3Page";

export const metadata = generateToolSEO({
  title: "Video to MP3 Converter",
  description:
    "Convert YouTube videos to MP3 audio files online. Paste a YouTube URL and download the audio instantly.",
  slug: "/video-to-mp3",
  keywords: [
    "YouTube to MP3",
    "video to mp3 converter",
    "download audio",
    "convert video to mp3",
    "online mp3 converter",
  ],
});

export default function Page() {
  return <VideoToMP3Page />;
}
