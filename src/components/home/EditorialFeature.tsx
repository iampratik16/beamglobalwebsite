import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GrcValueSection } from "@/components/home/GrcValueSection";
import { ArrowRight } from "@/components/ui/icons";
import { positioning } from "@/content/home";

/**
 * Editorial "opportunity" section: the positioning statement and photo, the
 * GRC value section (problem + five strategies — see GrcValueSection), then the
 * "how we help" numbered list. Copy comes from the content file unchanged.
 */

// Number of opening words to bold per "how we help" point (the action phrase).
const HELP_LEAD_WORDS = [4, 5, 9];

export function EditorialFeature() {
  return (
    <section className="border-b border-hairline bg-paper-alt">
      <Container className="section-y">
        {/* Intro statement + photo */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <Eyebrow>{positioning.eyebrow}</Eyebrow>
            <p className="mt-6 text-2xl leading-snug text-ink md:text-[1.9rem]">
              {positioning.intro}
            </p>
            <Link
              href="/services"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink"
            >
              See how we help
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-float ring-1 ring-hairline">
            <Image
              src="/images/subhero.png"
              alt="A team reviewing connected governance, risk and compliance data"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          </figure>
        </div>

        {/* What problem are we solving + five strategies */}
        <GrcValueSection />

        {/* How we help — numbered grid; each point leads with a bold phrase */}
        <div className="mt-16 lg:mt-20">
          <p className="text-lg font-semibold text-ink">{positioning.helpIntro}</p>
          <ol className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-3">
            {positioning.helpPoints.map((point, i) => {
              const words = point.split(" ");
              const n = HELP_LEAD_WORDS[i] ?? 1;
              const lead = words.slice(0, n).join(" ");
              const rest = words.slice(n).join(" ");
              return (
                <li key={i} className="border-t-2 border-hairline pt-5">
                  <span className="font-serif text-3xl leading-none text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 leading-relaxed text-muted">
                    <span className="font-semibold text-ink">{lead}</span>
                    {rest ? ` ${rest}` : ""}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
