import { generateToolSEO } from "@/lib/seo";
import OnlineNotepadPage from "./OnlineNotepadPage";

export const metadata = generateToolSEO({
  title: "Online Notepad",
  description:
    "Write, edit, and autosave notes securely in your browser with our free Online Notepad tool.",
  slug: "/tools/online-notepad",
  keywords: [
    "online notepad",
    "note taking tool",
    "autosave notepad",
    "write notes",
    "browser notes",
  ],
});

export default function Page() {
  return <OnlineNotepadPage />;
}
