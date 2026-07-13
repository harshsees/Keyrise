"use client";

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
} from "lucide-react";

type ApplicationCardProps = {
  onStart?: () => void;
};

export function ApplicationCard({ onStart }: ApplicationCardProps) {
  return (
    <aside className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-[0_15px_40px_rgba(15,23,42,0.06)]">
      <div className="rounded-xl border border-[var(--border)] bg-white p-3">
        <div className="mb-3 flex items-center justify-between rounded-xl bg-slate-100 px-3.5 py-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Guaranteed by 15th Jul, 03:33 pm
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--foreground)]">
            <Clock3 className="h-3.5 w-3.5" />
            22 hours faster
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-white">
          <div className="grid grid-cols-2 divide-x divide-[var(--border)] border-b border-[var(--border)]">
            <button
              type="button"
              className="flex items-center justify-between px-3 py-2.5 text-left"
            >
              <div>
                <p className="text-xs text-[var(--muted)]">Visa Type</p>
                <p className="mt-0.5 text-sm font-semibold text-[var(--foreground)]">
                  Tourism
                </p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[var(--muted)]" />
            </button>

            <button
              type="button"
              className="flex items-center justify-between px-3 py-2.5 text-left"
            >
              <div>
                <p className="text-xs text-[var(--muted)]">Validity</p>
                <p className="mt-0.5 text-sm font-semibold text-[var(--foreground)]">
                  30 Days Single Entry
                </p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[var(--muted)]" />
            </button>
          </div>

          <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                <CircleDot className="h-4 w-4 text-[var(--foreground)]" />
              </div>
              <div>
                <p className="text-base font-semibold text-[var(--foreground)]">Travellers</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-[var(--foreground)]">
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)]"
                aria-label="Decrease travelers"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-4 text-center text-base font-semibold">1</span>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)]"
                aria-label="Increase travelers"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="border-t border-[var(--border)] px-3 py-4.5 text-center">
            <p className="text-4xl font-semibold tracking-tight text-[var(--foreground)]">
              ₹7,499
            </p>
            <p className="mt-1.5 text-xs font-semibold tracking-[0.2em] text-[var(--foreground)]">
              TO BE PAID NOW
            </p>
          </div>

          {onStart ? (
            <button
              type="button"
              onClick={onStart}
              className="mx-3 mb-4 w-[calc(100%-1.5rem)] rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-amber-300/20 hover:bg-[var(--primary-hover)]"
            >
              Start Application
            </button>
          ) : (
            <a
              href="#application-flow"
              className="mx-3 mb-4 block w-[calc(100%-1.5rem)] rounded-xl bg-[var(--primary)] px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-amber-300/20 hover:bg-[var(--primary-hover)]"
            >
              Start Application
            </a>
          )}

          <div className="space-y-3 px-3 pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
                  <Landmark className="h-3.5 w-3.5 text-[var(--foreground)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Pay Now</p>
                  <p className="mt-0.5 border-b border-dotted border-slate-300 text-xs text-[var(--muted)]">
                    Government Fees
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)]">₹7,000</p>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                  <Ticket className="h-3.5 w-3.5 text-[var(--muted)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Pay on approval</p>
                  <p className="mt-0.5 border-b border-dotted border-slate-300 text-xs text-[var(--muted)]">
                    Keyrise service fee
                  </p>
                </div>
              </div>
              <p className="text-sm font-semibold text-[var(--foreground)]">₹499</p>
            </div>

            <div className="border-t border-[var(--border)] pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-white">
                    <ReceiptText className="h-3.5 w-3.5 text-[var(--foreground)]" />
                  </div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Total Amount</p>
                </div>
                <p className="text-sm font-semibold text-[var(--foreground)]">₹7,499</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
