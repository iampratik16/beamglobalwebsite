import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className = "",
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const Heading = as;
  const headingClass = as === "h1" ? "text-hero" : "text-h2";
  const alignCls = align === "center" ? "mx-auto max-w-3xl text-center items-center" : "max-w-3xl";
  return (
    <div className={`flex flex-col gap-5 ${alignCls} ${className}`}>
      {eyebrow && (
        <Eyebrow tone={tone === "dark" ? "paper" : "accent"}>{eyebrow}</Eyebrow>
      )}
      <Heading
        className={`${headingClass} ${tone === "dark" ? "text-paper" : "text-ink"}`}
      >
        {title}
      </Heading>
      {lead && (
        <p className={`text-lead ${tone === "dark" ? "text-paper/70" : ""}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
