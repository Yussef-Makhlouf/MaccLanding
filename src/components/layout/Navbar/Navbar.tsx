"use client";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavLink from "./NavLink";
import CircleAnimatedButton from "@/components/ui/Button/CircleAnimatedButton";
import { useLocale, useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";
import { LanguageSelectorMobile } from "./LanguageSelectorMobile";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isCareerPage = pathname.includes("/careers");
  const isAboutPage = pathname.includes("/about");

  return (
    <>
      <motion.nav
        animate={{
          backgroundColor: isCareerPage ? "#F5F5F5" : "#FFFFFF",
          borderTopLeftRadius:
            !isMenuOpen && (isCareerPage || isAboutPage) ? 40 : 0,
          borderTopRightRadius:
            !isMenuOpen && (isCareerPage || isAboutPage) ? 40 : 0,
          backgroundImage: isCareerPage
            ? `linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`
            : isAboutPage
              ? `linear-gradient(to right, rgba(0, 0, 0, 0.01) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.01) 1px, transparent 1px)`
              : "none",
          backgroundSize: isCareerPage || isAboutPage ? "120px 120px" : "auto",
        }}
        transition={{
          duration: 2.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full z-50 px-6 lg:px-10 py-2 md:py-4 flex items-center justify-between"
      >
        <div className="flex justify-between gap-14">
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={130}
              height={70}
              className="lg:w-[150px] md:ml-24"
            />
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-6">
            <NavLink
              locale={locale as "ar" | "en"}
              href="/"
              isActive={pathname === "/"}
            >
              {t("home")}
            </NavLink>
            <NavLink
              locale={locale as "ar" | "en"}
              href="/about"
              isActive={pathname.includes("/about")}
            >
              {t("about")}
            </NavLink>
            <NavLink
              locale={locale as "ar" | "en"}
              href="/services"
              isActive={pathname.includes("/services")}
            >
              {t("services")}
            </NavLink>
            <NavLink
              locale={locale as "ar" | "en"}
              href="/clients"
              isActive={pathname.includes("/clients")}
            >
              {t("clients")}
            </NavLink>
            <NavLink
              locale={locale as "ar" | "en"}
              href="/careers"
              isActive={pathname.includes("/careers")}
            >
              {t("career")}
            </NavLink>
            <NavLink
              locale={locale as "ar" | "en"}
              href="/contact"
              isActive={pathname.includes("/contact")}
            >
              {t("contact")}
            </NavLink>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <LanguageSelector />

          {/* <CircleAnimatedButton onClick={() => console.log("Login clicked")}>
            {t("login")}
          </CircleAnimatedButton> */}
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden relative w-10 h-10 z-50 flex items-center justify-center"
        >
          <span
            className={`absolute w-6 h-0.5 bg-secondary transition-transform duration-300
              ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}
            `}
          />
          <span
            className={`absolute w-6 h-0.5 bg-secondary transition-transform duration-300
              ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}
            `}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-secondary z-40 transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="h-full w-full flex flex-col items-start justify-start gap-2 px-8 pb-10 pt-28">
          <div className="flex flex-col items-start gap-3 w-full max-w-md">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-white text-xl font-light hover:text-accent transition-colors"
              style={{
                ...(locale === "ar" && { fontFamily: "LamaSans, sans-serif" }) }}
            >
              {t("home")}
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="text-white text-xl font-light hover:text-accent transition-colors"
              style={{
                ...(locale === "ar" && { fontFamily: "LamaSans, sans-serif" }) }}
            >
              {t("about")}
            </Link>
            <Link
              href="/services"
              onClick={closeMenu}
              className="text-white text-xl font-light hover:text-accent transition-colors"
              style={{
                ...(locale === "ar" && { fontFamily: "LamaSans, sans-serif" }) }}
            >
              {t("services")}
            </Link>
            <Link
              href="/clients"
              onClick={closeMenu}
              className="text-white text-xl font-light hover:text-accent transition-colors"
              style={{
                ...(locale === "ar" && { fontFamily: "LamaSans, sans-serif" }) }}
            >
              {t("clients")}
            </Link>
            <Link
              href="/careers"
              onClick={closeMenu}
              className="text-white text-xl font-light hover:text-accent transition-colors"
              style={{
                ...(locale === "ar" && { fontFamily: "LamaSans, sans-serif" }) }}
            >
              {t("career")}
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="text-white text-xl font-light hover:text-accent transition-colors"
              style={{
                ...(locale === "ar" && { fontFamily: "LamaSans, sans-serif" }) }}
            >
              {t("contact")}
            </Link>

            <LanguageSelectorMobile onChange={closeMenu} locale={locale} />
          </div>

          {/* Footer Mobile Menu */}
          <div className="w-full max-w-md grid grid-cols-1 gap-2 mt-auto">
            <div>
              <h3 className="text-accent text-lg mb-1">{t("letsMeet")}</h3>
              <p className="text-white text-sm whitespace-pre-line">
                {t("location")}
              </p>
            </div>
            <div>
              <h3 className="text-accent text-lg mb-1">{t("letsTalk")}</h3>
              <a href="tel:+966593322551" className="text-white text-sm block">
                +966 59 332 2551
              </a>
              <a
                href="mailto:info@macc.mf.com"
                className="text-white text-sm block"
              >
                info@macc.mf.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
