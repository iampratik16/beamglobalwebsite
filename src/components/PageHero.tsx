import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/**
 * Shared hero for interior pages, a clean white band with dark editorial
 * type, sitting flush beneath the solid white header (consistent site-wide).
 *
 * When `image` is supplied the hero becomes an editorial banner layout, * copy on top, then a full-width cinematic banner photograph below, with a
 * restrained crimson brand accent (the Beam answer to PwC's signature
 * geometric overlay). Without it, the hero keeps its text-only treatment.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  imageAlt,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  const copy = (
    <>
      {crumbs && (
        <div className="mb-8">
          <Breadcrumbs items={crumbs} />
        </div>
      )}
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <h1 className="text-hero max-w-4xl text-ink">{title}</h1>
      {lead &&
        (image ? (
          <p className="mt-5 max-w-5xl text-lg leading-relaxed text-muted">{lead}</p>
        ) : (
          <p className="mt-6 max-w-2xl text-lead text-muted">{lead}</p>
        ))}
      {children}
    </>
  );

  return (
    <section className="relative overflow-hidden bg-paper text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]"
      />
      <Container className="relative pb-16 pt-28 md:pb-20 md:pt-32">
        {image ? (
          <div>
            {copy}
            <figure className="relative mt-10 md:mt-14">
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-float ring-1 ring-hairline sm:aspect-[2/1] lg:aspect-[12/5]">
                <Image
                  src={image}
                  alt={imageAlt ?? title}
                  fill
                  priority
                  sizes="(max-width: 1320px) 100vw, 1320px"
                  className="object-cover"
                />
                {/* gentle inner darkening at the foot of the banner */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                {/* Beam crimson brand accent, a restrained angled bar bottom-left */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-[28%] w-[46%] bg-accent/90"
                  style={{ clipPath: "polygon(0 38%, 100% 0, 100% 100%, 0 100%)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-1 w-[46%] bg-gold"
                />
              </div>
            </figure>
          </div>
        ) : (
          copy
        )}
      </Container>
    </section>
  );
}
