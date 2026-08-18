"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lede: string;
  note?: { title: string; body: string };
};

/**
 * Type-led page opening on paper.
 *
 * Not every page opens on a photograph — alternating between this and a
 * full-bleed `Stage` is what keeps the set of pages from feeling stamped out.
 */
export default function PageOpen({ index, label, title, lede, note }: Props) {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll(".po-fade"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
        .from(".po-index", { opacity: 0, duration: 0.7 })
        .from(".po-rule", { scaleX: 0, duration: 1.2 }, "-=0.45")
        .from(".po-title", { opacity: 0, y: 26, duration: 1.05 }, "-=1")
        .from(".po-fade", { opacity: 0, y: 18, duration: 0.85, stagger: 0.1 }, "-=0.8");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sec" ref={root} style={{ paddingTop: "clamp(104px, 15vh, 176px)" }}>
      <div className="page">
        <div className="index po-index" style={{ marginBottom: 14 }}>
          <b>{index}</b>
          <span>{label}</span>
        </div>
        <div className="po-rule" style={{ height: 1, background: "var(--rule)", transformOrigin: "left" }} />

        <div className="ed-aside" style={{ marginTop: "clamp(30px, 4.5vw, 60px)", alignItems: "end" }}>
          <h1 className="display d-lg po-title">{title}</h1>
          <div>
            <p className="body po-fade">{lede}</p>
            {note && (
              <div className="marginal po-fade" style={{ marginTop: 24 }}>
                <b>{note.title}</b>
                {note.body}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
