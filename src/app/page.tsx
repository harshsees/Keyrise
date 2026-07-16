"use client";

import { useState } from "react";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VisaInfoAndPlans } from "@/components/VisaInfoAndPlans";
import { ApplicationCard } from "@/components/ApplicationCard";
import { MultiStepApplicationForm } from "@/components/MultiStepApplicationForm";
import { PricingTable } from "@/components/PricingTable";
import { RequirementChecklist } from "@/components/RequirementChecklist";
import { TopHero } from "@/components/TopHero";
import { BadgeCheck, CircleHelp, FileCheck2, ShieldCheck, Timer, Wallet } from "lucide-react";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<number>(0);

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <Header />
      <main className="flex-1">
        <TopHero />

        {/* Responsive Grid Layout containing the entire page below TopHero */}
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] gap-8 md:gap-12 items-start">
            
            {/* Left Column: Scrollable Content */}
            <div className="space-y-4 md:space-y-6">
              <VisaInfoAndPlans selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />

              {/* Mobile/Tablet Application Card (stacks in natural order) */}
              <div className="md:hidden mt-6">
                <ApplicationCard
                  selectedPlan={selectedPlan}
                  onSelectPlan={setSelectedPlan}
                  className="w-full max-w-md mx-auto py-4 select-none"
                />
              </div>

              <RequirementChecklist className="w-full py-8 md:py-10 border-t border-slate-200/50 mt-10" />
              
              <PricingTable className="w-full py-8 md:py-10 border-t border-slate-200/50" />

              <section className="w-full py-8 md:py-10 border-t border-slate-200/50">
                <h2 className="text-3xl font-bold text-[var(--foreground)]">How to apply online</h2>
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      title: "Choose your visa type",
                      desc: "Select the visa that fits your travel timeline and stay duration.",
                      icon: CircleHelp,
                    },
                    {
                      title: "Upload documents",
                      desc: "Submit passport and supporting files with secure document upload.",
                      icon: FileCheck2,
                    },
                    {
                      title: "Experts verify your application",
                      desc: "Our specialists review all details before submission to authority.",
                      icon: BadgeCheck,
                    },
                    {
                      title: "Receive your visa by email",
                      desc: "Track progress in real time and get your approved visa over email.",
                      icon: Timer,
                    },
                  ].map(({ title, desc, icon: Icon }) => (
                    <article
                      key={title}
                      className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
                    >
                      <Icon className="mb-3 h-5 w-5 text-[var(--primary)]" />
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">{desc}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="w-full py-8 md:py-10 border-t border-slate-200/50">
                <h2 className="text-3xl font-bold text-[var(--foreground)]">Why choose us</h2>
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "On-time delivery promise",
                      desc: "Structured processing with clear timelines and escalation support.",
                      icon: Timer,
                    },
                    {
                      title: "Expert document checks",
                      desc: "Human review reduces rejection risk from incomplete documentation.",
                      icon: FileCheck2,
                    },
                    {
                      title: "Secure document handling",
                      desc: "Encrypted file transfer and strict access controls for personal data.",
                      icon: ShieldCheck,
                    },
                    {
                      title: "Real-time tracking",
                      desc: "Every stage is visible from submission to final visa delivery.",
                      icon: BadgeCheck,
                    },
                    {
                      title: "Transparent pricing",
                      desc: "Government fee, service fee, and taxes displayed before payment.",
                      icon: Wallet,
                    },
                    {
                      title: "Dedicated support",
                      desc: "Get help via [support@email.com] or [phone number].",
                      icon: CircleHelp,
                    },
                  ].map(({ title, desc, icon: Icon }) => (
                    <article
                      key={title}
                      className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
                    >
                      <Icon className="mb-3 h-5 w-5 text-[var(--primary)]" />
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">{desc}</p>
                    </article>
                  ))}
                </div>
              </section>

              <div className="border-t border-slate-200/50 pt-6">
                <MultiStepApplicationForm className="w-full py-4" />
              </div>

              <div className="border-t border-slate-200/50 pt-6">
                <FAQAccordion className="w-full py-4" />
              </div>
            </div>

            {/* Right Column: Sticky Application Card (Desktop) */}
            <div className="sticky top-[80px] hidden md:block self-start w-full pr-1">
              <ApplicationCard
                selectedPlan={selectedPlan}
                onSelectPlan={setSelectedPlan}
                className="w-full select-none"
              />
            </div>

          </div>
        </div>

      </main>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-white p-3 md:hidden">
        <a
          href="#application-flow"
          className="block rounded-xl bg-[var(--primary)] px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Start Application
        </a>
      </div>
      <Footer />
    </div>
  );
}
