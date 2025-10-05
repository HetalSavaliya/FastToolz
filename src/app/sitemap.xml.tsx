// src/app/sitemap.xml.tsx
import { categories } from "@/data/categories";
import { baseUrl } from "@/lib/seo";
import { NextRequest, NextResponse } from "next/server";

const SITE_URL = baseUrl;

export async function GET(request: NextRequest) {
  // Gather all paths from categories
  const paths: string[] = [];
  categories.forEach((category) => {
    category.tools.forEach((tool) => {
      paths.push(tool.path);
    });
  });

  // Include homepage
  paths.unshift("/");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paths
    .map(
      (path) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
