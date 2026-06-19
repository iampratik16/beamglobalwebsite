import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";

/** Shared backdrop used behind every CTA band, site-wide. */
const DEFAULT_CTA_IMAGE = "/images/cta/cta-bg-light.png";

/**
 * Full-width call-to-action band. A brand-colour wash (ink or accent) sits over
 * a cinematic photo: solid on the left so the copy stays perfectly legible, then
 * fading on the right to reveal the image — the brand colour stays dominant, so
 * it reads as a Beam section first and a photo second (PwC-style). Pass
 * `image={null}` for a flat-colour band.
 */
export function CTABand({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
  tone = "ink",
  image = DEFAULT_CTA_IMAGE,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "ink" | "accent";
  image?: string | null;
}) {
  const bg = tone === "accent" ? "bg-accent" : "bg-ink";
  const rgb = tone === "accent" ? "155,28,28" : "14,17,22";
  // Left → right brand wash: solid for the copy, fading to reveal the photo.
  // Ink is near-black, so it needs to fade further on the right to let the
  // (dark) image read; the accent crimson tints the photo and stays visible.
  const mid = tone === "accent" ? 0.62 : 0.46;
  const end = tone === "accent" ? 0.36 : 0.12;
  const scrim = `linear-gradient(100deg, rgb(${rgb}) 0%, rgb(${rgb}) 45%, rgba(${rgb},0.9) 60%, rgba(${rgb},${mid}) 78%, rgba(${rgb},${end}) 100%)`;

  return (
    <section
      className={`relative isolate overflow-hidden ${bg} border-t border-hairline-dark`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ backgroundImage: scrim }}
          />
        </>
      )}
      <Container className="section-y">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-eyebrow mb-5 text-gold">{eyebrow}</p>
            )}
            <h2 className="text-h2 text-paper">{heading}</h2>
            {body && <p className="mt-5 max-w-xl text-lead text-paper/90">{body}</p>}
          </div>

          <div className="flex flex-shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={primary.href} variant="onDark">
              {primary.label}
            </Button>
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
