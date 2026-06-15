"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Close } from "@/components/ui/icons";

const STORAGE_KEY = "beam-cookie-consent";

/**
 * GDPR-style cookie notice. Dismissible. No tracking is wired, this only
 * records the dismissal in localStorage (read in useEffect, never at render,
 * to avoid hydration mismatches).
 */
export function CookieBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable, dismiss for this session only */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-hairline-dark bg-ink text-paper"
    >
      <div className="container-page flex flex-col items-start gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-paper/70">
          We use essential cookies to make this site work. With your consent, we may
          also use cookies to understand how the site is used and improve it. See our{" "}
          <Link href="/cookies" className="link-underline text-paper">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => dismiss("declined")}
            className="border border-paper/30 px-4 py-2 text-sm font-semibold transition-colors hover:bg-paper/10"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="bg-accent px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink"
          >
            Accept
          </button>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => dismiss("declined")}
            className="text-paper/60 hover:text-paper"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
