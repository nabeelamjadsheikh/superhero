"use client";

import { motion } from "framer-motion";

export function ErrorMessage({ message }) {
  if (!message) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded"
    >
      {message}
    </motion.div>
  );
} 