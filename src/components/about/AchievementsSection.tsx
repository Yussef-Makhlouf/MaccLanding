"use client";
import { useTranslations, useLocale } from "next-intl";
import CounterItem from "../home/Hero/CounterItem";

export default function AchievementsSection() {
  const t = useTranslations("About.achievements");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section
      id="Achievements"
      className="w-full bg-black py-6 lg:py-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-10 lg:mb-12">
          <h2
            className="text-white mb-2"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(24px, 5vw, 48px)",
              fontWeight: 400,
              lineHeight: "1",
            }}
          >
            {t("title")}
          </h2>
          <h3
            className="text-white"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(28px, 6vw, 56px)",
              fontWeight: 500,
              lineHeight: "1",
            }}
          >
            {t("subtitle")}
          </h3>
        </div>

        <div
          className={`mb-10 lg:mb-32 flex ${isRTL ? "justify-start" : "justify-end"}`}
        >
          <p
            className={`text-white max-w-2xl ${isRTL ? "text-right" : "text-left"}`}
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(18px, 2.5vw, 24px)",
              fontWeight: 400,
              lineHeight: "1.5",
            }}
          >
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-4 lg:grid-cols-4 gap-8 lg:gap-12 ">
          <CounterItem
            value={8}
            suffix="+"
            label={t("stats.0.label")}
            isRTL={isRTL}
          />
          <CounterItem
            value={250}
            suffix="+"
            label={t("stats.1.label")}
            isRTL={isRTL}
          />
          <CounterItem
            value={1}
            suffix="+"
            standard="K"
            label={t("stats.2.label")}
            isRTL={isRTL}
          />
          <CounterItem
            value={98}
            suffix="%"
            label={t("stats.3.label")}
            isRTL={isRTL}
          />
        </div>
      </div>
    </section>
  );
}
