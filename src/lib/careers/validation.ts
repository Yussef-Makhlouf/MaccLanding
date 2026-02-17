import { z } from "zod";

/* ===============================
   Shared CV Validation
================================ */
const createCvSchema = (t: (key: string) => string) =>
  z
    .instanceof(File, {
      message: t("cvRequired"),
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: t("cvMaxSize"),
    })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      {
        message: t("cvInvalidType"),
      }
    );

/* ===============================
   Application Form Factory
================================ */
export const createApplicationFormSchema = (t: (key: string) => string) =>
  z.object({
    careerId: z.string(),

    fullName: z
      .string()
      .min(1, t("required"))
      .min(2, t("fullNameMin"))
      .max(100, t("fullNameMax")),

    email: z
      .string()
      .min(1, t("required"))
      .email(t("invalidEmail")),

    // Note: countryCode and phone are stored separately in the form
    // but will be combined as "+{countryCode}{phone}" when sent to the backend
    countryCode: z
      .string()
      .min(1, t("selectCountryCode")),

    phone: z
      .string()
      .min(1, t("required"))
      .regex(/^[\d\s\-\(\)]+$/, t("invalidPhone"))
      .refine((value) => {
        const digits = value.replace(/[\s\-\(\)]/g, "");
        return digits.length >= 7 && digits.length <= 15;
      }, {
        message: t("phoneLength"),
      }),

    cv: createCvSchema(t).optional().or(z.undefined()),
  });

/* ===============================
   Types
================================ */
export type ApplicationFormData = z.infer<
  ReturnType<typeof createApplicationFormSchema>
>;