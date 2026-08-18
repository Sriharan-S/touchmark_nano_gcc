"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  total?: number;
  seed?: number;
  /** Sit on the paper background rather than ink. */
  onPaper?: boolean;
  showKey?: boolean;
};

/**
 * The brand atom, at full scale.
 *
 * `seed` units light up in teal on entry; the remainder fill in marigold as
 * the section scrolls - "start at 5, scale to 100, but only once it's proven".
 * The same two colours carry that meaning everywhere else on the site.
 */
export default function UnitDots({ total = 100, seed = 5, onPaper = false, showKey = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dots = gsap.utils.toArray<HTMLElement>(".unit", el);
    const seeds = dots.slice(0, seed);
    const rest = dots.slice(seed);

    if (prefersReducedMotion()) {
      gsap.set(dots, { scale: 1 });
      rest.forEach((d) => d.classList.add("grown"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(seeds, {
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "back.out(2.4)",
        scrollTrigger: { trigger: el, start: "top 84%", once: true },
      });

      gsap.to(rest, {
        scale: 1,
        duration: 0.4,
        stagger: { each: 0.012 },
        ease: "power2.out",
        onStart: () => rest.forEach((d) => d.classList.add("grown")),
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 42%", scrub: 0.5 },
      });
    }, el);

    return () => ctx.revert();
  }, [total, seed]);

  return (
    <div ref={ref}>
      <div className={`units${onPaper ? " on-paper" : ""}`} aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`unit${i < seed ? " seed" : ""}`} />
        ))}
      </div>

      {showKey && (
        <div className="units-key">
          <span>
            <i style={{ background: "var(--seed-l)" }} />
            {seed} - the starting unit
          </span>
          <span>
            <i style={{ background: "var(--proven)" }} />
            {total - seed} - added once proven
          </span>
        </div>
      )}
    </div>
  );
}
