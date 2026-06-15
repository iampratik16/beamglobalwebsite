import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";
import { about } from "@/content/about";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Beam Global Services helps organisations maximise the value of their Governance, Risk & Compliance investments through expert application support and guidance.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.heading}
        lead={about.hero.lead}
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Who we are */}
      <section className="section-y bg-paper">
        <Container>
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="text-h2 mt-4 text-ink">{about.whoWeAre.title}</h2>
            </div>
            <div className="space-y-5 text-[1.075rem] leading-relaxed text-text">
              {about.whoWeAre.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Vision + Mission */}
      <section className="section-y bg-paper-alt">
        <Container>
          <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
            {[about.vision, about.mission].map((block, i) => (
              <Reveal key={block.title} delay={i * 80} className="bg-paper-alt">
                <div className="flex h-full flex-col gap-6 p-8 lg:p-12">
                  <PlaceholderMedia
                    seed={block.title}
                    tone={i === 0 ? "ink" : "crimson"}
                    aspect="aspect-[16/7]"
                    label={block.title}
                  />
                  <h3 className="text-h3 text-ink">{block.title}</h3>
                  <p className="leading-relaxed text-muted">{block.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="section-y bg-paper">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>Core Values</Eyebrow>
            <h2 className="text-h2 mt-4 text-ink">{about.coreValues.title}</h2>
            <p className="mt-6 text-lead">{about.coreValues.body}</p>
          </Reveal>
          <Reveal className="mt-14 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {about.coreValues.pillars.map((value, i) => (
              <div key={value.label} className="flex flex-col gap-3 bg-paper p-7">
                <span className="font-serif text-2xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-bold tracking-tight text-ink">{value.label}</h3>
                <p className="text-sm leading-relaxed text-muted">{value.text}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <CTABand
        eyebrow="Work with us"
        heading="Let's maximise the return on your GRC investment."
        body="Talk to our team about application support, implementation and advisory."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Explore services", href: "/services" }}
      />
    </>
  );
}
