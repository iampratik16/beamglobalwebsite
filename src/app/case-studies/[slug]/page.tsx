import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PullQuote } from "@/components/ui/PullQuote";
import { CTABand } from "@/components/ui/CTABand";
import { ArrowRight } from "@/components/ui/icons";
import {
  caseStudySlugs,
  getCaseStudy,
  type CaseStudySection,
} from "@/content/case-studies";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const canonical = `/case-studies/${cs.slug}`;
  return {
    title: `${cs.cardTitle}, Case Study`,
    description: cs.excerpt,
    alternates: { canonical },
    openGraph: {
      title: cs.cardTitle,
      description: cs.excerpt,
      url: canonical,
      type: "article",
      publishedTime: cs.date,
      images: [cs.heroImage],
    },
    twitter: {
      card: "summary_large_image",
      title: cs.cardTitle,
      description: cs.excerpt,
      images: [cs.heroImage],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const service = getService(cs.serviceSlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.excerpt,
    datePublished: cs.date,
    image: `${site.url}${cs.heroImage}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    about: cs.facts.client,
    url: `${site.url}/case-studies/${cs.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero: title left, image right (PwC pattern) */}
      <div className="bg-paper pt-28 md:pt-32">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Case Studies", href: "/case-studies" },
              { label: cs.cardTitle },
            ]}
          />
        </Container>

        <Container className="mt-8">
          <div className="grid grid-cols-1 items-stretch overflow-hidden border border-hairline lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center p-8 lg:order-1 lg:p-14">
              <Eyebrow className="mb-5">{cs.eyebrow}</Eyebrow>
              <h1 className="text-hero text-ink">{cs.title}</h1>
              <p className="mt-7 text-sm font-semibold uppercase tracking-wider text-muted">
                Case Study · {cs.readMinutes} minute read · {formatDate(cs.date)}
              </p>
            </div>
            <div className="relative order-1 aspect-[4/3] overflow-hidden lg:order-2 lg:aspect-auto lg:min-h-[460px]">
              <Image
                src={cs.heroImage}
                alt={cs.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Standfirst */}
      <section className="bg-paper">
        <Container className="py-14 lg:py-20">
          <p className="max-w-4xl font-display text-2xl font-bold leading-snug tracking-tight text-ink md:text-3xl">
            {cs.intro}
          </p>
        </Container>
      </section>

      {/* Facts bar */}
      <section className="border-y border-hairline bg-paper-alt">
        <Container className="py-10">
          <dl className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Client" value={cs.facts.client} />
            <Fact label="Industry" value={cs.facts.industry} />
            <Fact label="Our role" value={cs.facts.role} />
            <Fact label="Featuring" value={cs.facts.featuring} />
          </dl>
        </Container>
      </section>

      {/* Overview */}
      <section className="bg-paper">
        <Container className="py-14 lg:py-20">
          <div className="mx-auto max-w-3xl space-y-5 text-[1.075rem] leading-relaxed text-text">
            {cs.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Highlight quote */}
      {cs.quote && (
        <section className="bg-paper-alt">
          <Container className="py-14 lg:py-20">
            <PullQuote quote={cs.quote.text} attribution={cs.quote.attribution} />
          </Container>
        </section>
      )}

      {/* Situation */}
      <SectionBlock section={cs.situation} bg="bg-paper" />

      {/* Solution */}
      <SectionBlock section={cs.solution} bg="bg-paper-alt" />

      {/* Milestones */}
      <section className="bg-paper">
        <Container className="py-14 lg:py-20">
          <Eyebrow>{cs.milestones.eyebrow}</Eyebrow>
          <h2 className="text-h2 mt-4 text-ink">{cs.milestones.heading}</h2>
          <ol className="mt-12 grid grid-cols-1 gap-px border border-hairline bg-hairline lg:grid-cols-2">
            {cs.milestones.items.map((m, i) => (
              <li
                key={m.title}
                className={`flex flex-col gap-4 bg-paper p-8 lg:p-10 ${
                  i === cs.milestones.items.length - 1 &&
                  cs.milestones.items.length % 2 === 1
                    ? "lg:col-span-2"
                    : ""
                }`}
              >
                <span className="font-serif text-4xl font-semibold leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                  {m.title}
                </h3>
                <ul className="space-y-3">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[1.0125rem] leading-relaxed text-text">
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Engagement at a glance */}
      <section className="border-t border-hairline bg-paper-alt">
        <Container className="py-14 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            <div>
              <Eyebrow>At a glance</Eyebrow>
              <h2 className="text-h3 mt-4 text-ink">Engagement at a glance</h2>
            </div>
            <dl className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
              {cs.atAGlance.map((row) => (
                <div key={row.label} className="bg-paper-alt p-6">
                  <dt className="text-eyebrow text-accent">{row.label}</dt>
                  <dd className="mt-2 text-lg font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Linked service + explore more (PwC "Unlock more success stories" band) */}
      <section className="bg-paper">
        <Container className="py-14 lg:py-20">
          <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline md:grid-cols-2">
            {service && (
              <Link
                href={`/services/${service.slug}`}
                className="group flex flex-col gap-4 bg-accent-soft p-8 transition-colors hover:bg-paper-alt lg:p-12"
              >
                <span className="text-eyebrow text-accent">Related service</span>
                <h3 className="text-h3 text-ink">{service.title}</h3>
                <p className="text-muted">{service.summary}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Explore the service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )}
            <Link
              href="/case-studies"
              className="group flex flex-col gap-4 bg-paper p-8 transition-colors hover:bg-paper-alt lg:p-12"
            >
              <span className="text-eyebrow text-accent">More success stories</span>
              <h3 className="text-h3 text-ink">Explore all case studies</h3>
              <p className="text-muted">
                See how Beam Global Services helps clients strengthen control and
                get the most from their GRC investments.
              </p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                View all case studies
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <CTABand
        tone="accent"
        eyebrow="Let's talk"
        heading="Have a similar challenge?"
        body="Tell us about your Oracle, GRC or controls goals and our team will help you find the right path."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper-alt p-6">
      <dt className="text-eyebrow text-accent">{label}</dt>
      <dd className="mt-2 text-lg font-medium text-ink">{value}</dd>
    </div>
  );
}

/** "Situation" / "Solution" band: heading + image, then body paragraphs. */
function SectionBlock({ section, bg }: { section: CaseStudySection; bg: string }) {
  return (
    <section className={`border-t border-hairline ${bg}`}>
      <Container className="py-14 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="text-h2 mt-4 text-ink">{section.heading}</h2>
          </div>
          {section.image && (
            <figure className="relative aspect-[16/10] overflow-hidden border border-hairline">
              <Image
                src={section.image}
                alt={section.imageAlt ?? section.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          )}
        </div>
        {section.body.length > 0 && (
          <div className="mx-auto mt-12 max-w-3xl space-y-5 text-[1.075rem] leading-relaxed text-text">
            {section.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
