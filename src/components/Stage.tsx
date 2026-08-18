"use client";

import { useRef, type ReactNode } from "react";
import type { Photo } from "@/lib/images";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  photo: Photo;
  children: ReactNode;
  /** Viewport height the stage occupies. */
  height?: string;
  priority?: boolean;
  /** Curved bottom vignette that fades out as the stage scrolls away. */
  vignette?: boolean;
  className?: string;
};

/** Full-bleed photograph with type set over it. Used for page openings. */
export default function Stage({
  photo,
  children,
  height = "88svh",
  priority = false,
  vignette = false,
  className = "",
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(el.querySelector(".stage-img"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      // The vignette only earns its keep while the headline is on screen, so
      // it dissolves over the first half of the scroll out.
      const veil = el.querySelector(".stage-veil");
      if (veil) {
        gsap.to(veil, {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "45% top", scrub: true },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`stage over ${className}`.trim()} ref={root} style={{ minHeight: height }}>
      <div className="stage-img">
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
        />
      </div>
      {vignette ? <div className="stage-veil" aria-hidden /> : null}
      <div className="stage-body">{children}</div>
    </div>
  );
}
