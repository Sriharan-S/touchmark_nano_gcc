import type { ReactNode } from "react";

export type Clause = {
  /** Heading for the clause. Numbering is generated, not written into the text. */
  title: string;
  body: ReactNode;
};

/**
 * Body layout for the legal pages.
 *
 * Deliberately static - no GSAP. Terms that fade in are terms that can fail to
 * appear, and these two pages have to be readable even if motion never runs.
 * The clause numbers come from a CSS counter so the source stays renumberable.
 */
export default function LegalDoc({ clauses }: { clauses: Clause[] }) {
  return (
    <ol className="legal">
      {clauses.map((c) => (
        <li key={c.title}>
          <h2>{c.title}</h2>
          <div className="legal-body">{c.body}</div>
        </li>
      ))}
    </ol>
  );
}
