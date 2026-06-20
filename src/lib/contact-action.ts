"use server";

import { z } from "zod";
import { appendContactToSheet } from "./contact-sheet";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address.").trim(),
  company: z.string().trim().optional().default(""),
  message: z.string().trim().min(10, "Please tell us a little more (10+ characters)."),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string>>;
  values?: { name: string; email: string; company: string; message: string };
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot, silently succeed for bots.
  if (String(formData.get("website") ?? "")) {
    return { status: "success", message: "Thank you, we'll be in touch shortly." };
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof ContactSchema>;
      if (!errors[key]) errors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors,
      values: raw,
    };
  }

  // ───────────────────────────────────────────────────────────
  // Persist the enquiry to a Google Sheet (via an Apps Script web app).
  // Setup: docs/contact-sheet-setup.md. Configured with CONTACT_SHEET_WEBHOOK_URL.
  // ───────────────────────────────────────────────────────────
  const result = await appendContactToSheet(parsed.data);
  const isProduction = process.env.NODE_ENV === "production";

  // Honest failure shown to the visitor, never a false "received". Keeps what
  // they typed so they can retry, and points them to email as a fallback.
  const failure: ContactState = {
    status: "error",
    message:
      "Sorry, we couldn’t send your message just now. Please email us directly at support@beamglobalservices.com, or try again in a moment.",
    values: raw,
  };

  if (!result.ok && result.reason === "request-failed") {
    // Storage is wired but the write failed (a rare transient network / Apps
    // Script issue). Log the full enquiry so this lead stays recoverable from
    // server logs, the one place we deliberately accept PII in logs, because
    // the alternative is losing a genuine lead. (Ensure your host's log
    // retention reflects this; see docs/contact-sheet-setup.md.)
    console.error(
      "[contact] Google Sheet write failed; enquiry NOT stored, recover from this log:",
      JSON.stringify(parsed.data),
    );
    return failure;
  }

  if (!result.ok && result.reason === "not-configured") {
    if (isProduction) {
      // Storage was never wired in production. Fail loudly rather than silently
      // drop leads behind a false confirmation. No enquiry data is logged here
      // (this could fire on every submission); the visitor's email fallback is
      // the recovery path.
      console.error(
        "[contact] CONTACT_SHEET_WEBHOOK_URL / CONTACT_SHEET_SECRET not set in production, storage disabled. See docs/contact-sheet-setup.md.",
      );
      return failure;
    }
    // Local dev / demo: keep the form usable without storage. No enquiry data
    // is logged. See docs/contact-sheet-setup.md to enable persistence.
    console.warn(
      "[contact] Contact storage not configured (dev), enquiry not persisted.",
    );
  }

  return {
    status: "success",
    message: "Thank you, your message has been received. We'll be in touch shortly.",
  };
}
