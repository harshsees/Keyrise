import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MultiStepApplicationForm } from "@/components/MultiStepApplicationForm";
import { PricingTable } from "@/components/PricingTable";
import { RequirementChecklist } from "@/components/RequirementChecklist";
import { TopHero } from "@/components/TopHero";
import { BadgeCheck, CircleHelp, FileCheck2, ShieldCheck, Timer, Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <Header />
      <main className="flex-1">
        <TopHero />
        <Hero />
        <RequirementChecklist />
        <PricingTable />

        <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">How to apply online</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-4">
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

        <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Why choose us</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

        <MultiStepApplicationForm />
        <FAQAccordion />
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
