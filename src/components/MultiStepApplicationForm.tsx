"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { DocumentUploader, type UploadState } from "./DocumentUploader";
import { TrackingTimeline } from "./TrackingTimeline";
import { VisaTypeSelector } from "./VisaTypeSelector";

const visaPlans = [
  {
    id: "tourist-30",
    title: "Tourist visa - 30 days",
    price: "₹7,499",
    processing: "3-5 working days",
    validity: "30 days",
    description: "Best for short leisure trips.",
  },
  {
    id: "tourist-60",
    title: "Tourist visa - 60 days",
    price: "₹12,499",
    processing: "4-6 working days",
    validity: "60 days",
    description: "Ideal for longer family visits.",
  },
  {
    id: "express",
    title: "Express visa",
    price: "₹15,999",
    processing: "24-48 hours",
    validity: "14-30 days",
    description: "Fast-track approval for urgent travel.",
  },
  {
    id: "multiple-entry",
    title: "Multiple-entry visa",
    price: "₹19,999",
    processing: "4-7 working days",
    validity: "60 days",
    description: "For frequent visits during validity period.",
  },
] as const;

const schema = z.object({
  visaType: z.string().min(1, "Please select a visa type."),
  travelDate: z.string().min(1, "Travel date is required."),
  returnDate: z.string().min(1, "Return date is required."),
  travelers: z
    .number({ message: "Number of travelers is required." })
    .min(1, "At least 1 traveler is required.")
    .max(10, "Max 10 travelers per application."),
  purpose: z.string().min(2, "Please enter purpose of travel."),
  contactEmail: z.string().email("Enter a valid email."),
  contactPhone: z.string().min(8, "Enter a valid phone number."),
  fullName: z.string().min(2, "Full name is required."),
  dateOfBirth: z.string().min(1, "Date of birth is required."),
  passportNumber: z.string().min(6, "Passport number is required."),
  passportExpiry: z.string().min(1, "Passport expiry date is required."),
  nationality: z.string().min(2, "Nationality is required."),
  gender: z.string().min(1, "Gender is required."),
  applicantEmail: z.string().email("Enter a valid email."),
  applicantPhone: z.string().min(8, "Enter a valid phone number."),
});

type FormValues = z.infer<typeof schema>;
type DocStatus = "missing" | "uploaded";

const checklistTemplate = [
  {
    key: "passport-scan",
    name: "Passport scan",
    required: true,
    help: "Color scan with all details clearly visible.",
  },
  {
    key: "photo",
    name: "Passport-size photograph",
    required: true,
    help: "White background and neutral expression.",
  },
  {
    key: "travel-dates",
    name: "Travel dates",
    required: true,
    help: "Departure and return dates are mandatory.",
  },
  {
    key: "return-ticket",
    name: "Return ticket",
    required: false,
    help: "May be requested for some applications.",
  },
  {
    key: "hotel-booking",
    name: "Hotel booking",
    required: false,
    help: "Optional at initial submission stage.",
  },
  {
    key: "previous-visa",
    name: "Previous visa",
    required: false,
    help: "Upload if you previously traveled to UAE.",
  },
] as const;

