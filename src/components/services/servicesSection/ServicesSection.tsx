"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchServicesByLanguage,
  selectServices,
  selectServicesLoading,
  selectServicesError,
} from "@/store/slices/servicesSlice";
import { ServiceCard } from "../serviceCard/ServiceCard";
import Loading from "@/components/shared/Loading";
import type { Locale } from "@/lib/services/types";
import { ErrorMessage } from "@/components/shared/Error";

export default function ServicesSection() {
  const t = useTranslations("Services");
  const locale = useLocale() as Locale;
  const isRTL = locale === "ar";

  // Redux
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectServices);
  const loading = useAppSelector(selectServicesLoading);
  const error = useAppSelector(selectServicesError);

  // Fetch services on mount or locale change
  useEffect(() => {
    dispatch(fetchServicesByLanguage(locale));
  }, [dispatch, locale]);

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage
        message={
          isRTL ? "عذراً، تعذر تحميل الخدمات" : "Sorry, unable to load services"
        }
        description={
          isRTL
            ? "يبدو أن هناك مشكلة في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى."
            : "It looks like there's a problem connecting to the server. Please check your internet connection and try again."
        }
        retryAction={() => dispatch(fetchServicesByLanguage(locale))}
      />
    );
  }

  // Empty state
  if (!services || services.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p
          className="text-gray-600"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
        >
          {isRTL ? "لا توجد خدمات متاحة حالياً" : "No services available"}
        </p>
      </div>
    );
  }

  return (
    <section
      className="w-full px-6 md:px-16 lg:px-20 py-6"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h2
        style={{
          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(32px, 5vw, 55px)",
          fontWeight: 600,
          letterSpacing: isRTL ? "0" : "0.01em",
          color: "#000",
          marginTop: "8px",
        }}
        className="mb-2 md:mb-4"
      >
        {t("section.title")}
      </h2>
      <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-16">
        {services
          .slice()
          .reverse()
          .map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.header.title}
              subtitle={service.header.sub_title}
              description={service.header.description}
              image={service?.header?.image}
              color={service.services[0]?.color}
              reversed={index % 2 !== 0}
              id={String(index + 1).padStart(2, "0")}
              href={`/services/${service.id}`}
              isRTL={isRTL}
            />
          ))}
      </div>
    </section>
  );
}
