"use client";
import Image from "next/image";
import parse from 'html-react-parser';

interface ServiceDetailCardProps {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  color: string;
  position: "left" | "right";
  isRTL?: boolean;
}

export default function ServiceDetailCard({
  number,
  category,
  title,
  description,
  image,
  color,
  position,
  isRTL = false,
}: ServiceDetailCardProps) {
  return (
    <div
      className={`flex ${
        position === "right" ? "justify-end" : "justify-start"
      } px-4 md:px-0`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-[520px] w-full">
        {/* Category Label */}
        <div className={`mb-4 flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <svg
            width="35"
            height="2"
            viewBox="0 0 35 2"
            fill="none"
            className="w-8 md:w-[35px]"
          >
            <path d="M0 1H35" stroke="#15AC9E" strokeWidth="2" />
          </svg>

          <p
            className="font-medium uppercase text-primary"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "13px",
              letterSpacing: isRTL ? "0" : "0.08em",
            }}
          >
            {category}
          </p>
        </div>

        {/* Title */}
        <h3
          className="mb-4 font-semibold"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(1.375rem, 2.5vw, 2rem)",
            lineHeight: "115%",
            letterSpacing: isRTL ? "0" : "-0.01em",
            color: color,
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="mb-6 font-normal text-gray-600"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(13px, 1.2vw, 15px)",
            lineHeight: "160%",
            letterSpacing: isRTL ? "0" : "0.01em",
          }}
        >
           {parse(description)}
        </p>

        {/* Image with Number */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[40px] md:rounded-[60px] lg:rounded-[85px] w-full"
            style={{
              maxWidth: "482px",
              aspectRatio: "482/452",
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 482px"
            />
          </div>

          {/* Number Badge */}
          <div
            className={`absolute -bottom-4 md:-bottom-6 font-bold ${
              isRTL ? "-left-4 md:-left-6" : "-right-4 md:-right-6"
            }`}
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(3.75rem, 8vw, 6.25rem)",
              color: color,
              lineHeight: "1",
            }}
          >
            {number}
          </div>
        </div>
      </div>
    </div>
  );
}