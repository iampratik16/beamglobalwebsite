import { PlaceholderMedia } from "./PlaceholderMedia";

export type Pillar = {
  name: string;
  tagline: string;
};

/** Three-up culture pillars: image + label + one-line. */
export function PillarFeature({ pillars }: { pillars: Pillar[] }) {
  return (
    <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-3">
      {pillars.map((pillar, i) => (
        <article key={pillar.name} className="group bg-paper">
          <div className="card-media overflow-hidden">
            <PlaceholderMedia
              seed={pillar.name}
              tone={i === 1 ? "crimson" : i === 0 ? "ink" : "slate"}
              aspect="aspect-[5/4]"
            />
          </div>
          <div className="p-7 lg:p-8">
            <p className="mb-1 font-display text-sm font-semibold uppercase tracking-wider text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
              {pillar.name}
            </h3>
            <p className="mt-3 text-muted">{pillar.tagline}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
