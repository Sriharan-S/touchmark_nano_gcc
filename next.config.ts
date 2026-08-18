import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: every route ships as real HTML, so the marketing copy stays
  // crawlable even though the site is a React app. Vercel serves it from the
  // domain root, so no basePath is needed.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
