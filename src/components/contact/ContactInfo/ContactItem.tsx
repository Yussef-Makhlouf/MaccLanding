import React, { ReactNode } from "react";

interface ContactItemProps {
  icon: ReactNode;
  title: string;
  value: string;
  link: string;
  linkText?: string;
  isRTL?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  title,
  value,
  link,
  linkText,
  isRTL = false,
}) => {
  return (
    <div className="mb-4" dir={isRTL ? "rtl" : "ltr"}>
      <p
        className="text-sm font-semibold tracking-wider"
        style={{
          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
        }}
      >
        {title}
      </p>
      <a
        href={link}
        className={`flex items-center gap-3 text-lg group transition-colors w-fit `}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <span
          className="font-normal"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
          }}
        >
          {linkText || value}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 8.5L8.5 1M8.5 1H1.75M8.5 1V7.75"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
};
