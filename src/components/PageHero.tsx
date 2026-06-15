import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/**
 * Shared dark hero for interior pages. The dark band lets the fixed header
 * sit transparent over it, then turn solid on scroll — consistent site-wide.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* soft editorial glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full border border-paper/10"
      />
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
