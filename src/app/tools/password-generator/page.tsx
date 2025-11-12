import { generateToolSEO } from "@/lib/seo";
import PasswordGeneratorPage from "./PasswordGeneratorPage";

export const metadata = generateToolSEO({
  title: "Password Generator",
  description:
    "Generate strong and secure random passwords instantly. Free online password generator with adjustable length.",
  slug: "password-generator",
  keywords: [
    "password generator",
    "secure password",
    "random password",
    "strong password online",
    "free password tool",
  ],
});

export default function Page() {
  return <PasswordGeneratorPage />;
}
