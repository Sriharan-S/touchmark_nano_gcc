import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** Update this once the production domain is pointed at Vercel. */
export const SITE_URL = "https://touchmark-nano-gcc.vercel.app";

const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/nano-gcc-model", priority: 0.9 },
  { path: "/for-companies", priority: 0.9 },
  { path: "/for-institutions", priority: 0.9 },
  { path: "/ecosystem", priority: 0.7 },
  { path: "/ecosystem/partners", priority: 0.6 },
  { path: "/ecosystem/team", priority: 0.6 },
  { path: "/insights", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/careers", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/terms", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
