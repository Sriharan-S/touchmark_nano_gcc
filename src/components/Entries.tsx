import Link from "next/link";

export type Entry = {
  n: string;
  title: string;
  body: string;
  href?: string;
  go?: string;
};

/**
 * An indexed list of entries, replacing the uniform card grid.
 *
 * Rows share a rhythm but the eye reads them as a list rather than a set of
 * identical boxes — which is what made the previous versions feel templated.
 */
export default function Entries({ items }: { items: Entry[] }) {
  return (
    <div className="entries">
      {items.map((it) =>
        it.href ? (
          <Link className="entry" href={it.href} key={it.n}>
            <span className="n">{it.n}</span>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
            <span className="go">{it.go ?? "Read"} &rarr;</span>
          </Link>
        ) : (
          <div className="entry" key={it.n}>
            <span className="n">{it.n}</span>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
            <span />
          </div>
        )
      )}
    </div>
  );
}
