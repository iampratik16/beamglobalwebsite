import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Beam Global Services. Talk to our team about GRC application support, implementation and advisory across our offices in London, Delhi and Bengaluru.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Us"
        lead={site.description}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section-y bg-paper">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            {/* Details */}
            <div>
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="text-h3 mt-4 text-ink">
                We’d love to hear about your goals.
              </h2>
              <p className="mt-4 text-muted">
                Tell us about your GRC, transformation or growth challenge and our
                team will respond promptly.
              </p>

              <dl className="mt-10 space-y-8">
                <div className="border-t border-hairline pt-5">
                  <dt className="text-eyebrow text-accent">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="link-underline text-lg font-medium text-ink"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="border-t border-hairline pt-5">
                  <dt className="text-eyebrow text-accent">Offices</dt>
                  <dd className="mt-2 text-lg font-medium text-ink">
                    {site.offices.join(" · ")}
                  </dd>
                </div>
                <div className="border-t border-hairline pt-5">
                  <dt className="text-eyebrow text-accent">Regions</dt>
                  <dd className="mt-2 text-lg font-medium text-ink">
                    {site.regions.join(" · ")}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
