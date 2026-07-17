"use client";

import { useState } from "react";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VisaInfoAndPlans } from "@/components/VisaInfoAndPlans";
import { ApplicationCard } from "@/components/ApplicationCard";
import { MultiStepApplicationForm } from "@/components/MultiStepApplicationForm";
import { RequirementChecklist } from "@/components/RequirementChecklist";
import { TopHero } from "@/components/TopHero";


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
