import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/**
 * Shared dark hero for interior pages. With an optional `image`, the hero
 * shows a darkened full-bleed background photo (consistent with the home
 * hero video); without one it keeps the clean ink + soft-glow treatment.
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
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* legibility overlays (left + bottom darker) */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
          />
        </>
      ) : (
        <>
          {/* soft editorial glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[120px]"
          />
        </>
      )}
      <Container className="relative pb-16 pt-32 md:pb-20 md:pt-40">
        {crumbs && (
          <div className="mb-8 [&_*]:!text-paper/60 [&_a:hover]:!text-paper [&_[aria-current]]:!text-paper">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        {eyebrow && (
          <Eyebrow tone="paper" className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="text-hero max-w-4xl text-paper">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lead text-paper/70">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}
