"use client";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchServicesByLanguage,
  selectServices,
} from "@/store/slices/servicesSlice";
import { CircleAnimatedButton } from "../ui/Button";
import { scrollToSection } from "@/utils/scroll";
import type { Locale } from "@/lib/services/types";
import { Phone, Linkedin, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale() as Locale;
  const isRTL = locale === "ar";

  // Redux
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectServices);

  // Fetch services on mount or locale change
  useEffect(() => {
    dispatch(fetchServicesByLanguage(locale));
  }, [dispatch, locale]);

  // General Links
  const generalLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("aboutUs") },
    { href: "/services", label: t("services") },
    { href: "/careers", label: t("careers") },
    { href: "/contact", label: t("contactUs") },
  ];

  // Dynamic Services Links
  const serviceOrder = ["1", "2", "3", "4", "5", "6"];
  const servicesLinks = services
    .slice()
    .sort((a, b) => {
      const indexA = serviceOrder.indexOf(a.id);
      const indexB = serviceOrder.indexOf(b.id);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    })
    .slice(0, 6)
    .map((service) => ({
      href: `/services/${service.id}`,
      label: service.header.title,
    }));

  const pathname = usePathname();
  const isContactPage = pathname.includes("/contact");

  return (
    <footer
      className="pt-8 md:pb-8 pb-4 bg-background relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.01) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.01) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px",
      }}
      role="contentinfo"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-20">
        {/* Top Row - Logo and Social */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center md:gap-6 md:mb-16 md:pb-8 gap-2 mb-0 pb-1">
          <Link href="/" aria-label="MACC Home">
            <Image
              src="/images/logo.svg"
              alt="MACC Modern Arch Logo"
              width={180}
              height={99}
              className="w-32 sm:w-40 lg:w-[180px] h-auto"
              priority={false}
              loading="lazy"
            />
          </Link> 

      <div className="flex items-center gap-4">
            <span
              className="text-foreground font-clash text-base md:text-lg font-normal"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
            >
              {t("followUs")}
            </span>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-100 rounded-full p-2 flex items-center justify-center hover:bg-primary transition-colors duration-300"
              aria-label="Follow us on LinkedIn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          </div>
        </div> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-12 md:mb-16 mb-6">
          {/* CTA Section */}
          <div className="col-span-1 sm:col-span-2">
            <div>
              <Link href="/" aria-label="MACC Home">
                <Image
                  src="/images/logo.svg"
                  alt="MACC Modern Arch Logo"
                  width={180}
                  height={99}
                  className="w-32 sm:w-40 lg:w-[180px] h-auto mb-8"
                  priority={false}
                  loading="lazy"
                />
              </Link>
            </div>
            <h2
              className="font-clash text-2xl md:text-3xl font-bold  md:leading-tight italic"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              "   {t("coolIdea")}
            </h2>
            <h3
              className="font-clash text-2xl md:text-3xl font-bold leading-tight italic"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {t("collaborate")} "
              {/* <span className="text-primary">!</span> */}
            </h3>
            {/* {isContactPage && (
              <div
                className="mt-8"
                onClick={(e) => scrollToSection(e, "contact")}
              >
                <CircleAnimatedButton
                  firstArrowBgColor="#fff"
                  bgColor="#15AC9E"
                  firstArrowColor="#15AC9E"
                  hoverBgColor="#000"
                  hoverColor="#fff"
                  width="280px"
                >
                  {t("BECOMEAVENDOR")}
                </CircleAnimatedButton>
              </div>
            )} */}
          </div>

          {/* General Links */}
          <nav aria-label="General navigation">
            <h3
              className="font-clash text-xl md:text-2xl font-bold mb-2 md:mb-6"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {t("general")}
            </h3>
            <ul className="space-y-3" role="list">
              {generalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-clash text-base md:text-lg hover:text-primary transition-colors duration-300"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services Links */}
          <nav aria-label="Services navigation">
            <h3
              className="font-clash text-xl md:text-2xl font-bold mb-2 md:mb-6"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {t("servicesTitle")}
            </h3>
            <ul className="space-y-3" role="list">
              {servicesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-clash text-base md:text-lg hover:text-primary transition-colors duration-300"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Links */}
          <nav aria-label="Contact information">
            <h3
              className="font-clash text-xl md:text-2xl font-bold mb-2 md:mb-6"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {t("connectWithUs")}
            </h3>
            <ul className="space-y-3" role="list">
              <li>
                <div className="flex items-center gap-4 ">
                  <a
                    href="tel:920035472"
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white text-foreground transition-colors duration-300 group"
                    aria-label="Call us"
                  >
                    <Phone size={18} />
                  </a>
                  <a
                    href="tel:920035472"
                    className="font-clash text-base md:text-lg hover:text-primary transition-colors duration-300"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                    }}
                    aria-label="Call us at 920035472"
                    dir="ltr"
                  >
                    920035472
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4">
                  <Link
                    href="https://www.linkedin.com/company/macc-fm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white text-foreground transition-colors duration-300 group"
                    aria-label="Follow us on LinkedIn"
                  >
                    <Linkedin size={18} />
                  </Link>
                  <span
                    className="text-foreground font-clash text-base md:text-lg font-normal"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                    }}
                  >
                    {t("followUs")}
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4">
                  <Link
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white text-foreground transition-colors duration-300 group"
                    aria-label="View Location"
                  >
                    <MapPin size={18} />
                  </Link>
                  <Link
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-clash text-base md:text-lg hover:text-primary transition-colors duration-300"
                    style={{
                      ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
                    }}
                    aria-label="View our headquarters location on Google Maps"
                  >
                    {t("hqLocation")}
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 md:pt-8 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            className="font-clash text-base md:text-lg font-light text-foreground"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
            }}
          >
            © {new Date().getFullYear()} {t("allRightsReserved")}
          </p>
          <nav aria-label="Legal navigation" className="flex gap-6 sm:gap-12">
            <Link
              href="#"
              className="font-clash text-base md:text-lg font-light hover:text-primary transition-colors duration-300"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="#"
              className="font-clash text-base md:text-lg font-light hover:text-primary transition-colors duration-300"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" })
              }}
            >
              {t("termsOfUse")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
