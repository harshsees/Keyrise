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
    <aside className="w-full rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-3 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
      <div className="rounded-[24px] border border-[var(--border)] bg-white p-4">
        <div className="mb-4 flex items-center justify-between rounded-[22px] bg-slate-100 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">
            <ShieldCheck className="h-4 w-4" />
            Guaranteed by 15th Jul, 03:33 pm
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <Clock3 className="h-4 w-4" />
            22 hours faster
          </div>
        </div>

        <div className="rounded-[22px] border border-[var(--border)] bg-white">
          <div className="grid grid-cols-2 divide-x divide-[var(--border)] border-b border-[var(--border)]">
            <button
              type="button"
              className="flex items-center justify-between px-4 py-4 text-left"
            >
              <div>
                <p className="text-sm text-[var(--muted)]">Visa Type</p>
                <p className="mt-1 text-base font-semibold text-[var(--foreground)]">
                  Tourism
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-[var(--muted)]" />
            </button>

            <button
              type="button"
              className="flex items-center justify-between px-4 py-4 text-left"
            >
              <div>
                <p className="text-sm text-[var(--muted)]">Validity</p>
                <p className="mt-1 text-base font-semibold text-[var(--foreground)]">
                  30 Days Single Entry
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-[var(--muted)]" />
            </button>
          </div>

          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                <CircleDot className="h-5 w-5 text-[var(--foreground)]" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[var(--foreground)]">Travellers</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[var(--foreground)]">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)]"
                aria-label="Decrease travelers"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-5 text-center text-lg font-semibold">1</span>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)]"
                aria-label="Increase travelers"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="border-t border-[var(--border)] px-4 py-6 text-center">
            <p className="text-5xl font-semibold tracking-tight text-[var(--foreground)]">
              ₹7,499
            </p>
            <p className="mt-2 text-sm font-semibold tracking-[0.22em] text-[var(--foreground)]">
              TO BE PAID NOW
            </p>
          </div>

          {onStart ? (
            <button
              type="button"
              onClick={onStart}
              className="mx-4 mb-5 w-[calc(100%-2rem)] rounded-full bg-[var(--primary)] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-300/30 hover:bg-[var(--primary-hover)]"
            >
              Start Application
            </button>
          ) : (
            <a
              href="#application-flow"
              className="mx-4 mb-5 block w-[calc(100%-2rem)] rounded-full bg-[var(--primary)] px-5 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-amber-300/30 hover:bg-[var(--primary-hover)]"
            >
              Start Application
            </a>
          )}

          <div className="space-y-4 px-4 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-amber-50">
                  <Landmark className="h-4 w-4 text-[var(--foreground)]" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[var(--foreground)]">Pay Now</p>
                  <p className="mt-1 border-b border-dotted border-slate-300 text-sm text-[var(--muted)]">
                    Government Fees
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold text-[var(--foreground)]">₹7,000</p>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                  <Ticket className="h-4 w-4 text-[var(--muted)]" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[var(--foreground)]">Pay on approval</p>
                  <p className="mt-1 border-b border-dotted border-slate-300 text-sm text-[var(--muted)]">
                    Keyrise service fee
                  </p>
                </div>
              </div>
              <p className="text-lg font-semibold text-[var(--foreground)]">₹499</p>
            </div>

            <div className="border-t border-[var(--border)] pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-white">
                    <ReceiptText className="h-4 w-4 text-[var(--foreground)]" />
                  </div>
                  <p className="text-lg font-semibold text-[var(--foreground)]">Total Amount</p>
                </div>
                <p className="text-lg font-semibold text-[var(--foreground)]">₹7,499</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
