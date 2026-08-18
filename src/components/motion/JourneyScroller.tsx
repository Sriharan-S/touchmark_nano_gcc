"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";

export type JourneyStep = { title: string; body: string; units: number };

/**
 * The five stages plotted along a rail, travelling sideways while the section
 * is pinned. Each stage carries its own unit count, so the same dot vocabulary
 * used elsewhere shows the team growing only at the final, proven stage.
 */
export default function JourneyScroller({ steps }: { steps: JourneyStep[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const rail = railRef.current;
    if (!section || !track || !rail) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        horizontal: "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
        stacked: "(max-width: 760px), (prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { horizontal } = context.conditions as { horizontal: boolean };
        const cards = gsap.utils.toArray<HTMLElement>(".jstep", track);

        if (!horizontal) {
          gsap.from(cards, {
            y: 26,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: { trigger: track, start: "top 84%", once: true },
          });
          gsap.to(rail, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: track, start: "top 70%", end: "bottom 70%", scrub: true },
          });
          cards.forEach((c) => c.classList.add("is-active"));
          return;
        }

        cards[0]?.classList.add("is-active");

        const distance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.14;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              gsap.set(rail, { scaleX: self.progress });
              const i = Math.min(cards.length - 1, Math.floor(self.progress * cards.length + 0.15));
              cards.forEach((c, ci) => c.classList.toggle("is-active", ci === i));
            },
          },
        });

        tl.to(track, { x: () => -distance(), ease: "none" });

        return () => cards.forEach((c) => c.classList.remove("is-active"));
      }
    );

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, []);

  return (
    <section className="journey" ref={sectionRef}>
      <div className="page" style={{ marginBottom: 40 }}>
        <div>
          <div className="index">
            <b>04</b>
            <span>The journey</span>
          </div>
        </div>
        <h2 className="display d-md" style={{ marginTop: 18, maxWidth: "14ch" }}>
          Prove it before you <em>scale</em> it.
        </h2>
      </div>

      <div className="jtrack" ref={trackRef}>
        {steps.map((s, i) => (
          <article
            className={`jstep${i === steps.length - 1 ? " is-final" : ""}`}
            key={s.title}
          >
            <span className="jn">Stage {String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="junits" aria-hidden>
                {Array.from({ length: s.units }, (_, u) => (
                  <i key={u} />
                ))}
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="jrail">
        <i ref={railRef as React.RefObject<HTMLElement>} />
      </div>
    </section>
  );
}
