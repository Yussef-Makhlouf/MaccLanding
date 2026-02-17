import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'ar' 
      ? 'اتصل بنا | MACC'
      : 'Contact Us | MACC',
    description: locale === 'ar'
      ? 'تواصل معنا للاستفسارات والمعلومات - نحن هنا لخدمتك'
      : 'Contact us for inquiries and information - We are here to serve you',
    openGraph: {
      title: locale === 'ar' ? 'اتصل بنا | MACC' : 'Contact Us | MACC',
      description: locale === 'ar' ? 'تواصل معنا للاستفسارات' : 'Contact us for inquiries',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      languages: {
        'ar': '/ar/contact',
        'en': '/en/contact',
      },
    },
  };
}