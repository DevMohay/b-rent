"use client";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 text-gray-700">
      {/* Icon with Animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="mb-6"
      >
        <FaHome className="text-indigo-600 text-6xl" />
      </motion.div>

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="text-2xl font-semibold"
      >
        Loading B-Rent...
      </motion.h1>

      {/* Progress Bar */}
      <div className="w-64 h-2 mt-6 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-1/3 h-full bg-indigo-500"
        ></motion.div>
      </div>
    </div>
  );
}

