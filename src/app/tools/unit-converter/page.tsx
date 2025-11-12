import { generateToolSEO } from "@/lib/seo";
import UnitConverterPage from "./UnitConverterPage";

export const metadata = generateToolSEO({
  title: "Unit Converter",
  description:
    "Easily convert between length units like meters, kilometers, miles, inches, and more with this simple online unit converter.",
  slug: "/unit-converter",
  keywords: [
    "unit converter",
    "length conversion",
    "meters to kilometers",
    "inches to centimeters",
    "online conversion tool",
  ],
});

export default function Page() {
  return <UnitConverterPage />;
}
