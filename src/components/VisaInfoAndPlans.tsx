"use client";

import { CheckCircle2, ChevronDown, CalendarDays, FileText, FolderOpen, Smartphone, Clock3 } from "lucide-react";
import { motion } from "framer-motion";


const plans = [
  {
    title: "Tourist visa - 30 days",
    price: "₹7,499",
    timing: "15 Jul 2026 at 03:33 PM",
    badge: "Guaranteed",
  },
  {
    title: "Tourist visa - 60 days",
    price: "₹12,499",
    timing: "14 Jul 2026 at 04:33 PM",
    badge: "22 hours sooner",
  },
];

type VisaInfoAndPlansProps = {
  selectedPlan: number;
  onSelectPlan: (index: number) => void;
};export function VisaInfoAndPlans({ selectedPlan, onSelectPlan }: VisaInfoAndPlansProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Dubai visa information
        </h1>
        {/* Scaled up borderless visa info details aligned in a column grid */}
        <div className="mt-5 space-y-5">
          {/* Row 1: 3 components scaled up */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-slate-200/50 pb-5">
            {/* 1. Visa Type */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Smartphone className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Visa Type:</p>
                <p className="text-base md:text-lg font-extrabold text-[var(--foreground)] mt-0.5">E-Visa</p>
              </div>
            </div>

            {/* 2. Length of Stay */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <CalendarDays className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Length of Stay:</p>
                <div className="relative group inline-block mt-0.5">
                  <span className="text-base md:text-lg font-extrabold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    30 days
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Length of Stay: 30 days</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {"The maximum duration that you are allowed to remain in a country after entering with that particular visa."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Validity */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Clock3 className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Validity:</p>
                <div className="relative group inline-block mt-0.5">
                  <span className="text-base md:text-lg font-extrabold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    60 days
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Validity Period: 60 days</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {"The number of days your visa is active after the date of issuance. We ensure your visa is valid based on your travel dates."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: remaining 2 components scaled up and aligned */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
            {/* 4. Entry */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FileText className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Entry:</p>
                <div className="relative group inline-block mt-0.5">
                  <span className="text-base md:text-lg font-extrabold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    Single
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Entry: Single</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {"You can enter the country only once during the visa's validity period and cannot re-enter using the same visa once you've exited."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Method */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FolderOpen className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Method:</p>
                <div className="relative group inline-block mt-0.5">
                  <span className="text-base md:text-lg font-extrabold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    Paperless
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Method: Paperless</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {"Apply and receive your visa fully online. No paperwork needed."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd Column is empty for alignment balance */}
            <div className="hidden sm:block" />
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          {/* Header row with indicator dot */}
          <div className="flex items-center gap-2.5">
            <span className="relative z-10 flex h-3 w-3 items-center justify-center rounded-full bg-[var(--primary)]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            </span>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Get a Guaranteed Visa on
            </h1>
          </div>

          {/* Indented branching container (restored original spacing) */}
          <div className="mt-6.5 space-y-5.5">
            {plans.map((plan, index) => {
              const active = selectedPlan === index;
              return (
                <div key={plan.title} className="relative pl-7">
                  {/* Curved branch line shown only to the selected plan (restored branch sizes) */}
                  {selectedPlan === 0 && index === 0 && (
                    <motion.div
                      initial={{ opacity: 0, width: 23 }}
                      animate={{ opacity: 1, width: 31 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[5px] top-[-26px] h-[51px] border-l-2 border-b-2 border-slate-200/80 rounded-bl-[16px] pointer-events-none"
                    />
                  )}

                  {selectedPlan === 1 && index === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[5px] top-[-26px] bottom-[-22px] w-[2px] bg-slate-200/80 pointer-events-none"
                    />
                  )}

                  {selectedPlan === 1 && index === 1 && (
                    <motion.div
                      initial={{ opacity: 0, width: 23 }}
                      animate={{ opacity: 1, width: 31 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[5px] top-0 h-[25px] border-l-2 border-b-2 border-slate-200/80 rounded-bl-[16px] pointer-events-none"
                    />
                  )}

                  <motion.button
                    type="button"
                    onClick={() => onSelectPlan(index)}
                    animate={{ x: active ? 8 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`relative w-full rounded-xl border p-3.5 text-left transition ${
                      active
                        ? "border-[var(--primary)] bg-amber-50 shadow-md shadow-amber-100/50"
                        : "border-[var(--border)] bg-[#fcfcfc]"
                    }`}
                  >
                    {index === 1 && (
                      <span className="absolute left-3.5 -top-2.5 rounded-full bg-[var(--primary)] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                        {plan.badge}
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-2.5 w-full">
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                          {plan.title}
                        </p>
                        <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)]" />
                          {plan.timing}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[var(--foreground)]">{plan.price}</p>
                        <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">
                          TO BE PAID NOW
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between w-full">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--primary)]">
                        <span className="rounded-full border border-[var(--border)] bg-white px-2 py-0.5 text-[11px] font-semibold">
                          View Timeline
                        </span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </span>
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          active
                            ? "bg-[var(--primary)] text-white"
                            : "bg-white text-[var(--primary)]"
                        }`}
                      >
                        {active ? "Selected" : "Select"}
                      </span>
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>      {/* All 7 Emirates with 1 Visa Section */}
      <div className="pt-8 border-t border-slate-200/50">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
              All 7 Emirates with 1 Visa
            </h2>
            <div className="w-16 h-[3px] bg-blue-600 mt-2 rounded-full" />
          </div>

          <div className="space-y-3.5 md:space-y-4">
            {/* Top Row: Dubai, Abu Dhabi, Sharjah */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  name: "Dubai",
                  image: "/images/emirates/dubai.jpg",
                },
                {
                  name: "Abu Dhabi",
                  image: "/images/emirates/abu-dhabi.png",
                },
                {
                  name: "Sharjah",
                  image: "/images/emirates/sharjah.png",
                },
              ].map((emirate) => (
                <div
                  key={emirate.name}
                  className="relative group overflow-hidden rounded-[20px] shadow-sm cursor-pointer h-[180px] sm:h-[240px] md:h-[260px] bg-slate-100"
                >
                  <img
                    src={emirate.image}
                    alt={emirate.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-base sm:text-xl md:text-2xl tracking-tight leading-tight">
                      {emirate.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row: Ras Al Khaimah, Fujairah, Umm Al Quwain, Ajman */}
            <div className="grid grid-cols-4 gap-2.5 md:gap-3">
              {[
                {
                  name: "Ras Al Khaimah",
                  image: "/images/emirates/ras-al-khaimah.jpg",
                },
                {
                  name: "Fujairah",
                  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=400&q=80",
                },
                {
                  name: "Umm Al Quwain",
                  image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&h=400&q=80",
                },
                {
                  name: "Ajman",
                  image: "/images/emirates/ajman.png",
                },
              ].map((emirate) => (
                <div
                  key={emirate.name}
                  className="relative group overflow-hidden rounded-[16px] sm:rounded-[20px] shadow-sm cursor-pointer h-[130px] sm:h-[180px] md:h-[200px] bg-slate-100"
                >
                  <img
                    src={emirate.image}
                    alt={emirate.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <p className="text-white font-bold text-xs sm:text-base md:text-lg tracking-tight leading-tight break-words">
                      {emirate.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
