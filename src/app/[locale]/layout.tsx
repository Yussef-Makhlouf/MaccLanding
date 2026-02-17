import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Metadata } from "next";
import { Providers } from "@/components/Providers/Providers";
import { LayoutGroup } from "framer-motion";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import { ToastProvider } from "@/components/Providers/ToastProvider";
import Maintenance from "@/components/layout/Maintenance";

export const metadata: Metadata = {
  title: "MACC - Modern Architecture",
  description: "Smart Facilities Management",
  metadataBase: new URL("https://macc-fm.com"),
  openGraph: {
    title: "MACC - Modern Architecture",
    description: "Smart Facilities Management",
    url: "https://macc-fm.com",
    siteName: "MACC",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MACC Facilities Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MACC - Modern Architecture",
    description: "Smart Facilities Management",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Fetch messages
  const messages = await getMessages({ locale });
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : ""}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Riyadh"
        >
          {isMaintenance ? (
            <Maintenance locale={locale} />
          ) : (
            <Providers>
              <LayoutGroup>
                <Navbar />
                <AppRouterCacheProvider>
                  {children}
                  <ToastProvider />
                </AppRouterCacheProvider>
                <Footer />
              </LayoutGroup>
            </Providers>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
