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
};

/** Full-bleed photograph with type set over it. Used for page openings. */
export default function Stage({ photo, children, height = "88svh", priority = false }: Props) {
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
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="stage over" ref={root} style={{ minHeight: height }}>
      <div className="stage-img">
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
        />
      </div>
      <div className="stage-body">{children}</div>
    </div>
  );
}
