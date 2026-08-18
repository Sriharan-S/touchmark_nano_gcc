"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  index?: string;
  label?: string;
  note?: string;
  tone?: "paper" | "tone" | "ink";
  /** Vertical weight — sections are deliberately not all the same height. */
  size?: "sm" | "md" | "lg";
  rule?: boolean;
  children: ReactNode;
  id?: string;
};

/**
 * A section. The index marker and hairline are optional, and the vertical
 * weight varies by importance — uniform section heights are what made the
 * earlier layout read as generic.
 */
export default function Section({
  index,
  label,
  note,
  tone = "paper",
  size = "md",
  rule = true,
  children,
  id,
}: Props) {
  const ruleRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ruleRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 94%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const sizeClass = size === "sm" ? "sec-sm" : size === "lg" ? "sec-lg" : "";

  return (
    <section
      id={id}
      className={`sec ${sizeClass}${tone === "ink" ? " on-ink" : tone === "tone" ? " tone" : ""}`}
    >
      <div className="page">
        {rule && <div className="hr" ref={ruleRef} />}
        {(index || label || note) && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 20,
              padding: "14px 0 clamp(30px, 4.5vw, 62px)",
            }}
          >
            <div className="index">
              {index && <b>{index}</b>}
              {label && <span>{label}</span>}
            </div>
            {note && (
              <div
                className="index sec-note"
                style={{ textAlign: "right", justifyContent: "flex-end" }}
              >
                {note}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
