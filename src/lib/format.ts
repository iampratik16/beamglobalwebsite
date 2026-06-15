const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Format an ISO date (YYYY-MM-DD) as "15 April 2025" without constructing a
 * Date object — fully deterministic, SSR-safe, no timezone drift.
 */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map((n) => parseInt(n, 10));
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}
