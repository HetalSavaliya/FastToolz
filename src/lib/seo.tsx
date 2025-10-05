// src/lib/seo.ts
import { categories } from "@/data/categories";
import type { Metadata } from "next";

const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

const allKeywords = categories
  .flatMap((category) => category.tools.map((tool) => tool.name.toLowerCase()))
  .concat([
    "free pdf tools",
    "pdf merge",
    "image compressor",
    "video converter",
    "json formatter",
    "online notepad",
    "password generator",
    "qr code generator",
    "unit converter",
  ]);

export const defaultSEO: Metadata = {
  title: "Free Online Tools - PDF, Image, Video, Text & Developer Tools",
  description:
    "Explore 100% free browser-based tools for PDFs, images, videos, audio, text, and developer utilities. Lightweight and secure. No login required!",
  keywords: allKeywords,
  authors: [{ name: "Hetal Savaliya" }],
  creator: "Hetal Savaliya",
  publisher: "FreeTools",
  openGraph: {
    title: "Free Online Tools - PDF, Image, Video, Text & Developer Tools",
    description:
      "Lightweight free tools for PDFs, images, audio, video, text, and developers. No login needed.",
    url: baseUrl,
    siteName: "FreeTools",
    images: [
      {
        url: baseUrl + "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Online Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools - PDF, Image, Video, Text & Developer Tools",
    description:
      "100% free online tools for productivity, PDF editing, media conversion, and more.",
    images: [baseUrl + "/og-image.png"],
    creator: "@hetalsavaliya",
  },
};

// Reusable function for tool-specific SEO
export function generateToolSEO({
  title,
  description,
  slug,
  keywords = [],
}: {
  title: string;
  description: string;
  slug: string;
  keywords?: string[];
}): Metadata {
  // Use placeholder image for the tool
  const imageUrl = `https://placehold.co/1200x630?text=${encodeURIComponent(
    title
  )}`;

  return {
    title: `${title} - Free Online Tool`,
    description,
    keywords,
    authors: [{ name: "Hetal Savaliya" }],
    creator: "Hetal Savaliya",
    publisher: "FreeTools",
    openGraph: {
      title: `${title} - Free Online Tool`,
      description,
      url: `${
        typeof window !== "undefined" ? window.location.origin : ""
      }/tools/${slug}`,
      siteName: "FreeTools",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - Free Online Tool`,
      description,
      images: [imageUrl],
      creator: "@hetalsavaliya",
    },
  };
}
