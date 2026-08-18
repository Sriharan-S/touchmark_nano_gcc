"use client";

import { useRef } from "react";
import type { Photo } from "@/lib/images";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  photo: Photo;
  /** Frame proportion. */
  shape?: "wide" | "tall" | "square";
  /** Override the caption text; the credit line is always kept. */
  caption?: string;
  priority?: boolean;
  className?: string;
};

/**
 * A captioned photograph.
 *
 * The image is over-scaled inside its frame and drifts as the frame passes
 * through the viewport, so photography feels anchored to the page rather than
 * pasted onto it. The credit is mandatory — these are CC BY / CC BY-SA files.
 */
export default function Figure({
  photo,
  shape = "wide",
  caption,
  priority = false,
  className,
}: Props) {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const img = el.querySelector("img");
    if (!img) return;

    if (prefersReducedMotion()) {
      gsap.set(img, { scale: 1, yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -7, scale: 1.14 },
        {
          yPercent: 7,
          scale: 1.14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // The frame opens rather than the image fading in.
      gsap.from(el.querySelector(".fig-frame"), {
        clipPath: "inset(14% 0% 14% 0%)",
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <figure ref={root} className={`fig fig-${shape} ${className ?? ""}`}>
      <div className="fig-frame">
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
        />
      </div>
      <figcaption>
        <span className="cap">{caption ?? photo.caption}</span>
        <span className="cred">
          {photo.credit} · {photo.licence}
        </span>
      </figcaption>
    </figure>
  );
}
