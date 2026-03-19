"use server";

import { leadFormSchema } from "@/lib/schemas";
import type { FormState } from "@/lib/types";
import { checkRateLimit } from "@/lib/rateLimit";
import { getDb } from "@/lib/db";
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
  console.log("=== STEP 1: SERVER ACTION CALLED ===");

  try {
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

    console.log("=== STEP 2: RAW DATA ===", JSON.stringify(raw));

    // Honeypot check
    if (raw.honeypot) {
      console.log("=== HONEYPOT TRIGGERED ===");
      return { success: true, error: null, fieldErrors: {} };
    }

    // Rate limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    console.log("=== STEP 3: RATE LIMIT CHECK, IP:", ip, "===");
    if (!checkRateLimit(ip)) {
      console.log("=== RATE LIMITED ===");
      const msgs = errorMessages[(lang as "en" | "ka")] || errorMessages.en;
      return { success: false, error: msgs.unavailable, fieldErrors: {} };
    }

    const result = leadFormSchema.safeParse(raw);
    console.log("=== STEP 4: VALIDATION ===", result.success ? "PASSED" : "FAILED");

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      console.log("=== VALIDATION ERRORS ===", JSON.stringify(errors));
      return { success: false, error: null, fieldErrors: errors };
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    console.log("=== STEP 5: WEBHOOK URL ===", webhookUrl);

    if (!webhookUrl) {
      console.error("=== NO WEBHOOK URL ===");
      return {
        success: false,
        error: errorMessages[lang as "en" | "ka"]?.unavailable ?? errorMessages.en.unavailable,
        fieldErrors: {},
      };
    }

    const payload = {
      ...result.data,
      language: lang,
      submittedAt: new Date().toISOString(),
    };

    // Save to database
    console.log("=== STEP 6: SAVING TO DATABASE ===");
    const sql = getDb();
    await sql.query(
      `INSERT INTO leads (first_name, last_name, email, mobile, permit_type, description, language, submitted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        result.data.firstName,
        result.data.lastName,
        result.data.email,
        result.data.mobile,
        result.data.permitType || null,
        result.data.description || null,
        lang,
        new Date().toISOString(),
      ]
    );
    console.log("=== STEP 7: SAVED TO DATABASE ===");

    // Send to webhook
    console.log("=== STEP 8: SENDING TO WEBHOOK ===", JSON.stringify(payload));

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify(payload),
    });

    console.log("=== STEP 9: WEBHOOK RESPONSE ===", response.status);

    if (!response.ok) {
      console.error("=== WEBHOOK NON-OK STATUS ===", response.status);
      throw new Error(`Webhook returned ${response.status}`);
    }

    const responseBody = await response.text();
    console.log("=== STEP 10: RESPONSE BODY ===", responseBody);

    return { success: true, error: null, fieldErrors: {} };
  } catch (error) {
    console.error("=== ACTION ERROR ===", error);
    return {
      success: false,
      error: errorMessages[lang as "en" | "ka"]?.general ?? errorMessages.en.general,
      fieldErrors: {},
    };
  }
}
