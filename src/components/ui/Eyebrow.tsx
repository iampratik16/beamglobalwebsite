import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  tone?: "accent" | "muted" | "paper";
}) {
  const color =
    tone === "accent"
      ? "text-accent"
      : tone === "paper"
        ? "text-gold"
        : "text-muted";
  return (
    <p className={`text-eyebrow flex items-center gap-2.5 ${color} ${className}`}>
      <span aria-hidden className="inline-block h-px w-6 bg-current opacity-60" />
      {children}
    </p>
  );
}
