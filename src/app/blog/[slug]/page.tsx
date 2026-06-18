import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTABand } from "@/components/ui/CTABand";
import { ArrowRight } from "@/components/ui/icons";
import { blogPosts, blogSlugs, getPost } from "@/content/blog";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const canonical = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: "article",
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    articleSection: post.category,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        image={post.image}
        imageAlt={post.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blog" },
          { label: post.title },
        ]}
      >
        <p className="mt-6 text-sm uppercase tracking-wider text-muted">
          {formatDate(post.date)}
        </p>
      </PageHero>

      <article className="section-y bg-paper">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="font-serif text-xl italic leading-relaxed text-ink md:text-2xl">
              {post.excerpt}
            </p>
            <div className="mt-10 text-[1.075rem] leading-relaxed text-text">
              {post.body.length > 0 ? (
                post.body.map((block, i) => {
                  if (block.startsWith("### ")) {
                    return (
                      <h3
                        key={i}
                        className="mt-10 mb-3 font-display text-xl font-bold tracking-tight text-ink"
                      >
                        {block.slice(4)}
                      </h3>
                    );
                  }
                  if (block.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-h3 mb-4 mt-12 text-ink">
                        {block.slice(3)}
                      </h2>
                    );
                  }
                  return (
                    <p key={i} className="mb-5">
                      {block}
                    </p>
                  );
                })
              ) : (
                <p className="text-muted">
                  This article is being migrated to our new Insights Hub. In the
                  meantime, please{" "}
                  <Link href="/contact" className="link-underline text-accent">
                    get in touch
                  </Link>{" "}
                  if you’d like to discuss this topic with our team.
                </p>
              )}
            </div>

            <div className="mt-12 border-t border-hairline pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to all blogs
              </Link>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="section-y bg-paper-alt">
          <Container>
            <h2 className="text-h3 mb-10 text-ink">More reading</h2>
            <CardGrid>
              {related.map((p) => (
                <Card
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  eyebrow={p.category}
                  title={p.title}
                  excerpt={p.excerpt}
                  seed={p.slug}
                  image={p.image}
                />
              ))}
            </CardGrid>
          </Container>
        </section>
      )}

      <CTABand
        eyebrow="Let's talk"
        heading="Have a challenge we can help with?"
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
