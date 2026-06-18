import Link from "next/link";
import { Container } from "./Container";
import { Button } from "./Button";

/**
 * Full-width call-to-action band. Ink or accent background, paper text,
 * straightforward layout with standard buttons.
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
    <section className={`${bg} border-t border-hairline-dark`}>
      <Container className="section-y">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-eyebrow mb-5 text-gold">{eyebrow}</p>
            )}
            <h2 className="text-h2 text-paper">{heading}</h2>
            {body && <p className="mt-5 max-w-xl text-lead text-paper/70">{body}</p>}
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
