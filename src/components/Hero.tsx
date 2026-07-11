"use client";

import { ApplicationCard } from "./ApplicationCard";
import { VisaInfoAndPlans } from "./VisaInfoAndPlans";

type HeroProps = {
  onStart?: () => void;
};

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-8 md:grid-cols-[1.08fr_0.92fr] md:px-6 md:py-10">
      <VisaInfoAndPlans />
      <ApplicationCard onStart={onStart} />
    </section>
  );
}
