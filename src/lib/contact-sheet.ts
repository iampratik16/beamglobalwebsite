/**
 * Server-side persistence for contact enquiries.
 *
 * Each validated submission is appended as a row in a Google Sheet via a Google
 * Apps Script web app (see docs/contact-sheet-setup.md for the script and the
 * one-time deployment steps). Deliberately dependency-free: a single POST to the
 * deployed `/exec` URL, guarded by a shared secret, with a hard timeout that
 * bounds how long a slow Apps Script can hold the visitor's submit (never
 * indefinitely).
 *
 * This module is only ever imported by the "use server" contact action, so it
 * never reaches the client bundle.
 */

export type ContactRecord = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type SheetResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "request-failed" };

// Upper bound on how long the visitor's submit is held while we wait for Apps
// Script (which normally replies in well under a second). Kept comfortably
// below typical serverless function wall-clock limits so this AbortController,
// not the platform, is what fires on a hang, preserving the crafted error UX.
// If your host's function timeout is low, raise it above this (e.g. a route
// `maxDuration`); see docs/contact-sheet-setup.md.
const TIMEOUT_MS = 8_000;

export async function appendContactToSheet(
  record: ContactRecord,
): Promise<SheetResult> {
  const url = process.env.CONTACT_SHEET_WEBHOOK_URL?.trim();
  const secret = process.env.CONTACT_SHEET_SECRET?.trim();
  // Require BOTH the endpoint and a non-empty shared secret. Sending a blank
  // secret would be rejected by the (fail-closed) Apps Script anyway, so we
  // treat a missing secret as "not configured" rather than firing a request
  // that can never succeed.
  if (!url || !secret) return { ok: false, reason: "not-configured" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Verified inside the Apps Script; rejects requests without the secret.
        secret,
        submittedAt: new Date().toISOString(),
        name: record.name,
        email: record.email,
        company: record.company,
        message: record.message,
      }),
      signal: controller.signal,
      // A submission is a mutation, never serve or store a cached response.
      cache: "no-store",
      // Apps Script 302-redirects to googleusercontent.com for the real reply.
      redirect: "follow",
    });

    if (!res.ok) return { ok: false, reason: "request-failed" };

    // Only an explicit { ok: true } from our Apps Script counts as success.
    // A misconfigured deployment (e.g. one that requires Google sign-in) returns
    // an HTML login page, so JSON parsing fails, which we correctly treat as a
    // failed write rather than a false positive.
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!data || data.ok !== true) return { ok: false, reason: "request-failed" };

    return { ok: true };
  } catch {
    // Network error, DNS failure, or the AbortController timeout firing.
    return { ok: false, reason: "request-failed" };
  } finally {
    clearTimeout(timer);
  }
}
