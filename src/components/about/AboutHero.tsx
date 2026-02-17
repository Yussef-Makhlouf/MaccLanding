"use client";
import React from "react";
import { motion } from "framer-motion";
import { CircleAnimatedButton } from "../ui/Button";
import Image from "next/image";
import { scrollToSection } from "@/utils/scroll";
import { useHistory } from "@/utils/HistoryContext";
import { pageVariants } from "@/utils/PageTansition";
import { useTranslations, useLocale } from "next-intl";

const AboutHero: React.FC = () => {
  const { previousRoute } = useHistory();
  const fromPrevious = previousRoute !== null;
  const t = useTranslations("About.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // The path from Figma SVG
  const shapePath =
    "M0 593V400.737V177.295C0 98.5398 0 59.1622 24.3267 34.3681C48.6534 9.57393 88.0239 8.82454 166.765 7.32578L551.641 0H1550C1630.14 0 1670.21 0 1695.1 24.8959C1720 49.7918 1720 89.8612 1720 170V293.5C1720 373.639 1720 413.708 1695.1 438.604C1670.21 463.5 1630.14 463.5 1550 463.5H1333.75C1273.11 463.5 1242.79 463.5 1221.13 478.264C1212.34 484.254 1204.75 491.839 1198.76 500.625C1184 522.286 1184 552.607 1184 613.25C1184 673.893 1184 704.214 1169.24 725.875C1163.25 734.661 1155.66 742.246 1146.87 748.236C1125.21 763 1094.89 763 1034.25 763H170C89.8612 763 49.7918 763 24.8959 738.104C0 713.208 0 673.139 0 593Z";

  return (
    <motion.section
      custom={fromPrevious}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full min-h-screen bg-white relative overflow-hidden flex flex-col items-center"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* 1. Header Content */}
      <div className="container mx-auto px-4 pt-16 text-center z-10">
        <h1 className="text-5xl md:text-7xl lg:text-[100px] font-light mb-2 leading-tight">
          {t("hello")} <br /> {t("were")}
        </h1>
        <h2
          className="text-6xl md:text-8xl lg:text-[110px] font-bold mb-6 tracking-tight"
          style={{ letterSpacing: isRTL ? "0" : "-0.02em" }}
        >
          {t("company")}
        </h2>
        <p className="text-[#787878] text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          {t("tagline")}
        </p>
        <a
          href="#Managing"
          onClick={(e) => scrollToSection(e, "Managing")}
          className="inline-block mb-16"
        >
          <CircleAnimatedButton width="200px" arrowDirection="down">
            {t("discoverMore")}
          </CircleAnimatedButton>
        </a>
      </div>

      {/* 2. The Hero Image Section clip path */}
      <div
        id="Managing"
        className="relative w-full max-w-[1600px] px-4 md:px-16 pb-20"
      >
        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="figma-shape" clipPathUnits="objectBoundingBox">
              <path transform="scale(0.000581, 0.00131)" d={shapePath} />
            </clipPath>
          </defs>
        </svg>

        <div className="relative w-full">
          {/* Main Image with Mask  */}
          <div
            className="relative w-full aspect-video sm:aspect-auto sm:h-[400px] md:h-[650px] lg:h-[585px]"
            style={{
              clipPath: "url(#figma-shape)",
              WebkitClipPath: "url(#figma-shape)",
            }}
          >
            <Image
              src="/about-hero.jpeg"
              fill
              alt="MACC Architecture"
              className="object-cover"
              priority
            />

            {/* Headline on clip path Image */}
            <div
              className={`absolute bottom-[8%] left-4 md:left-12 text-white drop-shadow-md`}
            >
              {/* <h3 className="text-xl md:text-5xl font-bold leading-tight">
                {t("managingAssets")}
              </h3>
              <p className="text-xl md:text-3xl font-light">
                {t("creatingComfort")}
              </p> */}
            </div>
          </div>

          {/* 3. The Quote Box - Fixed position */}
          <div
            className={`
              absolute md:-bottom-8
              ${isRTL ? "right-0 -bottom-8" : "left-0  -bottom-10"} md:left-auto md:-right-16 lg:-right-10
              p-6 md:p-10 lg:p-14
              w-[90%] md:w-[45%] lg:w-[35%]
              flex items-center  justify-center
            `}
            style={{
              height: "300px",
              borderRadius: "40px 40px 0 0",
            }}
          >
            <p className="md:text-black text-white text-xs md:text-base lg:text-lg leading-relaxed font-medium">
              &ldquo;{t("quote")}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutHero;
