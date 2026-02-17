"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterItemProps {
  value: number;
  suffix: string;
  label: string;
  standard?: string;
  isRTL?: boolean;
}

export default function CounterItem({
  value,
  suffix,
  label,
  standard,
  isRTL,
}: CounterItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = value / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <motion.div
      ref={ref}
      className={`${isRTL ? "lg:text-right" : "lg:text-left"} text-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="group"
      aria-label={`${count}${standard || ""}${suffix} ${label}`}
    >
      <div
        className="text-white mb-0.5 sm:mb-1 md:mb-2"
        style={{
          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(1.2rem, 3vw, 3.5rem)",
          fontWeight: 500,
          lineHeight: "1",
        }}
        aria-hidden="true"
      >
        <span>{count}</span>
        {standard && <span className="text-[0.7em]">{standard}</span>}
        <span className="text-primary">{suffix}</span>
      </div>
      <p
        className="text-white/80 uppercase leading-tight"
        style={{
          ...(isRTL && { fontFamily: "LamaSans, sans-serif" }),
    fontSize: "clamp(0.6rem, 0.9vw, 0.875rem)",
          fontWeight: 500,
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}