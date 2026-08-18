# Touchmark Nano GCC Hub — website

Next.js (App Router) + TypeScript, statically exported. Scroll motion is GSAP
(ScrollTrigger + SplitText) with Lenis driving smooth scrolling.

    npm run dev        # dev server
    npm run build      # static export to ./out
    npm run typecheck  # tsc --noEmit

Every route prerenders to plain HTML in `out/`.

## Deployment

Vercel, from `main`. `next.config.ts` uses `output: "export"` and the site is
served from the domain root, so there is no `basePath` — if it is ever hosted
under a subpath, image `src` values in `src/lib/images.ts` need prefixing too,
because Next does not rewrite plain `<img src>`.

## Design

**Typography** is Fraunces (display, 500/600) + Inter (body and labels) — the
pairing from the original HTML version. Labels are Inter uppercase at weight
700; there is no monospace. The `--mono` variable keeps its name so existing
call sites work, but it points at Inter.

The palette is warm
paper `#F0EDE5` and ink `#0E1A24`, with two signal colours that mean one thing
each and are used nowhere else:

    --seed   #0F8F8F   the starting unit / active stage
    --proven #E29A2C   capability added once the model is proven

**The layout is editorial.** Full-bleed photography, uneven column widths, pull
quotes that break the measure, and section shapes that deliberately differ from
one another. The specific things that made earlier drafts read as generic —
uniform card grids, identical section heights, identical fade-ins on everything,
and no photography at all — are gone.

Section arrangements (`globals.css`):

| Class       | Shape                                          |
| ----------- | ---------------------------------------------- |
| `.ed-note`  | narrow lead column + wide text column          |
| `.ed-aside` | wide text + narrow margin note                 |
| `.ed-tall`  | text beside a tall portrait image (uneven)     |
| `.ed-split` | two unequal text columns                       |

Vertical weight varies too: `<Section size="sm|md|lg">`. Pages alternate between
opening on a photograph (`Stage`) and opening on type (`PageOpen`) so the set
does not feel stamped out.

## Photography

Real photographs of Chennai and Tamil Nadu, not stock offices. Files are in
`public/img`, and every one is declared in `src/lib/images.ts` with its credit.

All are freely licensed from Wikimedia Commons (CC BY / CC BY-SA). **CC BY-SA
requires attribution**, so the footer renders the full credit list — do not
remove it. Originals were 9.5 MB total; they ship at 1.8 MB (2000px, q80).

The footer also carries a disclaimer that matters legally and editorially:
the photographs show Tamil Nadu's public landmarks and institutional landscape
and **do not indicate that any pictured organization is a partner**. Captions
are written to hold that line. If Touchmark does formalize a relationship with a
pictured institution, update the caption — don't imply it earlier.

## Components

    src/components/          Stage, PageOpen, Section, Figure, Entries, PullQuote,
                             Datasheet, header, footer, forms
    src/components/motion/   AnimatedHeading, Reveal, UnitDots, Counter,
                             Marquee, JourneyScroller
    src/lib/images.ts        photo manifest + credits
    src/lib/nav.ts           navigation structure
    src/lib/gsap.ts          plugin registration + reduced-motion helper

`UnitDots` is the brand motif: 100 dots, 5 teal seed, the rest filling amber on
scroll. `JourneyScroller` pins and moves the five stages sideways, each carrying
its own unit count so the team visibly grows only at the proven stage.

Every motion primitive checks `prefers-reduced-motion` and renders static.

### Journey sizing

`.jstep` is sized in `vw`, not px, so the track stays ~1.7x the viewport. A fixed
px width collapsed the horizontal travel to nothing on wide displays.

## Content rules encoded in the build

From `docs/Touchmark_Website_Copy_v2.docx`:

- Partners: categories and status only. No names, no counts, no
  company-to-benefit pairings.
- The Government & Policy Liaison group stays unpublished until formalized
  (see `src/app/ecosystem/team/page.tsx`).
- Team groups read as strategic oversight; no sourcing or delivery staff.
- Success stories stay anonymized and relative.

## Not wired up yet

- **Forms** acknowledge in place; no backend. See `EnquiryForm.tsx`.
- **Brochure buttons** point at `/contact` — no PDFs exist yet.
- **Tamil-language toggle** is scoped as a v2 addition in the source document.

## Scaling and responsiveness

The root font size scales with the viewport
(`clamp(16px, 0.3125vw + 12px, 20px)`), so everything sized in rem grows on
large displays instead of stranding the page mid-screen. The container is
`min(1920px, 94vw)`.

Breakpoints: 1080px nav collapses to a menu, 900px editorial columns stack,
760px the journey stacks, 700px and 420px mobile refinements.

Verified at 390px and 768px by rendering the site inside an iframe of that
width — an iframe gets its own viewport, so media queries evaluate correctly.
The test browser itself could not be resized. No horizontal overflow at 390px.

**Descenders:** headings must never sit inside an unpadded `overflow: hidden`
wrapper. Fraunces has deep descenders and SplitText's `mask` option clips at the
line box, cutting g, y and j. `AnimatedHeading` therefore fades lines up instead
of masking them, and the hero's `.hl` mask carries `padding-bottom` so the clip
region includes the descenders.

If the dev server ever serves a page with no CSS, its cache is stale: stop it,
`rm -rf .next`, and restart.

`legacy-static/` holds the original hand-written HTML version.
