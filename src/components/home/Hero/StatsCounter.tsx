"use client";
import { motion } from "framer-motion";
import CounterItem from "./CounterItem";
import { staggerContainer, fadeInUp } from "@/utils/PageTansition";
import { useTranslations, useLocale } from "next-intl";

export default function StatsCounter() {
  const t = useTranslations("Stats");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const stats = [
    {
      value: 98,
      suffix: "%",
      label: t("areaCoverage"),
    },
    {
      value: 952,
      suffix: "+",
      label: t("valueAssets"),
      standard: "k",
    },
    {
      value: 6,
      suffix: "+",
      label: t("volumeOperation"),
    },
    {
      value: 3,
      suffix: "+",
      label: t("totalTasks"),
      standard: "k",
    },
    {
      value: 3,
      suffix: "+",
      label: t("workforceCount"),
      standard: "k",
    },
    {
      value: 98,
      suffix: "%",
      label: t("clientsSatisfaction"),
      standard: " ",
    },
  ];

  return (
    <section
      className="bg-black/5 md:py-16 lg:py-20 py-10 px-2 sm:px-4"
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "إحصائيات الشركة" : "Company statistics"}
    >
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-12"
            //  className="grid grid-cols-6 gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          role="list"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp} role="listitem">
              <CounterItem {...stat} isRTL={isRTL} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
