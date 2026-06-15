import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="link-underline hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-ink" : ""} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <span aria-hidden className="text-hairline">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
