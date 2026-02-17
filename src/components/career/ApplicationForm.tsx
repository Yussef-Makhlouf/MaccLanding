"use client";
import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCountryCallingCode } from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import Modal from "../ui/modal/Modal";
import { FiUpload, FiCheck, FiFileText, FiX } from "react-icons/fi";
import { CircleAnimatedButton } from "../ui/Button";
import CustomInput from "../ui/input/CustomInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { submitApplication, submitGeneralApplication, resetApplicationState } from "@/store/slices/careersSlice";
import {
  createApplicationFormSchema,
  type ApplicationFormData
} from "@/lib/careers/validation";
import { PhoneInput } from "./PhoneInput";
import toast from "react-hot-toast";

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  careerId?: string;
  jobTitle?: string;
  isGeneralApplication?: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  isOpen,
  onClose,
  careerId,
  jobTitle,
  isGeneralApplication = false,
}) => {
  const t = useTranslations("Career.applicationForm");
  const tCta = useTranslations("Career.cta");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const dispatch = useAppDispatch();

  const { applicationSubmitting } = useAppSelector(
    (state) => state.careers
  );

  const [cvFile, setCvFile] = useState<File | null>(null);

  // Create schema with translation function
  const schema = createApplicationFormSchema((key: string) =>
    t(`validation.${key}`)
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      careerId: careerId || "",
      fullName: "",
      email: "",
      countryCode: "",
      phone: "",
    },
  });

  // Update careerId when it changes
  useEffect(() => {
    if (careerId) {
      setValue("careerId", careerId);
    }
  }, [careerId, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setValue("cv", file);
    }
  };

  const handleRemoveCV = () => {
    setCvFile(null);

    const fileInput = document.getElementById("cv-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setValue("cv", undefined as any, { shouldValidate: true });
  };

  const onSubmit = async (data: ApplicationFormData) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);

    const countryCode = getCountryCallingCode(data.countryCode as Country);
    const fullPhone = `+${countryCode}${data.phone}`;
    formData.append("phone", fullPhone);

    formData.append("cv", data.cv as File);

    try {
      // Use general application endpoint if no careerId or isGeneralApplication is true
      if (isGeneralApplication || !careerId) {
        await dispatch(submitGeneralApplication(formData)).unwrap();
      } else {
        formData.append("careerId", data.careerId);
        await dispatch(submitApplication(formData)).unwrap();
      }

      // Show success toast
      toast.success(
        t("successMessage"),
        {
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
        }
      );

      // Reset form and close modal after delay
      setTimeout(() => {
        reset();
        setCvFile(null);
        onClose();
      }, 1500);
    } catch (error: any) {
      // Dismiss any existing toasts
      toast.dismiss();

      // Show error toast
      toast.error(
        t("errorMessage"),
        {
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
        }
      );

      console.error("❌ Form submission error:", error);
    }
  };

  const handleClose = () => {
    reset();
    setCvFile(null);
    dispatch(resetApplicationState());
    onClose();
  };

  // Reset state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetApplicationState());
    };
  }, [dispatch]);

  // Determine modal title based on application type
  const modalTitle = isGeneralApplication ? tCta("title") : t("title");

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle}
      maxWidth="400px"
      isRTL={isRTL}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-4 md:px-8 space-y-4"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Show job title only for specific job applications */}
        {jobTitle && !isGeneralApplication && (
          <div
            className={` text-gray-600 mb-4 ${isRTL ? "text-right" : "text-left"}`}
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
            }}
          >
            {t("applyingFor")}: <span className="font-semibold">{jobTitle}</span>
          </div>
        )}

        {/* Full Name */}
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              label={t("fullName")}
              placeholder={t("fullNamePlaceholder")}
              error={errors.fullName?.message}
              required
              isRTL={isRTL}
            />
          )}
        />

        {/* Phone Number with Country Code */}
        <PhoneInput
          control={control}
          countryCodeName="countryCode"
          phoneNumberName="phone"
          label={t("phoneNumber")}
          placeholder={t("phoneNumberPlaceholder")}
          error={errors.phone?.message || errors.countryCode?.message}
          required
          isRTL={isRTL}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              label={t("email")}
              type="email"
              placeholder={t("emailPlaceholder")}
              error={errors.email?.message}
              required
              isRTL={isRTL}
            />
          )}
        />

        {/* CV Upload */}
        <div>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="cv-upload"
            />
            <label
              htmlFor="cv-upload"
              className={`
                flex flex-col items-center justify-center 
                w-full h-42 
                border-2 border-dashed rounded-3xl 
                cursor-pointer transition-colors bg-[#F5F5F5]
                ${errors.cv ? "border-red-500 hover:border-red-600" : "border-gray-300 hover:border-primary"}
              `}
            >
              <div className="flex flex-col items-center gap-2 text-gray-500 py-6">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <FiUpload className="text-xl text-gray-400" />
                </div>
                <p
                  className="font-medium text-base"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                  }}
                >
                  {t("uploadCV")}
                </p>
                <p
                  className="text-xs text-gray-400"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                  }}
                >
                  {t("uploadSubtext")}
                </p>
              </div>
            </label>
          </div>

          {errors.cv && (
            <p
              className={`text-red-500 text-sm mt-2 ${isRTL ? "mr-2" : "ml-2"}`}
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {errors.cv.message as string}
            </p>
          )}

          {cvFile && (
            <div
              className={`mt-4 flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-2xl border border-gray-200 ${isRTL ? "flex-row-reverse" : ""
                }`}
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shrink-0">
                <FiFileText className="text-white text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-medium text-sm truncate"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                  }}
                >
                  {cvFile.name}
                </p>
                <p className="text-xs text-gray-500 uppercase">
                  {cvFile.name.split(".").pop()} • {(cvFile.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveCV}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors group"
              >
                <FiX className="text-gray-400 group-hover:text-red-500 text-xl" />
              </button>
              <div className="shrink-0 w-8 h-8 bg-[#15AC9E] rounded-full flex items-center justify-center">
                <FiCheck className="text-white text-lg" />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-2">
          <CircleAnimatedButton
            type="submit"
            bgColor="#15AC9E"
            hoverBgColor="#000"
            firstArrowBgColor="#fff"
            firstArrowColor="#15AC9E"
            arrowHoverColor="#fff"
            fontSize="12px"
            width="180px"
            disabled={applicationSubmitting}
          >
            {applicationSubmitting ? (
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
                {t("submitting")}
              </span>
            ) : (
              t("submit")
            )}
          </CircleAnimatedButton>
        </div>
      </form>
    </Modal>
  );
};

export default ApplicationForm;