"use client";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { switchLocalePath } from "@/utils/switchLocale";

interface Language {
  code: string;
  nativeName: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", nativeName: "English", label: "English", flag: "🇬🇧" },
  { code: "ar", nativeName: "العربية", label: "Arabic", flag: "🇸🇦" },
];

interface LanguageSelectorMobileProps {
  onChange?: () => void;
  locale: string;
}

export function LanguageSelectorMobile({
  onChange,
  locale,
}: LanguageSelectorMobileProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (nextLocale: string) => {
    if (nextLocale === locale) return;

    const newPath = switchLocalePath(pathname, nextLocale);

    startTransition(() => {
      router.replace(newPath);
    });

    onChange?.();
  };

  return (
    <div className="mt-4 w-full">
      <div className="flex items-center gap-2 mb-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="text-accent"
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
        <p className="text-accent text-sm font-semibold">
          {locale === "ar" ? "اللغة" : "Language"}
        </p>
      </div>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            disabled={isPending}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-2xl transition-all duration-300 disabled:opacity-50 ${
              locale === lang.code
                ? "bg-accent text-white shadow-lg shadow-accent/30 scale-105"
                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span
              className="text-sm font-semibold"
              style={{
                ...(lang.code === "ar" && {
                  fontFamily: "LamaSans, sans-serif",
                }),
              }}
            >
              {lang.nativeName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
