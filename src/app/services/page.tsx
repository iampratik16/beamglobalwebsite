import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { pillars, servicesByPillar } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Expert consulting and digital solutions for GRC, from product selection and implementation to Oracle access security and fully managed support.",
  path: "/services",
});

const anchors: Record<string, string> = {
  digital: "digital",
  "managed-services": "managed-services",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Empowering Businesses with Expert Consulting and Digital Solutions."
        lead="Expert consulting and digital solutions that strengthen control and drive measurable results."
        image="/images/heroes/services.png"
        imageAlt="Beam Global Services capabilities"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {pillars.map((pillar, pi) => (
        <section
          key={pillar.id}
          id={anchors[pillar.id]}
          className={`section-y scroll-mt-24 ${pi % 2 === 0 ? "bg-paper" : "bg-paper-alt"}`}
        >
          <Container>
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <Eyebrow>{`0${pi + 1}, ${pillar.eyebrow}`}</Eyebrow>
                <h2 className="text-h2 mt-4 text-ink">{pillar.label}</h2>
                <p className="mt-5 text-lead">{pillar.intro}</p>
              </div>
            </Reveal>
            <Reveal className="mt-12">
              <CardGrid>
                {servicesByPillar(pillar.id).map((s) => (
                  <Card
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    eyebrow={pillar.eyebrow}
                    title={s.title}
                    excerpt={s.summary}
                    seed={s.slug}
                    image={`/images/services/${s.slug}.png`}
                  />
                ))}
              </CardGrid>
            </Reveal>
          </Container>
        </section>
      ))}

      <CTABand
        tone="accent"
        eyebrow="Not sure where to start?"
        heading="Tell us your goals, we'll find the right path."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
