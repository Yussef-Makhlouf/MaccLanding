"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { CertificationCard } from "./CertificationCard";

export default function AccreditationsSection() {
  const t = useTranslations("About.certifications");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const certificationImages = [
    "/assets/certifications/iso-9001.png",
    "/assets/certifications/iso-45001.png",
    "/assets/certifications/iso-14001.png",
  ];

  return (
    <section
      className="w-full bg-white py-12 lg:py-16"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-center mb-8 md:mb-16">
          <h2
            className="text-black text-center"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
              fontSize: "clamp(24px, 5vw, 52px)",
              fontWeight: 900,
              lineHeight: "1.2",
              letterSpacing: "0.02em",
              
            }}
          >
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 border-b border-[#17a296] pb-16">
          {[0, 1, 2].map((index) => (
            <CertificationCard
              key={index}
              code={t(`items.${index}.code`)}
              title={t(`items.${index}.title`)}
              isRTL={isRTL}
              imageSrc={certificationImages[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
