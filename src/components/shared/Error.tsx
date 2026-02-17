"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { CircleAnimatedButton } from "@/components/ui/Button";
import { FiAlertTriangle } from "react-icons/fi";
import { useLocale } from "next-intl";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

interface ErrorMessageProps {
  message?: string;
  description?: string;
  retryAction?: () => void;
  retryText?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  description,
  retryAction,
  retryText,
}) => {
  const t = useTranslations("Common.error");
  const locale = useLocale() as "ar" | "en";
  const isRTL = locale === "ar";

  const defaultMessage = isRTL ? "حدث خطأ ما!" : "Something went wrong!";
  const defaultDesc = isRTL
    ? "نعتذر عن الإزعاج. يرجى المحاولة مرة أخرى."
    : "We apologize for the inconvenience. Please try again.";
  const defaultRetry = isRTL ? "إعادة المحاولة" : "Try again";

  return (
    <div className="flex justify-center items-center min-h-[400px] w-full">
      <div className="text-center space-y-4 px-4 flex flex-col items-center">
        <FiAlertTriangle className="text-5xl mb-4 text-gray-400" />
        <h2
          className="text-xl font-semibold text-gray-800"
          style={{ ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
        >
          {message || t("title") || defaultMessage}
        </h2>
        <p
          className="text-gray-500 max-w-md mx-auto mb-6"
          style={{ ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
        >
          {description || t("description") || defaultDesc}
        </p>

        {retryAction && (
          <CircleAnimatedButton
            onClick={retryAction}
            bgColor="#15AC9E"
            hoverBgColor="#000"
            textColor="#fff"
            width="160px"
            firstArrowBgColor="#fff"
            firstArrowColor="#15AC9E"
          >
            {retryText || t("retry") || defaultRetry}
          </CircleAnimatedButton>
        )}
      </div>
    </div>
  );
};

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <ErrorMessage retryAction={reset} />
    </div>
  );
};

export default Error;
