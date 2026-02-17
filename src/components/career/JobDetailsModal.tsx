"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Modal from "../ui/modal/Modal";
import { CircleAnimatedButton } from "../ui/Button";
import { FiMapPin, FiBriefcase, FiClock, FiCheckCircle } from "react-icons/fi";
import type { Career } from "@/lib/careers/types";
import parse from 'html-react-parser';


interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  career: Career | null;
  onApply: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  onClose,
  career,
  onApply,
}) => {
  const t = useTranslations("Career.jobDetails");
  const locale = useLocale();
  const isRTL = locale === "ar";

  if (!career) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={career.title}
      maxWidth="380px"
      isRTL={isRTL}
    >
      <div
        className="px-6 pt-4 space-y-3 max-h-[70vh] overflow-y-auto"
        dir={isRTL ? "rtl" : "ltr"}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#15AC9E #f5f5f5",
        }}
      >
        {/* Job Meta Info - Compact Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <FiMapPin className="text-primary text-xl mb-1" />
            <span
              className="text-xs text-gray-600 font-medium"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {career.location}
            </span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <FiBriefcase className="text-primary text-xl mb-1" />
            <span
              className="text-xs text-gray-600 font-medium"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {career.department}
            </span>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <FiClock className="text-primary text-xl mb-1" />
            <span
              className="text-xs text-gray-600 font-medium"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {career.employmentType}
            </span>
          </div>
        </div>

        {/* Description - Modern Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4">
          <h3
            className="text-base font-bold mb-2 text-gray-900 flex items-center gap-2"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
            }}
          >
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            {t("description")}
          </h3>
          <div
            className="text-sm text-gray-700 leading-relaxed"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
            }}
          >
            {parse(career.description)}
          </div>
        </div>

        {/* Responsibilities - Modern List with Icons */}
        <div>
          <h3
            className="text-base font-bold mb-3 text-gray-900 flex items-center gap-2"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
            }}
          >
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            {t("responsibilities")}
          </h3>
          <div className="space-y-2">
            {(() => {
              const list = Array.isArray(career.responsibilities)
                ? career.responsibilities
                : typeof career.responsibilities === "string"
                  ? (career.responsibilities as string)
                    .split(/\r?\n/)
                    .filter((item) => item.trim() !== "")
                  : [];

              return list.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors ${isRTL ? "flex-row-reverse" : ""
                    }`}
                >
                  <FiCheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span
                    className="text-sm text-gray-700"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                    }}
                  >
                    {item}
                  </span>
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Requirements - Modern List with Icons */}
        <div>
          <h3
            className="text-base font-bold mb-3 text-gray-900 flex items-center gap-2"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
            }}
          >
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            {t("requirements")}
          </h3>
          <div className="space-y-2">
            {(() => {
              const list = Array.isArray(career.requirements)
                ? career.requirements
                : typeof career.requirements === "string"
                  ? (career.requirements as string)
                    .split(/\r?\n/)
                    .filter((item) => item.trim() !== "")
                  : [];

              return list.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors ${isRTL ? "flex-row-reverse" : ""
                    }`}
                >
                  <FiCheckCircle className="text-primary flex-shrink-0 mt-0.5" size={16} />
                  <span
                    className="text-sm text-gray-700"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                    }}
                  >
                    {item}
                  </span>
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Apply Button - Sticky Bottom */}
        <div className="sticky bottom-0 left-0 right-0 bg-white pt-4 pb-2 border-t border-gray-200 -mx-6 px-6">
          <div className="flex justify-center">
            <CircleAnimatedButton
              onClick={onApply}
              bgColor="#15AC9E"
              hoverBgColor="#000"
              firstArrowBgColor="#fff"
              firstArrowColor="#15AC9E"
              arrowHoverColor="#fff"
              fontSize="11px"
              width="200px"
              height="42px"
            >
              {t("applyButton")}
            </CircleAnimatedButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JobDetailsModal;