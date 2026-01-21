"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedCard({
  children,
  delay = 0,
  hover = true,
}: {
  children: ReactNode;
  delay?: number;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            }
          : {}
      }
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
