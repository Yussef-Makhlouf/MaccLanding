"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { CircleAnimatedButton } from "../ui/Button";
import { scrollToSection } from "@/utils/scroll";
import { useHistory } from "@/utils/HistoryContext";

const ClientsHero: React.FC = () => {
  const { previousRoute } = useHistory();
  const t = useTranslations("Clients.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Shared transition configuration
  const sharedTransition = {
    layout: {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full md:min-h-[75vh] bg-white flex items-start justify-center pb-8 md:pb-0 pt-16 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.01) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.01) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-[1320px] mx-auto text-center flex flex-col items-center gap-8 md:gap-[50px]">
          {/* Main Heading */}
          <motion.div
            layoutId="mainHeading"
            layout="position"
            transition={sharedTransition}
            className="flex flex-col"
          >
            <h1
              className="font-clash font-normal uppercase text-black"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(2rem, 8vw, 77px)",
                lineHeight: "100%",
                letterSpacing: isRTL ? "0" : "0.08em",
              }}
            >
              {t("titleLine1")}
            </h1>

            <h1
              className="font-clash font-normal uppercase text-black"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(2rem, 8vw, 77px)",
                lineHeight: "100%",
                letterSpacing: isRTL ? "0" : "0.08em",
              }}
            >
              {t("titleLine2")}
            </h1>

            <h2
              className="font-clash font-bold uppercase text-black mt-2"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(2rem, 8vw, 77px)",
                lineHeight: "100%",
                letterSpacing: isRTL ? "0" : "0.08em",
              }}
            >
              {t("titleLine3")}
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            layoutId="mainParagraph"
            layout="position"
            transition={sharedTransition}
            className={`font-clash font-normal text-[#787878] max-w-[1100px] ${isRTL ? "text-right" : "text-center"}`}
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "14px",
              lineHeight: "140%",
              letterSpacing: "0%",
              textAlign: isRTL ? "right" : "center",
            }}
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA Button */}
          <motion.a
            layoutId="ctaSection"
            layout="position"
            transition={sharedTransition}
            href="#clients-section"
            onClick={(e) => scrollToSection(e, "clients-section")}
            className="inline-block"
          >
            <CircleAnimatedButton
              bgColor="#15AC9E"
              hoverBgColor="#000"
              arrowHoverColor="#fff"
              arrowDirection="down"
              firstArrowDirection="down-left"
              firstArrowBgColor="#fff"
              firstArrowColor="#15AC9E"
              width="180px"
            >
              {t("cta")}
            </CircleAnimatedButton>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
};

export default ClientsHero;
