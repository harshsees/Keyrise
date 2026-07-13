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
    <div className="space-y-3.5">
      <div>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          Dubai visa information
        </h3>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {visaInfo.map(({ label, value, icon: Icon, accent }) => (
            <motion.div
              key={label}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-[var(--border)] bg-[#fafafa] px-3.5 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)]">{label}:</p>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Get a Guaranteed Visa on
          </h3>
        </div>
        <div className="border-l border-slate-200 pl-3">
          <div className="mt-1.5 space-y-2.5">
            {plans.map((plan, index) => {
              const active = selectedPlan === index;
              return (
                <motion.button
                  key={plan.title}
                  type="button"
                  onClick={() => setSelectedPlan(index)}
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
                      <p className="text-sm font-semibold text-[var(--foreground)]">{plan.title}</p>
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
