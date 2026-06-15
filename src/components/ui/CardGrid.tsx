import type { ReactNode } from "react";

export function CardGrid({
  children,
  cols = 3,
  className = "",
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const colsCls =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-1 gap-6 ${colsCls} ${className}`}>
      {children}
    </div>
  );
}
