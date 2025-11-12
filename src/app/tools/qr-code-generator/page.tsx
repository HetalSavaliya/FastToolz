import { generateToolSEO } from "@/lib/seo";
import QRCodeGeneratorPage from "./QRCodeGeneratorPage";

export const metadata = generateToolSEO({
  title: "QR Code Generator",
  description:
    "Generate QR codes instantly by entering text, URLs, or any content. Download the QR code as an image.",
  slug: "/qr-code-generator",
  keywords: [
    "QR code",
    "QR generator",
    "online tool",
    "QR code download",
    "text to QR",
  ],
});

export default function Page() {
  return <QRCodeGeneratorPage />;
}
