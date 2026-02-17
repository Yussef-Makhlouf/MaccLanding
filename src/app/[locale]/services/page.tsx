import ServicesHero from "@/components/services/Hero";
import ServicesMarquee from "@/components/services/marquee/ServicesMarquee";
import ServicesSection from "@/components/services/servicesSection/ServicesSection";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'ar' 
      ? 'خدماتنا | MACC'
      : 'Our Services | MACC',
    description: locale === 'ar'
      ? 'تعرف على مجموعة خدماتنا المتكاملة في إدارة وصيانة المرافق - خدمات هندسية، ميكانيكية، كهربائية وأكثر'
      : 'Explore our comprehensive facility management services - Engineering, mechanical, electrical services and more',
    openGraph: {
      title: locale === 'ar' 
        ? 'خدماتنا | MACC'
        : 'Our Services | MACC',
      description: locale === 'ar'
        ? 'مجموعة خدمات متكاملة في إدارة المرافق'
        : 'Comprehensive facility management services',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      languages: {
        'ar': '/ar/services',
        'en': '/en/services',
      },
    },
  };
}
const page = () => {
  return (
    <>
      <ServicesHero />
      <ServicesMarquee/>
      <ServicesSection/>
    </>
  );
};

export default page;
