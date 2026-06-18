/**
 * Numbered editorial card for capabilities, core values and culture pillars.
 * Hairline border, gold rule — no animated fills or decorative watermarks.
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
      className={`flex h-full flex-col border border-hairline bg-paper p-7 lg:p-8 ${className}`}
    >
      <p className="text-eyebrow text-accent">{String(index).padStart(2, "0")}</p>
      <span aria-hidden className="mt-4 block h-px w-8 bg-gold" />
      <h3
        className={`mt-4 font-display font-bold leading-snug tracking-tight text-ink ${
          featured ? "text-2xl" : "text-lg"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-3 leading-relaxed text-muted ${
          featured ? "max-w-2xl text-base" : "text-[0.95rem]"
        }`}
      >
        {body}
      </p>
    </article>
  );
}
