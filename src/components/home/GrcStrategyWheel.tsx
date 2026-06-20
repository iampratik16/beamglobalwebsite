"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Interactive "pick a focus area" wheel for GRC Strategy Services, modelled on
 * the PwC C-suite wheel: an SVG of three wedges that light up on hover / focus /
 * tap (soft crimson fill + bold crimson stroke), a static centre hub, and a
 * right column whose serif heading and bullet list reflect the active wedge.
 *
 * Wedge geometry: a 400×400 circle (centre 200,200, r 190) split into three
 * 120° slices; a 70px hub circle drawn on top reads as the recessed centre.
 * Labels are an overlay with pointer-events-none so they never block a wedge.
 */

type Segment = {
  short: string;
  title: string;
  points: string[];
  /** SVG wedge path. */
  path: string;
  /** Label position as a percentage of the wheel box. */
  label: { x: number; y: number };
};

const SEGMENTS: Segment[] = [
  {
    short: "GRC Strategy",
    title: "GRC Strategy",
    points: ["GRC software selection", "Business case for GRC products"],
    path: "M200,200 L200,10 A190,190 0 0,1 364.5,295 Z",
    label: { x: 75, y: 35 },
  },
  {
    short: "Controls Automation",
    title: "Opportunities for controls automation",
    points: [
      "Is the GRC software being utilised effectively?",
      "Can control execution be automated using GRC tools?",
    ],
    path: "M200,200 L364.5,295 A190,190 0 0,1 35.5,295 Z",
    label: { x: 50, y: 80 },
  },
  {
    short: "Remediation Strategy",
    title: "Remediation Strategy",
    points: ["Remediation of audit findings"],
    path: "M200,200 L35.5,295 A190,190 0 0,1 200,10 Z",
    label: { x: 25, y: 35 },
  },
];

export function GrcStrategyWheel() {
  const [active, setActive] = useState(0);
  const current = SEGMENTS[active];

  return (
    <section className="section-y border-t border-hairline bg-paper-alt">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: the interactive wheel */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <svg
              viewBox="0 0 400 400"
              className="w-full"
              role="group"
              aria-label="GRC strategy focus areas"
            >
              {SEGMENTS.map((seg, i) => {
                const on = i === active;
                return (
                  <path
                    key={seg.short}
                    d={seg.path}
                    role="button"
                    tabIndex={0}
                    aria-pressed={on}
                    aria-label={seg.title}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(i);
                      }
                    }}
                    className={`cursor-pointer outline-none transition-all duration-200 motion-reduce:transition-none ${
                      on
                        ? "fill-[var(--color-accent-soft)] stroke-[var(--color-accent)] [stroke-width:3]"
                        : "fill-[var(--color-paper)] stroke-[var(--color-hairline)] [stroke-width:1]"
                    }`}
                  />
                );
              })}
              {/* Centre hub — static anchor, drawn on top of the wedge points. */}
              <circle
                cx="200"
                cy="200"
                r="70"
                className="fill-[var(--color-paper-alt)] stroke-[var(--color-hairline)] [stroke-width:1]"
              />
            </svg>

            {/* Labels + centre prompt overlay (never intercept wedge hover). */}
            <div className="pointer-events-none absolute inset-0">
              {SEGMENTS.map((seg, i) => (
                <span
                  key={seg.short}
                  style={{ left: `${seg.label.x}%`, top: `${seg.label.y}%` }}
                  className={`absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center text-[0.8rem] font-semibold leading-tight transition-colors duration-200 ${
                    i === active ? "text-accent" : "text-ink"
                  }`}
                >
                  {seg.short}
                </span>
              ))}
              <span className="absolute left-1/2 top-1/2 w-[7.5rem] -translate-x-1/2 -translate-y-1/2 text-center text-xs leading-snug text-muted">
                <span className="block font-bold text-accent">Pick a focus area</span>
                to explore our GRC strategy
              </span>
            </div>
          </div>

          {/* Right: serif heading + the active wedge's detail */}
          <div>
            <Eyebrow>GRC Strategy Services</Eyebrow>
            <h2 className="text-display-serif mt-5 text-ink">
              A clear roadmap for risk and compliance.
            </h2>
            <div
              key={active}
              className="tab-in mt-8 pl-5 shadow-[inset_2px_0_0_0_var(--color-accent)]"
            >
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                {current.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {current.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-muted">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/services/grc-strategy-services"
              className="group mt-10 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink"
            >
              Explore GRC Strategy Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
