"use client";

import { motion } from "framer-motion";

export function Card({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
} 