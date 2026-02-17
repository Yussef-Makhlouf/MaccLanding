"use client";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  variant?: "default" | "textarea";
  rows?: number;
  containerClassName?: string;
  isRTL?: boolean; // NEW: RTL support
}

interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  variant: "textarea";
  containerClassName?: string;
  isRTL?: boolean; // NEW: RTL support
}

type InputProps = CustomInputProps | CustomTextareaProps;

const CustomInput: React.FC<InputProps> = ({
  label,
  error,
  required = false,
  variant = "default",
  containerClassName = "",
  className = "",
  placeholder,
  isRTL = false, // NEW: Default to false (LTR)
  ...props
}) => {
  const baseInputStyles = `
    w-full
    px-6
    py-3
    border-2
    border-gray-200
    rounded-[30px]
    focus:outline-none
    focus:border-primary
    transition-all
    duration-300
    bg-white
    text-base
    placeholder:text-gray-400
    placeholder:text-base
  `;

  const textareaStyles = `
    ${baseInputStyles}
    resize-none
    min-h-[120px]
  `;

  const errorStyles = error
    ? "border-red-500 focus:border-red-500"
    : "border-gray-200";

  // RTL-specific styles
  const rtlStyles = isRTL ? "text-right" : "text-left";
  const labelPosition = isRTL ? "right-6" : "left-6";
  const errorAlignment = isRTL ? "mr-2" : "ml-2";

  return (
    <div
      className={`relative ${containerClassName}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Label positioned ON the border */}
      {label && (
        <div className={`absolute ${labelPosition} -top-2.5 z-10`}>
          <span
            className="inline-block px-2 text-sm font-medium text-gray-900 bg-white"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
          >
            {label}
            {required && (
              <span className={`text-red-500 ${isRTL ? "mr-1" : "ml-1"}`}>
                *
              </span>
            )}
          </span>
        </div>
      )}

      {/* Input or Textarea */}
      {variant === "textarea" ? (
        <textarea
          className={`${textareaStyles} ${errorStyles} ${rtlStyles} ${className}`}
          placeholder={placeholder}
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={`${baseInputStyles} ${errorStyles} ${rtlStyles} ${className}`}
          placeholder={placeholder}
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {/* Error Message */}
      {error && (
        <p
          className={`text-red-500 text-sm mt-2 ${errorAlignment}`}
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
