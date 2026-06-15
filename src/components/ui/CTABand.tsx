import Link from "next/link";
import { Container } from "./Container";
import { ArrowRight } from "./icons";

/**
 * Full-width call-to-action band. Default ink background with paper text;
 * `tone="accent"` for a crimson band used sparingly. Layered with soft colour
 * glows and a large decorative ring — no grid texture.
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
      {/* soft glows */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-20 -top-32 h-[30rem] w-[30rem] rounded-full blur-[130px] ${
          tone === "accent" ? "bg-gold/25" : "bg-accent/35"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full blur-[120px] ${
          tone === "accent" ? "bg-ink/40" : "bg-gold/10"
        }`}
      />
      {/* decorative outlined rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-paper/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 h-[16rem] w-[16rem] -translate-y-1/2 rounded-full border border-paper/10"
      />

      <Container className="section-y relative">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-eyebrow mb-5 inline-flex items-center gap-2.5 text-gold">
                <span aria-hidden className="inline-block h-px w-8 bg-gold" />
                {eyebrow}
              </p>
            )}
            <h2 className="text-h2 text-paper">{heading}</h2>
            {body && <p className="mt-5 max-w-xl text-lead text-paper/70">{body}</p>}
          </div>

          <div className="flex flex-shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
            <CTAButton href={primary.href} label={primary.label} />
            {secondary && (
              <Link
                href={secondary.href}
                className="link-underline self-center text-paper/80 transition-colors hover:text-paper"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Sleek CTA: on hover the white arrow-circle expands to fill the whole pill,
 * the label flips to ink, the pill lifts slightly and the arrow slide-swaps.
 */
function CTAButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-paper/30 py-2 pl-7 pr-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-paper hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)]"
    >
      {/* expanding fill, originating from the arrow circle */}
      <span
        aria-hidden
        className="absolute right-2 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-paper transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[16]"
      />
      <span className="relative z-10 text-[1.05rem] font-semibold text-paper transition-colors duration-300 group-hover:text-ink">
        {label}
      </span>
      <span className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-paper">
        <ArrowRight className="h-5 w-5 text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-8" />
        <ArrowRight className="absolute h-5 w-5 -translate-x-8 text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
      </span>
    </Link>
  );
}
