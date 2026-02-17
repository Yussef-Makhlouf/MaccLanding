"use client";
import React, { useState, useRef, useEffect } from "react";
import { Controller, Control } from "react-hook-form";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";

interface CountryCodeSelectProps {
  control: Control<any>;
  name: string;
  isRTL?: boolean;
  error?: boolean;
}

const arabicCountryNames: Record<string, string> = {
  SA: "السعودية",
  EG: "مصر",
  AE: "الإمارات",
  KW: "الكويت",
  QA: "قطر",
  BH: "البحرين",
  OM: "عمان",
  JO: "الأردن",
  LB: "لبنان",
  IQ: "العراق",
  SY: "سوريا",
  YE: "اليمن",
  PS: "فلسطين",
  LY: "ليبيا",
  TN: "تونس",
  DZ: "الجزائر",
  MA: "المغرب",
  SD: "السودان",
  SO: "الصومال",
  DJ: "جيبوتي",
  KM: "جزر القمر",
  MR: "موريتانيا",
  US: "أمريكا",
  GB: "بريطانيا",
  FR: "فرنسا",
  DE: "ألمانيا",
  IT: "إيطاليا",
  ES: "إسبانيا",
  TR: "تركيا",
  CN: "الصين",
  JP: "اليابان",
  KR: "كوريا الجنوبية",
  IN: "الهند",
  PK: "باكستان",
  BD: "بنغلاديش",
  RU: "روسيا",
  CA: "كندا",
  AU: "أستراليا",
  BR: "البرازيل",
  MX: "المكسيك",
  AR: "الأرجنتين",
  ZA: "جنوب أفريقيا",
  NG: "نيجيريا",
  KE: "كينيا",
  ET: "إثيوبيا",
  GH: "غانا",
  TZ: "تنزانيا",
  UG: "أوغندا",
  MY: "ماليزيا",
  SG: "سنغافورة",
  TH: "تايلاند",
  VN: "فيتنام",
  PH: "الفلبين",
  ID: "إندونيسيا",
  NZ: "نيوزيلندا",
  CH: "سويسرا",
  AT: "النمسا",
  BE: "بلجيكا",
  NL: "هولندا",
  SE: "السويد",
  NO: "النرويج",
  DK: "الدنمارك",
  FI: "فنلندا",
  PL: "بولندا",
  GR: "اليونان",
  PT: "البرتغال",
  IE: "أيرلندا",
  CZ: "التشيك",
  HU: "المجر",
  RO: "رومانيا",
};

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  control,
  name,
  isRTL,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries = getCountries();

  const filteredCountries = countries.filter((country) => {
    const countryNameEn = en[country]?.toLowerCase() || "";
    const countryNameAr = arabicCountryNames[country]?.toLowerCase() || "";
    const countryCode = getCountryCallingCode(country);
    const searchLower = search.toLowerCase().replace(/\+/g, "");

    return (
      countryNameEn.includes(searchLower) ||
      countryNameAr.includes(searchLower) ||
      countryCode.includes(searchLower) ||
      country.toLowerCase().includes(searchLower) ||
      `+${countryCode}`.includes(search)
    );
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({
        field: { onChange, value },
        fieldState: { error: fieldError },
      }) => {
        const selectedCode = value ? `+${getCountryCallingCode(value)}` : "---";
        const selectedFlag = value || "";
        const hasError = error || !!fieldError;

        return (
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            {/* Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`
                flex items-center justify-center gap-1.5
                py-2 px-2
                border-0 border-b
                ${hasError ? "border-red-500" : "border-gray-200"} 
                ${hasError ? "focus:border-red-500" : "focus:border-teal-500"}
                bg-transparent hover:bg-gray-50/50
                transition-all duration-200
                h-full
                group
              `}
            >
              {/* Flag or Icon */}
              {value ? (
                <span className="text-base leading-none">
                  {getFlagEmoji(selectedFlag)}
                </span>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-400 group-hover:text-accent transition-colors duration-300"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}

              {/* Code */}
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  !value ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {selectedCode}
              </span>

              {/* Arrow */}
              <svg
                className={`w-3 h-3 text-gray-400 transition-transform flex-shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div
                className={`
                  absolute ${isRTL ? "right-0" : "left-0"} top-full mt-1
                  w-80 max-h-80 overflow-hidden
                  bg-white rounded-xl shadow-2xl border border-gray-200
                  z-[100]
                `}
              >
                {/* Search */}
                <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={
                        isRTL ? "ابحث عن دولة..." : "Search country..."
                      }
                      className={`w-full px-3 py-2 pr-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      style={{
                        ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                      autoFocus
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <svg
                      className={`absolute top-1/2 -translate-y-1/2 ${
                        isRTL ? "left-3" : "right-3"
                      } w-4 h-4 text-gray-400`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Countries List */}
                <div className="overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => {
                      const code = getCountryCallingCode(country);
                      const nameEn = en[country];
                      const nameAr = arabicCountryNames[country];
                      const displayName = isRTL && nameAr ? nameAr : nameEn;
                      const isSelected = value === country;

                      return (
                        <button
                          key={country}
                          type="button"
                          onClick={() => {
                            onChange(country);
                            setIsOpen(false);
                            setSearch("");
                          }}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2.5
                            hover:bg-teal-50/50 transition-colors
                            ${
                              isSelected
                                ? "bg-teal-50 border-l-2 border-teal-500"
                                : ""
                            }
                          `}
                        >
                          <span className="text-lg leading-none flex-shrink-0">
                            {getFlagEmoji(country)}
                          </span>
                          <span
                            className={`flex-1 ${
                              isRTL ? "text-right" : "text-left"
                            } text-sm ${
                              isSelected
                                ? "text-teal-700 font-medium"
                                : "text-gray-700"
                            }`}
                            style={{
                              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                          >
                            {displayName}
                          </span>
                          <span
                            className={`text-xs font-medium flex-shrink-0 ${
                              isSelected ? "text-teal-600" : "text-gray-500"
                            }`}
                          >
                            +{code}
                          </span>
                          {isSelected && (
                            <svg
                              className="w-4 h-4 text-teal-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div
                      className="px-4 py-8 text-center text-sm text-gray-400"
                      style={{
                        ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
                    >
                      {isRTL ? "لا توجد نتائج" : "No results found"}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

// Helper function to get flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}