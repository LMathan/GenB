"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, Wrench, ShieldCheck, MapPin } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Which motorcycle and scooter brands does GEN B BIKE CARE service?",
    a: "GEN B BIKE CARE is a multi-brand workshop. We service Honda, TVS, Yamaha, Hero, Royal Enfield, Bajaj, Suzuki, gearless scooters, and executive motorcycles.",
  },
  {
    q: "Where are your workshop branches located in Erode district?",
    a: "We operate from two active workshop locations: 1) Chithode Branch at 36 Perundurai Road, Nadupalayam, Chithode (+91 91760 99009) and 2) Perundurai Branch at Bhavani Road, near Anna Silai, Perundurai (+91 91760 99119).",
  },
  {
    q: "Do I need an appointment or can I walk in for service?",
    a: "Both walk-in visits and online service bookings are welcome. Booking online or calling ahead allows us to reserve a service bay for faster inspection and delivery.",
  },
  {
    q: "What is included in a Periodic Service package?",
    a: "Our Periodic Service package includes engine oil check/flush, air filter cleaning or replacement, spark plug check, front & rear brake adjustment, chain lube & tension check, battery voltage test, and wash detailing.",
  },
  {
    q: "How will I know when my bike service is completed?",
    a: "Once your bike passes our final quality inspection, our branch team will call or message you on WhatsApp so you can pick up your bike at your convenience.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 md:p-10">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00AEEF] text-xs font-black uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 mr-1" /> GOT QUESTIONS?
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-[#251A76]">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-xs text-slate-500 mt-2">
          Everything you need to know about our multi-brand workshop services in Chithode & Perundurai
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition duration-200 overflow-hidden ${
                isOpen
                  ? "bg-slate-50 border-[#00AEEF] shadow-sm"
                  : "bg-white border-slate-200 hover:border-purple-200"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full p-4 md:p-5 text-left flex justify-between items-center font-extrabold text-[#251A76] text-sm sm:text-base focus:outline-none"
              >
                <span className="pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#00AEEF] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 md:px-5 md:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
