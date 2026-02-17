"use client";
import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { CoreValueItem } from "./CoreValueItem";
import { motion } from "framer-motion";

export default function CoreValuesSection() {
  const t = useTranslations("About.coreValues");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % 6);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="w-full bg-white py-0 lg:py-10 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 max-w-[85rem] relative z-10">
        <div className="flex flex-col lg:flex-row justify-center md:justify-between items-center lg:items-start gap-0 lg:gap-0">
          {/* Left Side - Title */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-start lg:sticky lg:top-32 self-start pt-10 lg:pt-0">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="relative inline-block mb-2 lg:mb-4"
            >
              {/* Thick Green Bar */}
              <div
                className="absolute -top-6 md:-top-16 lg:-top-20 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-6 md:h-10 rounded-full"
                style={{
                  width: "min(100%, 110%)",
                  background:
                    "linear-gradient(270deg, #1B7A71 0%, #16B4A6 100%)",
                }}
              ></div>

              <h2
                className="text-[#1f1f1f] relative z-10 leading-[1.1] lg:leading-[0.9] mt-4"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                  fontWeight: 900,
                  letterSpacing: "0.02em",
                }}
              >
                <span
                  className="block"
                  style={{ fontSize: "clamp(40px, 8vw, 100px)" }}
                >
                  {t("title")}
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Right Side - Values List */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full lg:w-[43%] flex flex-col gap-4 md:gap-2  mt-4 lg:mt-0"
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <CoreValueItem
                key={index}
                index={index}
                letter={t(`values.${index}.letter`)}
                title={t(`values.${index}.title`)}
                description={t(`values.${index}.description`)}
                isActive={activeIndex === index}
                isRTL={isRTL}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setIsPaused(true);
                }}
                onMouseLeave={() => setIsPaused(false)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
