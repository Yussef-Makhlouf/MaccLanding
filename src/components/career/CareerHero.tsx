"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useHistory } from "@/utils/HistoryContext";
import { User } from "lucide-react";

interface CareerHeroProps {
  isModalOpen?: boolean;
}

const CareerHero: React.FC<CareerHeroProps> = ({ isModalOpen = false }) => {
  const { previousRoute } = useHistory();
  const t = useTranslations("Career.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Shared transition configuration
  const sharedTransition = {
    layout: {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  };

  const textVariants = {
    closed: { x: 0, opacity: 1, filter: "blur(0px)" },
    open: {
      x: isRTL ? 50 : -50,
      opacity: 0.5,
      filter: "blur(2px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const imageVariants = {
    closed: { x: 0, scale: 1, filter: "blur(0px)" },
    open: {
      x: isRTL ? -50 : 50,
      scale: 0.95,
      filter: "blur(2px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full bg-[#F5F5F5] relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px",
      }}
    >
      <div className="container mx-auto px-8 md:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-12 items-start min-h-[85vh]">
          {/* Left Content */}
          <motion.div
            className="space-y-4 lg:space-y-8 pt-16 lg:pt-24 z-10 relative"
            animate={isModalOpen ? "open" : "closed"}
            variants={textVariants}
          >
            {/* Main Heading */}
            <motion.div
              layoutId="mainHeading"
              layout="position"
              transition={sharedTransition}
            >
              <h1
                className="font-light mb-2"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(36px, 8vw, 77px)",
                  lineHeight: "1",
                }}
              >
                {t("title1")}
              </h1>
              <h2
                className="font-light text-[#787878] mb-2"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(36px, 8vw, 77px)",
                  lineHeight: "1",
                }}
              >
                {t("title2")}
              </h2>
              <h3
                className="font-bold text-primary"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(36px, 8vw, 77px)",
                  lineHeight: "1",
                }}
              >
                {t("title3")}
              </h3>
            </motion.div>

            {/* Paragraph */}
            <motion.p
              layoutId="mainParagraph"
              layout="position"
              transition={sharedTransition}
              className="text-[#787878] text-sm md:text-base leading-relaxed max-w-xl"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
            >
              {t("description")}
            </motion.p>

            {/* Employees Badge */}
            {/* <motion.div
              layoutId="ctaSection"
              layout="position"
              transition={sharedTransition}
              className="flex items-center gap-4 pb-8 lg:pb-12"
            >
              <div
                className={`flex ${isRTL ? "flex-row-reverse -space-x-reverse" : ""
                  } -space-x-3`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center relative overflow-hidden">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center relative overflow-hidden">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center relative overflow-hidden">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div>
                <p
                  className="font-semibold text-lg"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                >
                  {t("employeesCount")}
                </p>
                <p
                  className="text-sm text-[#787878]"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                >
                  {t("employeesLabel")}
                </p>
              </div>
            </motion.div> */}
          </motion.div>

          {/* Right Image - Mobile */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:hidden rounded-2xl overflow-hidden my-8">
            <Image
              src="/images/career/hero.png"
              alt="MACC Team"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Image - Desktop - Absolute positioned */}
      <motion.div
        className={`hidden lg:block absolute top-0 bottom-0 w-1/2 ${isRTL ? "left-0" : "right-0"
          }`}
        animate={isModalOpen ? "open" : "closed"}
        variants={imageVariants}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/career/hero.png"
            alt="MACC Team"
            fill
            className={`object-cover ${isRTL ? "object-left" : "object-right"}`}
            priority
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CareerHero;
