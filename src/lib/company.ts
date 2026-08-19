/**
 * Registered identity behind the Nano GCC Hub.
 *
 * Taken from the group site (touchmarkdes.com) so the legal pages here name the
 * same entity, offices and contact points. One place to change if any of it
 * moves.
 */
export const COMPANY = {
  legalName: "Touchmark Descience Pvt. Ltd",
  brand: "Touchmark Nano GCC Hub",
  email: "info@touchmarkdes.com",
  phones: ["+91 44 4065 2648", "+91 44 4065 2649", "+91 44 486 41 206"],
  /** The first entry is the registered office used in the legal pages. */
  addresses: [
    {
      label: "Chennai (registered office)",
      lines: [
        "Tamarai Tech Park (Level 5)",
        "S.P. Plot No. 16-19 & 20-A, Thiru Vi Ka Industrial Estate",
        "Guindy, Chennai, Tamil Nadu 600032, India",
      ],
    },
    {
      label: "Chennai",
      lines: [
        "Plot No. S-16, 15th Main Road",
        "Thiru Vi Ka Industrial Estate",
        "Guindy, Chennai, Tamil Nadu 600032, India",
      ],
    },
    { label: "Singapore", lines: ["Blk 144, Pasir Ris Street, #05-89", "Singapore 510144"] },
    { label: "United Kingdom", lines: ["1 Roseneath Avenue", "Leicester, England, LE4 7GS"] },
  ],
} as const;
