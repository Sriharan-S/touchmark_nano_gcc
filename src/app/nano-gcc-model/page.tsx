import type { Metadata } from "next";
import Link from "next/link";
import PageOpen from "@/components/PageOpen";
import Section from "@/components/Section";
import Datasheet from "@/components/Datasheet";
import PullQuote from "@/components/PullQuote";
import AnimatedHeading from "@/components/motion/AnimatedHeading";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import UnitDots from "@/components/motion/UnitDots";
import Entries from "@/components/Entries";
import JourneyScroller, { type JourneyStep } from "@/components/motion/JourneyScroller";

export const metadata: Metadata = {
  title: "The Nano GCC Model",
  description:
    "Big GCC thinking, nano-sized starting point. Start with a focused team of 5 to 100 professionals, prove the business case, and scale progressively.",
};

/** Unit counts climb only at the final, proven stage — the dots tell that story. */
const STEPS: JourneyStep[] = [
  { title: "Rapid Innovation", body: "Begin with a focused idea and a team sized to test it.", units: 3 },
  { title: "Quick Prototyping", body: "Get to something real fast, while the cost of being wrong is still small.", units: 4 },
  { title: "Validation", body: "Find out whether the idea holds up before the investment case is written.", units: 5 },
  { title: "Faster GTM", body: "Move a proven concept toward market without waiting on a full build-out.", units: 6 },
  { title: "Scale When Proven", body: "Grow the unit on evidence — or change direction without carrying a large cost structure.", units: 10 },
];

export default function ModelPage() {
  return (
    <>
      <PageOpen
        index="03"
        label="The Nano GCC Model"
        title={
          <>
            Big GCC thinking. <em>Nano-sized</em> starting point.
          </>
        }
        lede="You don't need hundreds of employees and a major infrastructure investment to begin building capability in India. Start with a focused team, prove the business case, and scale progressively."
        note={{
          title: "Unit size",
          body: "Typically 5 to 100 professionals, sized to the requirement — never to a template.",
        }}
      />

      <Section index="04" label="What you can build" note="Capability areas">
        <div className="ed-note">
          <p className="lead">Shaped around your goal, not a template.</p>
          <div className="hang">
            <Datasheet
              rows={[
                { k: "01", v: "AI deployment and engineering teams", m: "Engineering" },
                { k: "02", v: "Product engineering and R&D pods", m: "Product" },
                { k: "03", v: "Deep-tech development capability", m: "Deep-tech" },
                { k: "04", v: "Rapid prototyping and market validation squads", m: "Validation" },
                { k: "05", v: "Technology support functions", m: "Support" },
                { k: "06", v: "Selected back-office and operational capability", m: "Operations" },
              ]}
            />
          </div>
        </div>
      </Section>

      <JourneyScroller steps={STEPS} />

      <Section index="05" label="Succeed or exit" note="Either outcome stays cheap" size="lg">
        <PullQuote mark="The point of starting small">
          If it succeeds you scale it. If it doesn&rsquo;t, you change direction — without carrying
          the cost structure of a conventional setup.
        </PullQuote>
        <div className="ed-aside" style={{ marginTop: "clamp(40px, 6vw, 84px)" }}>
          <p className="body-lg measure">
            Over time, a single successful Nano GCC can grow into a larger capability center, or you
            can run multiple Nano GCC units across different goals.
          </p>
          <div className="marginal">
            <b>Scale is an outcome</b>
            Not a starting condition, and not a commitment made before the evidence exists.
          </div>
        </div>
      </Section>

      <Section index="06" label="Why Nano GCC" note="Cost / speed / risk" tone="tone">
        <Entries
          items={[
            {
              n: "Cost",
              title: "Lower commitment while you experiment",
              body: "Test the idea without funding a full-scale center first.",
            },
            {
              n: "Speed",
              title: "Faster access to curated capability",
              body: "The ecosystem is already mapped — you don't start from zero.",
            },
            {
              n: "Risk",
              title: "Validate before you scale the investment",
              body: "Scale on evidence, not on an upfront bet.",
            },
          ]}
        />
      </Section>

      <Section index="07" label="Five to one hundred" note="1 dot = 1 professional" tone="ink">
        <div className="ed-split">
          <div>
            <AnimatedHeading as="h2" className="display d-md">
              One unit. One goal. Scale only on <em>evidence</em>.
            </AnimatedHeading>
            <div className="spec" style={{ marginTop: 30, maxWidth: 220 }}>
              Unit size
              <b>
                <Counter to={5} />–<Counter to={100} duration={2} />
              </b>
            </div>
          </div>
          <Reveal>
            <UnitDots total={100} seed={5} />
          </Reveal>
        </div>
      </Section>

      <Section index="08" label="Engage" size="lg" rule={false}>
        <AnimatedHeading as="h2" className="display d-lg">
          Take the model with <em>you</em>.
        </AnimatedHeading>
        <Reveal className="acts">
          <Link href="/contact" className="act primary">
            Download the Nano GCC brochure
          </Link>
          <Link href="/for-companies" className="act">
            For companies
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
