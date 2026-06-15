import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FillCard } from "@/components/ui/FillCard";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";
import { careers } from "@/content/careers";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Elevate your career with Beam Global Services. Join a team that believes in excellence and helps clients get the most from their GRC investments.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow={careers.hero.eyebrow}
        title={careers.hero.heading}
        lead={careers.hero.lead}
        image="/images/heroes/careers.png"
        imageAlt="Careers at Beam Global Services"
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <section className="section-y bg-paper">
        <Container>
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Why Beam</Eyebrow>
              <h2 className="text-h2 mt-4 text-ink">{careers.intro.title}</h2>
            </div>
            <p className="self-center text-lead">{careers.intro.body}</p>
          </Reveal>

          <Reveal className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {careers.values.map((value, i) => (
              <FillCard key={value.label} index={i + 1} title={value.label} body={value.text} />
            ))}
          </Reveal>
        </Container>
      </section>

      <CTABand
        tone="accent"
        eyebrow="Join us"
        heading={careers.cta.heading}
        body={careers.cta.body}
        primary={{ label: careers.cta.button, href: "/contact" }}
      />
    </>
  );
}
