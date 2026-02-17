"use client";

import { useTranslations } from "next-intl";
import { CircleAnimatedButton } from "@/components/ui/Button";
import Link from "next/link";

const NotFound: React.FC = () => {
  const t = useTranslations("Common.notFound");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-[150px] font-bold font-clash text-[#15AC9E] leading-none mb-4">
        404
      </h1>
      <h2 className="text-4xl font-bold mb-4 font-clash text-black">
        {t("title") || "Page Not Found"}
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {t("description") ||
          "The page you are looking for does not exist or has been moved."}
      </p>
      <Link href="/" className="inline-block">
        <CircleAnimatedButton
          bgColor="#15AC9E"
          hoverBgColor="#000"
          arrowHoverColor="#fff"
          arrowDirection="right"
          firstArrowBgColor="#fff"
          firstArrowColor="#15AC9E"
          width="180px"
        >
          {t("goHome") || "Go Home"}
        </CircleAnimatedButton>
      </Link>
    </div>
  );
};

export default NotFound;
