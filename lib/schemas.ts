import { z } from "zod";

export const leadFormSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  mobile: z
    .string()
    .regex(/^\+995\s?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}$/, "Format: +995 5XX XX XX XX"),
  permitType: z.string().optional(),
  description: z.string().optional(),
  privacy: z.literal("on", { error: "Required" }),
  honeypot: z.string().max(0).optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
