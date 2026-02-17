import Hero from "@/components/home/Hero/Hero";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'ar' 
      ? 'الرئيسية | MACC - الهندسة المعمارية الحديثة'
      : 'Home | MACC - Modern Architecture',
    description: locale === 'ar'
      ? 'شركة MACC لإدارة المرافق الذكية - حلول متكاملة لإدارة وصيانة المرافق'
      : 'MACC Smart Facilities Management - Comprehensive solutions for facility management and maintenance',
    openGraph: {
      title: locale === 'ar' 
        ? 'الرئيسية | MACC'
        : 'Home | MACC',
      description: locale === 'ar'
        ? 'شركة MACC لإدارة المرافق الذكية'
        : 'MACC Smart Facilities Management',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      languages: {
        'ar': '/ar',
        'en': '/en',
      },
    },
  };
}
export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
