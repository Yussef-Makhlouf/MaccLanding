"use client";

import { useLocale } from "next-intl";
import { useAppSelector } from "@/store/hooks";
import {
  selectServices,
  selectServicesLoading,
} from "@/store/slices/servicesSlice";
import type { Locale } from "@/lib/services/types";

export default function ServicesMarquee() {
  const locale = useLocale() as Locale;
  const isRTL = locale === "ar";

  const services = useAppSelector(selectServices);
  const loading = useAppSelector(selectServicesLoading);

  // Don't render if loading or no data
  if (loading || !services || services.length === 0) {
    return null;
  }

  // Extract titles
  const titles = services.map((service) => service.header.title);

  return (
    <div
      className="w-full overflow-hidden py-6 relative"
      dir="ltr"
      style={{
        background: "linear-gradient(90deg, #000000 0%, #15AC9E 100%)",
      }}
    >
      <div className="marquee-container">
        <div className="marquee-content">
          {/* First loop */}
          {titles.map((title, index) => (
            <div key={`first-${index}`} className="marquee-item">
              <span className="service-text">{title}</span>
              <span className="bullet" />
            </div>
          ))}

          {/* Duplicate loop for seamless scroll */}
          {titles.map((title, index) => (
            <div key={`second-${index}`} className="marquee-item">
              <span className="service-text">{title}</span>
              <span className="bullet" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          display: flex;
          width: 100%;
        }

        .marquee-content {
          display: flex;
          animation: scroll 12s linear infinite;
          will-change: transform;
        }

        .marquee-item {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          flex-direction: ${isRTL ? "row-reverse" : "row"};
        }

        .service-text {
          ${isRTL ? `font-family: "LamaSans", sans-serif;` : ""}
          font-size: clamp(20px, 2vw, 24px);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
          padding: 8px 60px;
          white-space: nowrap;
        }

        .bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffffff;
          flex-shrink: 0;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Pause on hover */
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
