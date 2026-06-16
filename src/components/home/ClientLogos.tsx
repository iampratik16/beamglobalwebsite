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
 * Sector-grouped client / track-record logo wall. Restrained, editorial,
 * monochrome-by-default (greyscale + reduced opacity), colourising on hover.
 * Header copy switches on RELATIONSHIP ("track-record" | "direct").
 */
export function ClientLogos() {
  const header = clientsHeader[RELATIONSHIP];

  return (
    <section className="section-y bg-paper">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={header.eyebrow}
            title={header.heading}
            lead={header.sub}
          />
        </Reveal>

        <div className="mt-14 space-y-12 lg:mt-16 lg:space-y-14">
          {clientSectors.map((group) => (
            <Reveal key={group.sector}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.6fr_2.4fr] lg:gap-12">
                <p className="text-eyebrow pt-1 text-muted">{group.sector}</p>
                <ul className="flex flex-wrap items-center gap-x-10 gap-y-8 sm:gap-x-12">
                  {group.clients.map((client) => (
                    <li
                      key={client.name}
                      className="group relative h-9 w-28 shrink-0 sm:h-10 sm:w-32"
                    >
                      <Image
                        src={client.logoSrc}
                        alt={client.alt}
                        fill
                        sizes="128px"
                        className="object-contain object-left opacity-60 grayscale transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
