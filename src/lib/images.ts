/**
 * Photography used across the site.
 *
 * All files are freely licensed (CC BY / CC BY-SA) from Wikimedia Commons and
 * live in /public/img. CC BY-SA requires attribution, so every photo carries
 * its credit here and the footer renders the full list.
 *
 * IMPORTANT: these are photographs of Tamil Nadu's public landmarks and
 * institutional landscape. They document the region the Hub operates in — they
 * do not indicate that any pictured institution is a partner. Captions are
 * written to keep that distinction clear, per the content guidance.
 */
export type Photo = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  licence: string;
  licenceUrl: string;
  sourceUrl: string;
};

export const PHOTOS = {
  chennai: {
    src: "/img/chennai-skyline.jpg",
    alt: "Chennai skyline seen from St Thomas Mount, with the metro viaduct and IT corridor buildings.",
    caption: "Chennai, from St Thomas Mount",
    credit: "Karthikeyan321",
    licence: "CC BY 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chennai-Skyline-from-Mount.jpg",
  },
  tidel: {
    src: "/img/tidel-park.jpg",
    alt: "TIDEL Park in Chennai, a large technology park building, with people walking past the entrance.",
    caption: "TIDEL Park, Taramani — Chennai's technology corridor",
    credit: "Shanmugamp7",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tidel_park,_Chennai.jpg",
  },
  campus: {
    src: "/img/iit-madras.jpg",
    alt: "A wooded engineering campus in Chennai with residential blocks rising above dense tree canopy.",
    caption: "Engineering campus, Chennai — illustrative of the region's institutional landscape",
    credit: "Timothy A. Gonsalves",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hostels_East_IIT_Madras_Jun23_A7C_05191.jpg",
  },
  college: {
    src: "/img/anna-university.jpg",
    alt: "A historic engineering college building in Chennai lit with strings of lights at night.",
    caption: "Engineering college building, Guindy — Tamil Nadu's technical education heritage",
    credit: "Sriramramani",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Anna%2BUniversity.JPG",
  },
  coast: {
    src: "/img/marina-aerial.jpg",
    alt: "Aerial view of Marina Beach and the Chennai coastline.",
    caption: "Marina Beach, Chennai",
    credit: "Saiphani02",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Marina_beach,_Chennai_aerial_view.jpg",
  },
} satisfies Record<string, Photo>;

export const ALL_PHOTOS: Photo[] = Object.values(PHOTOS);
