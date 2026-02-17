"use client";
import { useTranslations } from "next-intl";
import ServiceDetailCard from "./ServiceDetailCard";
import type { ServiceItem, Locale } from "@/lib/services/types";

interface ServiceDetailsSectionProps {
  items: ServiceItem[];
  title: string;
  isRTL: boolean; 
  locale: Locale; 
}

export default function ServiceDetailsSection({
  items,
  title,
  isRTL, 
  locale, 
}: ServiceDetailsSectionProps) {
  const t = useTranslations("Services.details");


  const isOddCount = items.length % 2 !== 0;
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  return (
    <section
      id={title}
      className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-6 md:pt-10 pb-10 bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-[1000px] container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2
            className="font-bold text-secondary"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: "110%",
              letterSpacing: isRTL ? "0" : "-0.01em",
            }}
          >
            {t("sectionTitle")}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-8 lg:gap-y-0 relative">
          {sortedItems.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isLast = index === sortedItems.length - 1;
            const shouldCenter = isLast && isOddCount;

            return (
              <div
                key={item.id}
                className={`
                  ${shouldCenter ? "lg:col-span-2 flex justify-center" : ""}
                  ${!isLeft ? "lg:mt-[100px]" : ""}
                  ${!isLast ? "lg:mb-[40px]" : ""}
                `}
              >
                <ServiceDetailCard
                  number={item.number}
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  color={item.color}
                  position={isLeft ? "left" : "right"}
                  isRTL={isRTL}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}