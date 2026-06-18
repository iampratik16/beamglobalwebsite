import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/icons";
import { positioning } from "@/content/home";

/**
 * Editorial "opportunity" section. An intro statement paired with a photo,
 * then the problem we solve (two-column) and a numbered "how we help" grid —
 * arranged to stay readable and balanced rather than a single wall of text.
 */
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

        {/* What problem are we solving — two-column body */}
        <div className="mt-16 border-t border-hairline pt-14 lg:mt-20 lg:pt-16">
          <h3 className="text-h3 max-w-3xl text-ink">{positioning.problemHeading}</h3>
          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            {positioning.problemBody.map((para, i) => (
              <p key={i} className="leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* How we help — numbered grid */}
        <div className="mt-14">
          <p className="text-lg font-semibold text-ink">{positioning.helpIntro}</p>
          <ol className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
            {positioning.helpPoints.map((point, i) => (
              <li key={i} className="border-t border-hairline pt-5">
                <span className="font-serif text-3xl leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 leading-relaxed text-muted">{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
