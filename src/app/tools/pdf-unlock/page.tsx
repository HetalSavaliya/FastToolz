import { generateToolSEO } from "@/lib/seo";
import PDFUnlockPage from "./PDFUnlockPage";

export const metadata = generateToolSEO({
  title: "PDF Unlock Tool",
  description:
    "Upload a password-protected PDF and unlock it by entering the correct password. Download your unlocked PDF instantly.",
  slug: "/pdf-unlock",
  keywords: ["PDF", "unlock", "password-protected", "PDF tool", "online tool"],
});

export default function Page() {
  return <PDFUnlockPage />;
}
