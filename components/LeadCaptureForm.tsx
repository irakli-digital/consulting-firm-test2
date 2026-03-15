"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/lib/types";
import type { FormState } from "@/lib/types";
import { submitLead } from "@/app/[lang]/actions";
import Button from "./ui/Button";
import FormField from "./FormField";

export default function LeadCaptureForm({ dict, lang }: { dict: Dictionary; lang: string }) {
  const boundAction = submitLead.bind(null, lang);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    boundAction,
    { success: false, error: null, fieldErrors: {} }
  );

  if (state.success) {
    return (
      <div className="rounded-2xl bg-teal/10 p-8 text-center">
        <svg className="mx-auto mb-4 h-16 w-16 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-semibold text-navy">{dict.form.success}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label={dict.form.firstName}
          name="firstName"
          required
          error={state.fieldErrors?.firstName}
        />
        <FormField
          label={dict.form.lastName}
          name="lastName"
          required
          error={state.fieldErrors?.lastName}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label={dict.form.email}
          name="email"
          type="email"
          required
          error={state.fieldErrors?.email}
        />
        <FormField
          label={dict.form.mobile}
          name="mobile"
          type="tel"
          placeholder="+995 5XX XX XX XX"
          required
          error={state.fieldErrors?.mobile}
        />
      </div>

      <FormField
        label={dict.form.permitType}
        name="permitType"
        error={state.fieldErrors?.permitType}
      >
        <select
          id="permitType"
          name="permitType"
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-navy transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
        >
          <option value="">—</option>
          {dict.form.permitOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label={dict.form.description}
        name="description"
        error={state.fieldErrors?.description}
      >
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-navy transition-colors placeholder:text-slate-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
        />
      </FormField>

      <div className="flex items-start gap-3">
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-teal focus:ring-teal"
        />
        <label htmlFor="privacy" className="text-sm text-slate-600">
          {dict.form.privacy}
        </label>
      </div>
      {state.fieldErrors?.privacy && (
        <p className="text-sm text-red-500">{state.fieldErrors.privacy[0]}</p>
      )}

      {state.error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{state.error}</div>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isPending}>
        {isPending ? dict.form.submitting : dict.form.submit}
      </Button>
    </form>
  );
}
