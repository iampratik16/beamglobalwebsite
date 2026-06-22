import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { EditorialFeature } from "@/components/home/EditorialFeature";
import { Leadership } from "@/components/home/Leadership";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import {
  BarChart3,
  Code,
  Database,
  Lock,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { pillars, servicesByPillar } from "@/content/services";
import { caseStudiesByDate } from "@/content/case-studies";

// Lucide icon per service slug for the Services overview cards.
const serviceIcons: Record<string, LucideIcon> = {
  "grc-product-selection": Shield,
  "oracle-sod-remediation": ShieldCheck,
  "oracle-rmc-implementation": Settings,
  "safepaas-grc-implementation": Lock,
  "oracle-role-design": Users,
  "software-development-and-integration": Code,
  "application-managed-services": Database,
  "controls-execution-services": ShieldAlert,
  "grc-strategy-services": BarChart3,
};

export default function HomePage() {
  const latestCases = caseStudiesByDate.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Editorial statement / the opportunity */}
      <EditorialFeature />

      {/* Leadership */}
      <section id="leadership" className="section-y scroll-mt-24 bg-paper-alt">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Our team"
              title="Leadership"
              lead="Meet the founders and leaders behind Beam Global Services."
            />
          </Reveal>
          <Reveal className="mt-12">
            <Leadership />
          </Reveal>
        </Container>
      </section>

      {/* Services overview, left header + right grid of icon rows */}
      <section className="section-y border-t border-hairline bg-paper-alt">
        <Container>
          {pillars.map((pillar, pi) => (
            <Reveal
              key={pillar.id}
              className={`grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 ${
                pi > 0
                  ? "mt-16 border-t border-hairline pt-16 lg:mt-24 lg:pt-24"
                  : ""
              }`}
            >
              <div className="lg:col-span-5">
                <Eyebrow>{pillar.eyebrow}</Eyebrow>
                <h2 className="text-h2 mt-5 text-ink">{pillar.label}</h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                  {pillar.intro}
                </p>
                {pillar.id === "managed-services" && (
                  <Link
                    href="/services"
                    className="mt-8 hidden items-center gap-2 font-semibold text-accent hover:text-accent-ink lg:inline-flex"
                  >
                    See all services
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                )}
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  {servicesByPillar(pillar.id).map((s) => {
                    const Icon = serviceIcons[s.slug] ?? Shield;
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex items-center gap-4 border-b border-hairline px-4 py-6 transition-all duration-300 hover:translate-x-1 hover:bg-paper hover:shadow-[inset_4px_0_0_0_var(--color-accent),0_10px_25px_-5px_rgba(0,0,0,0.05)] motion-reduce:transition-none motion-reduce:hover:translate-x-0"
                      >
                        <Icon
                          aria-hidden
                          strokeWidth={1.75}
                          className="h-6 w-6 shrink-0 text-accent"
                        />
                        <span className="font-display text-lg font-semibold text-ink">
                          {s.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                {pillar.id === "managed-services" && (
                  <Link
                    href="/services"
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink lg:hidden"
                  >
                    See all services
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Clients / track record */}
      <ClientLogos />

      {/* Case studies */}
      <section className="section-y bg-paper-alt">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Case Studies"
              title="Client success stories"
              lead="Real outcomes from our work across GRC, Oracle role design and controls automation."
            />
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink"
            >
              All case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal className="mt-12">
            <CardGrid>
              {latestCases.map((cs) => (
                <Card
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  eyebrow={cs.facts.client}
                  title={cs.cardTitle}
                  excerpt={cs.excerpt}
                  image={cs.cardImage}
                />
              ))}
            </CardGrid>
          </Reveal>
        </Container>
      </section>

      {/* Careers + Contact CTAs. The Careers band stays flat so the two
          stacked CTAs don't repeat the same backdrop; the crimson Contact
          band below carries the image. */}
      <CTABand
        image={null}
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
