import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/nav";
import { ALL_PHOTOS } from "@/lib/images";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="page">
        <div className="foot-top">
          <div>
            <p className="display d-sm" style={{ color: "var(--paper)" }}>
              Start small.
              <br />
              Innovate fast.
              <br />
              Build from Tamil&nbsp;Nadu.
              <br />
              <em style={{ fontStyle: "italic", color: "var(--proven)" }}>Scale globally.</em>
            </p>
          </div>

          <div className="foot-cols">
            <div>
              <h4>Explore</h4>
              {FOOTER_LINKS.explore.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <h4>Engage</h4>
              {FOOTER_LINKS.engage.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <h4>Ecosystem</h4>
              {FOOTER_LINKS.ecosystem.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/*
          CC BY and CC BY-SA require attribution, so the credits are part of the
          page rather than a buried file. The disclaimer matters: these are
          photographs of public landmarks, not of partner organizations.
        */}
        <div className="credits">
          <div style={{ marginBottom: 8 }}>
            Photography depicts Tamil Nadu&rsquo;s public landmarks and institutional landscape. It
            does not indicate that any pictured organization is a partner of Touchmark.
          </div>
          {ALL_PHOTOS.map((p) => (
            <div key={p.src}>
              {p.caption} — <a href={p.sourceUrl}>{p.credit}</a>, via Wikimedia Commons,{" "}
              <a href={p.licenceUrl}>{p.licence}</a>
            </div>
          ))}
        </div>

        <div className="foot-bot">
          <span>&copy; {new Date().getFullYear()} Touchmark Nano GCC Hub</span>
          <span>Built from Tamil Nadu, for the world</span>
        </div>
      </div>
    </footer>
  );
}
