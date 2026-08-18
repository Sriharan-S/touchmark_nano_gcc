"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export type Faq = { q: string; a: ReactNode };

function Row({ faq, index }: { faq: Faq; index: number }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const id = `q-${index}`;

  const toggle = () => {
    const el = panel.current;
    if (!el) return;
    const next = !open;
    setOpen(next);

    if (prefersReducedMotion()) {
      gsap.set(el, { height: next ? "auto" : 0 });
      return;
    }
    gsap.to(el, { height: next ? "auto" : 0, duration: 0.55, ease: "expo.out" });
  };

  return (
    <div className={`irow${open ? " open" : ""}`}>
      <button className="irow-q" type="button" onClick={toggle} aria-expanded={open} aria-controls={id}>
        <span className="k">{String(index + 1).padStart(2, "0")}</span>
        <span className="q">{faq.q}</span>
        <span className="s" aria-hidden>+</span>
      </button>
      <div className="irow-a" id={id} ref={panel} role="region">
        <div>{faq.a}</div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="ilist">
      {items.map((faq, i) => (
        <Row key={faq.q} faq={faq} index={i} />
      ))}
    </div>
  );
}
