"use client";
import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import type { ContactFormValues } from "@/lib/contact/validation";

interface FormInputProps {
  label: string;
  name: keyof ContactFormValues;
  type?: "text" | "email" | "tel";
  placeholder: string;
  icon?: React.ReactNode;
  required?: boolean;
  register: UseFormRegister<ContactFormValues>;
  error?: FieldError;
  isRTL?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  required = true,
  register,
  error,
  isRTL = false,
}) => {
  return (
    <div className="flex flex-col gap-2" dir={isRTL ? "rtl" : "ltr"}>
      <label
        htmlFor={name}
        className="text-sm font-bold tracking-wider"
        style={{
          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`
            w-full
            py-2
            bg-transparent
            border-0
            border-b
            ${error ? "border-red-500" : "border-gray-200"}
            focus:outline-none
            ${error ? "focus:border-red-500" : "focus:border-teal-500"}
            transition-colors
            placeholder:text-gray-400
            placeholder:text-sm
            ${isRTL ? "pr-10 text-right" : "pr-10 text-left"}
          `}
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
          }}
        />

        {icon && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 text-black ${
              isRTL ? "left-0" : "right-0"
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          className="text-xs text-red-600"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
          }}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};
