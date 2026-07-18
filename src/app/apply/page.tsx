"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Home,
  User,
  FileText,
  ShoppingCart,
  Upload,
  CheckCircle,
  Plus,
  Trash2,
  Lock,
} from "lucide-react";

type StepType = "travelers" | "docs" | "checkout";

interface Traveler {
  id: string;
  firstName: string;
  lastName: string;
}

function ApplyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Retrieve travel date/option if passed
  const option = searchParams.get("option");
  const dateStr = searchParams.get("date");

  // Flow State
  const [currentStep, setCurrentStep] = useState<StepType>("travelers");
  
  // Step 1: Travelers State
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [addingState, setAddingState] = useState<"first_name" | "last_name">("first_name");
  
  // Step 2: Docs State
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, File>>({});
  const [uploadingDocKey, setUploadingDocKey] = useState<string | null>(null);

  // Step 3: Checkout State
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Progress Percentage calculation
  const getProgressPercentage = () => {
    switch (currentStep) {
      case "travelers":
        return travelers.length > 0 ? 33 : 0;
      case "docs":
        return 66;
      case "checkout":
        return paymentSuccess ? 100 : 90;
      default:
        return 0;
    }
  };

  // Back navigation handler
  const handleBack = () => {
    if (currentStep === "travelers") {
      if (addingState === "last_name") {
        setAddingState("first_name");
      } else {
        router.push("/");
      }
    } else if (currentStep === "docs") {
      setCurrentStep("travelers");
      setAddingState("first_name");
    } else if (currentStep === "checkout") {
      setCurrentStep("docs");
    }
  };

  // Travelers Next Step
  const handleTravelerContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (addingState === "first_name" && currentFirstName.trim()) {
      setAddingState("last_name");
    } else if (addingState === "last_name" && currentLastName.trim()) {
      const newTraveler: Traveler = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: currentFirstName.trim(),
        lastName: currentLastName.trim(),
      };
      setTravelers([...travelers, newTraveler]);
      setCurrentFirstName("");
      setCurrentLastName("");
      setAddingState("first_name");
    }
  };

  const removeTraveler = (id: string) => {
    setTravelers(travelers.filter((t) => t.id !== id));
  };

  const handleProceedToDocs = () => {
    if (travelers.length > 0) {
      setCurrentStep("docs");
    }
  };

  // File Upload mock handler
  const handleFileUpload = (docKey: string, file: File) => {
    setUploadingDocKey(docKey);
    setTimeout(() => {
      setUploadedDocs((prev) => ({
        ...prev,
        [docKey]: file,
      }));
      setUploadingDocKey(null);
    }, 1200);
  };

  // Payment mock handler
  const handlePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-slate-50/90 to-amber-50/10 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-xs shadow-sm hover:shadow active:scale-95 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>

        {/* Progress Bar (Center) */}
        <div className="flex flex-col items-center flex-1 max-w-xs md:max-w-md mx-6">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 mb-1">
            {getProgressPercentage()}% COMPLETED
          </span>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full bg-amber-500 rounded-full"
            />
          </div>
        </div>

        {/* Home Button */}
        <button
          onClick={() => router.push("/")}
          className="p-2 rounded-full border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 shadow-sm hover:shadow active:scale-95 transition"
          aria-label="Back to home"
        >
          <Home className="h-4 w-4" />
        </button>
      </header>

      {/* Main Body Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 py-8 md:py-12 gap-8">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-56 shrink-0 flex md:flex-col gap-2 md:gap-3 bg-white/50 backdrop-blur-sm md:bg-transparent p-2 rounded-2xl md:p-0 border border-slate-100 md:border-0">
          {/* Step 1: Travelers */}
          <button
            onClick={() => {
              if (travelers.length > 0) setCurrentStep("travelers");
            }}
            disabled={currentStep === "travelers"}
            className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3 rounded-xl text-left transition duration-300 ${
              currentStep === "travelers"
                ? "bg-amber-50/70 text-amber-700 font-bold"
                : "text-slate-400 font-semibold border border-transparent hover:text-slate-600 hover:bg-slate-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${
              currentStep === "travelers" ? "bg-amber-50 text-amber-600" : "bg-transparent text-slate-400"
            }`}>
              <User className="h-4 w-4" />
            </div>
            <span className="text-xs md:text-sm">Travelers</span>
          </button>

          {/* Step 2: Docs */}
          <button
            onClick={() => {
              if (travelers.length > 0) setCurrentStep("docs");
            }}
            disabled={travelers.length === 0}
            className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3 rounded-xl text-left transition duration-300 ${
              currentStep === "docs"
                ? "bg-amber-50/70 text-amber-700 font-bold"
                : "text-slate-400 font-semibold border border-transparent disabled:opacity-50 hover:text-slate-600 hover:bg-slate-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${
              currentStep === "docs" ? "bg-amber-50 text-amber-600" : "bg-transparent text-slate-400"
            }`}>
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-xs md:text-sm">Docs</span>
          </button>

          {/* Step 3: Checkout */}
          <button
            onClick={() => {
              if (travelers.length > 0 && Object.keys(uploadedDocs).length > 0) {
                setCurrentStep("checkout");
              }
            }}
            disabled={travelers.length === 0 || Object.keys(uploadedDocs).length === 0}
            className={`flex-1 md:flex-initial flex items-center gap-3 px-4 py-3 rounded-xl text-left transition duration-300 ${
              currentStep === "checkout"
                ? "bg-amber-50/70 text-amber-700 font-bold"
                : "text-slate-400 font-semibold border border-transparent disabled:opacity-50 hover:text-slate-600 hover:bg-slate-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${
              currentStep === "checkout" ? "bg-amber-50 text-amber-600" : "bg-transparent text-slate-400"
            }`}>
              <ShoppingCart className="h-4 w-4" />
            </div>
            <span className="text-xs md:text-sm">Checkout</span>
          </button>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 flex flex-col justify-center items-center min-h-[50vh] bg-white rounded-[32px] border border-slate-100/70 p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.015)] relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {currentStep === "travelers" && (
              <motion.div
                key="travelers"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl flex flex-col items-center"
              >
                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center leading-tight">
                  Who's going on this trip to United Arab Emirates?
                </h2>
                <p className="text-slate-400 text-sm mt-2 text-center font-medium">
                  You can add all travellers or continue solo
                </p>

                {/* Traveler List (if any added) */}
                {travelers.length > 0 && (
                  <div className="w-full mt-6 space-y-2.5 max-h-36 overflow-y-auto pr-1">
                    {travelers.map((t, idx) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-sm font-semibold text-slate-800">
                            {t.firstName} {t.lastName}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTraveler(t.id)}
                          className="text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-slate-100 transition"
                          aria-label="Remove traveler"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Main input form */}
                <form onSubmit={handleTravelerContinue} className="w-full mt-8 flex flex-col items-center">
                  <div className="w-full max-w-md relative mb-8">
                    <div className="w-full rounded-2xl bg-slate-50/60 border border-slate-100 p-4 transition-all duration-350 focus-within:bg-white focus-within:border-amber-500/80 focus-within:shadow-[0_12px_24px_rgba(217,119,6,0.03)]">
                      <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 text-left mb-1.5">
                        {addingState === "first_name" ? "Traveler's First Name" : "Traveler's Last Name"}
                      </label>
                      {addingState === "first_name" ? (
                        <input
                          type="text"
                          value={currentFirstName}
                          onChange={(e) => setCurrentFirstName(e.target.value)}
                          placeholder="First Name"
                          className="w-full text-left text-lg font-semibold text-slate-800 placeholder-slate-300 bg-transparent border-0 p-0 focus:outline-none focus:ring-0 focus:border-0"
                          autoFocus
                        />
                      ) : (
                        <input
                          type="text"
                          value={currentLastName}
                          onChange={(e) => setCurrentLastName(e.target.value)}
                          placeholder="Last Name"
                          className="w-full text-left text-lg font-semibold text-slate-800 placeholder-slate-300 bg-transparent border-0 p-0 focus:outline-none focus:ring-0 focus:border-0"
                          autoFocus
                        />
                      )}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    disabled={
                      addingState === "first_name"
                        ? !currentFirstName.trim()
                        : !currentLastName.trim()
                    }
                    className={`w-full max-w-xs rounded-2xl py-3.5 px-6 text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                      (addingState === "first_name" ? currentFirstName.trim() : currentLastName.trim())
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-[0_8px_20px_rgba(217,119,6,0.18)] hover:shadow-[0_12px_24px_rgba(217,119,6,0.24)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/50 shadow-none"
                    }`}
                  >
                    <span>Continue</span>
                    <span>→</span>
                  </button>
                </form>

                {/* Proceed to step 2 if we have at least one traveler */}
                {travelers.length > 0 && addingState === "first_name" && !currentFirstName.trim() && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    type="button"
                    onClick={handleProceedToDocs}
                    className="mt-6 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50/60 px-4 py-2 rounded-full border border-amber-100 hover:bg-amber-50 active:scale-95 transition"
                  >
                    Proceed with {travelers.length} {travelers.length === 1 ? "Traveler" : "Travelers"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {currentStep === "docs" && (
              <motion.div
                key="docs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl flex flex-col items-center"
              >
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center leading-tight">
                  Upload Required Documents
                </h2>
                <p className="text-slate-400 text-sm mt-2 text-center font-medium">
                  Provide passport scans for UAE visa processing
                </p>

                {/* Upload checklist */}
                <div className="w-full mt-8 space-y-4">
                  {travelers.map((t) => {
                    const docKey = `passport-${t.id}`;
                    const file = uploadedDocs[docKey];
                    const isUploading = uploadingDocKey === docKey;

                    return (
                      <div
                        key={t.id}
                        className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">
                            {t.firstName}'s Passport Photo Page
                          </h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Color scan with all details clearly visible. Max 5MB.
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          {file ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>Uploaded</span>
                            </div>
                          ) : isUploading ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold">
                              <span className="h-3.5 w-3.5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
                              <span>Uploading...</span>
                            </div>
                          ) : (
                            <label className="cursor-pointer flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold rounded-xl transition shadow-sm hover:shadow">
                              <Upload className="h-3.5 w-3.5" />
                              <span>Choose File</span>
                              <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const selectedFile = e.target.files?.[0];
                                  if (selectedFile) {
                                    handleFileUpload(docKey, selectedFile);
                                  }
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue button */}
                <button
                  type="button"
                  onClick={() => setCurrentStep("checkout")}
                  disabled={Object.keys(uploadedDocs).length < travelers.length}
                  className={`w-full max-w-xs mt-8 rounded-xl py-3 px-6 text-sm font-bold flex items-center justify-center gap-1.5 transition duration-300 ${
                    Object.keys(uploadedDocs).length >= travelers.length
                      ? "bg-slate-700 hover:bg-slate-800 text-white shadow-md active:scale-[0.99] cursor-pointer"
                      : "bg-[#8c919d] text-white/95 cursor-not-allowed"
                  }`}
                >
                  <span>Continue to Checkout</span>
                  <span>→</span>
                </button>
              </motion.div>
            )}

            {currentStep === "checkout" && (
              <motion.div
                key="checkout"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md flex flex-col items-center"
              >
                {!paymentSuccess ? (
                  <>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center leading-tight">
                      Review & Payment
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 text-center font-medium">
                      Complete your payment to submit the application
                    </p>

                    {/* Summary Card */}
                    <div className="w-full mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400 uppercase">Visa Plan</span>
                        <span className="text-slate-800 font-bold">Tourist visa - 30 days</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400 uppercase">Travelers</span>
                        <span className="text-slate-800 font-bold">{travelers.length}</span>
                      </div>
                      {dateStr && (
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-400 uppercase">Departure Date</span>
                          <span className="text-slate-800 font-bold">{dateStr}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-slate-200/50 my-2 pt-3 space-y-2">
                        <div className="flex justify-between text-xs font-medium text-slate-500">
                          <span>Government Visa Fee</span>
                          <span>₹{7000 * travelers.length}</span>
                        </div>
                        <div className="flex justify-between text-xs font-medium text-slate-500">
                          <span>Keyrise Service Fee</span>
                          <span>₹{499 * travelers.length}</span>
                        </div>
                        <div className="flex justify-between text-sm font-extrabold text-slate-800 border-t border-dashed border-slate-200 pt-3">
                          <span>Total Amount</span>
                          <span>₹{7499 * travelers.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pay Button */}
                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={isProcessingPayment}
                      className="w-full mt-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-6 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-200 hover:shadow-amber-300 active:scale-[0.99] transition duration-200"
                    >
                      {isProcessingPayment ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Processing Securely...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          <span>Pay ₹{7499 * travelers.length}</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-600 mb-5">
                      <CheckCircle className="h-10 w-10 animate-bounce" />
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                      Application Submitted!
                    </h2>
                    <p className="text-slate-500 text-sm mt-3 px-4 font-medium leading-relaxed">
                      Thank you for choosing Keyrise. We have received passport documents for your UAE visa. Your tracking details have been sent to your email.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
                      <button
                        onClick={() => router.push(`/track/UAE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`)}
                        className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 text-sm font-bold shadow shadow-amber-100 hover:shadow-md cursor-pointer transition active:scale-95"
                      >
                        Track Visa Status
                      </button>
                      <button
                        onClick={() => router.push("/")}
                        className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-5 py-3 text-sm font-bold cursor-pointer transition active:scale-95"
                      >
                        Back to Home
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading Application...</span>
        </div>
      </div>
    }>
      <ApplyPageContent />
    </Suspense>
  );
}
