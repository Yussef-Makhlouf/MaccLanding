"use client";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/lib/services/types";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  locale: Locale;
}

export default function NavLink({
  href,
  children,
  isActive = false,
  locale,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`nav-link transition-colors flex items-center gap-1 ${
        isActive ? "text-primary" : "text-secondary hover:text-primary"
      }`}
      style={{
        ...(locale === "ar" && { fontFamily: "LamaSans, sans-serif" }),
      }}
    >
      {children}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        color="#15AC9E"
      >
        <path
          d="M4.08301 9.91683L9.91634 4.0835M9.91634 4.0835H4.66634M9.91634 4.0835V9.3335"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
