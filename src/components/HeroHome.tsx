"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import { PHOTOS } from "@/lib/images";
import Stage from "./Stage";
import Counter from "./motion/Counter";
import UnitPulse from "./motion/UnitPulse";

const LINES = [
  { text: "Start small.", em: false },
  { text: "Innovate fast.", em: false },
  { text: "Build from Tamil Nadu.", em: false },
  { text: "Scale globally.", em: true },
];

export default function HeroHome() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll(".hl span, .hero-fade"), { opacity: 1, y: 0, yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.15 })
        .from(".hero-index", { opacity: 0, duration: 0.8 })
        .from(".hl > span", { yPercent: 106, duration: 1.3, stagger: 0.08 }, "-=0.45")
        .from(".hero-fade", { opacity: 0, y: 20, duration: 0.9, stagger: 0.09 }, "-=0.9");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* The stage is exactly one viewport tall and the headline is capped in
          vh as well as vw, so the hero never runs off the bottom of the screen. */}
      <Stage photo={PHOTOS.chennai} priority height="100svh">
        <div className="page hero-inner">
          <div className="index hero-index">
            <b>Touchmark Nano GCC Hub</b>
            <span>Tamil Nadu, India</span>
          </div>

          <h1 className="display d-hero">
            {LINES.map((l) => (
              <span className="hl" key={l.text}>
                <span
                  style={{
                    fontStyle: l.em ? "italic" : undefined,
                    color: l.em ? "var(--proven)" : undefined,
                  }}
                >
                  {l.text}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-foot hero-fade">
            <p className="body hero-copy">
              Touchmark Nano GCC Hub helps global technology companies build agile capability in
              India — without the cost, complexity or commitment of a traditional Global Capability
              Center.
            </p>

            <UnitPulse />

            <div className="acts hero-acts">
              <Link href="/nano-gcc-model" className="act primary">
                Explore the model
              </Link>
              <Link href="/contact" className="act">
                Partner with us
              </Link>
            </div>
          </div>

          <div className="specs hero-fade hero-specs">
            <div className="spec">
              Unit size
              <b>
                <Counter to={5} />–<Counter to={100} duration={2} />
              </b>
            </div>
            <div className="spec">
              Focus
              <b>One goal per unit</b>
            </div>
            <div className="spec">
              Principle
              <b>Agility over scale</b>
            </div>
            <div className="spec">
              Origin
              <b>Tamil Nadu</b>
            </div>
          </div>
        </div>
      </Stage>
    </div>
  );
}
