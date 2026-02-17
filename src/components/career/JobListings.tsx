"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FiEye } from "react-icons/fi";
import { CircleAnimatedButton } from "../ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCareersByLanguage } from "@/store/slices/careersSlice";
import type { Career } from "@/lib/careers/types";
import Loading from "@/components/shared/Loading";
import { ErrorMessage } from "@/components/shared/Error";

interface JobListingsProps {
  onApply: (career: Career) => void;
  onViewDetails: (career: Career) => void;
}

const JobListings: React.FC<JobListingsProps> = ({
  onApply,
  onViewDetails,
}) => {
  const t = useTranslations("Career.jobListings");
  const locale = useLocale() as "en" | "ar";
  const isRTL = locale === "ar";
  const dispatch = useAppDispatch();

  const { careers, careersLoading, careersError } = useAppSelector(
    (state) => state.careers
  );

  useEffect(() => {
    dispatch(fetchCareersByLanguage({ locale }));
  }, [dispatch, locale]);

  if (careersLoading) {
    return <Loading />;
  }

  if (careersError) {
    return (
      <section
        className="w-full bg-white py-6 md:py-10"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-[1440px] mx-auto">
            <ErrorMessage
              message={
                isRTL
                  ? "عذراً، تعذر تحميل الوظائف"
                  : "Sorry, unable to load jobs"
              }
              description={
                isRTL
                  ? "يبدو أن هناك مشكلة في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى."
                  : "It looks like there's a problem connecting to the server. Please check your internet connection and try again."
              }
              retryAction={() => dispatch(fetchCareersByLanguage({ locale }))}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="job-Listing"
      className="w-full bg-white py-6 md:py-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
            <div>
              <h2
                className="text-primary mb-4"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: "bold",
                }}
              >
                {t("title")}
              </h2>
              <p
                className="text-[#787878] text-lg"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
              >
                {t("subtitle")}
              </p>
            </div>

            {careers.length > 8 && (
              <CircleAnimatedButton width="130px">
                {t("viewAll")}
              </CircleAnimatedButton>
            )}
          </div>

          {/* Jobs Grid */}
          {careers.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="text-gray-500 text-lg"
                style={{
                  ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
              >
                {t("noJobsAvailable")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {careers.slice(0, 8).map((career, index) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#F5F5F5] rounded-3xl p-6"
                >
                  <p
                    className="text-sm text-[#787878] mb-2"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                  >
                    {career.department}
                  </p>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                  >
                    {career.title}
                  </h3>
                  <div
                    className="flex items-center gap-4 text-sm text-[#787878] mb-6"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                  >
                    <span>{career.location}</span>
                    <span>{career.employmentType}</span>
                  </div>

                  <div
                    className={`flex items-center gap-3 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <button
                      onClick={() => onViewDetails(career)}
                      className="flex items-center gap-2 text-xs font-medium hover:text-primary transition-colors min-w-max cursor-pointer"
                      style={{
                        ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                    >
                      {t("viewDetails")}
                      <FiEye className={isRTL ? "rotate-180" : ""} />
                    </button>

                    <CircleAnimatedButton
                      bgColor="#15AC9E"
                      hoverBgColor="#000"
                      firstArrowDirection="down-right"
                      fontSize="12px"
                      width="135px"
                      onClick={() => {
                        onApply(career);
                        // console.log("career", career);
                      }}
                    >
                      {t("applyNow")}
                    </CircleAnimatedButton>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
