"use client";

import { useState } from "react";
import { ApplicationCard } from "./ApplicationCard";
import { VisaInfoAndPlans } from "./VisaInfoAndPlans";

type HeroProps = {
  onStart?: () => void;
};

export function Hero({ onStart }: HeroProps) {
  // Hoisted plan selection: 0 = Tourist visa - 30 days, 1 = Tourist visa - 60 days
  const [selectedPlan, setSelectedPlan] = useState<number>(0);

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-8 md:grid-cols-[1.08fr_0.92fr] md:px-6 md:py-10">
      <VisaInfoAndPlans selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
      <ApplicationCard
        onStart={onStart}
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
      />
    </section>
  );
}