export function MultiStepApplicationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [passportFile, setPassportFile] = useState<string>();
  const [passportError, setPassportError] = useState<string>();
  const [passportStatus, setPassportStatus] = useState<UploadState>("uploaded");
  const [checklistStatus, setChecklistStatus] = useState<
    Record<string, { file?: string; status: DocStatus }>
  >({});

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      travelers: 1,
      nationality: "Indian",
    },
  });

  const selectedVisaType = useWatch({ control, name: "visaType" });

  const selectedPlan = useMemo(
    () => visaPlans.find((item) => item.id === selectedVisaType) ?? visaPlans[0],
    [selectedVisaType],
  );

  const stepFields: Record<number, (keyof FormValues)[]> = {
    1: ["visaType"],
    2: ["travelDate", "returnDate", "travelers", "purpose", "contactEmail", "contactPhone"],
    3: [],
    4: [
      "fullName",
      "dateOfBirth",
      "passportNumber",
      "passportExpiry",
      "nationality",
      "gender",
      "applicantEmail",
      "applicantPhone",
    ],
    5: [],
    6: [],
  };

  const nextStep = async () => {
    if (step === 3 && !passportFile) {
      setPassportError("Please upload your passport first.");
      return;
    }
    const fields = stepFields[step];
    if (fields?.length) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setStep((prev) => Math.min(prev + 1, 7));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onPassportSelect = (file: File | null) => {
    setPassportError(undefined);
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024;
    if (!allowed.includes(file.type)) {
      setPassportError("Invalid file format. Upload JPG, PNG, or PDF.");
      return;
    }
    if (file.size > maxSize) {
      setPassportError("File exceeds 5MB limit.");
      return;
    }
    setPassportFile(file.name);
    setPassportStatus("reviewing");
    setTimeout(() => setPassportStatus("approved"), 900);
    if (!getValues("fullName")) {
      setValue("fullName", "Autofill from passport");
    }
  };

  const submit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    const values = getValues();
    const travelCode = values.travelDate?.replaceAll("-", "").slice(-6) || "000000";
    const passportCode = values.passportNumber?.slice(-4).toUpperCase() || "0000";
    setApplicationId(`UAE-${travelCode}-${passportCode}`);
    setLoading(false);
    setStep(7);
  };

  return (
    <section id="application-flow" className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
      <div className="rounded-3xl border border-[var(--border)] bg-white p-4 shadow-sm md:p-8">
        <div className="mb-7 flex flex-wrap gap-2">
          {[
            "Visa Type",
            "Travel Details",
            "Passport Upload",
            "Applicant Details",
            "Document Checklist",
            "Review & Payment",
            "Confirmation",
          ].map((label, index) => {
            const current = index + 1;
            return (
              <div
                key={label}
                className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  step >= current
                  ? "bg-amber-100 text-[var(--primary)]"
                    : "bg-[#f6f7fb] text-[var(--muted)]"
                }`}
              >
                {current}. {label}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  Step 1: Select visa type
                </h3>
                <VisaTypeSelector
                  plans={[...visaPlans]}
                  value={selectedVisaType ?? ""}
                  onChange={(value) => setValue("visaType", value, { shouldValidate: true })}
                  error={errors.visaType?.message}
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  Step 2: Travel details
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Travel date" error={errors.travelDate?.message}>
                    <input type="date" {...register("travelDate")} className={inputCls} />
                  </Field>
                  <Field label="Return date" error={errors.returnDate?.message}>
                    <input type="date" {...register("returnDate")} className={inputCls} />
                  </Field>
                  <Field label="Number of travelers" error={errors.travelers?.message}>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      {...register("travelers", { valueAsNumber: true })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Purpose of travel" error={errors.purpose?.message}>
                    <input
                      type="text"
                      placeholder="Tourism / Family visit / Business"
                      {...register("purpose")}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Contact email" error={errors.contactEmail?.message}>
                    <input type="email" {...register("contactEmail")} className={inputCls} />
                  </Field>
                  <Field label="Phone number" error={errors.contactPhone?.message}>
                    <input type="tel" {...register("contactPhone")} className={inputCls} />
                  </Field>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  Step 3: Passport upload
                </h3>
                <DocumentUploader
                  fileName={passportFile}
                  status={passportStatus}
                  error={passportError}
                  onFileSelect={onPassportSelect}
                />
                <div className="mt-3 flex gap-2">
                  {(["uploaded", "reviewing", "needs replacement", "approved"] as UploadState[]).map(
                    (state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => setPassportStatus(state)}
                        className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--muted)]"
                      >
                        Mark {state}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  Step 4: Applicant details
                </h3>
                <p className="mb-4 text-sm text-[var(--muted)]">
                  Passport upload can auto-fill some details. You can edit them before submission.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Full name" error={errors.fullName?.message}>
                    <input type="text" {...register("fullName")} className={inputCls} />
                  </Field>
                  <Field label="Date of birth" error={errors.dateOfBirth?.message}>
                    <input type="date" {...register("dateOfBirth")} className={inputCls} />
                  </Field>
                  <Field label="Passport number" error={errors.passportNumber?.message}>
                    <input type="text" {...register("passportNumber")} className={inputCls} />
                  </Field>
                  <Field label="Passport expiry date" error={errors.passportExpiry?.message}>
                    <input type="date" {...register("passportExpiry")} className={inputCls} />
                  </Field>
                  <Field label="Nationality" error={errors.nationality?.message}>
                    <input type="text" {...register("nationality")} className={inputCls} />
                  </Field>
                  <Field label="Gender" error={errors.gender?.message}>
                    <select {...register("gender")} className={inputCls} defaultValue="">
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                  <Field label="Email" error={errors.applicantEmail?.message}>
                    <input type="email" {...register("applicantEmail")} className={inputCls} />
                  </Field>
                  <Field label="Phone number" error={errors.applicantPhone?.message}>
                    <input type="tel" {...register("applicantPhone")} className={inputCls} />
                  </Field>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  Step 5: Document checklist
                </h3>
                <div className="space-y-3">
                  {checklistTemplate.map((doc) => {
                    const item = checklistStatus[doc.key];
                    return (
                      <div
                        key={doc.key}
                        className="rounded-xl border border-[var(--border)] p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-semibold text-[var(--foreground)]">
                              {doc.name}
                            </h4>
                            <p className="text-xs text-[var(--muted)]">{doc.help}</p>
                          </div>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              doc.required
                                ? "bg-red-50 text-red-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {doc.required ? "Required" : "Optional"}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <label className="cursor-pointer rounded-lg bg-[var(--primary)] px-3 py-2 text-xs font-semibold text-white">
                            Upload
                            <input
                              type="file"
                              className="hidden"
                              onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (!file) return;
                                setChecklistStatus((prev) => ({
                                  ...prev,
                                  [doc.key]: { file: file.name, status: "uploaded" },
                                }));
                              }}
                            />
                          </label>
                          <span
                            className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                              item?.status === "uploaded"
                                ? "bg-green-50 text-green-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {item?.status === "uploaded" ? "Uploaded" : "Pending"}
                          </span>
                          {item?.file && (
                            <span className="text-xs text-[var(--muted)]">{item.file}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  Step 6: Review and payment
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-[var(--border)] bg-amber-50 p-4">
                    <p className="text-sm text-[var(--muted)]">Selected visa type</p>
                    <p className="text-base font-semibold text-[var(--foreground)]">
                      {selectedPlan.title}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      Processing time: {selectedPlan.processing}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] p-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-[var(--muted)]">Government fee</span>
                        <span>₹5,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[var(--muted)]">Service fee</span>
                        <span>₹2,100</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[var(--muted)]">Taxes</span>
                        <span>₹399</span>
                      </li>
                      <li className="flex justify-between border-t border-[var(--border)] pt-2 font-semibold text-[var(--foreground)]">
                        <span>Total amount</span>
                        <span>₹7,499</span>
                      </li>
                    </ul>
                    <p className="mt-3 rounded-lg bg-green-50 p-2 text-xs text-green-700">
                      Refund support available under on-time delivery guarantee terms.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit(submit)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] disabled:opacity-70"
                >
                  {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                  {loading ? "Processing payment..." : "Pay Securely"}
                </button>
              </div>
            )}

            {step === 7 && (
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">
                  Step 7: Confirmation and tracking
                </h3>
                <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4">
                  <p className="text-sm text-green-700">Application submitted successfully.</p>
                  <p className="mt-1 text-lg font-semibold text-green-800">
                    Application ID: {applicationId}
                  </p>
                </div>
                <TrackingTimeline activeIndex={1} />
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
                  >
                    Download receipt
                  </a>
                  <a
                    href="mailto:[support@email.com]"
                    className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
                  >
                    Contact support
                  </a>
                  <Link
                    href={`/track/${applicationId || "UAE-123456"}`}
                    className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Open tracking page
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 7 && (
          <div className="mt-7 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] disabled:opacity-40"
            >
              Back
            </button>
            {step < 6 && (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-hover)]"
              >
                Continue
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)]";

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="space-y-1 text-sm">
      <span className="font-medium text-[var(--foreground)]">{label}</span>
      {children}
      {error ? <span className="block text-xs text-[var(--error)]">{error}</span> : null}
    </label>
  );
}
