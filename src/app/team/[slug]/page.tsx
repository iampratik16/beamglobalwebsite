import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTABand } from "@/components/ui/CTABand";
import { Mail, MapPin, Linkedin } from "@/components/ui/icons";
import { pageMetadata } from "@/lib/seo";
import { teamSlugs, getTeamMember } from "@/content/team";

const ORG = "Beam Global Services";

export function generateStaticParams() {
  return teamSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};
  return pageMetadata({
    title: `${member.name}, ${member.role}, ${ORG}`,
    description: member.summary,
    path: `/team/${member.slug}`,
  });
}

function ContactLink() {
  return (
    <a
      href="/contact"
      className="inline-flex items-center gap-2.5 font-medium text-ink transition-colors hover:text-accent"
    >
      <Mail className="h-5 w-5" />
      <span className="underline underline-offset-4">Contact</span>
    </a>
  );
}

function LinkedinBadge({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="inline-flex h-7 w-7 items-center justify-center bg-ink text-paper transition-colors hover:bg-accent"
    >
      <Linkedin className="h-4 w-4" />
    </a>
  );
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  return (
    <>
      <div className="bg-paper pt-28 md:pt-32">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Leadership", href: "/#leadership" },
              { label: member.name },
            ]}
          />
        </Container>

        {/* Profile header: photo + tinted detail panel */}
        <Container className="mt-8">
          <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-[0.62fr_1fr]">
            {/* Photo: a single cover-filled frame. On desktop the cell stretches
                to the height of the text panel beside it (CSS grid stretch), so
                the two are always equal height — like the PwC reference card.
                `object-position` (member.focal) keeps the face framed so the
                head is never cropped. A portrait ratio is used on mobile, where
                the cell stacks above the text and has no sibling to match. */}
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-alt lg:aspect-auto lg:min-h-[460px]">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                style={{ objectPosition: member.focal }}
              />
            </div>

            <div className="flex flex-col justify-center bg-accent-soft p-8 lg:p-14">
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                {member.name}
              </h1>
              <div className="mt-5 font-display font-bold leading-snug text-ink">
                <p>
                  {member.role}, {ORG}
                </p>
                <p>{member.location}</p>
              </div>
              <p className="mt-7 max-w-xl text-[1.075rem] leading-relaxed text-text">
                {member.summary}
              </p>
              <div className="mt-8 flex flex-col items-start gap-4">
                <ContactLink />
                <p className="inline-flex items-center gap-2.5 text-muted">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span>
                    {member.location}, {member.country}
                  </span>
                </p>
                {member.linkedin && (
                  <LinkedinBadge href={member.linkedin} name={member.name} />
                )}
              </div>
            </div>
          </div>
        </Container>

        {/* Biography + At a glance */}
        <Container>
          <div className="max-w-4xl py-16 lg:py-20">
            <div className="space-y-5 text-[1.075rem] leading-relaxed text-text">
              {member.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-14 border-t border-hairline pt-12">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                At a glance
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Areas of focus
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {member.areasOfFocus.map((area) => (
                      <span
                        key={area}
                        className="rounded-sm bg-paper-alt px-3.5 py-2 text-sm text-ink ring-1 ring-hairline"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Education
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {member.education.map((item) => (
                      <li key={item} className="flex gap-3 text-text">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent"
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <CTABand
        tone="accent"
        eyebrow="Let's talk"
        heading="Looking for a First-Class GRC & Business Consultant?"
        body="Tell us about your goals, our team will help you maximise the return on your GRC investment."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
