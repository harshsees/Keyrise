"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, CalendarDays, FileText, FolderOpen, Smartphone, Clock3, Scan, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const plans = [
  {
    title: "Tourist visa - 30 days",
    price: "₹7,499",
    timing: "15 Jul 2026 at 03:33 PM",
    badge: "Guaranteed",
  },
  {
    title: "Tourist visa - 60 days",
    price: "₹12,499",
    timing: "14 Jul 2026 at 04:33 PM",
    badge: "22 hours sooner",
  },
];

type VisaInfoAndPlansProps = {
  selectedPlan: number;
  onSelectPlan: (index: number) => void;
};

export function VisaInfoAndPlans({ selectedPlan, onSelectPlan }: VisaInfoAndPlansProps) {
  // Chances of Approval Section State & Logic
  const quizQuestions = [
    {
      id: 1,
      num: "01",
      question: "Have you travelled internationally before?",
      options: ["Yes", "No"]
    },
    {
      id: 2,
      num: "02",
      question: "Have you travelled to AE before?",
      options: ["Yes", "No"]
    },
    {
      id: 3,
      num: "03",
      question: "Have you ever overstayed your visa duration before?",
      options: ["Yes", "No"]
    },
    {
      id: 4,
      num: "04",
      question: "Have you ever been convicted of a crime?",
      options: ["Yes", "No"]
    },
    {
      id: 5,
      num: "05",
      question: "What's your approximate bank balance?",
      options: ["0 - ₹25,000", "₹25,000 - 50000", "₹50,000 - 75000", "₹75,000+"]
    },
    {
      id: 6,
      num: "06",
      question: "Is your passport valid for at least 6 months after your travel date?",
      options: ["Yes", "No"]
    }
  ];

  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0); // 0 to 5 for Q1 to Q6, 6 for results
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [quizStep]: answer }));
    setQuizStep(prev => prev + 1);
  };

  const calculateResult = () => {
    let score = 75; // base score

    if (quizAnswers[0] === "Yes") score += 10;
    else score -= 10;

    if (quizAnswers[1] === "Yes") score += 10;

    if (quizAnswers[2] === "Yes") score -= 45;
    else score += 5;

    if (quizAnswers[3] === "Yes") score -= 60;
    else score += 5;

    if (quizAnswers[4] === "0 - ₹25,000") score -= 25;
    else if (quizAnswers[4] === "₹25,000 - 50000") score -= 5;
    else if (quizAnswers[4] === "₹50,000 - 75000") score += 5;
    else if (quizAnswers[4] === "₹75,000+") score += 15;

    if (quizAnswers[5] === "No") score -= 80;

    const finalScore = Math.max(1, Math.min(99, score));

    let reason = "Your profile matches the standard requirements for a high approval rate.";
    if (quizAnswers[3] === "Yes") {
      reason = "Criminal record severely impacts visa approval chances.";
    } else if (quizAnswers[5] === "No") {
      reason = "Passport must be valid for at least 6 months after your travel date.";
    } else if (quizAnswers[2] === "Yes") {
      reason = "Overstaying your visa duration severely impacts future applications.";
    } else if (quizAnswers[4] === "0 - ₹25,000") {
      reason = "Low bank balance may impact approval chances.";
    } else if (quizAnswers[0] === "No" && quizAnswers[1] === "No") {
      reason = "First-time international travelers may require additional verification.";
    }

    return { percentage: finalScore, reason };
  };

  const { percentage, reason } = calculateResult();
  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Dubai visa information
        </h1>
        {/* Scaled up borderless visa info details aligned in a column grid */}
        <div className="mt-5 space-y-5">
          {/* Row 1: 3 components scaled up */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-slate-200/50 pb-5">
            {/* 1. Visa Type */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Smartphone className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Visa Type:</p>
                <p className="text-base md:text-lg font-extrabold text-[var(--foreground)] mt-0.5">E-Visa</p>
              </div>
            </div>

            {/* 2. Length of Stay */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <CalendarDays className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Length of Stay:</p>
                <div className="relative group inline-block mt-0.5">
                  <span className="text-base md:text-lg font-extrabold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    30 days
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Length of Stay: 30 days</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {"The maximum duration that you are allowed to remain in a country after entering with that particular visa."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Validity */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Clock3 className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Validity:</p>
                <div className="relative group inline-block mt-0.5">
                  <span className="text-base md:text-lg font-extrabold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    60 days
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Validity Period: 60 days</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {"The number of days your visa is active after the date of issuance. We ensure your visa is valid based on your travel dates."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: remaining 2 components scaled up and aligned */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
            {/* 4. Entry */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <FileText className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Entry:</p>
                <div className="relative group inline-block mt-0.5">
                  <span className="text-base md:text-lg font-extrabold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    Single
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Entry: Single</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {"You can enter the country only once during the visa's validity period and cannot re-enter using the same visa once you've exited."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Method */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FolderOpen className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-[var(--muted)]">Method:</p>
                <div className="relative group inline-block mt-0.5">
                  <span className="text-base md:text-lg font-extrabold text-[var(--foreground)] underline decoration-slate-400 decoration-dotted underline-offset-4 cursor-pointer">
                    Paperless
                  </span>
                  {/* Tooltip Box */}
                  <div className="absolute top-full left-0 mt-2.5 hidden group-hover:block w-[280px] bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] z-30 pointer-events-none">
                    <p className="text-sm font-bold text-slate-900">Method: Paperless</p>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {"Apply and receive your visa fully online. No paperwork needed."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd Column is empty for alignment balance */}
            <div className="hidden sm:block" />
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          {/* Header row with indicator dot */}
          <div className="flex items-center gap-2.5">
            <span className="relative z-10 flex h-3 w-3 items-center justify-center rounded-full bg-[var(--primary)]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
            </span>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Get a Guaranteed Visa on
            </h1>
          </div>

          {/* Indented branching container (restored original spacing) */}
          <div className="mt-6.5 space-y-5.5">
            {plans.map((plan, index) => {
              const active = selectedPlan === index;
              return (
                <div key={plan.title} className="relative pl-7">
                  {/* Curved branch line shown only to the selected plan (restored branch sizes) */}
                  {selectedPlan === 0 && index === 0 && (
                    <motion.div
                      initial={{ opacity: 0, width: 23 }}
                      animate={{ opacity: 1, width: 31 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[5px] top-[-26px] h-[51px] border-l-2 border-b-2 border-slate-200/80 rounded-bl-[16px] pointer-events-none"
                    />
                  )}

                  {selectedPlan === 1 && index === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[5px] top-[-26px] bottom-[-22px] w-[2px] bg-slate-200/80 pointer-events-none"
                    />
                  )}

                  {selectedPlan === 1 && index === 1 && (
                    <motion.div
                      initial={{ opacity: 0, width: 23 }}
                      animate={{ opacity: 1, width: 31 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-[5px] top-0 h-[25px] border-l-2 border-b-2 border-slate-200/80 rounded-bl-[16px] pointer-events-none"
                    />
                  )}

                  <motion.button
                    type="button"
                    onClick={() => onSelectPlan(index)}
                    animate={{ x: active ? 8 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`relative w-full rounded-xl border p-3.5 text-left transition ${
                      active
                        ? "border-[var(--primary)] bg-amber-50 shadow-md shadow-amber-100/50"
                        : "border-[var(--border)] bg-[#fcfcfc]"
                    }`}
                  >
                    {index === 1 && (
                      <span className="absolute left-3.5 -top-2.5 rounded-full bg-[var(--primary)] px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                        {plan.badge}
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-2.5 w-full">
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                          {plan.title}
                        </p>
                        <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-[var(--muted)]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)]" />
                          {plan.timing}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[var(--foreground)]">{plan.price}</p>
                        <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">
                          TO BE PAID NOW
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between w-full">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--primary)]">
                        <span className="rounded-full border border-[var(--border)] bg-white px-2 py-0.5 text-[11px] font-semibold">
                          View Timeline
                        </span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </span>
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          active
                            ? "bg-[var(--primary)] text-white"
                            : "bg-white text-[var(--primary)]"
                        }`}
                      >
                        {active ? "Selected" : "Select"}
                      </span>
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>      {/* All 7 Emirates with 1 Visa Section */}
      <div className="pt-8 border-t border-slate-200/50">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
              All 7 Emirates with 1 Visa
            </h2>
          </div>

          <div className="space-y-3.5 md:space-y-4">
            {/* Top Row: Dubai, Abu Dhabi, Sharjah */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  name: "Dubai",
                  image: "/images/emirates/dubai.jpg",
                },
                {
                  name: "Abu Dhabi",
                  image: "/images/emirates/abu-dhabi.png",
                },
                {
                  name: "Sharjah",
                  image: "/images/emirates/sharjah.png",
                },
              ].map((emirate) => (
                <div
                  key={emirate.name}
                  className="relative group overflow-hidden rounded-[20px] shadow-sm cursor-pointer h-[180px] sm:h-[240px] md:h-[260px] bg-slate-100"
                >
                  <img
                    src={emirate.image}
                    alt={emirate.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-base sm:text-xl md:text-2xl tracking-tight leading-tight">
                      {emirate.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row: Ras Al Khaimah, Fujairah, Umm Al Quwain, Ajman */}
            <div className="grid grid-cols-4 gap-2.5 md:gap-3">
              {[
                {
                  name: "Ras Al Khaimah",
                  image: "/images/emirates/ras-al-khaimah.jpg",
                },
                {
                  name: "Fujairah",
                  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=400&q=80",
                },
                {
                  name: "Umm Al Quwain",
                  image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&h=400&q=80",
                },
                {
                  name: "Ajman",
                  image: "/images/emirates/ajman.png",
                },
              ].map((emirate) => (
                <div
                  key={emirate.name}
                  className="relative group overflow-hidden rounded-[16px] sm:rounded-[20px] shadow-sm cursor-pointer h-[160px] sm:h-[225px] md:h-[250px] bg-slate-100"
                >
                  <img
                    src={emirate.image}
                    alt={emirate.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <p className="text-white font-bold text-xs sm:text-base md:text-lg tracking-tight leading-tight break-words">
                      {emirate.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dubai Visa Requirements Section */}
      <div className="pt-8 border-t border-slate-200/50 space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
            Dubai Visa Requirements
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-slate-50 border border-slate-200/60 rounded-2xl font-bold text-sm text-[var(--foreground)] shadow-sm cursor-pointer hover:bg-slate-100/50 transition">
            <Scan className="h-4.5 w-4.5 text-slate-700" />
            Passport
          </div>
        </div>
      </div>

      {/* Partners We Work With Section */}
      <div className="pt-8 border-t border-slate-200/50 space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
            Partners We Work With
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-lg">
          {/* Card 1: Ministry of Foreign Affairs */}
          <div className="flex flex-col items-center justify-center bg-white border border-slate-200/40 rounded-3xl p-4 aspect-square shadow-sm hover:shadow-md transition duration-300 gap-2">
            <svg className="h-10 w-10 text-amber-600" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="2 2" />
              <path d="M50 20 C45 35 25 40 15 50 C25 50 35 45 50 35 C65 45 75 50 85 50 C75 40 55 35 50 20 Z" />
              <circle cx="50" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2" />
              <path d="M43 45 L43 53 L57 53 L57 45 Z" fill="white" />
              <path d="M43 45 L43 53 L47 53 L47 45 Z" fill="#c2410c" />
              <path d="M47 45 L47 47.6 L57 47.6 L57 45 Z" fill="#15803d" />
              <path d="M47 50.4 L47 53 L57 53 L57 50.4 Z" fill="black" />
            </svg>
            <p className="text-[8px] md:text-[9px] font-bold text-center tracking-tight text-amber-800 uppercase leading-tight mt-1 max-w-[85px]">
              Ministry of Foreign Affairs
            </p>
          </div>

          {/* Card 2: Government of Dubai */}
          <div className="flex flex-col items-center justify-center bg-white border border-slate-200/40 rounded-3xl p-4 aspect-square shadow-sm hover:shadow-md transition duration-300 gap-2">
            <svg className="h-10 w-24 text-red-600" viewBox="0 0 120 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 20 C20 10 35 15 45 25 C55 15 70 10 80 20 C90 15 105 15 115 25" />
              <path d="M30 15 C35 5 45 5 50 15" />
              <path d="M75 15 C80 5 90 5 95 15" />
            </svg>
            <p className="text-[8px] md:text-[9px] font-extrabold text-center tracking-wider text-red-600 uppercase leading-none mt-1">
              Government of Dubai
            </p>
          </div>

          {/* Card 3: IATA */}
          <div className="flex flex-col items-center justify-center bg-white border border-slate-200/40 rounded-3xl p-4 aspect-square shadow-sm hover:shadow-md transition duration-300 gap-2">
            <svg className="h-10 w-20 text-sky-800" viewBox="0 0 100 40" fill="currentColor">
              <path d="M10 15 H40 L35 25 H5 Z" />
              <path d="M90 15 H60 L65 25 H95 Z" />
              <circle cx="50" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="2" />
              <path d="M36 20 H64" stroke="currentColor" stroke-width="2" />
              <path d="M50 6 V34" stroke="currentColor" stroke-width="2" />
              <path d="M39 12 C44 15 56 15 61 12" fill="none" stroke="currentColor" stroke-width="1.5" />
              <path d="M39 28 C44 25 56 25 61 28" fill="none" stroke="currentColor" stroke-width="1.5" />
            </svg>
            <p className="text-[10px] md:text-[11px] font-black text-center tracking-widest text-sky-900 uppercase leading-none mt-1">
              IATA
            </p>
          </div>
        </div>
      </div>

      {/* How Process Works Section */}
      <div className="pt-8 border-t border-slate-200/50 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
            How Process Works
          </h2>
        </div>

        <div className="relative pl-6 md:pl-8 border-l border-slate-200/80 ml-3.5 space-y-6 pt-2 pb-2">
          {/* Step 1 */}
          <div className="relative">
            <span className="absolute -left-[30px] md:-left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 border border-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
            </span>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition duration-300">
              <p className="text-xs font-bold text-amber-600">Step 1</p>
              <h3 className="text-lg font-bold text-[var(--foreground)] mt-1">Apply on Keyrise</h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                Submit your documents on Keyrise — only pay government fee.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <span className="absolute -left-[30px] md:-left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 border border-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
            </span>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition duration-300">
              <p className="text-xs font-bold text-amber-600">Step 2</p>
              <h3 className="text-lg font-bold text-[var(--foreground)] mt-1">Your Documents Are Verified</h3>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                Keyrise verifies your documents and submits to Immigration
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <span className="absolute -left-[30px] md:-left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 border border-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
            </span>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition duration-300 space-y-4">
              <div>
                <p className="text-xs font-bold text-amber-600">Step 3</p>
                <h3 className="text-lg font-bold text-[var(--foreground)] mt-1">Your Visa Gets Processed</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  We work with Immigration to ensure you get your Visa on time.
                </p>
              </div>
              
              {/* Nested tracking sub-timeline */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4.5 space-y-4">
                <div className="relative pl-5 border-l border-amber-500/30 space-y-4 ml-1">
                  {/* Item 1 */}
                  <div className="relative">
                    <span className="absolute -left-[24.5px] top-1 h-2 w-2 rounded-full bg-amber-600 border border-white" />
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      Application has been sent to the immigration supervisor
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-slate-500">8 Jan, 5:45 AM</span>
                      <span className="inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider">
                        ON TIME
                      </span>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="relative">
                    <span className="absolute -left-[24.5px] top-1 h-2 w-2 rounded-full bg-amber-600 border border-white" />
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      Application has been sent to internal intelligence
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-slate-500">8 Jan, 5:45 AM</span>
                      <span className="inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider">
                        ON TIME
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <span className="absolute -left-[30px] md:-left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 border border-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
            </span>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition duration-300 space-y-4">
              <div>
                <p className="text-xs font-bold text-amber-600">Step 4</p>
                <h3 className="text-lg font-bold text-[var(--foreground)] mt-1">
                  Get Your Visa on <span className="text-amber-600">20 Jul, 01:08 PM</span>
                </h3>
              </div>

              {/* Nested fee grid */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 divide-y divide-slate-200/60">
                {/* Row 1 */}
                <div className="flex items-center justify-between py-2 first:pt-0">
                  <span className="text-xs font-bold text-slate-700 leading-snug">Your visa is approved on time</span>
                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm border border-emerald-100/50">
                    Pay Keyrise Fee
                  </span>
                </div>
                {/* Row 2 */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs font-bold text-slate-700 leading-snug max-w-[200px] md:max-w-none">
                    Your visa is approved even one second after the promised time
                  </span>
                  <span className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 shadow-sm border border-amber-100/50 shrink-0">
                    Keyrise Fee Waived
                  </span>
                </div>
                {/* Row 3 */}
                <div className="flex items-center justify-between py-2 last:pb-0">
                  <span className="text-xs font-bold text-slate-700 leading-snug">Your visa is rejected</span>
                  <span className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 shadow-sm border border-red-100/50">
                    Government Fee Refunded
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chances of Approval Section */}
      <div className="pt-8 border-t border-slate-200/50 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">
            Want to know if your will be approved?
          </h2>
        </div>

        <div className="flex items-center justify-center p-4">
          {!showQuiz ? (
            /* Promo Card */
            <div className="w-full max-w-xl bg-slate-50/50 border border-slate-200/60 rounded-3xl p-5 md:p-6 shadow-sm flex items-center justify-between gap-4">
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Learn Your</p>
                <h3 className="text-xl md:text-2xl font-extrabold text-[var(--foreground)] leading-tight">
                  Chances of Approval
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Answer 6 questions to know your chances
                </p>
                <button
                  onClick={() => {
                    setShowQuiz(true);
                    setQuizStep(0);
                    setQuizAnswers({});
                  }}
                  className="inline-flex items-center gap-1 text-sm font-bold text-amber-600 hover:text-amber-700 transition mt-2.5 cursor-pointer"
                >
                  Evaluate my chances <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col items-center gap-3 pr-2 shrink-0">
                {/* Dotted gauge wheel */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" stroke-width="5" stroke-dasharray="1 2.5" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#d97706"
                      stroke-width="5"
                      stroke-dasharray="1 2.5"
                      stroke-dashoffset="15"
                      className="transform -rotate-90 origin-center"
                    />
                    <text x="50" y="55" textAnchor="middle" className="text-[17px] font-black fill-amber-700/80">
                      100%
                    </text>
                  </svg>
                </div>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[9.5px] font-bold text-indigo-600 shadow-sm border border-indigo-100/50">
                  Takes 5 seconds
                </span>
              </div>
            </div>
          ) : quizStep < 6 ? (
            /* Active Quiz Interface */
            <div className="flex flex-col items-center justify-center py-4">
              <div
                className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full shadow-inner transition-all duration-700 ease-out"
                style={{
                  background: `conic-gradient(#d97706 ${(quizStep / 6) * 360}deg, #f1f5f9 ${(quizStep / 6) * 360}deg)`
                }}
              >
                {/* Inner masking circle */}
                <div className="absolute inset-3.5 bg-slate-50/30 rounded-full" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={quizStep}
                    initial={{ opacity: 0, scale: 0.92, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 w-[240px] sm:w-[270px] bg-white rounded-2xl shadow-xl border border-slate-100 p-5 sm:p-6 flex flex-col justify-between h-[250px] sm:h-[285px]"
                  >
                    <div>
                      <p className="text-4xl sm:text-5xl font-extrabold text-slate-100 leading-none">
                        {quizQuestions[quizStep].num}
                      </p>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-4 leading-snug">
                        {quizQuestions[quizStep].question}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {quizQuestions[quizStep].options.length === 2 ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => handleAnswer(quizQuestions[quizStep].options[0])}
                            className="w-full py-2 sm:py-2.5 rounded-xl border border-slate-200/80 bg-white text-xs sm:text-sm font-bold text-amber-700 hover:bg-amber-50/50 hover:border-amber-200 transition"
                          >
                            {quizQuestions[quizStep].options[0]}
                          </button>
                          <button
                            onClick={() => handleAnswer(quizQuestions[quizStep].options[1])}
                            className="w-full py-2 sm:py-2.5 rounded-xl border border-slate-200/80 bg-white text-xs sm:text-sm font-bold text-amber-700 hover:bg-amber-50/50 hover:border-amber-200 transition"
                          >
                            {quizQuestions[quizStep].options[1]}
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {quizQuestions[quizStep].options.map(opt => (
                            <button
                              key={opt}
                              onClick={() => handleAnswer(opt)}
                              className="py-2.5 rounded-xl border border-slate-200/80 bg-white text-[10px] sm:text-xs font-bold text-amber-700 hover:bg-amber-50/50 hover:border-amber-200 transition leading-tight flex items-center justify-center px-1"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* Results Screen with Wave Effect */
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] rounded-full overflow-hidden flex flex-col justify-center items-center p-6 text-center shadow-lg border border-amber-200/30 bg-amber-50/60">
                {/* Wave container filling corresponding to percentage */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-amber-600/90 transition-all duration-1000 ease-out"
                  style={{ height: `${percentage}%` }}
                >
                  {/* Wave SVG elements moving horizontally */}
                  <svg className="absolute left-0 w-[200%] h-10 -top-8 text-amber-600/90 fill-current animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1150,100 1300,20 1450,60 L1450,120 L0,120 Z" />
                  </svg>
                  <svg className="absolute left-0 w-[200%] h-10 -top-8 text-amber-500/50 fill-current animate-wave-slow opacity-40" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,50 C100,20 250,80 400,50 C550,20 700,80 850,50 C1000,20 1150,80 1300,50 L1300,120 L0,120 Z" />
                  </svg>
                </div>

                {/* Info Text Layer overlay on top of wave */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <p
                    className={`text-5xl sm:text-6xl font-black transition-colors duration-500 ${
                      percentage > 50 ? "text-white" : "text-amber-950"
                    }`}
                  >
                    {percentage}%
                  </p>
                  <h4
                    className={`text-base sm:text-lg font-bold transition-colors duration-500 mt-1 ${
                      percentage > 50 ? "text-white/95" : "text-amber-900/90"
                    }`}
                  >
                    Chances of Approval
                  </h4>
                  <p
                    className={`text-[11px] sm:text-xs max-w-[220px] transition-colors duration-500 mt-2.5 leading-relaxed font-semibold ${
                      percentage > 50 ? "text-amber-50/90" : "text-amber-900/70"
                    }`}
                  >
                    {reason}
                  </p>

                  <button
                    onClick={() => setShowQuiz(false)}
                    className="mt-6 bg-white text-amber-700 font-bold px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition text-xs sm:text-sm cursor-pointer"
                  >
                    Apply anyway
                  </button>
                  
                  <button
                    onClick={() => {
                      setQuizStep(0);
                      setQuizAnswers({});
                    }}
                    className={`mt-3 text-[11px] sm:text-xs font-bold underline transition-colors duration-500 ${
                      percentage > 50 ? "text-white/80 hover:text-white" : "text-amber-700/80 hover:text-amber-700"
                    }`}
                  >
                    Retake
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global CSS Style tag for wave keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave {
          animation: wave-move 8s linear infinite;
        }
        .animate-wave-slow {
          animation: wave-move 12s linear infinite;
        }
      `}} />
    </div>
  );
}
