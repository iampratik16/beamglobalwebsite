import { Check, Minus } from "lucide-react";
import type { ServicePackages } from "@/content/services";

/**
 * Feature-comparison table for tiered support packages (e.g. Bronze / Silver /
 * Gold). A crimson tick marks an included service, a muted dash an excluded
 * one. Scrolls horizontally on narrow screens; accessible row/column headers.
 */
export function PackagesTable({ packages }: { packages: ServicePackages }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <caption className="sr-only">Support package comparison</caption>
        <thead>
          <tr className="border-b-2 border-hairline">
            <th scope="col" className="text-eyebrow py-4 pr-6 text-muted">
              Service
            </th>
            {packages.tiers.map((tier) => (
              <th
                scope="col"
                key={tier}
                className="px-4 py-4 text-center font-display text-lg font-bold tracking-tight text-ink"
              >
                {tier}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {packages.rows.map((row) => (
            <tr key={row.label} className="border-b border-hairline">
              <th
                scope="row"
                className="py-4 pr-6 text-left font-normal leading-relaxed text-ink"
              >
                {row.label}
              </th>
              {row.included.map((included, i) => (
                <td key={i} className="px-4 py-4 text-center">
                  {included ? (
                    <Check
                      aria-label="Included"
                      strokeWidth={2.5}
                      className="mx-auto h-5 w-5 text-accent"
                    />
                  ) : (
                    <Minus
                      aria-label="Not included"
                      className="mx-auto h-5 w-5 text-muted-light"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
