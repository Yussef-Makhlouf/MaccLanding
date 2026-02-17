"use client";
import React from "react";
import { Controller, Control } from "react-hook-form";
import { CountryCodeSelect } from "./CountryCodeSelect";

interface PhoneInputProps {
  control: Control<any>;
  countryCodeName: string;
  phoneNumberName: string;
  label?: string;
  error?: string;
  required?: boolean;
  isRTL?: boolean;
  placeholder?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  control,
  countryCodeName,
  phoneNumberName,
  label,
  error,
  required = false,
  isRTL = false,
  placeholder,
}) => {
  const labelPosition = isRTL ? "right-6" : "left-6";
  const errorAlignment = isRTL ? "mr-2" : "ml-2";

  return (
    <div className="relative z-40" dir={isRTL ? "rtl" : "ltr"}>
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

      {/* Combined Input Container */}
      <div
        className={`
          flex items-stretch
          border-2 rounded-[30px]
          ${error ? "border-red-500" : "border-gray-200"}
          focus-within:border-primary
          transition-all duration-300
          bg-white
          overflow-visible
        `}
      >
        {/* Country Code Select */}
        <CountryCodeSelect
          control={control}
          name={countryCodeName}
          isRTL={isRTL}
          error={!!error}
        />

        {/* Divider */}
        <div className="w-px bg-gray-200 self-stretch" />

        {/* Phone Number Input */}
        <Controller
          name={phoneNumberName}
          control={control}
          rules={{
            required: required,
            pattern: {
              value: /^[0-9]{6,15}$/,
              message: isRTL ? "رقم الهاتف غير صحيح" : "Invalid phone number",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="tel"
              placeholder={placeholder}
              className={`
                flex-1
                px-6 py-3
                focus:outline-none
                bg-transparent
                text-base
                placeholder:text-gray-400
                ${isRTL ? "text-right" : "text-left"}
              `}
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
            />
          )}
        />
      </div>

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