export function StatCallout({
  figure,
  label,
  tone = "light",
}: {
  figure: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <div>
      <div
        className={`font-serif text-5xl font-semibold leading-none md:text-6xl ${
          tone === "dark" ? "text-paper" : "text-ink"
        }`}
      >
        {figure}
      </div>
      <p
        className={`mt-3 text-sm uppercase tracking-wider ${
          tone === "dark" ? "text-paper/60" : "text-muted"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
