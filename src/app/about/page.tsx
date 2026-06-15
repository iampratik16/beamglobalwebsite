import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { FillCard } from "@/components/ui/FillCard";
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
            <div className="flex flex-col">
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="text-h2 mt-4 text-ink">{about.whoWeAre.title}</h2>
              <div className="group relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/teamww.png"
                  alt="The Beam Global Services team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-5 text-[1.075rem] leading-relaxed text-text lg:pt-2">
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
          <Reveal className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.coreValues.pillars.map((value, i) => (
              <FillCard key={value.label} index={i + 1} title={value.label} body={value.text} />
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
