"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Modal from "../ui/modal/Modal";
import { CircleAnimatedButton } from "../ui/Button";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  onAccept,
}) => {
  const t = useTranslations("Career.privacyModal");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      onAccept();
      onClose();
      setIsChecked(false); // Reset for next time
    }
  };

  return (
    <Modal
      maxWidth="720px"
      isOpen={isOpen}
      onClose={onClose}
      title={t("title")}
      isRTL={isRTL}
    >
      <div
        className="p-6 md:p-8 space-y-6 flex flex-col justify-content-between items-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Main Content */}
        <div className="text-center space-y-4">
          <h2
            className="whitespace-pre-line"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: "normal",
            }}
          >
            {t("heading")}
          </h2>

          <div
            className="space-y-2 text-[#787878] text-sm"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
          >
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
          </div>
        </div>

        {/* Checkbox */}
        <div
          className={`flex items-start gap-3 p-4 bg-[#F5F5F5] rounded-xl ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <input
            type="checkbox"
            id="privacy-check"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-1 w-5 h-5 accent-primary cursor-pointer"
          />
          <label
            htmlFor="privacy-check"
            className={`text-sm cursor-pointer ${isRTL ? "text-right" : "text-left"}`}
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
          >
            {t("checkboxText")}{" "}
            <a href="#" className="text-primary font-semibold hover:underline">
              {t("terms")}
            </a>{" "}
            &{" "}
            <a href="#" className="text-primary font-semibold hover:underline">
              {t("privacy")}
            </a>
            .
          </label>
        </div>

        {/* Button */}
        <CircleAnimatedButton
          onClick={handleAccept}
          firstArrowBgColor="#fff"
          firstArrowColor="#000"
          width="200px"
          fontSize="12px"
        >
          {t("button")}
        </CircleAnimatedButton>
      </div>
    </Modal>
  );
};

export default PrivacyModal;