"use client";

import { useRef, useState, type FormEvent } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Field =
  | { kind: "text"; name: string; label: string; type?: string; required?: boolean }
  | { kind: "select"; name: string; label: string; options: string[]; required?: boolean }
  | { kind: "textarea"; name: string; label: string; required?: boolean };

type Props = { fields: Field[]; submitLabel: string; successMessage: string };

/**
 * Qualification / interest form.
 *
 * There is no backend wired up yet, so submissions are acknowledged in place.
 * Point the handler at the real endpoint (or a form service) when it exists.
 */
export default function EnquiryForm({ fields, submitLabel, successMessage }: Props) {
  const [sent, setSent] = useState(false);
  const okRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    formRef.current?.reset();

    if (!prefersReducedMotion()) {
      requestAnimationFrame(() => {
        if (okRef.current) {
          gsap.from(okRef.current, { opacity: 0, y: -8, duration: 0.5, ease: "expo.out" });
        }
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {sent && (
        <div className="form-ok" ref={okRef} role="status">
          {successMessage}
        </div>
      )}

      <div className="form-grid">
        {fields.map((f, i) => (
          <div className="field" key={f.name}>
            <label htmlFor={f.name}>
              {String(i + 1).padStart(2, "0")} — {f.label}
            </label>

            {f.kind === "text" && (
              <input id={f.name} name={f.name} type={f.type ?? "text"} required={f.required} />
            )}

            {f.kind === "select" && (
              <select id={f.name} name={f.name} required={f.required} defaultValue="">
                <option value="" disabled>
                  Select an option
                </option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            )}

            {f.kind === "textarea" && <textarea id={f.name} name={f.name} required={f.required} />}
          </div>
        ))}
      </div>

      <div className="acts">
        <button className="act primary" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
