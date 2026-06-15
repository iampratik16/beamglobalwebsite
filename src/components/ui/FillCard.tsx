/**
 * Editorial numbered card with a slide-up ink fill on hover, an oversized
 * serif number watermark, and a growing gold rule. Used for service
 * capabilities, core values and culture values so the treatment is consistent.
 */
export function FillCard({
  index,
  title,
  body,
  featured = false,
  className = "",
}: {
  index: number;
  title: string;
  body: string;
  featured?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-paper p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-soft lg:p-8 ${className}`}
    >
      {/* slide-up dark fill */}
      <span
        aria-hidden
        className="absolute inset-0 z-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      />
      {/* oversized serif number watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1 z-[1] font-serif text-[4.5rem] font-semibold leading-none text-ink/[0.05] transition-colors duration-500 group-hover:text-gold/30"
      >
        {String(index).padStart(2, "0")}
      </span>
      <div className="relative z-10 flex flex-col gap-3">
        <span
          aria-hidden
          className="h-0.5 w-8 bg-gold transition-all duration-500 group-hover:w-14"
        />
        <h3
          className={`font-display font-bold leading-snug tracking-tight text-ink transition-colors duration-500 group-hover:text-paper ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {title}
        </h3>
        <p
          className={`leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/75 ${
            featured ? "max-w-2xl text-base" : "text-[0.95rem]"
          }`}
        >
          {body}
        </p>
      </div>
    </article>
  );
}
