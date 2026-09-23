"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare, Calendar, MapPin, X } from "lucide-react";
import { BRANCHES } from "./Navbar";

export default function StickyMobileBar() {
  const [branchSelectorModal, setBranchSelectorModal] = useState<
    "call" | "whatsapp" | "map" | null
  >(null);

  const handleAction = (type: "call" | "whatsapp" | "map") => {
    setBranchSelectorModal(type);
  };

  return (
    <>
      {/* Fixed Bottom Action Bar for Touch Screens (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-2 py-2 md:hidden">
        <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
          {/* CALL */}
          <button
            onClick={() => handleAction("call")}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#251A76] transition active:scale-95"
          >
            <Phone className="w-5 h-5 text-[#00AEEF] mb-0.5" />
            <span className="text-[11px] font-extrabold uppercase tracking-tight">
              CALL
            </span>
          </button>

          {/* WHATSAPP */}
          <button
            onClick={() => handleAction("whatsapp")}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition active:scale-95 border border-emerald-200/50"
          >
            <MessageSquare className="w-5 h-5 text-emerald-600 mb-0.5" />
            <span className="text-[11px] font-extrabold uppercase tracking-tight">
              WHATSAPP
            </span>
          </button>

          {/* BOOK A SERVICE */}
          <Link
            href="/book"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] text-white shadow-md shadow-cyan-500/20 transition active:scale-95"
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] font-black uppercase tracking-tight">
              BOOK
            </span>
          </Link>

          {/* MAP / DIRECTIONS */}
          <button
            onClick={() => handleAction("map")}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#251A76] transition active:scale-95"
          >
            <MapPin className="w-5 h-5 text-[#00AEEF] mb-0.5" />
            <span className="text-[11px] font-extrabold uppercase tracking-tight">
              MAP
            </span>
          </button>
        </div>
      </div>

      {/* Branch Selection Popup Modal */}
      {branchSelectorModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-5 shadow-2xl relative border border-slate-100 animate-slideUp">
            <button
              onClick={() => setBranchSelectorModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-black text-[#251A76] mb-1">
              Select GEN B Branch
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {branchSelectorModal === "call" && "Which branch would you like to call?"}
              {branchSelectorModal === "whatsapp" && "Which branch would you like to chat with?"}
              {branchSelectorModal === "map" && "Which branch directions do you need?"}
            </p>

            <div className="space-y-3 mb-4">
              {BRANCHES.map((branch) => {
                let targetHref = "#";
                if (branchSelectorModal === "call") targetHref = `tel:${branch.rawPhone}`;
                if (branchSelectorModal === "whatsapp")
                  targetHref = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(
                    "Hi GEN B BIKE CARE, I would like to enquiry about servicing my bike."
                  )}`;
                if (branchSelectorModal === "map") targetHref = branch.mapUrl;

                return (
                  <a
                    key={branch.name}
                    href={targetHref}
                    target={branchSelectorModal !== "call" ? "_blank" : undefined}
                    rel={branchSelectorModal !== "call" ? "noopener noreferrer" : undefined}
                    onClick={() => setBranchSelectorModal(null)}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#00AEEF] bg-slate-50 hover:bg-cyan-50/50 transition group"
                  >
                    <div>
                      <div className="font-black text-[#251A76] text-sm group-hover:text-[#00AEEF]">
                        {branch.name} Branch
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {branch.phone}
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-extrabold text-white bg-[#00AEEF] rounded-lg shadow-xs">
                      Select
                    </span>
                  </a>
                );
              })}
            </div>

            <button
              onClick={() => setBranchSelectorModal(null)}
              className="w-full py-2 rounded-xl text-xs font-bold text-slate-500 bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
