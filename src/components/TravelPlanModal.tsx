"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TravelPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: "before" | "after") => void;
}

export function TravelPlanModal({ isOpen, onClose, onSelectOption }: TravelPlanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative z-10 w-full max-w-sm rounded-[24px] bg-white p-6 shadow-2xl border border-slate-100"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center mt-2">
              <h3 className="text-lg font-bold text-slate-900 px-4 mb-5 leading-tight">
                When do you plan to travel?
              </h3>

              {/* Option 1: Before Aug 19, 2026 */}
              <button
                type="button"
                onClick={() => onSelectOption("before")}
                className="w-full rounded-2xl border-2 border-indigo-600/90 py-3.5 px-6 text-sm font-semibold text-indigo-600 hover:bg-indigo-50/50 active:scale-[0.99] transition duration-200 cursor-pointer mb-3"
              >
                Before Aug 19, 2026
              </button>

              {/* Option 2: After Aug 19, 2026 */}
              <button
                type="button"
                onClick={() => onSelectOption("after")}
                className="w-full rounded-2xl border-2 border-indigo-600/90 py-3.5 px-6 text-sm font-semibold text-indigo-600 hover:bg-indigo-50/50 active:scale-[0.99] transition duration-200 cursor-pointer"
              >
                After Aug 19, 2026
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
