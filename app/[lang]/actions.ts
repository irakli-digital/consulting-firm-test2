"use server";

import { leadFormSchema } from "@/lib/schemas";
import type { FormState } from "@/lib/types";
import { checkRateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";

const errorMessages = {
  en: {
    unavailable: "Service temporarily unavailable. Please contact us directly.",
    general: "Something went wrong. Please try again or contact us directly.",
  },
  ka: {
    unavailable: "სერვისი დროებით მიუწვდომელია. გთხოვთ დაგვიკავშირდეთ პირდაპირ.",
    general: "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ ხელახლა ან დაგვიკავშირდეთ პირდაპირ.",
  },
} as const;

export async function submitLead(
  lang: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    firstName: (formData.get("firstName") ?? "") as string,
    lastName: (formData.get("lastName") ?? "") as string,
    email: (formData.get("email") ?? "") as string,
    mobile: (formData.get("mobile") ?? "") as string,
    permitType: (formData.get("permitType") ?? "") as string,
    description: (formData.get("description") ?? "") as string,
    privacy: (formData.get("privacy") ?? "") as string,
    honeypot: (formData.get("honeypot") ?? "") as string,
  };

  // Honeypot check
  if (raw.honeypot) {
    // Silently accept to not reveal the honeypot
    return { success: true, error: null, fieldErrors: {} };
  }

  // Rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    const msgs = errorMessages[(lang as "en" | "ka")] || errorMessages.en;
    return {
      success: false,
      error: msgs.unavailable,
      fieldErrors: {},
    };
  }

  const result = leadFormSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      error: null,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("N8N_WEBHOOK_URL is not configured");
    return {
      success: false,
      error: errorMessages[lang as "en" | "ka"]?.unavailable ?? errorMessages.en.unavailable,
      fieldErrors: {},
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": process.env.N8N_WEBHOOK_SECRET || "",
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        ...result.data,
        language: lang,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    // Check if n8n returned an error in the response body
    const responseBody = await response.json().catch(() => null);
    if (responseBody?.error) {
      console.error("n8n workflow error:", responseBody.error);
      throw new Error(`n8n error: ${responseBody.error}`);
    }

    return { success: true, error: null, fieldErrors: {} };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      error: errorMessages[lang as "en" | "ka"]?.general ?? errorMessages.en.general,
      fieldErrors: {},
    };
  }
}
