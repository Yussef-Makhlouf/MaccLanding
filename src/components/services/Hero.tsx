"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { CircleAnimatedButton } from "../ui/Button";
import { pageFade, pageVariants } from "@/utils/PageTansition";
import { useHistory } from "@/utils/HistoryContext";

interface CounterItemProps {
  value: number;
  suffix: string;
  label: string;
  isRTL?: boolean;
  isCompact?: boolean;
}

function CounterItem({
  value,
  suffix,
  label,
  isRTL,
  isCompact = false,
}: CounterItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      variants={pageFade}
      className={`${isRTL ? "text-right" : "text-left"} ${isCompact ? "text-center lg:text-left" : ""}`}
    >
      <div
        className={`mb-1 lg:mb-2 font-medium text-secondary ${isCompact ? "lg:mb-2" : ""}`}
        style={{
          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: isCompact
            ? "clamp(2rem, 5vw, 7.5rem)"
            : "clamp(4rem, 10vw, 7.5rem)",
          lineHeight: "1",
        }}
      >
        {count}
        <span className="text-primary">{suffix}</span>
      </div>
      <p
        className={`uppercase font-medium text-gray-600 ${isCompact ? "text-[10px] lg:text-[14px]" : ""}`}
        style={{
          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: isCompact ? undefined : "14px",
          letterSpacing: isRTL ? "0" : "0.01em",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function ServicesHero() {
  const { previousRoute } = useHistory();
  const t = useTranslations("Services.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const fromContact = previousRoute?.includes("/contact") || false;

  return (
    <motion.section
      custom={fromContact}
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="w-full py-6 md:py-8 px-4 sm:px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px",
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Label */}
        <motion.div className="mb-4 md:mb-4">
          <motion.p
            className="font-normal uppercase text-secondary"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "18px",
              letterSpacing: isRTL ? "0" : "0.05em",
            }}
          >
            {t("label")}
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-4 lg:gap-20 items-start">
          {/* Left Column */}
          <motion.div>
            {/* Heading */}
            <motion.div className="mb-6 md:mb-16">
              <h1
                className="font-medium text-secondary"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  lineHeight: "110%",
                  letterSpacing: isRTL ? "0" : "-0.02em",
                  wordSpacing: isRTL ? "0" : "-0.05em",
                }}
              >
                {t("title1")}
                <br />
                <span
                  className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mt-2 sm:mt-[10px] ${isRTL ? "sm:flex-row-reverse" : ""}`}
                >
                  <svg
                    width="100"
                    height="4"
                    viewBox="0 0 156 4"
                    fill="none"
                    className="hidden sm:block"
                  >
                    <path d="M0 2H156" stroke="#15AC9E" strokeWidth="4" />
                  </svg>
                  <span className="whitespace-normal sm:whitespace-nowrap">
                    {t("title2")}{" "}
                    <span className="text-gray-500">{t("title2Gray")}</span>!
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Counters - Desktop Only */}
            <motion.div className="hidden lg:flex gap-2 md:gap-24 flex-wrap mt-6 md:mt-[10rem]">
              <CounterItem
                value={8}
                suffix="+"
                label={t("yearsExp")}
                isRTL={isRTL}
              />
              <CounterItem
                value={250}
                suffix="+"
                label={t("completedProjects")}
                isRTL={isRTL}
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Desktop */}
          <motion.div className="hidden lg:flex flex-col justify-between h-full md:space-y-12">
            {/* Client Satisfaction */}
            <motion.div
              className={isRTL ? "text-right" : "text-left lg:text-right"}
            >
              <div
                className="font-medium text-secondary"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(5rem, 12vw, 7.8rem)",
                  lineHeight: "1",
                }}
              >
                98<span className="text-primary">%</span>
              </div>
              <p
                className="uppercase font-medium text-gray-500 mt-2"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(12px, 1.2vw, 16px)",
                  letterSpacing: isRTL ? "0" : "0.01em",
                }}
              >
                {t("clientsSatisfaction")}
              </p>
            </motion.div>

            {/* Description & CTA */}
            <motion.div
              className={`w-full ${isRTL ? "lg:mr-[-15rem]" : "lg:ml-[-15rem]"}`}
            >
              <div className="mb-6 w-full lg:w-fit overflow-visible lg:overflow-hidden">
                <p
                  className="font-normal text-secondary"
                  style={{
                    ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    lineHeight: "200%",
                    letterSpacing: isRTL ? "0" : "0.01em",
                    wordSpacing: isRTL ? "0" : "0.2em",
                  }}
                >
                  {t("description")}
                </p>
              </div>

              <motion.div
                layoutId="contact-button"
                layout="position"
                transition={{
                  layout: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                }}
              >
                <CircleAnimatedButton
                  href="/contact"
                  bgColor="#15AC9E"
                  hoverBgColor="#000"
                  arrowHoverColor="#fff"
                  arrowDirection="right"
                  firstArrowBgColor="#fff"
                  firstArrowColor="#15AC9E"
                  width="170px"
                  fontSize="16px"
                >
                  {t("contactButton")}
                </CircleAnimatedButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile: All 3 counters in one row */}
        <motion.div className="grid grid-cols-3 gap-2 mt-8 lg:hidden">
          <CounterItem
            value={8}
            suffix="+"
            label={t("yearsExp")}
            isRTL={isRTL}
            isCompact
          />
          <CounterItem
            value={250}
            suffix="+"
            label={t("completedProjects")}
            isRTL={isRTL}
            isCompact
          />
          <motion.div
            className={`${isRTL ? "text-right" : "text-left"} text-center`}
          >
            <div
              className="mb-1 font-medium text-secondary"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(2rem, 5vw, 7.5rem)",
                lineHeight: "1",
              }}
            >
              98<span className="text-primary">%</span>
            </div>
            <p
              className="uppercase font-medium text-gray-600 text-[10px]"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    letterSpacing: isRTL ? "0" : "0.01em",
              }}
            >
              {t("clientsSatisfaction")}
            </p>
          </motion.div>
        </motion.div>

        {/* Mobile: Description & CTA */}
        <motion.div className="lg:hidden mt-8">
          <div className="mb-6">
            <p
              className="font-normal text-secondary"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                lineHeight: "200%",
                letterSpacing: isRTL ? "0" : "0.01em",
                wordSpacing: isRTL ? "0" : "0.2em",
              }}
            >
              {t("description")}
            </p>
          </div>

          <motion.div
          // layoutId="contact-button"
          // layout="position"
          // transition={{
          //   layout: {
          //     duration: 0.6,
          //     ease: "easeOut",
          //   },
          // }}
          >
            <CircleAnimatedButton
              href="/contact"
              bgColor="#15AC9E"
              hoverBgColor="#000"
              arrowHoverColor="#fff"
              arrowDirection="right"
              firstArrowBgColor="#fff"
              firstArrowColor="#15AC9E"
              width="170px"
              fontSize="16px"
            >
              {t("contactButton")}
            </CircleAnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
