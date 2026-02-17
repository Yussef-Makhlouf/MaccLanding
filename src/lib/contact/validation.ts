import { z } from "zod";

export const createContactFormSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z
      .string()
      .min(1, t("required"))
      .min(2, t("fullNameMin"))
      .max(100, t("fullNameMax")),

    companyName: z
      .string()
      .min(1, t("required"))
      .max(100, t("companyMax")),

    companyEmail: z
      .string()
      .min(1, t("required"))
      .email(t("invalidEmail")),

    countryCode: z
      .string()
      .optional()
      .refine(val => val && val.length > 0, {
        message: t("selectCountryCode"),
      }),

    phoneNumber: z
      .string()
      .min(1, t("required"))
      .regex(/^[\d\s\-\(\)]+$/, t("invalidPhone"))
      .refine(value => {
        const digits = value.replace(/[\s\-\(\)]/g, "");
        return digits.length >= 7 && digits.length <= 15;
      }, {
        message: t("phoneLength"),
      }),

    message: z
      .string()
      .min(1, t("required"))
      .min(10, t("messageMin"))
      .max(1000, t("messageMax")),

    privacyAccepted: z.boolean().refine(val => val === true, {
      message: t("privacy"),
    }),
  });

export type ContactFormValues = z.infer<
  ReturnType<typeof createContactFormSchema>
>;
