import { generateToolSEO } from "@/lib/seo";
import PDFSignPage from "./PDFSignPage";

export const metadata = generateToolSEO({
  title: "PDF Sign Tool",
  description:
    "Digitally sign your PDF documents by adding a signature to any page at a specified position.",
  slug: "/pdf-sign",
  keywords: ["PDF", "sign", "digital signature", "online tool"],
});

export default function Page() {
  return <PDFSignPage />;
}
