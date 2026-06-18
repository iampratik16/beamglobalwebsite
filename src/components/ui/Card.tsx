import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";
import { PlaceholderMedia } from "./PlaceholderMedia";

export function Card({
  href,
  title,
  excerpt,
  eyebrow,
  meta,
  seed,
  image,
  withMedia = true,
  className = "",
}: {
  href: string;
  title: string;
  excerpt?: string;
  eyebrow?: string;
  meta?: string;
  seed?: string;
  image?: string;
  withMedia?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden border border-hairline bg-paper transition-colors hover:border-ink/20 ${className}`}
    >
      {withMedia && (
        <div
          className={`relative overflow-hidden border-b border-hairline ${
            image ? "aspect-[4/3]" : ""
          }`}
        >
          {image ? (
            <>
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              {eyebrow && (
                <span className="absolute bottom-4 left-4 z-[1] font-display text-sm font-semibold uppercase tracking-wider text-paper">
                  {eyebrow}
                </span>
              )}
            </>
          ) : (
            <PlaceholderMedia seed={seed ?? title} label={eyebrow} />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        {eyebrow && !withMedia && (
          <span className="text-eyebrow text-accent">{eyebrow}</span>
        )}
        {meta && <span className="text-xs uppercase tracking-wider text-muted">{meta}</span>}
        <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
          {title}
        </h3>
        {excerpt && (
          <p className="text-[0.975rem] leading-relaxed text-muted">{excerpt}</p>
        )}
        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-accent">
          Read more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
