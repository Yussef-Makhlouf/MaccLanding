"use client";
import React, { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Modal from "../ui/modal/Modal";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const t = useTranslations("Career.successModal");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Auto close after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="500px" isRTL={isRTL}>
      <div
        className="p-8 md:p-12 text-center space-y-6"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-56 h-56 opacity-[0.08]">
            <Image
              src="/images/logo-aqua.svg"
              alt="Background"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="flex justify-center"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <FiCheckCircle className="text-6xl text-primary" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h2
            className="text-primary"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: "bold",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="text-[#787878] text-lg"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
          >
            {t("subtitle")}
          </p>
        </motion.div>
      </div>
    </Modal>
  );
};

export default SuccessModal;