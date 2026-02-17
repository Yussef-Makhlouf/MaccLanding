"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { switchLocalePath } from "@/utils/switchLocale";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
];

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const currentLanguage = languages.find((l) => l.code === locale);

  const changeLanguage = (nextLocale: string) => {
    if (nextLocale === locale) return;

    setOpen(false);
    const newPath = switchLocalePath(pathname, nextLocale);

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all duration-300 group"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="text-accent group-hover:rotate-12 transition-transform duration-300"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span
          className="text-sm font-medium text-secondary"
          style={{
            ...(locale === "ar" && { fontFamily: "LamaSans, sans-serif" }),
          }}
        >
          {currentLanguage?.nativeName}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 text-accent ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 9l-7 7-7-7"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={`absolute ${
                isRTL ? "left-0" : "right-0"
              } mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50`}
            >
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-accent/5 transition-all duration-200 group ${
                    locale === lang.code ? "bg-accent/10" : ""
                  } ${index !== languages.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {lang.flag}
                  </span>
                  <div
                    className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        locale === lang.code ? "text-accent" : "text-gray-800"
                      }`}
                      style={{
                        ...(lang.code === "ar" && {
                          fontFamily: "LamaSans, sans-serif",
                        }),
                      }}
                    >
                      {lang.nativeName}
                    </p>
                    <p className="text-xs text-gray-500">{lang.name}</p>
                  </div>

                  {locale === lang.code && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-accent text-xl"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
