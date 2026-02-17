"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  submitContactForm,
  resetSubmitState,
  selectIsSubmitting,
  selectSubmitSuccess,
  selectSubmitError,
  selectResponseMessage,
} from "@/store/slices/contactSlice";
import {
  ContactFormValues,
  createContactFormSchema,
} from "@/lib/contact/validation";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { CircleAnimatedButton } from "@/components/ui/Button";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CountryCodeSelect } from "./CountryCodeSelect";
import { getCountryCallingCode } from "react-phone-number-input";

export const ContactForm: React.FC = () => {
  const t = useTranslations("Contact.contactForm");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Redux
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(selectIsSubmitting);
  const submitSuccess = useAppSelector(selectSubmitSuccess);
  const submitError = useAppSelector(selectSubmitError);
  const responseMessage = useAppSelector(selectResponseMessage);
  const validationT = useTranslations("Contact.contactForm.validation");

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(createContactFormSchema(validationT)),
    defaultValues: {
      fullName: "",
      companyName: "",
      phoneNumber: "",
      countryCode: "",
      companyEmail: "",
      message: "",
      privacyAccepted: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    // Prepare data for API (exclude privacyAccepted)
    const { privacyAccepted, countryCode, phoneNumber, ...apiData } = data;
    const fullPhoneNumber = `+${getCountryCallingCode(
      countryCode as any,
    )}${phoneNumber.replace(/[\s\-\(\)]/g, "")}`;

    const finalData = {
      ...apiData,
      phoneNumber: fullPhoneNumber,
    };
    try {
      await dispatch(submitContactForm(finalData)).unwrap();

      // Show success toast
      toast.success(responseMessage || t("successMessage"), {
        duration: 4000,
        icon: (
          <svg
            className="h-5 w-5 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        ),
      });

      // Reset form
      reset();
    } catch (error) {
      // Dismiss loading toast if exists
      toast.dismiss();

      // Show error toast
      toast.error(t("errorMessage"), {
        duration: 5000,
        icon: (
          <svg
            className="h-5 w-5 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
        ),
      });

      console.error("❌ Form submission error:", error);
    }
  };

  // Reset state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetSubmitState());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <div className="md:pl-8">
        <h3
          className="text-xl font-bold mb-1"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
          }}
        >
          {t("title")}
        </h3>
        <p
          className="text-gray-500 mb-2 text-sm"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
          }}
        >
          {t("subtitle")}
        </p>
      </div>

      <div className="bg-white rounded-[12px] border-1 border-gray-100 p-8 lg:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label={t("fullName")}
              name="fullName"
              placeholder={t("fullNamePlaceholder")}
              register={register}
              error={errors.fullName}
              isRTL={isRTL}
              icon={
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.18488 9.91667C11.7162 9.91667 13.7682 7.86464 13.7682 5.33333C13.7682 2.80203 11.7162 0.75 9.18488 0.75C6.65358 0.75 4.60156 2.80203 4.60156 5.33333C4.60156 7.86464 6.65358 9.91667 9.18488 9.91667Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.75 19.0832C1.27285 17.2803 2.3523 15.6888 3.83403 14.5364C5.31576 13.384 7.1239 12.7295 9 12.6665C12.7767 12.6665 15.9942 15.334 17.25 19.0832"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <FormInput
              label={t("companyName")}
              name="companyName"
              placeholder={t("companyNamePlaceholder")}
              register={register}
              error={errors.companyName}
              isRTL={isRTL}
              icon={
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.18488 9.91667C11.7162 9.91667 13.7682 7.86464 13.7682 5.33333C13.7682 2.80203 11.7162 0.75 9.18488 0.75C6.65358 0.75 4.60156 2.80203 4.60156 5.33333C4.60156 7.86464 6.65358 9.91667 9.18488 9.91667Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.75 19.0832C1.27285 17.2803 2.3523 15.6888 3.83403 14.5364C5.31576 13.384 7.1239 12.7295 9 12.6665C12.7767 12.6665 15.9942 15.334 17.25 19.0832"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Phone Number with Country Code */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-bold tracking-wider"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                }}
              >
                {t("phoneNumber")} <span className="text-red-500">*</span>
              </label>

              <div className="flex items-end gap-0 relative">
                {/* Country Code Select */}
                <CountryCodeSelect
                  control={control}
                  name="countryCode"
                  isRTL={isRTL}
                  error={!!errors.phoneNumber || !!errors.countryCode}
                />

                {/* Phone Input */}
                <div className="flex-1 relative">
                  <input
                    type="tel"
                    placeholder={t("phoneNumberPlaceholder")}
                    {...register("phoneNumber")}
                    className={`
            w-full py-2
            bg-transparent border-0 border-b
            ${errors.phoneNumber ? "border-red-500" : "border-gray-200"}
            focus:outline-none
            ${
              errors.phoneNumber
                ? "focus:border-red-500"
                : "focus:border-teal-500"
            }
            transition-colors
            placeholder:text-gray-400 placeholder:text-xs md:placeholder:text-sm
            ${isRTL ? "pr-0 text-right" : "pl-0 pr-8 text-left"}
          `}
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                    }}
                  />
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? "left-0" : "right-0"
                    }`}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.60147 2.88938C5.89706 2.79708 6.20375 2.75 6.51251 2.75C7.99662 2.75 9.09617 4.05685 9.09616 5.53475V8.84988C9.09616 10.3278 7.99661 11.6346 6.51251 11.6346C6.20374 11.6346 5.89706 11.5876 5.60147 11.4953L5.3755 11.4247C5.29835 11.4006 5.22244 11.3739 5.14785 11.3447C6.32509 13.7354 8.26458 15.6749 10.6553 16.8522C10.6261 16.7776 10.5994 16.7017 10.5753 16.6245L10.5047 16.3985C10.4124 16.1029 10.3654 15.7963 10.3654 15.4875C10.3654 14.0034 11.6722 12.9038 13.1501 12.9038H16.4653C17.9431 12.9038 19.25 14.0034 19.25 15.4875C19.25 15.7963 19.2029 16.1029 19.1106 16.3985L19.0401 16.6245C18.6291 17.9407 17.4534 18.894 16.0472 19.1418C15.2284 19.286 14.387 19.2861 13.5682 19.1418C13.536 19.1362 13.5039 19.1301 13.4719 19.1237C8.10595 18.0912 3.9087 13.894 2.87633 8.52802C2.86993 8.49606 2.86389 8.46399 2.85821 8.43178C2.71393 7.61301 2.71393 6.77161 2.85821 5.95283C3.10601 4.54657 4.05925 3.37094 5.37551 2.95994L5.60147 2.88938Z"
                        fill="black"
                      />
                      <path
                        d="M12.0196 4.20833C13.6456 3.74504 15.4161 4.13255 16.6414 5.35787C17.8668 6.5832 18.2543 8.3538 17.791 9.97972C17.695 10.3169 17.8904 10.668 18.2275 10.764C18.5645 10.86 18.9156 10.6647 19.0117 10.3276C19.5912 8.29357 19.1149 6.03634 17.539 4.46039C15.963 2.88444 13.7058 2.40814 11.6718 2.98768C11.3347 3.08372 11.1393 3.43483 11.2354 3.7719C11.3314 4.10897 11.6826 4.30437 12.0196 4.20833Z"
                        fill="black"
                      />
                      <path
                        d="M13.6103 6.51518C14.0384 6.4299 14.5808 6.5737 15.0042 6.9971C15.4276 7.4205 15.5715 7.96288 15.4862 8.39109C15.4177 8.73483 15.6409 9.06898 15.9846 9.13744C16.3284 9.20591 16.6625 8.98276 16.731 8.63902C16.906 7.76001 16.5989 6.79674 15.9017 6.09962C15.2046 5.4025 14.2414 5.09533 13.3623 5.2704C13.0186 5.33887 12.7954 5.67302 12.8639 6.01676C12.9324 6.36049 13.2665 6.58365 13.6103 6.51518Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {errors.countryCode?.message && (
                <p
                  className="text-xs text-red-600"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                  }}
                >
                  {errors.countryCode.message}
                </p>
              )}
              {/* Error Message */}
              {errors.phoneNumber && (
                <p
                  className="text-xs text-red-600"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                  }}
                >
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <FormInput
              label={t("companyEmail")}
              name="companyEmail"
              type="email"
              placeholder={t("companyEmailPlaceholder")}
              register={register}
              error={errors.companyEmail}
              isRTL={isRTL}
              icon={
                <svg
                  width="21"
                  height="18"
                  viewBox="0 0 21 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.78781 16.59H16.5878C17.5213 16.59 18.4167 16.2191 19.0768 15.559C19.7369 14.8988 20.1078 14.0036 20.1078 13.07V4.27C20.1078 3.33644 19.7369 2.44106 19.0768 1.78093C18.4167 1.12081 17.5213 0.75 16.5878 0.75H6.02781C5.09425 0.75 4.19892 1.12081 3.53879 1.78093C2.87866 2.44106 2.50781 3.33644 2.50781 4.27V8.66999"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.75 13.9502H9.55002"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.75 11.3105H4.27"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4049 2.53613C14.4681 11.8993 8.13211 11.8905 3.19531 2.53613"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </div>

          <FormTextarea
            label={t("message")}
            name="message"
            placeholder={t("messagePlaceholder")}
            // register={register}
            control={control}
            error={errors.message}
            isRTL={isRTL}
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.77789 7.34299C9.74294 7.30804 9.69859 7.28955 9.64966 7.28955C9.60742 7.28955 9.56337 7.30391 9.53165 7.32819C8.61223 8.03128 7.94228 8.5839 7.03676 9.48949C5.06292 11.4633 3.65252 13.4203 2.95799 15.1489C2.82119 15.4895 2.71663 15.8153 2.64079 16.1263L2.18476 16.5823C2.00895 16.7581 2.00895 17.0442 2.18476 17.22L2.35644 17.3917C2.34283 17.4037 2.32908 17.4153 2.31623 17.4282L0.198367 19.546C0.0380388 19.7063 -0.0284825 19.8903 0.0112048 20.0643C0.0508169 20.2381 0.190549 20.3752 0.40447 20.4501L2.1692 21.0683C2.28127 21.1076 2.40672 21.1274 2.5421 21.1274C2.89808 21.1274 3.26947 20.9862 3.48813 20.7675L4.57179 19.6839C4.58472 19.6709 4.59629 19.6571 4.60824 19.6435L4.78 19.8153C4.86486 19.9002 4.97813 19.9469 5.09885 19.9469C5.21956 19.9469 5.33284 19.9002 5.41777 19.8153L5.87365 19.3594C7.75835 18.8944 10.1494 17.3245 12.5105 14.9633C13.4234 14.0504 13.9793 13.3758 14.6857 12.4501C14.7405 12.3782 14.7341 12.2992 14.6682 12.2332L9.77789 7.34299Z"
                  fill="black"
                />
                <path
                  d="M21.8194 5.4098L16.5897 0.180096C16.4736 0.0639658 16.3255 0 16.1729 0C15.9882 0 15.8162 0.0926037 15.7011 0.254134L14.3105 2.20498C14.12 2.47226 13.7763 2.87838 13.5444 3.11034L11.8854 4.76932C11.6215 5.03307 11.6215 5.46234 11.8854 5.7261L16.2735 10.1142C16.4007 10.2414 16.5707 10.3116 16.7518 10.3116C16.933 10.3116 17.1029 10.2414 17.2302 10.1142L18.8891 8.45513C19.1211 8.22317 19.5272 7.87951 19.7945 7.68904L21.7454 6.29841C21.894 6.1925 21.9835 6.04112 21.9976 5.87207C22.0117 5.70295 21.9484 5.53878 21.8194 5.4098Z"
                  fill="black"
                />
              </svg>
            }
          />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div
              className={`flex items-start gap-3 flex-1 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <input
                type="checkbox"
                id="privacyAccepted"
                {...register("privacyAccepted")}
                className="w-4 h-4 mt-0.5 flex-shrink-0 cursor-pointer accent-green-300 rounded-full"
              />
              <div className="flex-1">
                <label
                  htmlFor="privacyAccepted"
                  className="text-[10px] text-gray-600 cursor-pointer"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t("privacyText")}{" "}
                  <a href="#" className="text-teal-500 hover:underline">
                    {t("privacyLink")}
                  </a>{" "}
                  {t("privacyConsent")}
                </label>
                {errors.privacyAccepted && (
                  <p
                    className="text-xs text-red-600 mt-1"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                    }}
                  >
                    {errors.privacyAccepted.message}
                  </p>
                )}
              </div>
            </div>

            <motion.div
              layoutId="contact-button"
              layout="position"
              transition={{
                layout: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              }}
            >
              <CircleAnimatedButton
                type="submit"
                bgColor="#15AC9E"
                hoverBgColor="#000"
                arrowHoverColor="#fff"
                arrowDirection="right"
                firstArrowBgColor="#fff"
                firstArrowColor="#15AC9E"
                width="160px"
                fontSize="12px"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isRTL ? "جاري الإرسال..." : "Sending..."}
                  </span>
                ) : (
                  t("sendButton")
                )}
              </CircleAnimatedButton>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};
