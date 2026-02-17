"use client";
import React from "react";
import { useTranslations, useLocale } from "next-intl";

export default function VisionSection() {
  const t = useTranslations("About.visionMission");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="bg-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Top Text Content */}
      {/* Top Text Content
      <div className="container mx-auto px-4 max-w-7xl pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <h2
            className="text-[#3b9b8f]"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
              fontSize: "clamp(28px, 6vw, 42px)",
              fontWeight: 600,
            }}
          >
            {t("title")}
          </h2>
          <p
            className="text-[#333] max-w-[540px]"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: "1.6",
            }}
          >
            {t("description")}
          </p>
        </div>
      </div> */}

      {/* The Vision Card Section */}
      <div
        className="w-full relative py-8 lg:py-10 flex justify-center items-center overflow-hidden"
        style={{
          background: "#d0d2d4",
        }}
      >
        {/* Vision Card with Background Image */}
        <div
          className="relative w-full max-w-[1100px]  mx-auto flex items-center justify-center transition-all duration-300"
          style={{
            backgroundImage: "url('/images/about/vision.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "clamp(350px, 50vw, 450px)",
            borderRadius: "16px",
          }}
        >
          {/* Overlay to ensure text readability on mobile if needed */}
          <div className="absolute inset-0 bg-white/5 lg:bg-transparent rounded-xl"></div>

          {/* Text Content */}
          <div className="relative z-10 text-center pb-10 md:pb-14 lg:pb-14 px-5 md:px-10 max-w-4xl">
            <h2
              className="font-bold text-[#1a1a1a] mb-2"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                fontSize: "clamp(24px, 5vw, 48px)",
                letterSpacing: "-0.01em",
                fontWeight: 900,
              }}
            >
              {t("visionTitle")}
            </h2>

            {/* Teal Accent Line */}
            <div
              className="mx-auto mb-2 md:mb-6"
              style={{
                height: "4px",
                width: "min(120px, 40%)",
                background: "linear-gradient(90deg, #42b1a2 0%, #1c5850 100%)",
                borderRadius: "2px",
              }}
            ></div>

            <p
              className="mx-auto text-[#555] leading-relaxed"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
                maxWidth: "720px",
                fontSize: "clamp(14px, 1.6vw, 17px)",
                fontWeight: 400,
              }}
            >
              {t("visionText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
