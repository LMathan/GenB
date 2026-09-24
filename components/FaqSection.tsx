"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, Wrench, ShieldCheck, MapPin } from "lucide-react";

import { SITE_CONFIG } from "@/config/site";

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
        {SITE_CONFIG.faqs.map((faq, index) => {
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
