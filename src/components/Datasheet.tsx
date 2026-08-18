import type { ReactNode } from "react";
import Reveal from "./motion/Reveal";

export type Row = { k: string; v: ReactNode; m?: string };

/** Key/value specification rows - the site reads as a datasheet, not a brochure. */
export default function Datasheet({ rows }: { rows: Row[] }) {
  return (
    <Reveal className="datasheet" stagger>
      {rows.map((r, i) => (
        <div className="drow" key={`${r.k}-${i}`}>
          <span className="k">{r.k}</span>
          <span className="v">{r.v}</span>
          {r.m && <span className="m">{r.m}</span>}
        </div>
      ))}
    </Reveal>
  );
}
