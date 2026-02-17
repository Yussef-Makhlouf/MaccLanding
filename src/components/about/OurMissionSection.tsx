"use client";
import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MissionCard } from "./MissionCard";
import { motion, Variants } from "framer-motion";

export default function OurMissionSection() {
  const t = useTranslations("About.mission");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % 8);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  // Framer Motion variants for staggered appearance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="w-full bg-white py-10 lg:pt-20 pb-10 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="container mx-auto px-4 max-w-[85rem]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 md:gap-y-12 items-start">
          {/* Title Section */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex flex-col justify-start items-start text-left"
          >
            <div className="relative inline-block mb-4 w-full">
              {/* Green Bar above title */}
              <div
                className="h-6 md:h-8 lg:h-10 rounded-full mb-4 max-w-[90%] lg:max-w-none"
                style={{
                  width: "min(100%, 26rem)",
                  background:
                    "linear-gradient(270deg, #1B7A71 0%, #16B4A6 100%)",
                }}
              ></div>
              {/* Title */}
              <h2
                className="text-black leading-none text-left w-full"
                style={{
                  ...(isRTL && {
                    fontFamily: "LamaSans, sans-serif",
                    textAlign: "right",
                  }),
                  fontSize: "clamp(32px, 9vw, 120px)", // Adjusted to 32px min to fit mobile screens
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                }}
              >
                {isRTL ? "مهمتنا" : "Our Mission"}
              </h2>
            </div>
          </motion.div>

          {/* First 2 cards (Next to title on desktop, below on mobile) */}
          <div className="lg:col-start-3 flex flex-col gap-8 md:gap-10 border-t lg:border-t-0 pt-8 lg:pt-0">
            {[0, 1].map((index) => (
              <motion.div key={index} variants={itemVariants}>
                <MissionCard
                  title={t(`items.${index}.title`)}
                  description={t(`items.${index}.description`)}
                  isActive={activeIndex === index}
                  isRTL={isRTL}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => setIsPaused(false)}
                />
              </motion.div>
            ))}
          </div>

          {/* Sequential cards for rows 2 and 3 on desktop, and 2-7 on mobile */}
          {[2, 3, 4, 5, 6, 7].map((index) => (
            <motion.div key={index} variants={itemVariants}>
              <MissionCard
                title={t(`items.${index}.title`)}
                description={t(`items.${index}.description`)}
                isActive={activeIndex === index}
                isRTL={isRTL}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsPaused(true);
                }}
                onMouseLeave={() => setIsPaused(false)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
