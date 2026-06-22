import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/**
 * Shared hero for interior pages, white band with editorial type beneath
 * the header. Optional full-width banner image below the copy block.
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
    <section className="border-b border-hairline bg-paper text-ink">
      <Container className="pb-16 pt-28 md:pb-20 md:pt-32">
        {image ? (
          <div>
            {copy}
            <figure className="relative mt-10 border border-hairline md:mt-14">
              <div className="relative aspect-[3/2] overflow-hidden sm:aspect-[2/1] lg:aspect-[12/5]">
                <Image
                  src={image}
                  alt={imageAlt ?? title}
                  fill
                  priority
                  sizes="(max-width: 1320px) 100vw, 1320px"
                  className="object-cover"
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
