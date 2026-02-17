"use client";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

export const pageVariants:Variants = {
  initial: (fromPrevious) => ({
    opacity: 0,
    scale: fromPrevious ? 0.95 : 1,
    filter: fromPrevious ? "blur(0.5px)" : "blur(0px)",
  }),
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
    },
  },
};

// Animation Variants
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Page fade in/out variant
export const pageFade = {
  hidden: { opacity: 0 }, //
  visible: {
    opacity: 1, //
    transition: { duration: 0.8 },
  },
  exit: {
    opacity: 0, //
    transition: { duration: 0.5 },
  },
};
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Stagger Children -
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Component  Page Transitions
export function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeIn}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Component  Animated Section
interface AnimatedSectionProps {
  children: ReactNode;
  variant?: Variants;
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  variant = fadeInUp,
  delay = 0,
  className = "",
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
