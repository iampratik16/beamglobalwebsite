import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { EditorialFeature } from "@/components/home/EditorialFeature";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PillarFeature } from "@/components/ui/PillarFeature";
import { Card } from "@/components/ui/Card";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { culturePillars } from "@/content/home";
import { pillars, servicesByPillar } from "@/content/services";
import { blogPostsByDate } from "@/content/blog";

// Home "What's new" uses the original insight artwork (by post slug).
const homeInsightImages: Record<string, string> = {
  "venture-debt-the-rising-star-in-startup-financing-amid-indias-liquidity-crunch":
    "/images/home/venturedebt.png",
  "5-cyber-security-startups-to-watch-out-for": "/images/home/cyber.png",
  "what-makes-your-customers-say-yes-to-your-product-or-service": "/images/home/growth.png",
};

export default function HomePage() {
  const latest = blogPostsByDate.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Editorial feature, layered statement + featured thinking + insight */}
      <EditorialFeature />

      {/* Culture pillars */}
      <section className="section-y bg-paper-alt">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Our culture"
              title="What we stand for"
              lead="Three principles shape how we work with every client and every challenge."
            />
          </Reveal>
          <Reveal className="mt-12">
            <PillarFeature pillars={culturePillars} />
          </Reveal>
        </Container>
      </section>

      {/* Services overview */}
      <section className="section-y bg-paper">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="What we do"
              title="Expertise across the GRC and growth journey"
              lead="From product selection and implementation to governance, transformation and the entrepreneurial path from startup to IPO."
            />
          </Reveal>

          <div className="mt-14 space-y-px bg-hairline">
            {pillars.map((pillar) => (
              <Reveal key={pillar.id} className="bg-paper">
                <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12 lg:py-10">
                  <div>
                    <Eyebrow>{pillar.eyebrow}</Eyebrow>
                    <h3 className="text-h3 mt-3 text-ink">{pillar.label}</h3>
                    <p className="mt-3 max-w-md text-muted">{pillar.intro}</p>
                  </div>
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                    {servicesByPillar(pillar.id).map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group flex items-center justify-between gap-3 border-b border-hairline py-3.5 text-ink transition-colors hover:text-accent"
                        >
                          <span className="font-medium">{s.title}</span>
                          <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink"
            >
              See all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Insights */}
      <section className="section-y bg-paper-alt">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Insights Hub"
              title="What's new"
              lead="Perspectives on governance, growth and the road ahead."
            />
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink"
            >
              All insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal className="mt-12">
            <CardGrid>
              {latest.map((post) => (
                <Card
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  eyebrow={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  seed={post.slug}
                  image={homeInsightImages[post.slug] ?? post.image}
                  elevated
                />
              ))}
            </CardGrid>
          </Reveal>
        </Container>
      </section>

      {/* Careers + Contact CTAs */}
      <CTABand
        eyebrow="Careers"
        heading="Elevate Your Career, Embrace Your Future."
        body="Join a team that believes in excellence and helps clients get the most from their GRC investments."
        primary={{ label: "Explore careers", href: "/careers" }}
      />
      <CTABand
        tone="accent"
        eyebrow="Let's talk"
        heading="Looking for a First-Class GRC & Business Consultant?"
        body="Tell us about your goals, our team will help you maximise the return on your GRC investment."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
