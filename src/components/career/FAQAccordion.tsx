"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FiPlus } from "react-icons/fi";
import { ChevronDown } from "lucide-react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";

// Styled Accordion with custom styles
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "#F5F8FF",
  boxShadow: "none",
  border: "none",
  borderRadius: "0 !important",
  marginBottom: "16px !important",
  transition: "all 0.3s ease",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "0 0 16px 0 !important",
    backgroundColor: "#F5F8FF",
  },
  "&:hover": {
    backgroundColor: "#15AC9E",
    "& .MuiAccordionSummary-content": {
      color: "#FFFFFF",
    },
    "& .icon-wrapper": {
      color: "#FFFFFF",
    },
  },
  "&.Mui-expanded:hover": {
    backgroundColor: "#F5F8FF",
    "& .MuiAccordionSummary-content": {
      color: "#000000",
    },
    "& .icon-wrapper": {
      color: "#000000",
    },
  },
}));

// Styled AccordionSummary
const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: "24px 32px",
  minHeight: "auto !important",
  "& .MuiAccordionSummary-content": {
    margin: "0",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    transition: "color 0.3s ease",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "none !important",
    transition: "none !important",
  },
  "&.Mui-expanded": {
    minHeight: "auto !important",
  },
  "@media (max-width: 768px)": {
    padding: "24px",
  },
}));

// Styled AccordionDetails
const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: "0 32px 32px 32px",
  paddingLeft: "80px",
  "@media (max-width: 768px)": {
    padding: "0 24px 24px 24px",
  },
}));

const FAQAccordion: React.FC = () => {
  const t = useTranslations("Career.faq");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [expanded, setExpanded] = useState<string[]>(["panel-0"]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (isExpanded) {
        setExpanded((prev) => [...prev, panel]);
      } else {
        setExpanded((prev) => prev.filter((item) => item !== panel));
      }
    };

  // Number of FAQ items (0-4 = 5 items)
  const faqCount = 5;

  return (
    <section className="w-full bg-white py-6 md:py-10" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <h2
            className="mb-4 md:mb-8"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(36px, 5vw, 48px)",
              fontWeight: "bold",
            }}
          >
            {t("title")}
          </h2>

          {/* Accordion */}
          <div>
            {Array.from({ length: faqCount }).map((_, index) => {
              const panelId = `panel-${index}`;
              const isExpanded = expanded.includes(panelId);
              const isHovered = hoveredItem === panelId;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StyledAccordion
                    expanded={isExpanded}
                    onChange={handleChange(panelId)}
                    onMouseEnter={() => setHoveredItem(panelId)}
                    onMouseLeave={() => setHoveredItem(null)}
                    slotProps={{
                      transition: {
                        timeout: 300,
                        unmountOnExit: true,
                      },
                    }}
                  >
                    <StyledAccordionSummary
                      aria-controls={`${panelId}-content`}
                      id={`${panelId}-header`}
                      expandIcon={
                        <div className="icon-wrapper flex items-center justify-center w-8 h-8">
                          {isExpanded || isHovered ? (
                            <ChevronDown
                              className="text-xl transition-colors duration-300"
                              style={{
                                color: isExpanded ? "#15AC9E" : "#FFFFFF",
                              }}
                            />
                          ) : (
                            <FiPlus
                              className="text-xl"
                              style={{ color: "#000000" }}
                            />
                          )}
                        </div>
                      }
                    >
                      <span
                        className="font-medium transition-colors duration-300"
                        style={{
                          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(20px, 3vw, 24px)",
                          color: isExpanded
                            ? "#000000"
                            : isHovered
                            ? "#FFFFFF"
                            : "#000000",
                        }}
                      >
                        0{index + 1}
                      </span>
                      <h3
                        className="font-medium transition-colors duration-300"
                        style={{
                          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(16px, 2.5vw, 20px)",
                          color: isExpanded
                            ? "#000000"
                            : isHovered
                            ? "#FFFFFF"
                            : "#000000",
                        }}
                      >
                        {t(`items.${index}.question`)}
                      </h3>
                    </StyledAccordionSummary>

                    <StyledAccordionDetails>
                      <p
                        className="text-[#787878] leading-relaxed"
                        style={{
                          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(14px, 2vw, 18px)",
                        }}
                      >
                        {t(`items.${index}.answer`)}
                      </p>
                    </StyledAccordionDetails>
                  </StyledAccordion>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;