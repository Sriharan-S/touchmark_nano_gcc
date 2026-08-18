"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Seconds to wait once the trigger fires. */
  delay?: number;
  /** ScrollTrigger start position. */
  start?: string;
};

/**
 * Reveals a heading line by line on scroll.
 *
 * Deliberately NOT using SplitText's `mask` option: the mask wrapper clips at
 * the line box, which cuts the descenders off g, y, j and p. Lines fade and
 * rise instead, so nothing is ever clipped.
 */
export default function AnimatedHeading({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
  start = "top 84%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let ctx: gsap.Context | undefined;
    let split: SplitText | undefined;
    let cancelled = false;

    // Split only once webfonts are in, otherwise the line breaks are wrong.
    document.fonts.ready.then(() => {
      if (cancelled || !ref.current) return;
      ctx = gsap.context(() => {
        split = SplitText.create(el, {
          type: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              y: 26,
              opacity: 0,
              duration: 1,
              ease: "expo.out",
              stagger: 0.085,
              delay,
              scrollTrigger: { trigger: el, start, once: true },
            });
          },
        });
      }, el);
    });

    return () => {
      cancelled = true;
      split?.revert();
      ctx?.revert();
    };
  }, [delay, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
