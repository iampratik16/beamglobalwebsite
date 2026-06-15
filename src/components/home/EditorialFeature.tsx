import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/icons";
import { blogPostsByDate } from "@/content/blog";
import { positioning } from "@/content/home";

/**
 * Layered editorial section inspired by the PwC homepage composition:
 * a large serif statement on a warm tinted ground, an overlapping
 * "Featured thinking" card, a floating glass "Insight" card with an
 * oversized serif motif, and a small floating glass chip.
 *
 * All content is real Beam copy, no fabricated statistics. The decorative
 * chip is aria-hidden (it is not an interactive control).
 */
export function EditorialFeature() {
  const featured = blogPostsByDate[0];

  return (
    <section className="bg-warm-mesh relative">
      <Container className="section-y">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left, big serif statement */}
          <div className="max-w-xl">
            <Eyebrow>The opportunity</Eyebrow>
            <p className="text-display-serif mt-6 text-ink">
              Your GRC platforms are a major investment.{" "}
              <span className="text-accent">Are you getting the full return?</span>
            </p>
            <p className="mt-6 text-lead">{positioning.body}</p>
            <Link
              href="/services"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-ink"
            >
              See how we help
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right, layered cards */}
          <div className="relative">
            {/* Featured thinking card */}
            <article className="lift overflow-hidden rounded-2xl bg-paper shadow-soft">
              <div className="px-7 pt-7">
                <p className="text-eyebrow text-accent">Featured thinking</p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-ink">
                  {featured.title}
                </h3>
                <p className="mt-3 text-muted">{featured.excerpt}</p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-ink"
                >
                  Read the article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="card-media group relative mt-6 aspect-[16/8] overflow-hidden">
                <Image
                  src="/images/subhero.png"
                  alt="Beam Global Services, insights and thinking"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </article>

            {/* Floating INSIGHT card with oversized serif motif */}
            <div className="glass-solid shadow-float absolute -bottom-10 -left-4 z-20 hidden w-60 rounded-2xl p-6 sm:block">
              <p className="text-eyebrow text-accent">Insight</p>
              <p className="mt-1 font-serif text-[3.75rem] font-semibold leading-none tracking-tight text-accent">
                ROI
              </p>
              <p className="mt-2 font-serif text-[1.05rem] italic leading-snug text-ink">
                Everything we do is measured against the return on your GRC investment.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Beam Global Services
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
