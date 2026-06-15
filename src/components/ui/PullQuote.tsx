export function PullQuote({
  quote,
  attribution,
  tone = "light",
}: {
  quote: string;
  attribution?: string;
  tone?: "light" | "dark";
}) {
  return (
    <figure className="max-w-4xl">
      <blockquote
        className={`font-serif text-2xl italic leading-snug md:text-3xl lg:text-[2.25rem] ${
          tone === "dark" ? "text-paper" : "text-ink"
        }`}
      >
        <span className="text-accent">&ldquo;</span>
        {quote}
        <span className="text-accent">&rdquo;</span>
      </blockquote>
      {attribution && (
        <figcaption
          className={`mt-5 text-sm font-semibold uppercase tracking-wider ${
            tone === "dark" ? "text-paper/60" : "text-muted"
          }`}
        >
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
