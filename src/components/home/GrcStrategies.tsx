"use client";

import { useState, type ComponentType } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ChevronDown } from "@/components/ui/icons";

/**
 * "Five strategies to maximise your GRC value" — a single-open accordion laid
 * out as a staggered two-column grid on large screens, one column below. Built
 * with the site's own tokens (accent crimson, paper-alt, hairline, muted) so it
 * matches the rest of the page. Collapsed by default and whitespace-heavy.
 */

// Thin-stroke Lucide-style icons (the shared set has no business glyphs).
const ICLS = "h-5 w-5 shrink-0";
function ISettings() {
  return (
    <svg className={ICLS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}
function ILink() {
  return (
    <svg className={ICLS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function ITrend() {
  return (
    <svg className={ICLS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}
function IPuzzle() {
  return (
    <svg className={ICLS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 19.61a1 1 0 0 1-1.414 0 2.5 2.5 0 1 0-3.414 3.414 1 1 0 0 1 0 1.414l-.707.707M9.39 4.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68L3.487 10.293a2.414 2.414 0 0 0 0 3.414" />
    </svg>
  );
}
function IBar() {
  return (
    <svg className={ICLS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

type Point = { lead: string; text?: string; chips?: string[] };
type Strategy = {
  num: string;
  Icon: ComponentType;
  title: string;
  teaser: string;
  points: Point[];
};

const STRATEGIES: Strategy[] = [
  {
    num: "01",
    Icon: ISettings,
    title: "Automate Controls & Evidence",
    teaser: "Cut manual work and accelerate audits.",
    points: [
      { lead: "Reduce manual labour", text: "auto-collect audit evidence across IT, HR and cloud." },
      { lead: "Speed up audits", text: "automated testing cuts control-review hours." },
    ],
  },
  {
    num: "02",
    Icon: ILink,
    title: "Integrate Across Departments",
    teaser: "Unify security, IT, finance and legal data.",
    points: [
      { lead: "Break down silos", text: "one centralised GRC dashboard." },
      { lead: "Eliminate redundant tasks", text: "streamlined control mapping, less licensing overhead." },
    ],
  },
  {
    num: "03",
    Icon: ITrend,
    title: "Shift to Predictive Risk",
    teaser: "Move from reactive to forward-looking.",
    points: [
      { lead: "Monetise risk mitigation", text: "quantify the cost of avoided incidents." },
      { lead: "Reduce bottom-line costs", text: "lower insurance premiums and avoid fines." },
    ],
  },
  {
    num: "04",
    Icon: IPuzzle,
    title: "Leverage Standard Frameworks",
    teaser: "Faster time-to-value with pre-built templates.",
    points: [
      { lead: "Pre-built templates", chips: ["SOC 2", "ISO 27001", "GDPR"] },
      { lead: "Seamless API connections", text: "integrate IAM, CRM and ERP; catch compliance drift early." },
    ],
  },
  {
    num: "05",
    Icon: IBar,
    title: "Measure & Communicate Value",
    teaser: "Prove impact to executive stakeholders.",
    points: [
      { lead: "Track the right metrics", text: "audit hours saved, incidents prevented, fines avoided." },
      { lead: "Focus on agility", text: "faster rollouts, quicker vendor onboarding, better collaboration." },
    ],
  },
];

function StrategyItem({
  s,
  active,
  onToggle,
}: {
  s: Strategy;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border-b border-hairline transition-shadow duration-200 ${
        active
          ? "border-l-[3px] border-l-accent bg-paper shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={active}
        aria-controls={`strategy-panel-${s.num}`}
        className="flex w-full items-center gap-4 py-5 pl-4 pr-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper-alt"
      >
        <span
          className={`font-serif text-[2rem] font-bold leading-none ${
            active
              ? "text-accent"
              : "text-transparent [-webkit-text-stroke:1.5px_var(--color-accent)]"
          }`}
        >
          {s.num}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className={active ? "text-accent" : "text-muted"}>
              <s.Icon />
            </span>
            <span className="font-display font-bold tracking-tight text-ink">
              {s.title}
            </span>
          </span>
          <span className="mt-1 block text-sm text-muted">{s.teaser}</span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
            active ? "rotate-180 text-accent" : "text-muted"
          }`}
        />
      </button>

      <div
        id={`strategy-panel-${s.num}`}
        role="region"
        className={`overflow-hidden transition-[max-height,opacity] duration-[250ms] ease-out ${
          active ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-3 pb-6 pl-4 pr-3 pt-1">
          {s.points.map((p, j) => (
            <li
              key={j}
              className="border-l border-hairline pl-4 text-[0.95rem] leading-relaxed"
            >
              <span className="font-semibold text-ink">{p.lead}:</span>{" "}
              {p.chips ? (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {p.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
                    >
                      {c}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-muted">{p.text}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function GrcStrategies() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen((cur) => (cur === i ? null : i));

  // Two columns: 01-03 left, 04-05 offset down on the right (staggered on
  // desktop). Keeping them in order means a single column reads 01-05 on mobile.
  const left = [0, 1, 2];
  const right = [3, 4];

  return (
    <div>
      <Eyebrow>Get the most from your GRC</Eyebrow>
      <h3 className="text-h3 mt-4 max-w-2xl text-ink">
        Five strategies to maximise your GRC value
      </h3>
      <p className="mt-3 max-w-2xl text-muted">
        Practical ways to turn your GRC investment into measurable business
        outcomes.
      </p>

      <div className="mt-10 lg:grid lg:grid-cols-2 lg:gap-x-12">
        <div className="border-t border-hairline">
          {left.map((i) => (
            <StrategyItem
              key={i}
              s={STRATEGIES[i]}
              active={open === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
        <div className="border-t border-hairline lg:mt-16">
          {right.map((i) => (
            <StrategyItem
              key={i}
              s={STRATEGIES[i]}
              active={open === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
