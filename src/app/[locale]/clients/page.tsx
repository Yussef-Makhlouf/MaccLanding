import ClientsAccordion from "@/components/clients/ClientsAccordion";
import ClientsHero from "@/components/clients/ClientsHero";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'ar' 
      ? 'عملاؤنا | MACC'
      : 'Our Clients | MACC',
    description: locale === 'ar'
      ? 'تعرف على عملائنا وشركائنا في النجاح - نفخر بثقة عملائنا'
      : 'Meet our clients and partners in success - We are proud of our clients trust',
    openGraph: {
      title: locale === 'ar' ? 'عملاؤنا | MACC' : 'Our Clients | MACC',
      description: locale === 'ar' ? 'عملاؤنا وشركاؤنا' : 'Our clients and partners',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      languages: {
        'ar': '/ar/clients',
        'en': '/en/clients',
      },
    },
  };
}

const ClientsPage = () => {
  return (
    <>
      <ClientsHero />
      <ClientsAccordion/>
    </>
  );
};

export default ClientsPage;
