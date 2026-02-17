"use client";
import { useState, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

interface PillButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;

  /* Button styling */
  width?: string; //
  bgColor?: string;
  hoverBgColor?: string;
  mainhoverBgColor?: string;
  textColor?: string;
  radius?: string;
  fontSize?: string;

  /* Transforms */
  textTranslateDefault?: string;
  textTranslateHover?: string;
  iconTranslateDefault?: string;
  iconTranslateHover?: string;

  /* Icon */
  icon?: ReactNode;
  iconBgColor?: string;
  iconHoverBgColor?: string;
  iconColor?: string;

  /* RTL Support */
  isRTL?: boolean;
  arialabel?: string;
}

export default function PillButton({
  children,
  onClick,
  href,

  /* defaults */
  width = "auto",
  fontSize = "14px",

  bgColor = "#FFFFFF",
  hoverBgColor = "#15AC9E",
  mainhoverBgColor = "#15AC9E",
  textColor = "#000000",
  radius = "40px",

  /* default transforms */
  textTranslateDefault = "-8px",
  textTranslateHover = "30px",
  iconTranslateDefault = "0",
  iconTranslateHover = "-170px",

  icon,
  iconBgColor = "#000000",
  iconHoverBgColor = "#000000",
  iconColor = "#FFFFFF",

  isRTL = false,
  arialabel = "ariaLabel",
}: PillButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverCirclePosition = isRTL
    ? { right: "-75px", left: "auto" }
    : { left: "-75px", right: "auto" };

  const actualTextTranslateDefault = isRTL
    ? `${parseFloat(textTranslateDefault) * -1}px`
    : textTranslateDefault;

  const actualTextTranslateHover = isRTL
    ? `${parseFloat(textTranslateHover) * -1}px`
    : textTranslateHover;

  const actualIconTranslateHover = isRTL
    ? `${parseFloat(iconTranslateHover) * -1}px`
    : iconTranslateHover;

  const content = (
    <>
      {/* Hover Circle */}
      <div
        className="absolute"
        style={{
          background: hoverBgColor,
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          top: "-75px",
          ...hoverCirclePosition,
          transform: isHovered ? "scale(4)" : "scale(0)",
          transition: "transform 400ms ease-out",
        }}
      />

      {/* Text */}
      <span
        className="relative z-10 whitespace-nowrap"
        style={{
          color: isHovered ? "#FFFFFF" : textColor,
          transform: `translateX(${
            isHovered ? actualTextTranslateHover : actualTextTranslateDefault
          })`,
          transition: "all 400ms ease-out",
        }}
      >
        {children}
      </span>

      {/* Icon Wrapper */}
      <div
        className="relative z-10 flex items-center justify-center flex-shrink-0"
        style={{
          width: "35px",
          height: "35px",
          minWidth: "35px",
          minHeight: "35px",
          borderRadius: "50%",
          background: isHovered ? iconHoverBgColor : iconBgColor,
          color: iconColor,
          transform: `translateX(${
            isHovered ? actualIconTranslateHover : iconTranslateDefault
          })`,
          transition: "all 400ms ease-out",
        }}
      >
        {icon ?? (
          <>
            {/* Arrow default */}
            <svg
              style={{
                position: "absolute",
                opacity: isHovered ? "0" : "1",
                transform: `${
                  isHovered ? "translateX(10px)" : "translateX(0)"
                } ${isRTL ? "scaleX(-1)" : ""}`,
                transition: "all 400ms ease-out",
              }}
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M4.08301 9.91683L9.91634 4.0835M9.91634 4.0835H4.66634M9.91634 4.0835V9.3335"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Arrow hover */}
            <svg
              style={{
                position: "absolute",
                opacity: isHovered ? "1" : "0",
                transform: `${
                  isHovered ? "translateX(0)" : "translateX(10px)"
                } ${isRTL ? "scaleX(-1)" : ""}`,
                transition: "all 400ms ease-out",
              }}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1 7H13M13 7L7 1M13 7L7 13"
                stroke={iconColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </div>
    </>
  );

  const styles = {
    width: width === "auto" ? "max-content" : width,
    minWidth: width === "auto" ? "140px" : undefined,
    height: "45px",
    borderRadius: radius,
    background: isHovered ? mainhoverBgColor : bgColor,
    fontSize: fontSize,
    padding: isRTL ? "0 20px 0 8px" : "0 8px 0 20px",
    ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.01em",
    transition: "background 500ms ease-out",
  };

  const className =
    "relative overflow-hidden flex items-center justify-between";

  if (href) {
    return (
      <Link
        href={href}
        style={styles}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        dir={isRTL ? "rtl" : "ltr"}
        aria-label={
          arialabel || (typeof children === "string" ? children : undefined)
        }
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      style={styles}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={
        arialabel || (typeof children === "string" ? children : undefined)
      }
    >
      {content}
    </button>
  );
}
