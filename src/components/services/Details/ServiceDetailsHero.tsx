"use client";

import { CircleAnimatedButton } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { scrollToSection } from "@/utils/scroll";
import type { Locale } from "@/lib/services/types";
import parse from 'html-react-parser';

interface ServiceHeroProps {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
  color: string;
  titleColor?: string;
  isRTL: boolean; 
  locale: Locale; 
}

export default function ServiceHero({
  subtitle,
  title,
  description,
  backgroundImage,
  color,
  titleColor = "#FFFFFF",
  isRTL, 
  locale, 
}: ServiceHeroProps) {
  const t = useTranslations("Services.details");


  return (
    <section
      className="relative w-full h-[430px] sm:h-[510px] lg:h-[620px] flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="text-center max-w-4xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-28">
        {/* Subtitle with line */}
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <p
            className="mb-2 sm:mb-3 font-medium uppercase text-white"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(11px, 1vw, 13px)",
              letterSpacing: isRTL ? "0" : "0.15em",
            }}
          >
            {subtitle}
          </p>
          <svg
            width="100"
            height="2"
            viewBox="0 0 100 2"
            fill="none"
            className="w-16 sm:w-24 lg:w-[100px]"
          >
            <path d="M0 1H130" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {/* Title */}
        <h1
          className="mb-4 sm:mb-6 font-bold uppercase"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: "110%",
            letterSpacing: isRTL ? "0" : "0.02em",
            color: titleColor,
            textShadow: "2px 2px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          {title.split(" ").map((word, index) => (
            <span key={index} className="block">
              {word}
            </span>
          ))}
        </h1>

        {/* Description */}
        <div
          className="mb-6 sm:mb-8 max-w-3xl mx-auto font-normal text-white"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(14px, 1.2vw, 16px)",
            lineHeight: "160%",
            letterSpacing: isRTL ? "0" : "0.05em",
            textShadow: "1px 1px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
           {parse(description)}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            onClick={(e) => scrollToSection(e, title)}
            className="inline-block"
          >
            <CircleAnimatedButton
              bgColor="#fff"
              textColor="#15AC9E"
              hoverColor="#fff"
              arrowHoverColor="#fff"
              arrowDirection="down"
              firstArrowDirection="down-left"
              firstArrowBgColor="#15AC9E"
              firstArrowColor="#fff"
              width="180px"
            >
              {t("discoverMore")}
            </CircleAnimatedButton>
          </a>
        </div>
      </div>
    </section>
  );
}
