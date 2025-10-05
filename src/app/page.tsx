// src/app/page.tsx (server component)
import { defaultSEO } from "@/lib/seo";
import MainContentPage from "./mainContent";

export const metadata = defaultSEO;

export default function Page() {
  return <MainContentPage />;
}
