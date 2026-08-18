"use client";

import { useRef } from "react";
import { gsap, SplitText, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";

type Props = { children: string; mark?: string; onInk?: boolean };

/**
 * A statement that breaks the measure and inks in word by word as it passes.
 * Reserved for the lines carrying the core argument.
 */
export default function PullQuote({ children, mark, onInk = false }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let ctx: gsap.Context | undefined;
    let split: SplitText | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled || !ref.current) return;
      ctx = gsap.context(() => {
        split = SplitText.create(el, {
          type: "words",
          wordsClass: "scrub-word",
          autoSplit: true,
          onSplit(self) {
            return gsap.to(self.words, {
              color: onInk ? "#F0EDE5" : "var(--ink)",
              stagger: 0.25,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: 0.6 },
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
  }, [onInk]);

  return (
    <div>
      {mark && <span className="pull-mark">{mark}</span>}
      <p className="pull" ref={ref}>
        {children}
      </p>
    </div>
  );
}
