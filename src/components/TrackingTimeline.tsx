import { CheckCircle2, Circle } from "lucide-react";

const timeline = [
  "Application submitted",
  "Documents under review",
  "Sent to embassy/authority",
  "Visa processing",
  "Visa delivered",
];

type TrackingTimelineProps = {
  activeIndex: number;
};

export function TrackingTimeline({ activeIndex }: TrackingTimelineProps) {
  return (
    <ol className="space-y-3">
      {timeline.map((item, index) => {
        const done = index <= activeIndex;
        return (
          <li
            key={item}
            className={`flex items-center gap-3 rounded-xl border p-3 ${
              done
                ? "border-green-200 bg-green-50 text-[var(--success)]"
                : "border-[var(--border)] bg-white text-[var(--muted)]"
            }`}
          >
            {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            <span className="text-sm font-medium">{item}</span>
          </li>
        );
      })}
    </ol>
  );
}
