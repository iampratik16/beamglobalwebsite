import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { insights, insightsIntro } from "@/content/insights";

export const metadata: Metadata = pageMetadata({
  title: "Insights Hub",
  description:
    "Perspectives and analysis from Beam Global Services on Governance, Risk & Compliance, growth and building organisations that endure.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow={insightsIntro.eyebrow}
        title={insightsIntro.heading}
        lead="Ideas and analysis on governance, risk, compliance and growth that endures."
        image="/images/heroes/insights.png"
        imageAlt="Beam Global Services insights"
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights Hub" }]}
      />

      <section className="section-y bg-paper">
        <Container>
          <Reveal>
            <CardGrid>
              {insights.map((post) => (
                <Card
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  eyebrow={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  seed={post.slug}
                  image={post.image}
                />
              ))}
            </CardGrid>
          </Reveal>
        </Container>
      </section>

      <CTABand
        eyebrow="Stay in touch"
        heading="Want these insights direct?"
        body="Get in contact and we'll keep you posted on our latest thinking."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
