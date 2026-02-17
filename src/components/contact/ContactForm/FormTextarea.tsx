"use client";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import type { ContactFormValues } from "@/lib/contact/validation";

interface FormTextareaProps {
  label: string;
  name: keyof ContactFormValues;
  placeholder: string;
  icon?: React.ReactNode;
  required?: boolean;
  control: Control<ContactFormValues>;
  error?: FieldError;
  isRTL?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  placeholder,
  required = true,
  icon,
  control,
  error,
  isRTL = false,
}) => {
  const maxChars = 1000;

  return (
    <div className="flex flex-col gap-2" dir={isRTL ? "rtl" : "ltr"}>
      <label
        htmlFor={name}
        className="text-sm font-bold  tracking-wider"
        style={{ ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <textarea
                id={name}
                placeholder={placeholder}
                maxLength={maxChars}
                {...field}
                value={String(field.value || "")} // ← هنا الحل الرئيسي
                className={`
                  w-full
                  py-2
                  bg-transparent
                  border-0
                  border-b
                  ${error ? "border-red-500" : "border-gray-200"}
                  resize-none
                  h-24
                  focus:outline-none
                  ${error ? "focus:border-red-500" : "focus:border-teal-500"}
                  transition-colors
                  placeholder:text-gray-400
                  placeholder:text-sm
                  ${isRTL ? "pr-10 text-right" : "pr-10 text-left"}
                `}
                style={{ ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
              />

              {/* Live Character Counter */}
              <div
                className={`text-xs text-gray-400 mt-1 ${
                  isRTL ? "text-left" : "text-right"
                }`}
                style={{ ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
              >
                {String(field.value || "").length}/{maxChars}
              </div>
            </>
          )}
        />

        {icon && (
          <div
            className={`absolute top-2 text-black ${isRTL ? "left-0" : "right-0"}`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          className="text-xs text-red-600"
          style={{ ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};
