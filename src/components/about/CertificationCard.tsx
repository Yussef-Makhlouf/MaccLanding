"use client";
import Image from "next/image";
import { useState } from "react";

interface CertificationCardProps {
  code: string;
  title: string;
  isRTL?: boolean;
  imageSrc?: string;
}

export function CertificationCard({
  code,
  title,
  isRTL = false,
  imageSrc,
}: CertificationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-3xl group"
      style={{
        background: isHovered
          ? "linear-gradient(165deg, #ffffff 0%, #f0fdf9 40%, #e6f9f5 100%)"
          : "linear-gradient(165deg, #ffffff 0%, #fafbfc 100%)",
        boxShadow: isHovered
          ? "0 30px 60px -15px rgba(21, 172, 158, 0.2), 0 0 0 1px rgba(21, 172, 158, 0.15), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "0 8px 30px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered
          ? "translateY(-4px) scale(1.01)"
          : "translateY(0) scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Animated gradient border top */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          background: isHovered
            ? "linear-gradient(90deg, #1B7A71 0%, #16B4A6 50%, #1B7A71 100%)"
            : "linear-gradient(90deg, #1B7A71 0%, #16B4A6 100%)",
          backgroundSize: isHovered ? "200% 100%" : "100% 100%",
          animation: isHovered ? "shimmer 2s ease infinite" : "none",
          borderRadius: "24px 24px 0 0",
        }}
      />

      {/* Decorative corner accents */}
      <div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(21, 172, 158, 0.08) 0%, transparent 70%)",
          opacity: isHovered ? 1 : 0.5,
          transition: "opacity 0.4s ease",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom left, rgba(21, 172, 158, 0.06) 0%, transparent 70%)",
          opacity: isHovered ? 1 : 0.3,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Certificate Image Container */}
      <div className="relative p-5 pt-7">
        <div
          className="relative overflow-hidden rounded-2xl mx-auto"
          style={{
            background: "#ffffff",
            boxShadow: isHovered
              ? "0 8px 32px -8px rgba(21, 172, 158, 0.15), inset 0 0 0 1px rgba(21, 172, 158, 0.1)"
              : "0 4px 16px -4px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(0, 0, 0, 0.04)",
            transition: "all 0.4s ease",
          }}
        >
          {imageSrc ? (
            <div className="relative w-full aspect-[4/3] p-3">
              <Image
                src={imageSrc}
                alt={`${code} Certificate`}
                fill
                className="object-contain"
                style={{
                  transform: isHovered ? "scale(1.03)" : "scale(1)",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: isHovered
                    ? "brightness(1.02) contrast(1.02)"
                    : "none",
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.666 15.9999H37.3327C44.8751 15.9999 48.6463 15.9999 50.9895 18.3431C53.3327 20.6862 53.3327 24.4574 53.3327 31.9999V34.8151C53.3327 41.2303 53.3327 44.4378 51.7396 47.0154C50.1465 49.593 47.2777 51.0274 41.5399 53.8962C36.8583 56.2372 34.5175 57.4076 31.9993 57.4076C29.4812 57.4076 27.1404 56.2372 22.4588 53.8962C16.721 51.0274 13.8521 49.593 12.2591 47.0154C10.666 44.4378 10.666 41.2303 10.666 34.8151V31.9999C10.666 24.4574 10.666 20.6862 13.0092 18.3431C15.3523 15.9999 19.1235 15.9999 26.666 15.9999ZM31.9993 26.6666C31.2417 26.6666 30.7351 27.5754 29.7217 29.3932L29.4596 29.8636C29.1719 30.3802 29.0279 30.6383 28.8034 30.8087C28.5788 30.9791 28.2993 31.0426 27.7401 31.169L27.2311 31.2842C25.2632 31.7295 24.2794 31.9519 24.0453 32.7047C23.8112 33.4575 24.4819 34.2418 25.8234 35.8106L26.1705 36.2164C26.5517 36.662 26.7423 36.885 26.8281 37.1607C26.9137 37.4364 26.885 37.7338 26.8274 38.3287L26.7748 38.87C26.572 40.9631 26.4707 42.0095 27.0833 42.4748C27.6964 42.9399 28.6175 42.5159 30.4599 41.6676L30.9364 41.4482C31.4601 41.2071 31.7218 41.0866 31.9993 41.0866C32.2769 41.0866 32.5385 41.2071 33.0623 41.4482L33.5388 41.6676C35.3812 42.5159 36.3023 42.9399 36.9153 42.4748C37.5282 42.0095 37.4265 40.9631 37.2239 38.87L37.1713 38.3287C37.1137 37.7338 37.085 37.4364 37.1706 37.1607C37.2564 36.885 37.4471 36.662 37.8281 36.2164L38.1754 35.8106C39.5167 34.2418 40.1876 33.4575 39.9535 32.7047C39.7193 31.9519 38.7353 31.7295 36.7676 31.2842L36.2586 31.169C35.6994 31.0426 35.4199 30.9791 35.1953 30.8087C34.9708 30.6383 34.8268 30.3802 34.5391 29.8636L34.277 29.3932C33.2636 27.5754 32.757 26.6666 31.9993 26.6666Z"
                  fill="#15AC9E"
                />
                <path
                  d="M29.3321 5.33325H34.6655C39.694 5.33325 42.2081 5.33325 43.7703 6.89536C44.874 7.99907 45.1977 9.57808 45.2927 12.1834C43.1039 11.9996 40.5161 11.9998 37.5956 11.9999H26.4023C23.4817 11.9998 20.894 11.9996 18.7051 12.1834C18.8001 9.57808 19.124 7.99907 20.2277 6.89536C21.7898 5.33325 24.304 5.33325 29.3321 5.33325Z"
                  fill="#15AC9E"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 pb-7 pt-3">
        {/* Code Badge with icon */}
        <div className="flex justify-center mb-4">
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wide"
            style={{
              background: isHovered
                ? "linear-gradient(135deg, #16B4A6 0%, #1B7A71 100%)"
                : "linear-gradient(135deg, #1B7A71 0%, #16B4A6 100%)",
              color: "#ffffff",
              boxShadow: isHovered
                ? "0 8px 20px -4px rgba(27, 122, 113, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
                : "0 4px 12px -2px rgba(27, 122, 113, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              transition: "all 0.4s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {code}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-center"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
            fontSize: "clamp(14px, 1.6vw, 17px)",
            fontWeight: 500,
            lineHeight: "1.5",
            color: isHovered ? "#0f766e" : "#374151",
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </h3>
      </div>

      {/* Shimmer animation keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
