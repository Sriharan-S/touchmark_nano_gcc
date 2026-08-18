"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

const COLS = 12;
const ROWS = 4;
const TOTAL = COLS * ROWS;
const SEED = 5;

/**
 * The hero's running animation: the Nano GCC proposition on a loop.
 *
 * Five teal units appear, the rest fill in amber as the unit scales, it holds,
 * then resets and starts over. Same colour vocabulary as the 100-dot field
 * further down the page — teal is the starting unit, amber is capability added
 * once the model is proven. Freezes on the filled state under reduced motion.
 */
export default function UnitPulse() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const dots = gsap.utils.toArray<HTMLElement>(".pulse-dot", el);
    const seeds = dots.slice(0, SEED);
    const rest = dots.slice(SEED);

    if (prefersReducedMotion()) {
      gsap.set(dots, { opacity: 1, scale: 1 });
      rest.forEach((d) => d.classList.add("grown"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(dots, { scale: 0.3, opacity: 0.12 });

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.to(seeds, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.09, ease: "back.out(2.6)" })
        .to({}, { duration: 0.5 })
        .to(rest, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: { each: 0.022, from: "start" },
        })
        .to({}, { duration: 1.4 })
        .to(dots, {
          scale: 0.3,
          opacity: 0.12,
          duration: 0.5,
          stagger: { each: 0.006, from: "end" },
        })
        .to({}, { duration: 0.4 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pulse" ref={root} aria-hidden>
      <div className="pulse-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {Array.from({ length: TOTAL }, (_, i) => (
          <span key={i} className={`pulse-dot${i < SEED ? " seed" : " grown"}`} />
        ))}
      </div>
      <div className="pulse-label">
        <span>
          <i style={{ background: "var(--seed-l)" }} />5 seed
        </span>
        <span>
          <i style={{ background: "var(--proven)" }} />
          scale when proven
        </span>
      </div>
    </div>
  );
}
