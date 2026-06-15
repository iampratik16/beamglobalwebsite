import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";
import { footerColumns, legalLinks, site } from "@/content/site";
import logo from "../../../public/brand/beam-logo.png";

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
    <footer className="bg-warm-mesh relative overflow-hidden border-t border-hairline text-text">
      {/* decorative glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-gold/10 blur-[130px]"
      />

      {/* Utility band — glass cards */}
      <Container className="pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {utilityCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="glass lift group flex flex-col gap-3 rounded-2xl p-7 shadow-soft lg:p-8"
            >
              <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                {card.title}
              </h3>
              <p className="text-muted">{card.body}</p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                {card.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>

      {/* Main footer */}
      <Container className="relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Image src={logo} alt="Beam Global Services" className="h-9 w-auto" />
            <p className="mt-6 text-sm leading-relaxed text-muted">{site.description}</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-6 inline-block text-sm font-medium text-ink"
            >
              {site.email}
            </a>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-eyebrow mb-5 text-accent">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                    >
                      <span className="link-underline">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Legal row */}
      <div className="relative border-t border-hairline/80">
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
