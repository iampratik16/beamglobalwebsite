"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/lib/contact-action";
import { ArrowRight } from "@/components/ui/icons";

const initialState: ContactState = { status: "idle" };

const fieldBase =
  "w-full border border-hairline bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const v = state.values;

  if (state.status === "success") {
    return (
      <div className="border border-hairline bg-paper-alt p-8 lg:p-10">
        <p className="text-eyebrow text-accent">Message sent</p>
        <h3 className="text-h3 mt-3 text-ink">Thank you.</h3>
        <p className="mt-3 text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {state.status === "error" && state.message && (
        <p role="alert" className="border-l-2 border-accent bg-accent-soft px-4 py-3 text-sm text-accent-ink">
          {state.message}
        </p>
      )}

      <Field id="name" label="Full name" error={state.errors?.name}>
        <input id="name" name="name" type="text" autoComplete="name" defaultValue={v?.name} className={fieldBase} required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={state.errors?.email}>
          <input id="email" name="email" type="email" autoComplete="email" defaultValue={v?.email} className={fieldBase} required />
        </Field>
        <Field id="company" label="Company" optional error={state.errors?.company}>
          <input id="company" name="company" type="text" autoComplete="organization" defaultValue={v?.company} className={fieldBase} />
        </Field>
      </div>

      <Field id="message" label="How can we help?" error={state.errors?.message}>
        <textarea id="message" name="message" rows={5} defaultValue={v?.message} className={`${fieldBase} resize-y`} required />
      </Field>

      {/* Honeypot — hidden from users */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <SubmitButton />
      <p className="text-xs text-muted">
        By submitting, you agree to be contacted about your enquiry. We never share your details.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group/btn inline-flex w-fit items-center gap-2.5 bg-accent px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-accent-ink disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
    </button>
  );
}
