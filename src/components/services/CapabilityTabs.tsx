"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import type { Capability } from "@/content/services";

/**
 * Tabbed capabilities (PwC "How we can help" pattern): a tab strip of
 * capability titles with an accent underline on the active tab, and a content
 * panel that reveals the selected capability below. Fully keyboard accessible
 * (roving tabindex + arrow/Home/End nav, ARIA tab roles).
 */
export function CapabilityTabs({ capabilities }: { capabilities: Capability[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (next: number) => {
    const i = (next + capabilities.length) % capabilities.length;
    setActive(i);
    tabs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        move(active + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        move(active - 1);
        break;
      case "Home":
        e.preventDefault();
        move(0);
        break;
      case "End":
        e.preventDefault();
        move(capabilities.length - 1);
        break;
    }
  };

  const cap = capabilities[active];

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label="Capabilities"
        className="flex flex-wrap gap-x-8 gap-y-3 border-b border-hairline"
      >
        {capabilities.map((c, i) => {
          const selected = i === active;
          return (
            <button
              key={c.title}
              role="tab"
              id={`cap-tab-${i}`}
              aria-selected={selected}
              aria-controls="cap-panel"
              tabIndex={selected ? 0 : -1}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={`relative -mb-px pb-4 text-left text-[0.95rem] font-semibold transition-colors duration-200 ${
                selected ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {c.title}
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-px h-px transition-colors duration-200 ${
                  selected ? "bg-accent" : "bg-transparent"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div
        id="cap-panel"
        role="tabpanel"
        aria-labelledby={`cap-tab-${active}`}
        key={active}
        className="tab-in mt-12"
      >
        <span aria-hidden className="mb-6 block h-px w-10 bg-gold" />
        <h3 className="text-h3 text-ink">{cap.title}</h3>
        <p className="mt-5 max-w-2xl text-lead">{cap.description}</p>
        <Link
          href="/contact"
          className="group mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink"
        >
          Talk to our team
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
