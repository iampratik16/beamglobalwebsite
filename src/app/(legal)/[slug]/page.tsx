import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";
import { legalDocs } from "@/content/legal";

export function generateStaticParams() {
  return Object.keys(legalDocs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalDocs[slug];
  if (!doc) return {};
  return pageMetadata({ title: doc.title, description: doc.intro, path: `/${doc.slug}` });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = legalDocs[slug];
  if (!doc) notFound();

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        lead={doc.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: doc.title }]}
      />
      <section className="section-y bg-paper">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            {doc.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-h3 text-ink">{section.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
