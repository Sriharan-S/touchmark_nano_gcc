import Link from "next/link";

export type Entry = {
  n: string;
  title: string;
  body: string;
  href?: string;
  go?: string;
};

/**
 * An indexed list of entries.
 *
 * Used for enumerated content - capability areas, advisory groups, article
 * pillars. The home page's audience section uses `AudiencePanels` instead,
 * because three equal rows there read like a spreadsheet.
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
