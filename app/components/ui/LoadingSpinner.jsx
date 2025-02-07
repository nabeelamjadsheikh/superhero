"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <motion.div
        className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
} 