"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  title: string;
  description: string;
  isActive?: boolean;
  isRTL?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MissionCard({
  title,
  description,
  isActive = false,
  isRTL = false,
  onMouseEnter,
  onMouseLeave,
}: MissionCardProps) {
  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="group w-full flex flex-col gap-3 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Title Pill */}
      <h4
        className={cn(
          "w-full px-4 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wide text-white transition-all duration-700 ease-in-out",
          isRTL ? "font-lama text-right" : "text-left",
          isActive
            ? "bg-linear-to-l from-[#1B7A71] to-[#16B4A6] "
            : "bg-linear-to-l from-[#828893] to-[#B0B4BA] group-hover:from-[#1B7A71] group-hover:to-[#16B4A6] ",
        )}
      >
        {title}
      </h4>

      {/* Description */}
      <p
        className={cn(
          "text-sm md:text-base leading-relaxed font-normal transition-all duration-700",
          isRTL ? "font-lama" : "",
          isActive
            ? "text-black font-medium opacity-100"
            : "text-[#6B7280] group-hover:text-black group-hover:font-medium opacity-80 group-hover:opacity-100",
        )}
      >
        {description}
      </p>
    </div>
  );
}
