"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Animate the direct children in sequence instead of the wrapper itself. */
  stagger?: boolean;
  delay?: number;
  y?: number;
  start?: string;
};

/** Fade-and-rise on scroll, optionally staggering its direct children. */
export default function Reveal({
  as: Tag = "div",
  children,
  className,
  style,
  stagger = false,
  delay = 0,
  y = 28,
  start = "top 86%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(stagger ? Array.from(el.children) : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        delay,
        stagger: stagger ? 0.11 : 0,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, y, start]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
