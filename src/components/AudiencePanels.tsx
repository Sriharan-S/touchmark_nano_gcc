"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Photo } from "@/lib/images";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

export type Panel = {
  n: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  photo: Photo;
};

/**
 * The three routes into the ecosystem, as photographic panels.
 *
 * Replaces the row-and-column list that read like a spreadsheet. Each audience
 * gets its own image so the section is scanned visually rather than read as a
 * table, and the panels stagger in on scroll.
 */
export default function AudiencePanels({ items }: { items: Panel[] }) {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".panel"), {
        y: 34,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 84%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="panels" ref={root}>
      {items.map((it) => (
        <Link className="panel" href={it.href} key={it.n}>
          <div className="panel-img">
            <img src={it.photo.src} alt={it.photo.alt} loading="lazy" decoding="async" />
            <span className="panel-n">{it.n}</span>
          </div>
          <div className="panel-body">
            <h3 className="display d-sm">{it.title}</h3>
            <p>{it.body}</p>
            <span className="panel-cta">
              {it.cta}
              <i aria-hidden>&rarr;</i>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
