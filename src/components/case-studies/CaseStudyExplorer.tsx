"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { CardGrid } from "@/components/ui/CardGrid";

/** Minimal, serialisable shape the listing grid needs. */
export type CaseStudyCard = {
  slug: string;
  cardTitle: string;
  excerpt: string;
  cardImage: string;
  topic: string;
  industry: string;
  region: string;
};

const ALL = "All";

/**
 * Client-side, filterable "All success stories" grid — mirrors the PwC case
 * studies index (Filter by: Topic / Industry / Region + a live result count).
 * Filters derive from the data, so the bar scales as more studies are added.
 */
export function CaseStudyExplorer({
  items,
  topics,
  industries,
  regions,
}: {
  items: CaseStudyCard[];
  topics: string[];
  industries: string[];
  regions: string[];
}) {
  const [topic, setTopic] = useState(ALL);
  const [industry, setIndustry] = useState(ALL);
  const [region, setRegion] = useState(ALL);

  const filtered = useMemo(
    () =>
      items.filter(
        (c) =>
          (topic === ALL || c.topic === topic) &&
          (industry === ALL || c.industry === industry) &&
          (region === ALL || c.region === region),
      ),
    [items, topic, industry, region],
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="border border-hairline bg-paper-alt p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-6">
          <span className="text-eyebrow text-ink">Filter by</span>
          <FilterSelect label="Topic" value={topic} options={topics} onChange={setTopic} />
          <FilterSelect
            label="Industry"
            value={industry}
            options={industries}
            onChange={setIndustry}
          />
          <FilterSelect label="Region" value={region} options={regions} onChange={setRegion} />
        </div>
      </div>

      <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>

      <div className="mt-6">
        {filtered.length > 0 ? (
          <CardGrid cols={3}>
            {filtered.map((c) => (
              <Card
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                eyebrow={c.industry}
                title={c.cardTitle}
                excerpt={c.excerpt}
                image={c.cardImage}
              />
            ))}
          </CardGrid>
        ) : (
          <p className="border border-hairline bg-paper p-8 text-muted">
            No case studies match those filters yet.{" "}
            <button
              type="button"
              onClick={() => {
                setTopic(ALL);
                setIndustry(ALL);
                setRegion(ALL);
              }}
              className="link-underline font-semibold text-accent"
            >
              Clear filters
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="font-semibold text-ink">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-hairline bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors hover:border-ink/30 focus:border-accent"
        aria-label={`Filter by ${label}`}
      >
        <option value={ALL}>All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
