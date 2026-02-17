"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

type ArrowDirection =
  | "right"
  | "left"
  | "up"
  | "down"
  | "up-right"
  | "up-left"
  | "down-right"
  | "down-left";

type TextAlign = "left" | "center" | "right" | "justify" | "start" | "end";

type Type = "button" | "submit" | "reset";

interface CircleAnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  paddingX?: string;
  align?: TextAlign;
  type?: Type;
  width?: string;
  height?: string;
  fontSize?: string;
  bgColor?: string;
  hoverColor?: string;
  hoverBgColor?: string;
  textColor?: string;

  arrowDirection?: ArrowDirection;
  arrowHoverColor?: string;

  firstArrowDirection?: ArrowDirection;
  firstArrowBgColor?: string;
  firstArrowColor?: string;

  isRTL?: boolean;
  disabled?: boolean;
  arialabel?: string;
}

export default function CircleAnimatedButton({
  children,
  onClick,
  href,
  align = "center",
  paddingX = "20px",
  hoverColor = "#fff",
  width = "auto",
  type = "button",
  height = "45px",
  fontSize = "14px",
  bgColor = "#1F2937",
  hoverBgColor = "#15AC9E",
  textColor = "#ffffff",

  arrowDirection = "right",
  arrowHoverColor = "#ffffff",

  firstArrowDirection = "up-right",
  firstArrowBgColor = "transparent",
  firstArrowColor = "#ffffff",

  isRTL = false,
  disabled = false,
  arialabel = "ariaLabel",
}: CircleAnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  /* hover arrow (→ based) */
  const arrowRotateFromRight: Record<ArrowDirection, string> = {
    right: "rotate(0deg)",
    down: "rotate(90deg)",
    left: "rotate(180deg)",
    up: "rotate(-90deg)",
    "up-right": "rotate(-45deg)",
    "up-left": "rotate(-135deg)",
    "down-right": "rotate(45deg)",
    "down-left": "rotate(135deg)",
  };

  /* first arrow (↗ based) */
  const arrowRotateFromNE: Record<ArrowDirection, string> = {
    "up-right": "rotate(0deg)",
    right: "rotate(-45deg)",
    "down-right": "rotate(45deg)",
    down: "rotate(90deg)",
    "down-left": "rotate(135deg)",
    left: "rotate(180deg)",
    "up-left": "rotate(-135deg)",
    up: "rotate(-90deg)",
  };

  const textTransformDefault = isRTL ? "translateX(10px)" : "translateX(-10px)";
  const textTransformHover = isRTL ? "translateX(-25px)" : "translateX(25px)";

  const arrowDefaultTransform = isRTL ? "translateX(-8px)" : "translateX(8px)";
  const arrowHoverTransform = isRTL ? "translateX(35px)" : "translateX(-35px)";

  const hoverArrowPosition = isRTL ? { right: "16px" } : { left: "16px" };
  const hoverArrowDefaultTransform = isRTL
    ? "translateX(-80px)"
    : "translateX(80px)";

  const hoverTextDefaultTransform = isRTL
    ? "translateX(-25px)"
    : "translateX(25px)";
  const hoverTextHoverTransform = isRTL
    ? "translateX(-8px)"
    : "translateX(8px)";

  const firstArrowPosition = isRTL ? { left: "16px" } : { right: "16px" };

  const buttonContent = (
    <>
      {/* Hover Circle */}
      <div
        className="absolute"
        style={{
          background: hoverBgColor,
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          bottom: "-75px",
          left: "50%",
          marginLeft: "-75px",
          transform: isHovered ? "scale(2)" : "scale(0)",
          transition: "transform 600ms ease-out",
        }}
      />

      {/* Default Text */}
      <span
        className="relative z-10 whitespace-nowrap"
        style={{
          transform: isHovered ? textTransformHover : textTransformDefault,
          opacity: isHovered ? 0 : 1,
          transition: "all 500ms ease-out",
          color: isHovered ? hoverColor : textColor,
        }}
      >
        {children}
      </span>

      {/* First Arrow (circle – NE based) */}
      <div
        className="absolute z-10 flex items-center justify-center"
        style={{
          ...firstArrowPosition,
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: firstArrowBgColor,
          transform: `${
            isHovered
              ? `${arrowHoverTransform} scale(0)`
              : `${arrowDefaultTransform} scale(1)`
          }`,
          transition: "all 400ms ease-out",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            transform: `${arrowRotateFromNE[firstArrowDirection]} ${
              isRTL ? "scaleX(-1)" : ""
            }`,
          }}
        >
          <path
            d="M4.08301 9.91683L9.91634 4.0835M9.91634 4.0835H4.66634M9.91634 4.0835V9.3335"
            stroke={firstArrowColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Hover Arrow */}
      <svg
        className="absolute z-10"
        style={{
          ...hoverArrowPosition,
          // transform: `${arrowRotateFromRight[arrowDirection]} ${
          //   isHovered ? "translateX(0)" : hoverArrowDefaultTransform
          // } ${isRTL ? "scaleX(-1)" : ""}`,
          transform: `
            ${isHovered ? "translateX(0)" : hoverArrowDefaultTransform}
            ${arrowRotateFromRight[arrowDirection]}
            ${isRTL ? "scaleX(-1)" : ""}
          `,
          opacity: isHovered ? 1 : 0,
          transition: "all 500ms ease-out",
        }}
        width="12"
        height="12"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M1 7H13M13 7L7 1M13 7L7 13"
          stroke={arrowHoverColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Hover Text */}
      <span
        className="absolute z-10 whitespace-nowrap"
        style={{
          transform: isHovered
            ? hoverTextHoverTransform
            : hoverTextDefaultTransform,
          opacity: isHovered ? 1 : 0,
          transition: "all 500ms ease-out",
          color: isHovered ? hoverColor : textColor,
        }}
      >
        {children}
      </span>
    </>
  );

  const buttonStyles = {
    width: width === "auto" ? "max-content" : width,
    minWidth: width === "auto" ? "120px" : undefined,
    height,
    borderRadius: "50px",
    fontSize,
    padding: `0 ${paddingX}`,
    textAlign: align,
    background: disabled ? "#9CA3AF" : bgColor,
    color: disabled ? "#D1D5DB" : textColor,
    textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };

  if (href) {
    return (
      <Link
        href={href}
        className="relative overflow-hidden flex items-center justify-center font-medium"
        style={buttonStyles}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        dir={isRTL ? "rtl" : "ltr"}
        aria-label={
          arialabel || (typeof children === "string" ? children : undefined)
        }
        aria-disabled={disabled}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="relative overflow-hidden flex items-center justify-center font-medium"
      style={buttonStyles}
      onMouseEnter={() => !disabled && setIsHovered(true)} 
      onMouseLeave={() => !disabled && setIsHovered(false)}
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={
        arialabel || (typeof children === "string" ? children : undefined)
      }
    >
      {buttonContent}
    </button>
  );
}
