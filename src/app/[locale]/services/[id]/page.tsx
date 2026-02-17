import ServiceHero from "@/components/services/Details/ServiceDetailsHero";
import ServiceDetailsSection from "@/components/services/Details/ServiceDetailsSection";
import { getServiceById, getServicesByLanguage } from "@/lib/services/api";
import { getMockServiceById, getMockServices } from "@/lib/services/mockData";
import { notFound } from "next/navigation";
import type { Locale, Service } from "@/lib/services/types";
import { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  try {
    const { id, locale: urlLocale } = await params;
    const locale = (urlLocale || "en") as Locale;

    // Fetch all services to find the right one (resilient to ID type)
    let servicesResponse = await getServicesByLanguage(locale).catch(
      () => null,
    );
    let services = servicesResponse?.services || getMockServices(locale);

    // 1. Try by exact ID match (Most safe)
    let service =
      (services as Service[]).find((s: Service) => s.id === id) || null;

    // 2. Fallback to numerical index if ID match failed (e.g. legacy links)
    if (!service) {
      const idx = parseInt(id) - 1;
      service = !isNaN(idx) && services[idx] ? services[idx] : null;
    }

    // 3. Last resort fallback
    if (!service) {
      service = services[0];
    }

    if (!service) {
      return { title: "Service | MACC" };
    }

    return {
      title: `${service.header.title} | MACC`,
      description: service.header.description,
      openGraph: {
        title: `${service.header.title} | MACC`,
        description: service.header.description,
        images: service.services[0]?.image
          ? [
            {
              url: service.services[0].image,
              alt: service.header.title,
            },
          ]
          : [],
        type: "website",
        locale: locale === "ar" ? "ar_SA" : "en_US",
      },
      alternates: {
        languages: {
          ar: `/ar/services/${id}`,
          en: `/en/services/${id}`,
        },
      },
    };
  } catch (error) {
    console.error("❌ Error generating metadata:", error);
    return {
      title: "Service",
    };
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id, locale: urlLocale } = await params;
  const locale = (urlLocale || "en") as Locale;

  if (!id || id === "undefined") {
    console.error("❌ Invalid service ID:", id);
    notFound();
  }

  // Fetch all services to find the right one (resilient to ID type)
  let servicesResponse = await getServicesByLanguage(locale).catch(() => null);
  let services = servicesResponse?.services || getMockServices(locale);

  // 1. Try by exact ID match (Most safe)
  let service =
    (services as Service[]).find((s: Service) => s.id === id) || null;

  // 2. Fallback to numerical index if ID match failed
  if (!service) {
    const idx = parseInt(id) - 1;
    service = !isNaN(idx) && services[idx] ? services[idx] : null;
  }

  // 3. Fallback to first one if still nothing (ensures no 500)
  if (!service) {
    service = services[0];
  }

  if (!service) {
    console.warn("⚠️ No service data available even in fallback:", id);
    notFound();
  }

  const HERO_IMAGES_MAP: Record<string, string> = {
    "1": "Hard.jfif",
    "2": "Soft.jfif",
    "3": "Ground.jfif",
    "4": "Special.jfif",
    "5": "Engineering.jfif",
    "6": "Catering.jfif",
  };

  const customHeroImage = HERO_IMAGES_MAP[service.id];
  const heroImage = customHeroImage
    ? `/images/services-hero/${customHeroImage}`
    : service.services[1]?.image || "/images/hero.webp";
  const isRTL = locale === "ar";

  return (
    <main className="mb-20">
      <ServiceHero
        title={service.header.title}
        subtitle={service.header.sub_title}
        description={service.header.description}
        backgroundImage={heroImage}
        color={service.services[0]?.color || "#15AC9E"}
        titleColor={
          service.id === "1"
            ? "#FFFFFF"
            : service.services[0]?.color || "#FFFFFF"
        }
        isRTL={isRTL}
        locale={locale}
      />

      <ServiceDetailsSection
        title={service.header.title}
        items={service.services}
        isRTL={isRTL}
        locale={locale}
      />
    </main>
  );
}

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "ar"];
  const paths: { id: string; locale: string }[] = [];

  locales.forEach((locale) => {
    const services = getMockServices(locale);
    services.forEach((service) => {
      paths.push({
        id: service.id,
        locale: locale,
      });
    });
  });

  return paths;
}
