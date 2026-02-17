"use client";
import { motion } from "framer-motion";
import HeroContent from "./HeroContent";
import StatsCounter from "./StatsCounter";
import { fadeIn } from "@/utils/PageTansition";

export default function Hero() {
  return (
    <section
      className="relative h-[80vh] md:h-[90vh] flex flex-col justify-between overflow-hidden"
      // className="relative md:h-[90vh] flex flex-col justify-between overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero.WebP"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        <source src="/videos/hero.webm" type="video/webm" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black/50 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative z-10 flex-1 flex items-center md:items-start pt-8 md:pt-32"
      >
        <HeroContent />
      </motion.div>

      {/* Stats at bottom */}
      <div className="relative z-10">
        <StatsCounter />
      </div>
    </section>
  );
}
