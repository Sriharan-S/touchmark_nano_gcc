export type NavItem = {
  href: string;
  label: string;
  sub?: { href: string; label: string }[];
};

/**
 * Header navigation.
 *
 * Eight items crowded the bar, so Home and Contact come out: the logo is the
 * home link and the header CTA goes to Contact. Every page is still reachable
 * from the footer. The "For " prefixes are dropped to buy back width.
 */
export const NAV: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/nano-gcc-model", label: "Nano GCC Model" },
  { href: "/for-companies", label: "Companies" },
  { href: "/for-institutions", label: "Institutions" },
  {
    href: "/ecosystem",
    label: "Ecosystem",
    sub: [
      { href: "/ecosystem/partners", label: "Partners" },
      { href: "/ecosystem/team", label: "Team & Advisory" },
    ],
  },
  { href: "/insights", label: "Insights" },
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
