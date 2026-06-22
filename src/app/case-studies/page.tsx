import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CTABand } from "@/components/ui/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  CaseStudyExplorer,
  type CaseStudyCard,
} from "@/components/case-studies/CaseStudyExplorer";
import { pageMetadata } from "@/lib/seo";
import {
  caseStudiesByDate,
  caseStudyIndustries,
  caseStudyRegions,
  caseStudyTopics,
} from "@/content/case-studies";

export const metadata: Metadata = pageMetadata({
  title: "Client Case Studies",
  description:
    "Real client success stories from Beam Global Services: GRC, Oracle role design, Risk Management Cloud (RMC) and controls automation across our global network.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const cards: CaseStudyCard[] = caseStudiesByDate.map((c) => ({
    slug: c.slug,
    cardTitle: c.cardTitle,
    excerpt: c.excerpt,
    cardImage: c.cardImage,
    topic: c.topic,
    industry: c.facts.industry,
    region: c.region,
  }));

  return (
    <>
      <PageHero
        eyebrow="Client case studies"
        title="Case studies"
        lead="We bring deep GRC, Oracle and industry expertise to every engagement, so our clients can strengthen control, reduce risk and lead with confidence."
        image="/images/heroes/blog.png"
        imageAlt="Beam Global Services client case studies"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Case Studies" },
        ]}
      />

      <section className="section-y bg-paper">
        <Container>
          <Reveal>
            <Eyebrow>Success stories</Eyebrow>
            <h2 className="text-h2 mt-4 text-ink">All success stories</h2>
          </Reveal>
          <Reveal className="mt-10">
            <CaseStudyExplorer
              items={cards}
              topics={caseStudyTopics}
              industries={caseStudyIndustries}
              regions={caseStudyRegions}
            />
          </Reveal>
        </Container>
      </section>

      <CTABand
        eyebrow="Let's talk"
        heading="Have a challenge we can help with?"
        body="Tell us about your GRC, Oracle or transformation goals and our team will help you find the right path."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
