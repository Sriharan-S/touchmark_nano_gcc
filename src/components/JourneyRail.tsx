"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";

export type Stage = {
  title: string;
  kicker: string;
  body: string;
  units: number;
  proven?: boolean;
};

/**
 * The five stages, as a sticky rail beside a scrolling narrative.
 *
 * Replaces the pinned horizontal carousel: the numeral and tick track stay in
 * view and update as each stage passes, so the reader always knows where they
 * are in the journey. It also degrades to a plain stack on small screens
 * instead of needing a separate mobile behaviour.
 */
export default function JourneyRail({ stages }: { stages: Stage[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(".stage-block", el);

      blocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });

        gsap.from(block, {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: block, start: "top 88%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [stages.length]);

  const current = stages[active];

  return (
    <div className="rail" ref={root}>
      <div className="rail-sticky">
        <div className="rail-num">{String(active + 1).padStart(2, "0")}</div>
        <div className="rail-title">{current.title}</div>

        <div className="rail-track">
          {stages.map((s, i) => (
            <div
              key={s.title}
              className={`rail-tick${i === active ? " active" : ""}${i < active ? " done" : ""}`}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <i />
            </div>
          ))}
        </div>
      </div>

      <div>
        {stages.map((s) => (
          <article className="stage-block" key={s.title}>
            <span className="sb-kicker">{s.kicker}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <div className="sb-units" aria-hidden>
              {Array.from({ length: s.units }, (_, u) => (
                <i key={u} className={s.proven ? "proven" : undefined} />
              ))}
              <em>
                {s.units} {s.units === 1 ? "unit" : "units"}
              </em>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
