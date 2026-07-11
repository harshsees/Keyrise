"use client";

import { CheckCircle2, ChevronDown, CalendarDays, FileText, FolderOpen, Smartphone, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const visaInfo = [
  { label: "Visa Type", value: "E-Visa", icon: Smartphone, accent: "bg-indigo-100 text-indigo-600" },
  { label: "Length of Stay", value: "30 days", icon: CalendarDays, accent: "bg-sky-100 text-sky-600" },
  { label: "Validity", value: "60 days", icon: Clock3, accent: "bg-emerald-100 text-emerald-600" },
  { label: "Entry", value: "Single", icon: FileText, accent: "bg-violet-100 text-violet-600" },
  { label: "Method", value: "Paperless", icon: FolderOpen, accent: "bg-blue-100 text-blue-600" },
];

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

export function VisaInfoAndPlans() {
  const [selectedPlan, setSelectedPlan] = useState(1);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-[var(--foreground)]">
          Dubai visa information
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {visaInfo.map(({ label, value, icon: Icon, accent }) => (
            <motion.div
              key={label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-[var(--border)] bg-[#fafafa] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-[var(--muted)]">{label}:</p>
                  <p className="text-base font-semibold text-[var(--foreground)]">{value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[var(--primary)]" />
          <h3 className="text-2xl font-semibold text-[var(--foreground)]">
            Get a Guaranteed Visa on
          </h3>
        </div>
        <div className="border-l border-slate-200 pl-4">
          <div className="mt-2 space-y-3">
            {plans.map((plan, index) => {
              const active = selectedPlan === index;
              return (
                <motion.button
                  key={plan.title}
                  type="button"
                  onClick={() => setSelectedPlan(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`relative w-full rounded-[22px] border p-3.5 text-left transition ${
                    active
                      ? "border-[var(--primary)] bg-amber-50 shadow-md shadow-amber-100"
                      : "border-[var(--border)] bg-[#fcfcfc]"
                  }`}
                >
                  {index === 1 && (
                    <span className="absolute left-4 -top-3 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      {plan.badge}
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-[var(--foreground)]">{plan.title}</p>
                      <div className="mt-1 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                        <CheckCircle2 className="h-4 w-4 text-[var(--primary)]" />
                        {plan.timing}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[var(--foreground)]">{plan.price}</p>
                      <p className="text-xs font-semibold tracking-[0.2em] text-[var(--muted)]">
                        TO BE PAID NOW
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm text-[var(--primary)]">
                      <span className="rounded-full border border-[var(--border)] bg-white px-2 py-1 text-xs font-semibold">
                        View Timeline
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        active ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--primary)]"
                      }`}
                    >
                      {active ? "Selected" : "Select"}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
