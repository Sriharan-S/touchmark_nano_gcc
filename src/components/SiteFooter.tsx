import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/nav";
import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="page">
        <div className="foot-top">
          <div>
            <Link href="/" className="brand foot-brand" aria-label="Touchmark Nano GCC Hub - home">
              <Logo variant="white" />
            </Link>
            <p className="display d-sm" style={{ marginTop: 26 }}>
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
          unDraw's licence asks for nothing, but naming the source is honest and
          costs a line. The disclaimer is gone with the photography it was for -
          the site no longer pictures any real organization.
        */}
        <div className="credits">
          Illustrations from <a href="https://undraw.co">unDraw</a>, recoloured to the Touchmark
          palette. Free for commercial use under the{" "}
          <a href="https://undraw.co/license">unDraw licence</a>.
        </div>

<div className="foot-bot">
          <span>&copy; {new Date().getFullYear()} Touchmark Nano GCC Hub</span>
          <span>Built from Tamil Nadu, for the world</span>
        </div>
      </div>
    </footer>
  );
}
