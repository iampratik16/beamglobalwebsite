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
  withMedia = true,
  elevated = false,
  className = "",
}: {
  href: string;
  title: string;
  excerpt?: string;
  eyebrow?: string;
  meta?: string;
  seed?: string;
  withMedia?: boolean;
  elevated?: boolean;
  className?: string;
}) {
  const shell = elevated
    ? "rounded-2xl bg-paper shadow-soft lift overflow-hidden"
    : "overflow-hidden border border-hairline bg-paper transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-soft";
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col ${shell} ${className}`}
    >
      {withMedia && (
        <div className={`card-media overflow-hidden ${elevated ? "rounded-t-2xl" : ""}`}>
          <PlaceholderMedia seed={seed ?? title} label={eyebrow} />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        {eyebrow && !withMedia && (
          <span className="text-eyebrow text-accent">{eyebrow}</span>
        )}
        {meta && <span className="text-xs uppercase tracking-wider text-muted">{meta}</span>}
        <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-ink">
          {title}
        </h3>
        {excerpt && (
          <p className="text-[0.975rem] leading-relaxed text-muted">{excerpt}</p>
        )}
        <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-accent">
          Read more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
