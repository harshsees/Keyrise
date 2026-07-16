import { CheckCircle2, IdCard, Image as ImageIcon, Mail, Plane } from "lucide-react";

const requirements = [
  {
    title: "Valid Indian Passport",
    desc: "Passport validity should be at least 6 months from travel date.",
    icon: IdCard,
  },
  {
    title: "Clear Passport Scan",
    desc: "Upload front page in JPG, PNG, or PDF format.",
    icon: CheckCircle2,
  },
  {
    title: "Recent Photograph",
    desc: "White background photo taken in the last 6 months.",
    icon: ImageIcon,
  },
  {
    title: "Confirmed Travel Dates",
    desc: "Add planned entry and return date before checkout.",
    icon: Plane,
  },
  {
    title: "Valid Email and Phone",
    desc: "Used for OTP verification and application status updates.",
    icon: Mail,
  },
];

export function RequirementChecklist({ className }: { className?: string }) {
  return (
    <section id="requirements" className={className || "mx-auto w-full max-w-7xl px-4 py-14 md:px-6"}>
      <h2 className="text-3xl font-bold text-[var(--foreground)]">
        Visa requirements
      </h2>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        Keep these details ready for faster application processing.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requirements.map(({ title, desc, icon: Icon }) => (
          <article
            key={title}
            className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
          >
            <Icon className="mb-3 h-5 w-5 text-[var(--primary)]" />
            <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
