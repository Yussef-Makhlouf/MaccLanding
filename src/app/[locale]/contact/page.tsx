"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ContactForm, ContactInfo, Map } from "@/components/contact";
import { useHistory } from "@/utils/HistoryContext";
import { pageVariants } from "@/utils/PageTansition";
import { useTranslations } from "next-intl";

export const ContactPage: React.FC = () => {
  const { previousRoute } = useHistory();
  const fromServices = previousRoute?.includes("/services") || false;
  const t = useTranslations("Contact.map");

  return (
    <motion.div
      custom={fromServices}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-white"
    >
      {/* Contact Form Section */}
      <div className="bg-gray-50 py-6 md:py-10" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-2">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div
        className="relative py-6 md:py-10"
        style={{
          background:
            "linear-gradient(114.21deg, #000000 34.49%, #15AC9E 86.8%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 rounded-2xl">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="md:text-4xl text-3xl font-black tracking-tight text-white">
              {t("title")}
            </h1>
          </div>

          <p className="md:text-xl text-lg text-white/90 text-center mb-12">
            {t("subtitle")}
          </p>

          <div className="mx-auto" style={{ maxWidth: "1720px" }}>
            <div
              className="relative rounded-[40px] overflow-hidden border-2 border-white/20 shadow-2xl"
              style={{
                height: "506px",
                mixBlendMode: "normal",
              }}
            >
              <Map />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
