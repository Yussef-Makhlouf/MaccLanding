"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { CircleAnimatedButton } from "../ui/Button";

interface CareerCTAProps {
  onApply?: () => void;
}

const CareerCTA: React.FC<CareerCTAProps> = ({ onApply }) => {
  const t = useTranslations("Career.cta");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const handleButtonClick = () => {
    onApply?.();
  };

  return (
    <>
      <section
        className="w-full py-4 md:py-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #000000 0%, #15AC9E 100%)",
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className="text-white"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                    fontSize: "clamp(24px, 5vw, 48px)",
                    fontWeight: "bold",
                  }}
                >
                  {t("title")}
                </h2>
              </motion.div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <p
                  className="text-white text-base md:text-xl leading-relaxed"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                    lineHeight: "250%",
                    letterSpacing: isRTL ? "0" : "2px",
                  }}
                >
                  {t("description")}
                </p>
              </motion.div>
            </div>

            {/* Bottom CTA - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 lg:mt-16 flex flex-col md:flex-row items-center justify-center gap-8 p-6 md:p-8"
            >
              <p
                className="text-white text-lg md:text-xl lg:text-xl font-medium text-center md:text-left"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                }}
              >
                {t("bottomText")}
              </p>

              <div onClick={handleButtonClick}>
                <CircleAnimatedButton
                  bgColor="#fff"
                  hoverBgColor="#15AC9E"
                  fontSize="12px"
                  textColor="#000"
                  hoverColor="#fff"
                  firstArrowBgColor="#000"
                  firstArrowColor="#fff"
                  arrowHoverColor="#fff"
                  width="200px"
                >
                  {t("button")}
                </CircleAnimatedButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerCTA;
