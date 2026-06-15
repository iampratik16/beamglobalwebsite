import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const base =
  "group/btn inline-flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-tight px-6 py-3.5 transition-colors duration-300 focus-visible:outline-2";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-paper hover:bg-accent-ink",
  secondary:
    "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "px-0 py-0 text-accent hover:text-accent-ink",
  onDark:
    "bg-paper text-ink hover:bg-gold hover:text-ink border border-transparent",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  withArrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      )}
    </Link>
  );
}
