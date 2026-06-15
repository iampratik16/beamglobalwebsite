/**
 * Deterministic tonal placeholder media. Renders a premium gradient block
 * (no external image, no hotlinking) seeded from a string so each card is
 * stable across renders — avoids hydration mismatch (no Math.random/Date).
 *
 * TODO: swap for real next/image artwork when brand photography is supplied.
 */

type Tone = "ink" | "crimson" | "slate" | "warm";

const palettes: Record<Tone, [string, string]> = {
  ink: ["#0e1116", "#2a3038"],
  crimson: ["#7c1616", "#3a0f0f"],
  slate: ["#2b3742", "#151c22"],
  warm: ["#3a322b", "#171310"],
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
  const [from, to] = palettes[chosen];
  const angle = 115 + (h % 50);

  return (
    <div
      className={`relative overflow-hidden ${aspect} ${className}`}
      style={{ background: `linear-gradient(${angle}deg, ${from}, ${to})` }}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {/* fine grid texture for editorial depth */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className="absolute -right-10 -top-16 h-56 w-56 rounded-full opacity-20 blur-2xl"
        style={{ background: chosen === "crimson" ? "#c2872b" : "#9b1c1c" }}
      />
      {label && (
        <span className="absolute bottom-4 left-4 font-display text-sm font-semibold uppercase tracking-wider text-paper/80">
          {label}
        </span>
      )}
    </div>
  );
}
