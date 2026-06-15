"use server";

import { z } from "zod";

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
  // INTEGRATION POINT: wire a real email provider here.
  // e.g. Resend / SMTP / a CRM webhook. Credentials are NOT wired.
  //
  //   await resend.emails.send({
  //     from: "website@beamglobalservices.com",
  //     to: "support@beamglobalservices.com",
  //     subject: `New enquiry from ${parsed.data.name}`,
  //     text: parsed.data.message,
  //   });
  //
  // For now we validate and return success. (No data is persisted.)
  // ───────────────────────────────────────────────────────────

  return {
    status: "success",
    message: "Thank you, your message has been received. We'll be in touch shortly.",
  };
}
