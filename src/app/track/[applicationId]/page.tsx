import type { Metadata } from "next";
import Link from "next/link";
import { TrackingTimeline } from "@/components/TrackingTimeline";

export const metadata: Metadata = {
  title: "Track Application | Keyrise",
  description: "Track your Dubai / UAE visa application status in real time.",
};

type Props = {
  params: Promise<{ applicationId: string }>;
};

export default async function TrackingPage({ params }: Props) {
  const { applicationId } = await params;

  return (
    <main className="flex-1 bg-[var(--background)]">
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <p className="text-sm text-[var(--muted)]">Application ID</p>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">{applicationId}</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Current status: Documents under review
          </p>
          <div className="mt-6">
            <TrackingTimeline activeIndex={1} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:[support@email.com]"
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
            >
              Contact support
            </a>
            <Link
              href="/"
              className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
