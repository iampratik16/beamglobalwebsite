import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { blogPostsByDate } from "@/content/blog";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Case studies and insights from Beam Global Services on GRC, startups, finance, cyber security and growth.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Client stories and proven outcomes"
        lead="How we help clients get the most from their GRC investments, across governance, growth and the journey in between."
        image="/images/heroes/blog.png"
        imageAlt="Beam Global Services case studies"
        crumbs={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
      />

      <section className="section-y bg-paper">
        <Container>
          <Reveal>
            <CardGrid>
              {blogPostsByDate.map((post) => (
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
        eyebrow="Let's talk"
        heading="Have a challenge we can help with?"
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
