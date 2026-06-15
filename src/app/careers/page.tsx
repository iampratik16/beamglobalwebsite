import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";
import { careers } from "@/content/careers";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Elevate your career with Beam Global Services. Join a team that believes in excellence and helps clients get the most from their GRC investments.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow={careers.hero.eyebrow}
        title={careers.hero.heading}
        lead={careers.hero.lead}
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <section className="section-y bg-paper">
        <Container>
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Why Beam</Eyebrow>
              <h2 className="text-h2 mt-4 text-ink">{careers.intro.title}</h2>
            </div>
            <p className="self-center text-lead">{careers.intro.body}</p>
          </Reveal>

          <Reveal className="mt-14 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {careers.values.map((value, i) => (
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
        tone="accent"
        eyebrow="Join us"
        heading={careers.cta.heading}
        body={careers.cta.body}
        primary={{ label: careers.cta.button, href: "/contact" }}
      />
    </>
  );
}
