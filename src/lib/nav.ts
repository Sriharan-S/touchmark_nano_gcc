export type NavItem = {
  href: string;
  label: string;
  sub?: { href: string; label: string }[];
};

/** Primary navigation — the 8 pages from the content structure. */
export const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/nano-gcc-model", label: "Nano GCC Model" },
  { href: "/for-companies", label: "For Companies" },
  { href: "/for-institutions", label: "For Institutions" },
  {
    href: "/ecosystem",
    label: "Ecosystem",
    sub: [
      { href: "/ecosystem/partners", label: "Partners" },
      { href: "/ecosystem/team", label: "Team & Advisory" },
    ],
  },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

/** Supporting pages, reachable from the footer. */
export const FOOTER_LINKS = {
  explore: [
    { href: "/nano-gcc-model", label: "Nano GCC Model" },
    { href: "/about", label: "About & Vision" },
    { href: "/insights", label: "Insights & Stories" },
    { href: "/faq", label: "FAQ" },
  ],
  engage: [
    { href: "/for-companies", label: "For Companies" },
    { href: "/for-institutions", label: "For Institutions" },
    { href: "/careers", label: "Careers & Talent" },
    { href: "/contact", label: "Contact" },
  ],
  ecosystem: [
    { href: "/ecosystem", label: "Overview" },
    { href: "/ecosystem/partners", label: "Partners" },
    { href: "/ecosystem/team", label: "Team & Advisory" },
  ],
};
