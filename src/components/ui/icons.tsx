import type { SVGProps } from "react";

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      aria-hidden
      {...props}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      aria-hidden
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      aria-hidden
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.5l1.9 5.2a4 4 0 0 0 2.4 2.4L21.5 12l-5.2 1.9a4 4 0 0 0-2.4 2.4L12 21.5l-1.9-5.2a4 4 0 0 0-2.4-2.4L2.5 12l5.2-1.9a4 4 0 0 0 2.4-2.4L12 2.5z" />
    </svg>
  );
}

export function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      aria-hidden
      {...props}
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
