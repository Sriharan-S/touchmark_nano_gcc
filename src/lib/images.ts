/**
 * Artwork used across the site.
 *
 * Illustrations, not photography. The earlier build used photographs of real
 * Tamil Nadu institutions and landmarks, which risked implying that pictured
 * organizations were partners - so the site now runs on abstract vector
 * illustration instead, recoloured to the site palette.
 *
 * Source: unDraw (https://undraw.co), open licence - free for commercial use
 * with no attribution required. The credit line is kept anyway, as courtesy.
 * The originals are purple (#6c63ff) on near-black; every file in /public/img
 * has been recoloured to --seed teal, --proven amber and the site's slates.
 */
export type Artwork = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  licence: string;
  licenceUrl: string;
  sourceUrl: string;
};

const UNDRAW = {
  credit: "unDraw",
  licence: "unDraw licence",
  licenceUrl: "https://undraw.co/license",
} as const;

export const ART = {
  /** Hero backdrop: a quiet globe with lit nodes - small units, global reach. */
  network: {
    src: "/img/il-network.svg",
    alt: "Illustration of a world map with lit points connected by fine lines.",
    caption: "Small units, connected globally",
    sourceUrl: "https://undraw.co/illustrations",
    ...UNDRAW,
  },
  team: {
    src: "/img/il-engineering-team.svg",
    alt: "Illustration of a small engineering team working together at a shared desk.",
    caption: "A Nano GCC unit - five to a hundred people, one goal",
    sourceUrl: "https://undraw.co/illustrations",
    ...UNDRAW,
  },
  knowledge: {
    src: "/img/il-knowledge.svg",
    alt: "Illustration of two people handing over a document.",
    caption: "Capability transferred, not just resourced",
    sourceUrl: "https://undraw.co/illustrations",
    ...UNDRAW,
  },
  ideas: {
    src: "/img/il-ideas.svg",
    alt: "Illustration of a person arranging ideas and documents on a connected board.",
    caption: "From idea to working prototype",
    sourceUrl: "https://undraw.co/illustrations",
    ...UNDRAW,
  },
  global: {
    src: "/img/il-global.svg",
    alt: "Illustration of a person looking at a globe orbited by moving elements.",
    caption: "Built from Tamil Nadu, scaled globally",
    sourceUrl: "https://undraw.co/illustrations",
    ...UNDRAW,
  },
} satisfies Record<string, Artwork>;

export const ALL_ART: Artwork[] = Object.values(ART);
