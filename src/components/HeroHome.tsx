"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useIsoLayoutEffect, prefersReducedMotion } from "@/lib/gsap";
import { PHOTOS } from "@/lib/images";
import Stage from "./Stage";
import Counter from "./motion/Counter";

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
      <Stage photo={PHOTOS.chennai} priority height="94svh">
        <div
          className="page"
          style={{
            minHeight: "94svh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingTop: 100,
            paddingBottom: "clamp(28px, 4vw, 54px)",
          }}
        >
          <div className="index hero-index" style={{ marginBottom: "auto", paddingTop: 20 }}>
            <b>Touchmark</b>
            <span>Nano GCC Hub — Tamil Nadu, India</span>
          </div>

          <h1 className="display d-xl" style={{ maxWidth: "13ch" }}>
            {LINES.map((l) => (
              <span className="hl" key={l.text} style={{ display: "block", overflow: "hidden" }}>
                <span
                  style={{
                    display: "block",
                    fontStyle: l.em ? "italic" : undefined,
                    color: l.em ? "var(--proven)" : undefined,
                  }}
                >
                  {l.text}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="hero-fade"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(20px, 4vw, 60px)",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: "clamp(26px, 4vw, 48px)",
            }}
          >
            <p className="body" style={{ maxWidth: "46ch", fontSize: "1rem" }}>
              Touchmark Nano GCC Hub helps global technology companies build agile capability in
              India — without the cost, complexity or commitment of a traditional Global Capability
              Center.
            </p>

            <div className="acts" style={{ marginTop: 0 }}>
              <Link href="/nano-gcc-model" className="act primary">
                Explore the model
              </Link>
              <Link href="/contact" className="act">
                Partner with us
              </Link>
            </div>
          </div>

          <div className="specs hero-fade" style={{ marginTop: "clamp(30px, 4.5vw, 58px)" }}>
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
