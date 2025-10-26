// src/app/page.tsx (server component)
import { defaultSEO } from "@/lib/seo";
import MainContentPage from "./mainContent";
import HomeHero from "@/components/HomeHero";

export const metadata = defaultSEO;

export default function Page() {
  return (
    <>
      <HomeHero />
      <MainContentPage />
    </>
  );
}
