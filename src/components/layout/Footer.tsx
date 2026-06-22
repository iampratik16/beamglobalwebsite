import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";
import { footerColumns, legalLinks, site } from "@/content/site";
import logoDark from "../../../public/brand/beam-logo.png";

const utilityCards = [
  {
    title: "Careers",
    body: "Elevate your career and embrace your future with Beam.",
    href: "/careers",
    cta: "Explore careers",
  },
  {
    title: "Contact us",
    body: "Talk to our team about your GRC and transformation goals.",
    href: "/contact",
    cta: "Get in touch",
  },
  {
    title: "Our offices",
    body: site.offices.join(" · "),
    href: "/contact",
    cta: "Find us",
  },
];

export function Footer() {
  const year = 2026; // static to avoid hydration/non-determinism

  return (
    <footer className="bg-paper text-ink">
      {/* Utility band */}
      <Container>
        <div className="grid grid-cols-1 gap-px border-x border-hairline bg-hairline md:grid-cols-3">
          {utilityCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col gap-3 bg-paper p-8 transition-colors hover:bg-paper-alt lg:p-10"
            >
              <h3 className="font-display text-xl font-bold tracking-tight">{card.title}</h3>
              <p className="text-muted">{card.body}</p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold-ink">
                {card.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>

      {/* Main footer */}
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Image src={logoDark} alt="Beam Global Services" className="h-9 w-auto" />
            <p className="mt-6 text-sm leading-relaxed text-muted">{site.description}</p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-eyebrow mb-5 text-gold-ink">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Legal row */}
      <div className="border-t border-hairline">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 text-sm text-muted md:flex-row md:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
