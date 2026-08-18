import type { NextConfig } from "next";

// GitHub Pages serves this project from /touchmark_nano_gcc, so the build needs
// a base path. Set NEXT_PUBLIC_BASE_PATH in CI; local dev leaves it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export: every route ships as real HTML, so the marketing copy stays
  // crawlable even though the site is a React app.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
