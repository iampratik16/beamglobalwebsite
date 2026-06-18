/**
 * Deterministic tonal placeholder media. Flat solid fills seeded from a
 * string — stable across renders, no hydration mismatch.
 *
 * TODO: swap for real next/image artwork when brand photography is supplied.
 */

type Tone = "ink" | "crimson" | "slate" | "warm";

const fills: Record<Tone, string> = {
  ink: "#1b2027",
  crimson: "#7c1616",
  slate: "#2b3742",
  warm: "#3a322b",
};

const tones: Tone[] = ["ink", "crimson", "slate", "warm"];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function PlaceholderMedia({
  seed,
  label,
  tone,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  seed: string;
  label?: string;
  tone?: Tone;
  className?: string;
  aspect?: string;
}) {
  const h = hash(seed);
  const chosen = tone ?? tones[h % tones.length];
  const fill = fills[chosen];

  return (
    <div
      className={`relative ${aspect} ${className}`}
      style={{ backgroundColor: fill }}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {label && (
        <span className="absolute bottom-4 left-4 font-display text-sm font-semibold uppercase tracking-wider text-paper/80">
          {label}
        </span>
      )}
    </div>
  );
}
