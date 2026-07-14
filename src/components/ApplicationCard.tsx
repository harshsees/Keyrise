"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Clock3,
  Minus,
  Plus,
  ShieldCheck,
  Ticket,
  Landmark,
  ReceiptText,
  CircleDot,
  Lock,
  Sparkles,
} from "lucide-react";

type ApplicationCardProps = {
  onStart?: () => void;
};

export function ApplicationCard({ onStart }: ApplicationCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Local state for visa application options to make it interactive and feel like a real product demo
  const [visaType, setVisaType] = useState<"Tourism" | "Business">("Tourism");
  const [validity, setValidity] = useState<"30 Days" | "60 Days">("30 Days");
  const [travellers, setTravellers] = useState<number>(1);

  // Pricing calculation
  const getBaseFees = (type: "Tourism" | "Business", val: "30 Days" | "60 Days") => {
    if (type === "Business") {
      return {
        gov: val === "60 Days" ? 17000 : 13500,
        service: 999,
      };
    }
    // Tourism
    return {
      gov: val === "60 Days" ? 10500 : 7000,
      service: 499,
    };
  };

  const baseFees = getBaseFees(visaType, validity);
  const payNowAmount = baseFees.gov * travellers;
  const payOnApprovalAmount = baseFees.service * travellers;
  const totalAmount = payNowAmount + payOnApprovalAmount;

  // Stagger entrance animation variants
  const cardContainerVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <aside className="relative w-full max-w-md mx-auto md:max-w-none px-4 py-8 select-none">
      {/* Dynamic CTA shine styles injected locally */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes cta-shine {
            0% { transform: skewX(-20deg) translateX(-180%); }
            40% { transform: skewX(-20deg) translateX(180%); }
            100% { transform: skewX(-20deg) translateX(180%); }
          }
          .animate-cta-shine {
            animation: cta-shine 4s infinite ease-in-out;
          }
        `
      }} />

      {/* Subtle parallax/layered background highlights */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            animate={{
              y: [-12, 12, -12],
              x: [-6, 6, -6],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
            className="absolute -inset-4 bg-gradient-to-tr from-amber-400/10 via-amber-500/5 to-indigo-500/10 rounded-[36px] blur-3xl -z-20"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
              x: [4, -4, 4],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
            className="absolute -top-3 -right-2 w-44 h-44 bg-white/20 backdrop-blur-md rounded-[32px] border border-white/20 -z-10 shadow-sm hidden md:block"
          />
        </>
      )}

      {/* Floating Accent Chips around the card */}
      {!shouldReduceMotion && (
        <>
          {/* Top-Left: Visa guaranteed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [-4, 4, -4],
              x: [-2, 2, -2],
              rotate: [-2, 1, -2],
            }}
            transition={{
              opacity: { delay: 0.5, duration: 0.4 },
              scale: { delay: 0.5, duration: 0.4 },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const },
              x: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
              rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const },
            }}
            className="absolute -top-3 -left-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 backdrop-blur-md text-[11px] font-semibold shadow-sm"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Visa guaranteed
          </motion.div>

          {/* Right-Middle: 22 hours faster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [4, -4, 4],
              x: [3, -3, 3],
              rotate: [1, -1, 1],
            }}
            transition={{
              opacity: { delay: 0.7, duration: 0.4 },
              scale: { delay: 0.7, duration: 0.4 },
              y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" as const },
              x: { duration: 5.8, repeat: Infinity, ease: "easeInOut" as const },
              rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" as const },
            }}
            className="absolute top-[28%] -right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20 backdrop-blur-md text-[11px] font-semibold shadow-sm"
          >
            <Sparkles className="h-3 w-3 text-amber-600 animate-pulse" />
            22 hours faster
          </motion.div>

          {/* Bottom-Left: Secure payment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [-3, 3, -3],
              x: [-3, 3, -3],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              opacity: { delay: 0.9, duration: 0.4 },
              scale: { delay: 0.9, duration: 0.4 },
              y: { duration: 5.2, repeat: Infinity, ease: "easeInOut" as const },
              x: { duration: 6.2, repeat: Infinity, ease: "easeInOut" as const },
              rotate: { duration: 5.2, repeat: Infinity, ease: "easeInOut" as const },
            }}
            className="absolute -bottom-3 left-8 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-700 border border-blue-500/20 backdrop-blur-md text-[11px] font-semibold shadow-sm"
          >
            <Lock className="h-3 w-3 text-blue-600" />
            Secure payment
          </motion.div>
        </>
      )}

      {/* Main floating wrapper (bobs gently) */}
      <motion.div
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        style={{ transformOrigin: "center" }}
        className="w-full"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut" as const,
          }}
          className="w-full"
        >
          {/* Card Body with Glassmorphism, subtle animations on hover */}
          <motion.div
            whileHover={shouldReduceMotion ? {} : {
              y: -6,
              scale: 1.008,
              borderColor: "rgba(245, 158, 11, 0.22)",
              boxShadow: "0 28px 56px -12px rgba(15, 23, 42, 0.12), 0 0 25px 0 rgba(245, 158, 11, 0.04)"
            }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="w-full rounded-[28px] border border-slate-200/80 bg-white/90 backdrop-blur-xl p-3.5 md:p-4 shadow-[0_20px_50px_rgba(15,23,42,0.05)] transition-colors duration-300"
          >
            {/* Guarantee / Status Bar */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="flex items-center justify-between rounded-2xl bg-amber-500/5 border border-amber-500/10 px-3.5 py-2.5">
                <div className="flex items-center gap-2 text-[11px] font-bold text-amber-700">
                  <ShieldCheck className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  <span>Guaranteed by 15th Jul, 03:33 pm</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                  <Clock3 className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                  <span>22 hrs faster</span>
                </div>
              </div>
            </motion.div>

            {/* Visa configuration field details */}
            <motion.div variants={itemVariants} className="mb-3.5">
              <div className="grid grid-cols-2 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/50 p-1">
                {/* Visa Type */}
                <div className="relative group/field px-3 py-2 text-left">
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                    Visa Type
                  </label>
                  <div className="relative mt-0.5 flex items-center">
                    <select
                      value={visaType}
                      onChange={(e) => setVisaType(e.target.value as "Tourism" | "Business")}
                      className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-slate-800 focus:ring-0 focus:outline-none cursor-pointer appearance-none pr-5 z-10"
                    >
                      <option value="Tourism">Tourism</option>
                      <option value="Business">Business</option>
                    </select>
                    <ChevronDown className="absolute right-0.5 h-3.5 w-3.5 text-slate-400 pointer-events-none transition-transform group-hover/field:translate-y-0.5" />
                  </div>
                </div>

                {/* Validity */}
                <div className="relative group/field px-3 py-2 text-left">
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                    Validity
                  </label>
                  <div className="relative mt-0.5 flex items-center">
                    <select
                      value={validity}
                      onChange={(e) => setValidity(e.target.value as "30 Days" | "60 Days")}
                      className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-slate-800 focus:ring-0 focus:outline-none cursor-pointer appearance-none pr-5 z-10"
                    >
                      <option value="30 Days">30 Days Single</option>
                      <option value="60 Days">60 Days Single</option>
                    </select>
                    <ChevronDown className="absolute right-0.5 h-3.5 w-3.5 text-slate-400 pointer-events-none transition-transform group-hover/field:translate-y-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Traveller Counter */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                    <CircleDot className="h-4 w-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Travellers</p>
                    <p className="text-[10px] text-slate-400">Add info later</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100/85 rounded-full p-0.5">
                  <button
                    type="button"
                    onClick={() => setTravellers((t) => Math.max(1, t - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={travellers <= 1}
                    aria-label="Decrease travelers"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="min-w-5 text-center text-xs font-bold text-slate-800">
                    {travellers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravellers((t) => Math.min(10, t + 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm hover:bg-slate-50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={travellers >= 10}
                    aria-label="Increase travelers"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Bold Price Area */}
            <motion.div variants={itemVariants} className="text-center py-3 mb-4">
              <span className="text-[9px] uppercase font-extrabold tracking-[0.25em] text-slate-400">
                To Be Paid Now
              </span>
              <div className="text-4xl font-extrabold tracking-tight text-slate-900 mt-1">
                ₹{totalAmount.toLocaleString("en-IN")}
              </div>
              <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
                <span>Price matches official consulate rates</span>
              </div>
            </motion.div>

            {/* CTA Button with Shine effect */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="relative group/cta overflow-hidden rounded-2xl shadow-[0_12px_24px_rgba(217,119,6,0.18)] hover:shadow-[0_16px_32px_rgba(217,119,6,0.28)] transition-all duration-300">
                {onStart ? (
                  <button
                    type="button"
                    onClick={onStart}
                    className="relative w-full overflow-hidden bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-bold text-sm tracking-wide py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 cursor-pointer border border-amber-400/25 active:scale-[0.99] transition-transform duration-150"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-[20deg] -translate-x-[180%] animate-cta-shine pointer-events-none" />
                    <span>Start Application</span>
                  </button>
                ) : (
                  <a
                    href="#application-flow"
                    className="relative block w-full text-center overflow-hidden bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-bold text-sm tracking-wide py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 cursor-pointer border border-amber-400/25 active:scale-[0.99] transition-transform duration-150"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-[20deg] -translate-x-[180%] animate-cta-shine pointer-events-none" />
                    <span>Start Application</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Fee Breakdown Rows */}
            <motion.div variants={itemVariants} className="space-y-3 bg-slate-50/50 rounded-2xl border border-slate-100/50 p-3.5">
              {/* Pay Now */}
              <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700">
                    <Landmark className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-slate-800">Pay Now</p>
                    <p className="text-[9px] text-slate-400 font-normal">Government Fees</p>
                  </div>
                </div>
                <p className="text-slate-800 text-sm">₹{payNowAmount.toLocaleString("en-IN")}</p>
              </div>

              {/* Pay on approval */}
              <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <Ticket className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-slate-800">Pay on approval</p>
                    <p className="text-[9px] text-slate-400 font-normal">Keyrise service fee</p>
                  </div>
                </div>
                <p className="text-slate-800 text-sm">₹{payOnApprovalAmount.toLocaleString("en-IN")}</p>
              </div>

              {/* Total Row */}
              <div className="border-t border-slate-100/80 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200/50 text-slate-600">
                      <ReceiptText className="h-3.5 w-3.5 text-slate-700" />
                    </div>
                    <p className="text-xs font-bold text-slate-800">Total Amount</p>
                  </div>
                  <p className="text-sm font-bold text-slate-800">₹{totalAmount.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </motion.div>
    </aside>
  );
}
