import { generateToolSEO } from "@/lib/seo";
import JsRunnerPage from "./JsRunnerPage";

export const metadata = generateToolSEO({
  title: "Online JS Runner",
  description:
    "Write and run JavaScript code directly in your browser. See the output instantly without any setup. Free and no login required.",
  slug: "js-runner",
  keywords: [
    "js runner",
    "javascript runner",
    "run javascript online",
    "online code editor",
    "browser javascript",
    "js console",
  ],
});

export default function Page() {
  return <JsRunnerPage />;
}
