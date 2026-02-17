"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { CircleAnimatedButton } from "../ui/Button";

interface DepartmentJob {
  id: number;
  category: string;
  title: string;
  location: string;
  type: string;
  image: string;
}

interface DepartmentSectionProps {
  title: string;
  icon: string;
  description: string;
  jobs: DepartmentJob[];
  onApply: (job: DepartmentJob) => void;
}

const DepartmentSection: React.FC<DepartmentSectionProps> = ({
  title,
  icon,
  description,
  jobs,
  onApply,
}) => {
  const t = useTranslations("Career.jobListings");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="w-full bg-white py-2" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 gap-6">
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h2
                className="text-primary"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(24px, 4vw, 36px)",
                  fontWeight: "bold",
                }}
              >
                {title}
              </h2>
              <span className="text-4xl">{icon}</span>
            </div>

            <CircleAnimatedButton width="130px">
              {t("viewAll")}
            </CircleAnimatedButton>
          </div>

          <p
            className="text-[#787878] text-lg mb-8"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
          >
            {description}
          </p>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white overflow-hidden group"
              >
                {/* Image */}
                <div className="relative rounded-[40px] h-64 overflow-hidden">
                  <Image
                    src={job.image}
                    alt={job.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="py-6 space-y-2">
                  <p
                    className="text-sm text-[#787878] px-4"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                  >
                    {job.category}
                  </p>
                  <h3
                    className="text-2xl font-bold px-4"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                  >
                    {job.title}
                  </h3>
                  <div
                    className="flex items-center gap-4 text-sm text-[#787878] px-4"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                  >
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                  </div>

                  <CircleAnimatedButton
                    align="left"
                    paddingX="0px"
                    bgColor="#fff"
                    textColor="#15AC9E"
                    hoverBgColor="#fff"
                    firstArrowColor="#15AC9E"
                    arrowHoverColor="#15AC9E"
                    firstArrowDirection="down-right"
                    fontSize="12px"
                    width="135px"
                    onClick={() => onApply(job)}
                  >
                    {t("applyNow")}
                  </CircleAnimatedButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartmentSection;