import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { GrcStrategyWheel } from "@/components/home/GrcStrategyWheel";
import { pageMetadata } from "@/lib/seo";
import { grcExplainer, grcChallenges } from "@/content/insights";

export const metadata: Metadata = pageMetadata({
  title: "What is GRC?",
  description:
    "A plain-English guide to Governance, Risk & Compliance — what the three letters mean, why organisations invest in it, and where GRC products get stuck.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow={grcExplainer.hero.eyebrow}
        title={grcExplainer.hero.heading}
        lead={grcExplainer.hero.lead}
        image="/images/heroes/insights.png"
        imageAlt="Understanding Governance, Risk & Compliance"
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights Hub" }]}
      />

      {/* What is GRC — plain-English intro */}
      <section className="section-y bg-paper">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>Start here</Eyebrow>
            <h2 className="text-h2 mt-4 text-ink">
              Governance, Risk &amp; Compliance, explained
            </h2>
            <div className="mt-8 space-y-6 text-[1.075rem] leading-relaxed text-text">
              {grcExplainer.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The three letters: G, R, C */}
      <section className="section-y border-t border-hairline bg-paper-alt">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>The three letters</Eyebrow>
            <h2 className="text-h2 mt-4 text-ink">What each letter means</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px border border-hairline bg-hairline md:grid-cols-3">
            {grcExplainer.pillars.map((pillar) => (
              <div key={pillar.name} className="bg-paper-alt p-8">
                <span
                  aria-hidden
                  className="font-serif text-[3rem] font-semibold leading-none text-accent"
                >
                  {pillar.name.charAt(0)}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink">
                  {pillar.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-muted">
                  {pillar.tagline}
                </p>
                <p className="mt-4 leading-relaxed text-muted">{pillar.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why it matters */}
      <section className="section-y bg-paper">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>Why it matters</Eyebrow>
              <h2 className="text-h2 mt-4 text-ink">{grcExplainer.why.heading}</h2>
              <p className="mt-6 text-lead">{grcExplainer.why.body}</p>
            </Reveal>
            <Reveal>
              <ul className="lg:pt-2">
                {grcExplainer.why.points.map((point) => {
                  const idx = point.indexOf(":");
                  const lead = idx > -1 ? point.slice(0, idx) : point;
                  const tail = idx > -1 ? point.slice(idx + 1).trim() : "";
                  return (
                    <li
                      key={point}
                      className="border-t border-hairline py-5 first:border-t-0 first:pt-0"
                    >
                      <span className="font-semibold text-ink">{lead}</span>
                      {tail && (
                        <span className="leading-relaxed text-muted"> — {tail}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Interactive GRC strategy wheel */}
      <GrcStrategyWheel />

      {/* GRC challenges: client & vendor perspective */}
      <section className="section-y border-t border-hairline bg-paper">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>{grcChallenges.eyebrow}</Eyebrow>
            <h2 className="text-h2 mt-4 text-ink">{grcChallenges.heading}</h2>
            <p className="mt-6 text-lead">{grcChallenges.lead}</p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
            {grcChallenges.groups.map((group) => (
              <Reveal key={group.title}>
                <div className="mx-auto aspect-square w-44 overflow-hidden rounded-full ring-1 ring-hairline sm:w-52">
                  <Image
                    src={group.image}
                    alt={group.imageAlt}
                    width={416}
                    height={416}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-8 text-center font-display text-2xl font-bold tracking-tight text-accent">
                  {group.title}
                </h3>
                <ul className="mx-auto mt-6 max-w-md space-y-4">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Make GRC work for you"
        heading="Getting more from your GRC investment."
        body="Whether you're choosing a GRC product or trying to get value from one you already own, our team can help."
        primary={{ label: "Talk to our team", href: "/contact" }}
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
