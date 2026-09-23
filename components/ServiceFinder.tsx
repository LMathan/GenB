"use client";

import React, { useState } from "react";
import { Wrench, ArrowRight, CheckCircle2, MessageSquare, AlertCircle, HelpCircle } from "lucide-react";

const ISSUES = [
  {
    id: "start",
    label: "Bike won't start / Starting trouble",
    icon: "⚡",
    desc: "Self start not clicking, kick start slip, battery drain or spark plug issue",
  },
  {
    id: "engine",
    label: "Engine noise / Abnormal vibration",
    icon: "🔧",
    desc: "Tappet noise, knocking, high heat or unusual mechanical clatter",
  },
  {
    id: "brake",
    label: "Brake issue / Squeal noise",
    icon: "🛑",
    desc: "Low brake pressure, spongy lever, squealing noise, or worn brake pads",
  },
  {
    id: "chain",
    label: "Chain noise / Loose sprocket",
    icon: "⚙️",
    desc: "Chain slack, grinding sound, dry chain, or jumpy gear shifts",
  },
  {
    id: "pickup",
    label: "Poor pickup / Low mileage",
    icon: "🚀",
    desc: "Engine hesitation, slow acceleration, carburetor/EFI adjustment needed",
  },
  {
    id: "battery",
    label: "Battery dead / Horn & Light weak",
    icon: "🔋",
    desc: "Dim headlight, weak horn, indicator failure or battery charging issue",
  },
  {
    id: "regular",
    label: "Regular / Periodic Service Due",
    icon: "🛢️",
    desc: "Scheduled oil change, air filter cleaning, tuning & overall checkup",
  },
  {
    id: "other",
    label: "Other General Inspection / Unknown Sound",
    icon: "🔍",
    desc: "Clutch slip, suspension leakage, tire puncture, or custom repair requirement",
  },
];

export default function ServiceFinder() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<"Chithode" | "Perundurai">("Chithode");

  const chosenObj = ISSUES.find((i) => i.id === selectedIssue);

  const getWhatsappUrl = () => {
    const text = `Hi GEN B BIKE CARE (${selectedBranch} Branch),\n\nI need help with my bike:\n- Problem: ${chosenObj?.label || "General Enquiry"}\n- Details: ${chosenObj?.desc || ""}\n\nPlease guide me on servicing.`;
    const phone = selectedBranch === "Chithode" ? "919176099009" : "919176099119";
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#1A1254] via-[#251A76] to-[#1A1254] text-white rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border border-purple-500/20">
      {/* Decorative Cyan Light Overlay */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#00AEEF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center mb-8 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-400/10 border border-[#00AEEF]/30 text-[#00AEEF] text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-4 h-4" />
          <span>GUIDED SERVICE FINDER</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-3">
          NOT SURE WHAT YOUR BIKE NEEDS?
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Select what best describes your bike&apos;s condition, and our workshop team will recommend the right service plan for you.
        </p>
      </div>

      {/* Grid of Issues */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10 mb-8">
        {ISSUES.map((issue) => {
          const active = selectedIssue === issue.id;
          return (
            <button
              key={issue.id}
              onClick={() => setSelectedIssue(issue.id)}
              className={`p-4 rounded-2xl text-left transition duration-200 border flex flex-col justify-between relative ${
                active
                  ? "bg-white text-[#251A76] border-[#00AEEF] shadow-lg ring-2 ring-[#00AEEF]"
                  : "bg-white/10 hover:bg-white/15 text-white border-white/10"
              }`}
            >
              <div>
                <div className="text-2xl mb-2">{issue.icon}</div>
                <h4
                  className={`font-black text-sm leading-snug mb-1 ${
                    active ? "text-[#251A76]" : "text-white"
                  }`}
                >
                  {issue.label}
                </h4>
                <p
                  className={`text-xs leading-relaxed ${
                    active ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {issue.desc}
                </p>
              </div>

              {active && (
                <div className="mt-3 flex items-center text-xs font-extrabold text-[#00AEEF]">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-[#00AEEF]" />
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Action Card */}
      {selectedIssue && chosenObj && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 relative z-10 animate-fadeIn max-w-2xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-xs text-cyan-300 font-bold uppercase tracking-wider">
                Selected Issue
              </div>
              <h3 className="text-lg font-black text-white">{chosenObj.label}</h3>
              <p className="text-xs text-slate-200">{chosenObj.desc}</p>
            </div>

            {/* Branch Picker */}
            <div className="flex items-center space-x-2 bg-slate-900/60 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setSelectedBranch("Chithode")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedBranch === "Chithode"
                    ? "bg-[#00AEEF] text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Chithode
              </button>
              <button
                onClick={() => setSelectedBranch("Perundurai")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedBranch === "Perundurai"
                    ? "bg-[#00AEEF] text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Perundurai
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg transition"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              GET HELP ON WHATSAPP ({selectedBranch.toUpperCase()})
            </a>
            <a
              href={`/book?branch=${selectedBranch}&issue=${encodeURIComponent(
                chosenObj.label
              )}`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] text-white font-extrabold text-sm shadow-lg transition"
            >
              BOOK WORKSHOP INSPECTION
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
