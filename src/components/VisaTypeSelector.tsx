type VisaPlan = {
  id: string;
  title: string;
  price: string;
  processing: string;
  validity: string;
  description: string;
};

type VisaTypeSelectorProps = {
  plans: VisaPlan[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function VisaTypeSelector({
  plans,
  value,
  onChange,
  error,
}: VisaTypeSelectorProps) {
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2">
        {plans.map((plan) => {
          const selected = value === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onChange(plan.id)}
              className={`rounded-2xl border p-4 text-left ${
                selected
                  ? "border-[var(--primary)] bg-amber-50"
                  : "border-[var(--border)] bg-white"
              }`}
            >
              <h4 className="text-base font-semibold text-[var(--foreground)]">{plan.title}</h4>
              <p className="mt-1 text-sm text-[var(--muted)]">{plan.description}</p>
              <div className="mt-3 space-y-1 text-sm text-[var(--foreground)]">
                <p>
                  <span className="font-semibold">Price:</span> {plan.price}
                </p>
                <p>
                  <span className="font-semibold">Processing:</span> {plan.processing}
                </p>
                <p>
                  <span className="font-semibold">Validity:</span> {plan.validity}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-sm text-[var(--error)]">{error}</p>}
    </div>
  );
}
