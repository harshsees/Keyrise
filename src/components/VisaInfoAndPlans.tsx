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
};

export function VisaInfoAndPlans({ selectedPlan, onSelectPlan }: VisaInfoAndPlansProps) {
  return (
    <div className="space-y-3.5">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Dubai visa information
        </h1>
        {/* Borderless visa information details grouped into two rows */}
        <div className="mt-4 space-y-4">
          {/* Row 1: 3 components */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-8 border-b border-slate-200/50 pb-4">
            {/* 1. Visa Type */}
            <div className="flex items-center gap-3 min-w-[130px]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Smartphone className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs text-[var(--muted)]">Visa Type:</p>
                <p className="text-sm font-bold text-[var(--foreground)]">E-Visa</p>
              </div>
            </div>

            {/* 2. Length of Stay */}
            <div className="flex items-center gap-3 min-w-[160px]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <CalendarDays className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs text-[var(--muted)]">Length of Stay:</p>
                <div className="relative group inline-block">
                  <span className="text-sm font-bold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    30 days
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Length of Stay: 30 days</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      The maximum duration that you are allowed to remain in a country after entering with that particular visa.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Validity */}
            <div className="flex items-center gap-3 min-w-[130px]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Clock3 className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs text-[var(--muted)]">Validity:</p>
                <div className="relative group inline-block">
                  <span className="text-sm font-bold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    60 days
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Validity Period: 60 days</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      The number of days your visa is active after the date of issuance. We ensure your visa is valid based on your travel dates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: remaining 2 components */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-8">
            {/* 4. Entry */}
            <div className="flex items-center gap-3 min-w-[130px]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs text-[var(--muted)]">Entry:</p>
                <div className="relative group inline-block">
                  <span className="text-sm font-bold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
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
            <div className="flex items-center gap-3 min-w-[160px]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FolderOpen className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs text-[var(--muted)]">Method:</p>
                <div className="relative group inline-block">
                  <span className="text-sm font-bold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    Paperless
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Method: Paperless</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Apply and receive your visa fully online. No paperwork needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

          {/* Indented branching container */}
          <div className="mt-4 space-y-3.5">
            {plans.map((plan, index) => {
              const active = selectedPlan === index;
              return (
                <div key={plan.title} className="relative pl-7">
                  {/* Curved branch line shown only to the selected plan */}
                  {selectedPlan === 0 && index === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[5px] w-[23px] top-[-16px] h-[41px] border-l-2 border-b-2 border-slate-200/80 rounded-bl-[16px] pointer-events-none"
                    />
                  )}

                  {selectedPlan === 1 && index === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[5px] top-[-16px] bottom-[-14px] w-[2px] bg-slate-200/80 pointer-events-none"
                    />
                  )}

                  {selectedPlan === 1 && index === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[5px] w-[23px] top-0 h-[25px] border-l-2 border-b-2 border-slate-200/80 rounded-bl-[16px] pointer-events-none"
                    />
                  )}

                  <motion.button
                    type="button"
                    onClick={() => onSelectPlan(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative w-full rounded-xl border p-3 text-left transition ${
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

                    <div className="flex items-start justify-between gap-2.5">
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

                    <div className="mt-3 flex items-center justify-between">
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
      </div>
    </div>
  );
}
