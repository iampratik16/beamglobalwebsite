"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatCallout } from "@/components/ui/StatCallout";
import { ArrowRight, ChevronDown } from "@/components/ui/icons";
import { positioning } from "@/content/home";

/**
 * Editorial "opportunity" section.
 *
 * Same copy as the content file, word for word — nothing is cut or reworded.
 * Progressive disclosure keeps it scannable: each problem paragraph leads with
 * its first sentence (under a label), and the remaining detail is demoted to
 * lighter grey behind "Read more". The "how we help" points lead with a bolded
 * opening phrase. The collapsed text stays in the page at all times.
 */

// Presentation-only labels (not part of the copy).
const PROBLEM_LABELS = ["The investment", "The gap"];
// Number of opening words to bold per "how we help" point (the action phrase).
const HELP_LEAD_WORDS = [4, 5, 9];

// Split a paragraph into [first sentence, remainder] without losing a word.
function splitLead(text: string): [string, string] {
  const re = /([.!?])\s+(?=[A-Z(])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const pre = text.slice(0, m.index + 1);
    if (/\b(?:e\.g|i\.e|etc|vs)\.$/i.test(pre.trimEnd())) continue;
    return [text.slice(0, m.index + 1).trim(), text.slice(m.index + 1).trim()];
  }
  return [text.trim(), ""];
}

function ProblemCard({ label, body }: { label: string; body: string }) {
  const [open, setOpen] = useState(false);
  const [lead, rest] = splitLead(body);
  return (
    <div className="border-t border-hairline pt-6 first:border-t-0 first:pt-0">
      <p className="font-display text-base font-bold tracking-tight text-ink">
        {label}
      </p>
      <p className="mt-3 text-[1.05rem] leading-relaxed text-text">{lead}</p>
      {rest && (
        <>
          {/* The remainder stays in the DOM; we only toggle its visibility. */}
          <p className={`mt-3 leading-relaxed text-muted ${open ? "block" : "hidden"}`}>
            {rest}
          </p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-ink"
          >
            {open ? "Read less" : "Read more"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </>
      )}
    </div>
  );
}

export function EditorialFeature() {
  return (
    <section className="border-b border-hairline bg-paper-alt">
      <Container className="section-y">
        {/* Intro statement + photo */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <Eyebrow>{positioning.eyebrow}</Eyebrow>
            <p className="mt-6 text-2xl leading-snug text-ink md:text-[1.9rem]">
              {positioning.intro}
            </p>
            <Link
              href="/services"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink"
            >
              See how we help
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-float ring-1 ring-hairline">
            <Image
              src="/images/subhero.png"
              alt="A team reviewing connected governance, risk and compliance data"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          </figure>
        </div>

        {/* What problem are we solving — heading + anchoring stat on the left,
            scannable, progressively disclosed cards on the right. */}
        <div className="mt-16 border-t border-hairline pt-14 lg:mt-20 lg:pt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h3 className="text-h3 text-ink">{positioning.problemHeading}</h3>
              <div className="mt-8">
                <StatCallout figure="20" label="years of rising regulation" />
              </div>
            </div>
            <div className="space-y-6">
              {positioning.problemBody.map((para, i) => (
                <ProblemCard key={i} label={PROBLEM_LABELS[i] ?? ""} body={para} />
              ))}
            </div>
          </div>
        </div>

        {/* How we help — numbered grid; each point leads with a bold phrase */}
        <div className="mt-16 lg:mt-20">
          <p className="text-lg font-semibold text-ink">{positioning.helpIntro}</p>
          <ol className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-3">
            {positioning.helpPoints.map((point, i) => {
              const words = point.split(" ");
              const n = HELP_LEAD_WORDS[i] ?? 1;
              const lead = words.slice(0, n).join(" ");
              const rest = words.slice(n).join(" ");
              return (
                <li key={i} className="border-t-2 border-hairline pt-5">
                  <span className="font-serif text-3xl leading-none text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 leading-relaxed text-muted">
                    <span className="font-semibold text-ink">{lead}</span>
                    {rest ? ` ${rest}` : ""}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
