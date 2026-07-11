const visaRows = [
  {
    type: "30-day tourist visa",
    validity: "30 days",
    processing: "3-5 working days",
    price: "₹7,499",
  },
  {
    type: "60-day tourist visa",
    validity: "60 days",
    processing: "4-6 working days",
    price: "₹12,499",
  },
  {
    type: "Express visa",
    validity: "14-30 days",
    processing: "24-48 hours",
    price: "₹15,999",
  },
  {
    type: "Multiple-entry visa",
    validity: "60 days",
    processing: "4-7 working days",
    price: "₹19,999",
  },
];

export function PricingTable() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
      <h2 className="text-3xl font-bold text-[var(--foreground)]">
        Fees and processing time
      </h2>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        Transparent pricing with no hidden fee at checkout.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)] bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[#f8f8fc]">
            <tr>
              {["Visa type", "Validity", "Processing time", "Price", "CTA"].map((head) => (
                <th key={head} className="px-4 py-3 font-semibold text-[var(--foreground)]">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visaRows.map((row) => (
              <tr key={row.type} className="border-b border-[var(--border)] last:border-0">
                <td className="px-4 py-4 font-medium text-[var(--foreground)]">{row.type}</td>
                <td className="px-4 py-4 text-[var(--muted)]">{row.validity}</td>
                <td className="px-4 py-4 text-[var(--muted)]">{row.processing}</td>
                <td className="px-4 py-4 font-semibold text-[var(--foreground)]">{row.price}</td>
                <td className="px-4 py-4">
                  <a
                    href="#application-flow"
                    className="inline-block rounded-lg bg-[var(--primary)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--primary-hover)]"
                  >
                    Start Application
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
