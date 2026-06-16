import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import {
  RELATIONSHIP,
  clientsHeader,
  clientSectors,
} from "@/data/clients";

/**
 * Sector-grouped client / track-record logo wall. Full-colour logos on
 * uniform white cards, evenly distributed, with a lift-on-hover. Header copy
 * switches on RELATIONSHIP ("track-record" | "direct").
 */
export function ClientLogos() {
  const header = clientsHeader[RELATIONSHIP];

  return (
    <section className="section-y bg-paper-alt">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={header.eyebrow}
            title={header.heading}
            lead={header.sub}
          />
        </Reveal>

        <div className="mt-14 space-y-12 lg:mt-16">
          {clientSectors.map((group) => (
            <Reveal key={group.sector}>
              <p className="text-eyebrow mb-5 text-accent">{group.sector}</p>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {group.clients.map((client) => (
                  <li key={client.name}>
                    <div className="group flex h-32 items-center justify-center rounded-xl border border-hairline bg-paper p-5 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-float motion-reduce:transition-none lg:h-36 lg:p-6">
                      <div className="relative h-full w-full">
                        <Image
                          src={client.logoSrc}
                          alt={client.alt}
                          fill
                          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 280px"
                          className="object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 motion-reduce:transition-none"
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
