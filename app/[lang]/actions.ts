"use server";

import { leadFormSchema } from "@/lib/schemas";
import type { FormState } from "@/lib/types";

export async function submitLead(
  lang: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    mobile: formData.get("mobile") as string,
    permitType: formData.get("permitType") as string,
    description: formData.get("description") as string,
    privacy: formData.get("privacy") as string,
    honeypot: formData.get("honeypot") as string,
  };

  // Honeypot check
  if (raw.honeypot) {
    // Silently accept to not reveal the honeypot
    return { success: true, error: null, fieldErrors: {} };
  }

  const result = leadFormSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      error: null,
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("N8N_WEBHOOK_URL is not configured");
    return {
      success: false,
      error: "Service temporarily unavailable. Please contact us directly.",
      fieldErrors: {},
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...result.data,
        language: lang,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    return { success: true, error: null, fieldErrors: {} };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again or contact us directly.",
      fieldErrors: {},
    };
  }
}
