"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  to: number;
  from?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

/** Counts up to a number when it scrolls into view. */
export default function Counter({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const state = { v: from };

    // Counters above the fold are already past their trigger point when the
    // page loads, which left them stuck showing the "from" value. Run those
    // straight away and only use ScrollTrigger for ones further down.
    const inViewOnLoad = el.getBoundingClientRect().top < window.innerHeight;

    const ctx = gsap.context(() => {
      gsap.to(state, {
        v: to,
        duration,
        ease: "power2.out",
        snap: { v: 1 },
        delay: inViewOnLoad ? 0.7 : 0,
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.v)}${suffix}`;
        },
        ...(inViewOnLoad
          ? {}
          : { scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
      });
    }, el);

    return () => ctx.revert();
  }, [to, from, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
}
