"use client";
import { motion } from "framer-motion";
import { PillButton } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/utils/PageTansition";
import { useTranslations, useLocale } from "next-intl";

export default function HeroContent() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="mb-8 sm:mb-12" role="banner">
          {/* First Line */}
          <motion.div
            className="flex items-center gap-3 sm:gap-6 mb-3 sm:mb-4"
            variants={fadeInUp}
          >
            <h1 className="sr-only">
              {t("letsText")} {t("buildText")} {t("smartText")} {t("facilitiesText")}
            </h1>
            <span
              aria-hidden="true"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                fontWeight: 800,
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                lineHeight: "100%",
                letterSpacing: isRTL ? "normal" : "0.08em",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              {t("letsText")}
            </span>
            <span
              aria-hidden="true"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                fontWeight: 700,
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                lineHeight: "100%",
                letterSpacing: isRTL ? "normal" : "0%",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              {t("buildText")}
            </span>
            <motion.svg
              className="hidden sm:block"
              width="229"
              height="2"
              viewBox="0 0 229 2"
              fill="none"
              aria-hidden="true"
              initial={{ scaleX: 0, transformOrigin: isRTL ? "right" : "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <path d="M0 1H229" stroke="white" strokeWidth="2" />
            </motion.svg>
          </motion.div>

          {/* Second Line */}
          <motion.div variants={fadeInUp}>
            <span
              aria-hidden="true"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                fontWeight: 400,
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                lineHeight: "100%",
                letterSpacing: isRTL ? "normal" : "0%",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              {t("smartText")}{" "}
            </span>
            <span
              aria-hidden="true"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                fontWeight: 700,
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                lineHeight: "100%",
                letterSpacing: isRTL ? "normal" : "0%",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              {t("facilitiesText")}
            </span>
          </motion.div>
        </div>

        {/* Button */}
        <motion.div variants={fadeInUp}>
          <PillButton
            href="/services"
            hoverBgColor="#000"
            radius="40px"
            width={isRTL ? "200px" : "240px"}
            iconColor="white"
            textColor="#000000"
            iconTranslateHover={isRTL ? "-150px" : "-185px"}
            isRTL={isRTL}
            fontSize={isRTL ? "18px" : "12px"}
            arialabel={t("exploreButton")}
          >
            {t("exploreButton")}
          </PillButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
