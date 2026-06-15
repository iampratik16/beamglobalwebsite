import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/icons";
import Link from "next/link";
import { pillars, servicesByPillar, type Service } from "@/content/services";

/**
 * Interior service page. Driven entirely by a Service record — one template
 * for all 13 service detail pages.
 */
export function ServiceTemplate({ service }: { service: Service }) {
  const pillar = pillars.find((p) => p.id === service.pillar)!;
  const related = servicesByPillar(service.pillar)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={pillar.label}
        title={service.headline}
        lead={service.lead}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Editorial intro */}
      <section className="bg-warm-mesh">
        <Container className="section-y">
          <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-[0.5fr_0.5fr] lg:gap-16">
            <div>
              <Eyebrow>Our approach</Eyebrow>
              <p className="text-display-serif mt-6 text-ink">
                How we approach{" "}
                <span className="text-accent">{service.title}</span>.
              </p>
            </div>
            <p className="self-end text-lead">{service.lead}</p>
          </Reveal>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="section-y bg-paper">
        <Container>
          <Reveal>
            <Eyebrow>What we deliver</Eyebrow>
            <h2 className="text-h3 mt-3 text-ink">
              Capabilities across the engagement
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((cap, i) => (
              <Reveal
                key={cap.title}
                delay={(i % 3) * 60}
                className="group flex flex-col gap-3 rounded-2xl border border-hairline bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-soft lg:p-8"
              >
                <span className="font-serif text-2xl leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-0.5 w-8 bg-gold transition-all duration-300 group-hover:w-14" />
                <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-ink">
                  {cap.title}
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-muted">
                  {cap.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="section-y bg-paper-alt">
          <Container>
            <Reveal>
              <Eyebrow>{pillar.eyebrow}</Eyebrow>
              <h2 className="text-h3 mt-3 text-ink">Related services</h2>
            </Reveal>
            <Reveal className="mt-8 grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 bg-paper-alt p-6 transition-colors hover:bg-paper"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{s.summary}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </Reveal>
          </Container>
        </section>
      )}

      <CTABand
        tone="accent"
        eyebrow="Get started"
        heading={service.cta.heading}
        primary={{ label: service.cta.button, href: "/contact" }}
      />
    </>
  );
}
