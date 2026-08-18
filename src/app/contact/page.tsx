import type { Metadata } from "next";
import Link from "next/link";
import PageOpen from "@/components/PageOpen";
import Section from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import AnimatedHeading from "@/components/motion/AnimatedHeading";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Touchmark Nano GCC Hub. A short qualification form for companies, institutions and talent.",
};

export default function ContactPage() {
  return (
    <>
      <PageOpen
        index="10"
        label="Contact & Engage"
        title={<>Start a <em>conversation</em>.</>}
        lede="Tell us who you are and what you're trying to build. We'll come back with what's realistic — commercial models, partners and delivery detail are discussed directly rather than published."
        note={{
          title: "Why a form, not an inbox",
          body: "This is a short qualification form. It keeps the mechanism out of public copy while still opening the door.",
        }}
      />

      <Section index="11" label="Qualification" note="Reveal the opportunity, protect the mechanism">
        <div className="ed-split">
        <div>
          <AnimatedHeading as="h2" className="display d-md">
            Reveal the opportunity, protect the <em>mechanism</em>.
          </AnimatedHeading>

          <Reveal>
            <p className="body" style={{ marginTop: 24 }}>
              We keep operational detail — sourcing, mapping and delivery mechanics — out of public
              copy. It&rsquo;s shared in qualified conversations instead.
            </p>
          </Reveal>

          {/*
            Each <li> is a two-column grid (counter + content), so everything
            after the counter has to sit inside a single element.
          */}
          <Reveal as="ol" className="elist" stagger style={{ marginTop: 30 }}>
            <li>
              <span>
                <strong>Companies</strong> — tell us the capability goal you want to test.
              </span>
            </li>
            <li>
              <span>
                <strong>Institutions</strong> — tell us your strengths and current industry
                engagement.
              </span>
            </li>
            <li>
              <span>
                <strong>Talent</strong> —{" "}
                <Link href="/careers" style={{ borderBottom: "1px solid currentColor" }}>
                  register your interest here
                </Link>
                .
              </span>
            </li>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <EnquiryForm
              submitLabel="Submit & start a conversation"
              successMessage="Received. We'll be in touch shortly to start the conversation."
              fields={[
                { kind: "text", name: "name", label: "Name", required: true },
                { kind: "text", name: "organization", label: "Organization", required: true },
                { kind: "text", name: "email", label: "Email", type: "email", required: true },
                {
                  kind: "select",
                  name: "type",
                  label: "Type",
                  required: true,
                  options: ["Company", "Institution", "Talent"],
                },
                {
                  kind: "select",
                  name: "interest",
                  label: "Area of interest",
                  required: true,
                  options: [
                    "AI deployment & engineering",
                    "Product engineering & R&D",
                    "Deep-tech development",
                    "Rapid prototyping & validation",
                    "Technology support functions",
                    "Institution membership",
                    "Other",
                  ],
                },
                { kind: "textarea", name: "message", label: "Message" },
              ]}
            />
          </Reveal>
        </div>
        </div>
      </Section>
    </>
  );
}
