"use client";

import React, { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MapPin } from "lucide-react";
import { CircleAnimatedButton } from "@/components/ui/Button";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

export const Map: React.FC = () => {
  const t = useTranslations("Contact.map");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const lat = 22.2933647;
  const lng = 39.1222569;

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      // Fix default marker icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Initialize map
      if (!mapRef.current) {
        const map = L.map(mapContainerRef.current!, {
          center: [lat, lng],
          zoom: 15,
          zoomControl: false, // Disable default zoom controls
          scrollWheelZoom: true,
        });

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);

        // Add marker with custom icon
        const customIcon = L.divIcon({
          html: `<div style="background-color: #15AC9E; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                 </div>`,
          className: "custom-marker",
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        L.marker([lat, lng], { icon: customIcon }).addTo(map);

        mapRef.current = map;
      }
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 15);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Map Header Card - Top Left/Right */}
      <div
        className={`absolute -top-4 z-[1000] rounded-2xl p-5 ${
          isRTL ? "right-0" : "left-0"
        }`}
      >
        <p className="text-xs text-gray-400 mb-1">AVM Studio</p>
        <h3
          className="md:text-lg font-black leading-tight"
          style={{
            ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
        >
          {t("header")}
        </h3>
      </div>

      {/* Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Location Tooltip - Center */}
      <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 z-[1000] pointer-events-none">
        <div className="bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 md:whitespace-nowrap">
          <MapPin className="w-10 h-10 text-primary" />
          <span
            className="md:text-sm text-xs font-semibold"
            style={{
              ...(isRTL && { fontFamily: "LamaSans, sans-serif" }) }}
          >
            {t("location")}
          </span>
        </div>
      </div>

      {/* Custom Map Controls - Bottom Left/Right */}
      <div
        className={`absolute bottom-6 flex gap-2 z-[1000] hidden md:flex ${
          isRTL ? "right-6" : "left-6"
        }`}
      >
        <button
          onClick={handleZoomOut}
          className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
        >
          <span className="text-2xl leading-none">−</span>
        </button>
        <button
          onClick={handleRecenter}
          className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
        >
          <MapPin className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomIn}
          className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
        >
          <span className="text-2xl leading-none">+</span>
        </button>
      </div>

      {/* Open in Google Maps Button - Bottom Right/Left */}
      <div
        className={`absolute bottom-6 z-[1000] ${
          isRTL ? "left-6" : "right-6"
        }`}
      >
        <CircleAnimatedButton
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          bgColor="#15AC9E"
          hoverBgColor="#000"
          arrowHoverColor="#fff"
          arrowDirection="right"
          firstArrowBgColor="#fff"
          firstArrowColor="#15AC9E"
          width="210px"
          fontSize="12px"
        >
          {t("openInMaps")}
        </CircleAnimatedButton>
      </div>
    </div>
  );
};