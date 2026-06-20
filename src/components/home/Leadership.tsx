import Image from "next/image";
import Link from "next/link";
import { team } from "@/content/team";

/**
 * Leadership roster, PwC "Network Leadership Team" style: a square headshot on
 * the left, the serif underlined name and stacked title on the right. The whole
 * item links to the member's profile page, where the large photo lives.
 */
export function Leadership() {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <Link
          key={member.slug}
          href={`/team/${member.slug}`}
          className="group flex items-start gap-5"
        >
          <div className="relative aspect-square w-44 shrink-0 overflow-hidden ring-1 ring-hairline">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="176px"
              className="object-cover object-top"
            />
          </div>
          <div className="pt-1">
            <h3 className="font-serif text-xl leading-tight text-ink underline decoration-1 underline-offset-4 transition-colors group-hover:text-accent">
              {member.name}
            </h3>
            <p className="mt-3 leading-snug text-muted">{member.role}</p>
            <p className="leading-snug text-muted">{member.location}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
