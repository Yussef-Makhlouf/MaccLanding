import AboutHero from "@/components/about/AboutHero";
import AccreditationsSection from "@/components/about/AccreditationsSection";
import AchievementsSection from "@/components/about/AchievementsSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import OurMissionSection from "@/components/about/OurMissionSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'ar' 
      ? 'من نحن | MACC'
      : 'About Us | MACC',
    description: locale === 'ar'
      ? 'تعرف على شركة MACC - رؤيتنا، رسالتنا، قيمنا وإنجازاتنا في مجال إدارة المرافق'
      : 'Learn about MACC - Our vision, mission, values and achievements in facility management',
    openGraph: {
      title: locale === 'ar' ? 'من نحن | MACC' : 'About Us | MACC',
      description: locale === 'ar' ? 'رؤيتنا، رسالتنا، قيمنا' : 'Our vision, mission, values',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      languages: {
        'ar': '/ar/about',
        'en': '/en/about',
      },
    },
  };
}

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      {/* <AchievementsSection/> */}
      <VisionMissionSection/>
      <OurMissionSection/>
      <CoreValuesSection/>
      <AccreditationsSection/>
    </>
  );
};

export default AboutPage;
