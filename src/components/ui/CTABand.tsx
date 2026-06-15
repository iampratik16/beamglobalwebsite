import { Button } from "./Button";
import { Container } from "./Container";

/**
 * Full-width call-to-action band. Default ink background with paper text;
 * `tone="accent"` for a crimson band used sparingly. Layered with a subtle
 * grid texture and a soft colour glow for editorial depth.
 */
export function CTABand({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
  tone = "ink",
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "ink" | "accent";
}) {
  const bg = tone === "accent" ? "bg-accent" : "bg-ink";
  return (
    <section className={`relative overflow-hidden ${bg}`}>
      {/* texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-[120px] ${
          tone === "accent" ? "bg-gold/25" : "bg-accent/30"
        }`}
      />
      <Container className="section-y relative">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && <p className="text-eyebrow mb-4 text-gold">{eyebrow}</p>}
            <h2 className="text-h2 text-paper">{heading}</h2>
            {body && <p className="mt-5 text-lead text-paper/70">{body}</p>}
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-4">
            <Button href={primary.href} variant="onDark">
              {primary.label}
            </Button>
            {secondary && (
              <Button
                href={secondary.href}
                withArrow={false}
                className="border border-paper/30 bg-transparent text-paper hover:bg-paper hover:text-ink"
              >
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
