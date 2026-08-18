"use client";

import { useState } from "react";

const MIN = 5;
const MAX = 100;
const PRESETS = [5, 15, 40, 100];

/**
 * Size a Nano GCC and watch what changes.
 *
 * The document's central claim is that the unit is sized to the goal, 5 to 100,
 * and that commitment and evidence move in opposite directions. Rather than
 * asserting that in prose, this lets the reader drag the number and see the
 * shape of the unit, what it is good for, and the trade-off it carries.
 */
const SHAPES = [
  {
    max: 12,
    shape: "Prototype squad",
    note: "Enough to test one idea properly. Cheap to start, cheap to stop, and you learn whether the thing works before anyone writes a business case.",
  },
  {
    max: 30,
    shape: "Product pod",
    note: "Enough to build and validate a product line end to end, while the cost of changing direction is still small.",
  },
  {
    max: 60,
    shape: "Capability unit",
    note: "A standing team with its own delivery rhythm. You are past proving the idea and into building the capability around it.",
  },
  {
    max: MAX,
    shape: "Scaled unit",
    note: "A capability center in all but name — reached by growing into it on evidence, not by committing to it on day one.",
  },
];

function shapeFor(n: number) {
  return SHAPES.find((s) => n <= s.max) ?? SHAPES[SHAPES.length - 1];
}

export default function ScaleSimulator() {
  const [size, setSize] = useState(5);
  const { shape, note } = shapeFor(size);

  // Commitment climbs with headcount; the speed at which you get a first
  // answer falls away as the unit grows.
  const commitment = (size - MIN) / (MAX - MIN);
  const speed = 1 - commitment * 0.82;

  return (
    <div className="sim">
      <div>
        <div className="sim-readout">
          <span className="sim-num">{size}</span>
          <span className="sim-unit">professionals</span>
        </div>

        <div className="sim-shape">{shape}</div>
        <p className="sim-note">{note}</p>

        <div className="sim-slider">
          <label htmlFor="sim-range" style={{ position: "absolute", left: -9999 }}>
            Nano GCC team size
          </label>
          <input
            id="sim-range"
            type="range"
            min={MIN}
            max={MAX}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <div className="sim-scale">
            <span>5 — start here</span>
            <span>100 — only once proven</span>
          </div>
        </div>

        <div className="sim-presets">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              className="sim-preset"
              aria-pressed={size === p}
              onClick={() => setSize(p)}
            >
              {p} people
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="sim-field" aria-hidden>
          {Array.from({ length: MAX }, (_, i) => (
            <span
              key={i}
              className={`sim-dot${i < size ? " on" : ""}${i < MIN ? " seed" : ""}`}
            />
          ))}
        </div>

        <div className="sim-meters">
          <div className="meter-row">
            <span>Commitment</span>
            <span className="meter commit">
              <i style={{ transform: `scaleX(${0.08 + commitment * 0.92})` }} />
            </span>
            <span className="meter-val">{Math.round((0.08 + commitment * 0.92) * 100)}%</span>
          </div>
          <div className="meter-row">
            <span>Speed to first answer</span>
            <span className="meter evidence">
              <i style={{ transform: `scaleX(${speed})` }} />
            </span>
            <span className="meter-val">{Math.round(speed * 100)}%</span>
          </div>
        </div>

        <p className="body" style={{ marginTop: 22, fontSize: "0.88rem", maxWidth: "48ch" }}>
          Every Nano GCC is scoped in a conversation, not from a slider — but the
          trade-off it shows is the real one.
        </p>
      </div>
    </div>
  );
}
