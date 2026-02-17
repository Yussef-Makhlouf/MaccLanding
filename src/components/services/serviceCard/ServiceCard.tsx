"use client";

import { CircleAnimatedButton } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import parse from 'html-react-parser';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  reversed?: boolean;
  color?: string;
  id?: string;
  href?: string;
  isRTL?: boolean;
}

export function ServiceCard({
  title,
  subtitle,
  description,
  image,
  reversed = false,
  color = "#15AC9E",
  id = "01",
  href,
  isRTL = false,
}: ServiceCardProps) {
  const t = useTranslations("Services.section");

  return (
    <article
      className={`flex flex-col md:flex-row gap-2 lg:gap-16 items-center ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
      dir="ltr"
    >
      {/* Image Side */}
      <div className="relative w-full lg:w-auto">
        <div className="rounded-[40px] lg:rounded-[85px] overflow-hidden bg-gray-100 w-full lg:w-[870px] h-[300px] lg:h-[512px] relative">
          <Image
            src={image}
            alt={`${title} - ${subtitle}`}
            fill
            className="object-cover"
            style={{
              mixBlendMode: "multiply",
            }}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 870px"
          />
        </div>
      </div>

      {/* Content Side */}
      <div
        className="space-y-6 flex flex-col justify-between h-full py-4 px-4 lg:px-0"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Header */}
        <header>
          <p
            className="font-medium uppercase mb-2"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "14px",
              letterSpacing: isRTL ? "0" : "0.08em",
              color: color,
            }}
            aria-label={`Service number ${id}`}
          >
            {id}
          </p>
          <h2
            className="font-semibold mb-1"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(1.75rem, 3.5vw, 2.625rem)",
              lineHeight: "110%",
              letterSpacing: isRTL ? "0" : "-0.01em",
              color: color,
            }}
          >
            {title?.split(" ").map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </h2>
          <p
            className="font-normal uppercase text-secondary"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
              letterSpacing: isRTL ? "0" : "0.05em",
            }}
          >
            {subtitle}
          </p>
        </header>

        {/* Description & CTA */}
        <div className="space-y-6">
          <div
            className="font-normal text-gray-600 max-w-full lg:max-w-[490px]"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
              lineHeight: "165%",
              letterSpacing: isRTL ? "0" : "0.01em",
            }}
          >
              {parse(description)}
          </div>

          <CircleAnimatedButton
            href={href}
            bgColor="#15AC9E"
            hoverBgColor="#000"
            arrowHoverColor="#fff"
            arrowDirection="right"
            firstArrowBgColor="#fff"
            firstArrowColor="#15AC9E"
            width={isRTL ? "120px" : "140px"}
            fontSize="16px"
            aria-label={`Read more about ${title}`}
          >
            {t("seeMore")}
          </CircleAnimatedButton>
        </div>
      </div>
    </article>
  );
}