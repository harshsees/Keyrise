"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
}

export function DatePickerModal({ isOpen, onClose, onSelectDate }: DatePickerModalProps) {
  const [activeTab, setActiveTab] = useState<"fixed" | "flexible">("fixed");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const calendarRef = useRef<HTMLDivElement>(null);

  // August and September 2026 calendar data generation
  const getDaysInMonth = (year: number, month: number) => {
    // month is 0-indexed (7 for Aug, 8 for Sep)
    const date = new Date(year, month, 1);
    const days = [];
    
    // Get the first day of the week (0 = Sun, 1 = Mon, ... 6 = Sat)
    // We want Monday-indexed (0 = Mon, ... 6 = Sun)
    let firstDay = date.getDay() - 1;
    if (firstDay === -1) firstDay = 6; // Sunday becomes 6
    
    // Pad initial days
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };

  const augustDays = getDaysInMonth(2026, 7); // August 2026
  const septemberDays = getDaysInMonth(2026, 8); // September 2026

  const minSelectableDate = new Date(2026, 7, 19); // August 19, 2026 (disabled on/before this)

  const isDateDisabled = (day: Date | null) => {
    if (!day) return true;
    return day <= minSelectableDate;
  };

  const handleDateClick = (day: Date) => {
    if (isDateDisabled(day)) return;
    setSelectedDate(day);
  };

  const handleProceed = () => {
    if (selectedDate) {
      onSelectDate(selectedDate);
    }
  };

  const formatDateString = (date: Date) => {
    const d = date.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const m = months[date.getMonth()];
    const y = date.getFullYear();
    return `${d} ${m} ${y}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/35"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative z-10 w-full max-w-sm rounded-[28px] bg-white p-6 shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition z-20"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 text-center mt-1 mb-4">
              Select your departure date
            </h3>

            {/* Tabs */}
            <div className="mx-auto flex w-fit rounded-full bg-slate-100 p-1 mb-5">
              <button
                type="button"
                onClick={() => setActiveTab("fixed")}
                className={`rounded-full px-5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "fixed"
                    ? "bg-white text-amber-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Fixed Dates
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("flexible")}
                className={`rounded-full px-5 py-1.5 text-xs font-semibold transition ${
                  activeTab === "flexible"
                    ? "bg-white text-amber-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Flexible
              </button>
            </div>

            {activeTab === "fixed" ? (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Day Names Header */}
                <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-500 mb-2">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>

                {/* Calendar Scroll Area */}
                <div 
                  ref={calendarRef}
                  className="flex-1 overflow-y-auto pr-1 max-h-[280px] scrollbar-thin scrollbar-thumb-slate-300"
                >
                  {/* August 2026 */}
                  <div className="mb-4">
                    <div className="grid grid-cols-7 gap-y-1.5 text-center text-sm font-medium">
                      {augustDays.map((day, idx) => {
                        if (!day) return <div key={`empty-aug-${idx}`} />;
                        const disabled = isDateDisabled(day);
                        const isSelected = selectedDate?.toDateString() === day.toDateString();
                        
                        return (
                          <button
                            key={day.toISOString()}
                            type="button"
                            onClick={() => handleDateClick(day)}
                            disabled={disabled}
                            className={`relative h-9 w-9 mx-auto flex items-center justify-center rounded-full text-xs font-semibold transition cursor-pointer ${
                              disabled
                                ? "text-slate-300 line-through cursor-not-allowed"
                                : isSelected
                                ? "bg-amber-500 text-white font-bold shadow-md"
                                : "text-slate-800 hover:bg-slate-50 active:scale-95"
                            }`}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* September 2026 Heading */}
                  <div className="text-center text-xs font-bold text-slate-800 my-4 uppercase tracking-wider">
                    September 2026
                  </div>

                  {/* September 2026 Days */}
                  <div>
                    <div className="grid grid-cols-7 gap-y-1.5 text-center text-sm font-medium">
                      {septemberDays.map((day, idx) => {
                        if (!day) return <div key={`empty-sep-${idx}`} />;
                        const disabled = isDateDisabled(day);
                        const isSelected = selectedDate?.toDateString() === day.toDateString();

                        return (
                          <button
                            key={day.toISOString()}
                            type="button"
                            onClick={() => handleDateClick(day)}
                            disabled={disabled}
                            className={`relative h-9 w-9 mx-auto flex items-center justify-center rounded-full text-xs font-semibold transition cursor-pointer ${
                              disabled
                                ? "text-slate-300 line-through cursor-not-allowed"
                                : isSelected
                                ? "bg-amber-500 text-white font-bold shadow-md"
                                : "text-slate-800 hover:bg-slate-50 active:scale-95"
                            }`}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center py-10 text-center text-sm text-slate-500">
                Flexible date selection is available on the next page. Please select fixed dates or proceed.
              </div>
            )}

            {/* Bottom Proceed Button */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleProceed}
                disabled={!selectedDate}
                className={`w-full rounded-2xl py-3.5 px-6 text-sm font-bold text-center transition duration-200 ${
                  selectedDate
                    ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-[0.99] cursor-pointer"
                    : "bg-amber-200 text-amber-500 cursor-not-allowed"
                }`}
              >
                {selectedDate ? `Proceed to Application (${formatDateString(selectedDate)})` : "Proceed to Application"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
