"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

/** Continuously drifting band of capability areas, set in the metadata mono. */
export default function Marquee({ items, speed = 34 }: { items: string[]; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // The list renders twice, so shifting by half its width loops seamlessly.
      const half = track.scrollWidth / 2;
      gsap.to(track, {
        x: -half,
        duration: half / speed,
        ease: "none",
        repeat: -1,
        modifiers: { x: (v) => `${parseFloat(v) % half}px` },
      });
    }, track);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div className="marquee">
      <div className="mtrack" ref={trackRef}>
        {[...items, ...items].map((item, i) => (
          <span className="mitem" key={`${item}-${i}`}>
            <i aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
