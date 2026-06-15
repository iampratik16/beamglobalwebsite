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
  title: "Blogs",
  description:
    "Articles and analysis from Beam Global Services on GRC, startups, finance, cyber security and growth.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blogs"
        title="Ideas, analysis and field notes"
        lead="Beam Global Services helps clients get the most out of their GRC investments. Here's our thinking on governance, growth and the journey in between."
        image="/images/heroes/blog.png"
        imageAlt="Beam Global Services blog"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
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
                  elevated
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
