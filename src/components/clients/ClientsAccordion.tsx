"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Variants } from "framer-motion";

interface Client {
  id: number;
  name: string;
  logo: string;
}

const clients: Client[] = [
  {
    id: 1,
    name: "KAUST",
    logo: "/images/clients/kaust.svg",
  },
  {
    id: 2,
    name: "NEOM",
    logo: "/images/clients/neom.svg",
  },
  {
    id: 3,
    name: "Saudi Aramco",
    logo: "/images/clients/aramco.svg",
  },
  {
    id: 4,
    name: "Al Rajhi",
    logo: "/images/clients/alrajhi.svg",
  },
  {
    id: 5,
    name: "Ministry",
    logo: "/images/clients/ministry.svg",
  },
  {
    id: 6,
    name: "SABIC",
    logo: "/images/clients/sabic.svg",
  },
  {
    id: 7,
    name: "STC",
    logo: "/images/clients/stc.svg",
  },
  {
    id: 8,
    name: "Lucid",
    logo: "/images/clients/lucid.svg",
  },
  {
    id: 9,
    name: "UBT",
    logo: "/images/clients/ubt.svg",
  },
  {
    id: 10,
    name: "Royal",
    logo: "/images/clients/royal.svg",
  },
  {
    id: 11,
    name: "Cenvira",
    logo: "/images/clients/cenvira.svg",
  },
  {
    id: 12,
    name: "Dow",
    logo: "/images/clients/dow.svg",
  },
];

// IDs that should be rotated 90deg when opened
const flippedIds = [3, 4, 5, 6, 8, 11, 12];

const ClientsAccordion = () => {
  const [open, setOpen] = useState<number | null>(clients[0].id);
  const t = useTranslations("Clients.section");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section
      id="clients-section"
      className="w-full bg-black py-6 md:py-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16 gap-6 md:gap-8">
            <h2
              className="text-white font-medium whitespace-pre-line"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(36px, 5vw, 60px)",
                lineHeight: "1.2",
              }}
            >
              {t("title")}
            </h2>

            <p
              className="text-white max-w-full md:max-w-[600px] leading-relaxed"
              style={{
                ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    lineHeight: "180%",
                fontSize: "clamp(16px, 2vw, 24px)",
              }}
            >
              {t("description")}
            </p>
          </div>

          {/* Accordion Grid */}
          <div
            className={`flex flex-col lg:flex-row h-fit lg:h-[450px] w-full shadow-2xl overflow-hidden border-2 border-white/10 ${
              isRTL ? "lg:flex-row-reverse" : ""
            }`}
          >
            {clients.map((client) => (
              <Panel
                key={client.id}
                open={open}
                setOpen={setOpen}
                client={client}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface PanelProps {
  open: number | null;
  setOpen: (id: number | null) => void;
  client: Client;
  isRTL: boolean;
}

const Panel = ({ open, setOpen, client, isRTL }: PanelProps) => {
  const { width } = useWindowSize();
  const isOpen = open === client.id;
  const shouldRotate = flippedIds.includes(client.id);
  const shouldRotateWhenClosed = client.id === 1;

  return (
    <>
      {!isOpen && (
        <button
          className={`bg-white hover:bg-gray-50 transition-all p-3 md:p-4 border-b-[1px] lg:border-b-0 md:mb-0 mb-1 flex flex-row lg:flex-col 
          justify-center items-center gap-2 relative group min-w-[80px] md:min-w-[100px] lg:min-w-[5rem] flex-shrink-0 ${
            isRTL ? "border-l-[1px] md:ml-1" : "border-r-[1px] md:mr-1"
          }`}
          onClick={() => setOpen(client.id)}
          onMouseEnter={() => setOpen(client.id)}
        >
          {/* Logo Container */}
          <div className="w-full h-full flex items-center justify-center relative">
            <div
              className={`relative w-16 h-16 md:w-20 md:h-20 lg:w-full lg:h-32 ${
                shouldRotate ? "rotate-90 lg:rotate-0" : ""
              } ${shouldRotateWhenClosed ? "lg:-rotate-90" : ""}`}
            >
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 120px"
              />
            </div>
          </div>
        </button>
      )}

      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            key={`panel-${client.id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            className={`w-full h-full overflow-hidden relative bg-white mb-1 flex items-center justify-center ${
              isRTL ? "md:ml-1" : "md:mr-1"
            }`}
          >
            <motion.div
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center justify-center gap-4 md:gap-6 p-6 md:p-8"
            >
              {/* Large Logo */}
              <div
                className={`relative w-48 h-48 md:w-64 md:h-64 lg:w-[20rem] lg:h-[15rem] ${
                  shouldRotate ? "rotate-90" : ""
                }`}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="md:object-fill object-scale-down"
                  sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 400px"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClientsAccordion;

const panelVariants: Variants = {
  open: {
    width: "100%",
    height: "100%",
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  closed: {
    width: "0%",
    height: "100%",
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const panelVariantsSm: Variants = {
  open: {
    width: "100%",
    height: "250px",
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  closed: {
    width: "100%",
    height: "0px",
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const contentVariants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.05,
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  closed: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};
