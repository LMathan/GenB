"use client";

import React, { useState } from "react";
import { MapPin, Phone, Clock, Navigation, MessageSquare, ArrowRight } from "lucide-react";
import { SITE_CONFIG, getPhoneHref, getWhatsAppHref } from "@/config/site";

export default function BranchSwitcherTab() {
  const [activeBranch, setActiveBranch] = useState<"chithode" | "perundurai">("chithode");

  const branch = SITE_CONFIG.branches.find((b) => b.id === activeBranch) || SITE_CONFIG.branches[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 md:p-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00AEEF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00AEEF] text-xs font-black uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 mr-1" /> DUAL WORKSHOP NETWORK
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#251A76]">
            SELECT YOUR NEAREST BRANCH
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Choose your branch to view instant contact, directions, and working hours
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveBranch("chithode")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition duration-200 flex items-center space-x-2 ${
              activeBranch === "chithode"
                ? "bg-[#251A76] text-white shadow-md shadow-purple-900/20"
                : "text-slate-600 hover:text-[#251A76]"
            }`}
          >
            <MapPin className={`w-3.5 h-3.5 ${activeBranch === "chithode" ? "text-[#00AEEF]" : ""}`} />
            <span>{SITE_CONFIG.branches[0].name} Branch</span>
          </button>

          <button
            onClick={() => setActiveBranch("perundurai")}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition duration-200 flex items-center space-x-2 ${
              activeBranch === "perundurai"
                ? "bg-[#251A76] text-white shadow-md shadow-purple-900/20"
                : "text-slate-600 hover:text-[#251A76]"
            }`}
          >
            <MapPin className={`w-3.5 h-3.5 ${activeBranch === "perundurai" ? "text-[#00AEEF]" : ""}`} />
            <span>{SITE_CONFIG.branches[1].name} Branch</span>
          </button>
        </div>
      </div>

      {/* Selected Branch Active Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#00AEEF] text-white rounded-2xl shadow-md shadow-cyan-500/20">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black text-[#00AEEF] uppercase tracking-wider">
                GEN B WORKSHOP
              </span>
              <h3 className="text-2xl font-black text-[#251A76]">
                {branch.name} Branch
              </h3>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Exact Address
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {branch.address}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#00AEEF] shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</div>
                <a href={getPhoneHref(branch.phoneRaw)} className="text-xs font-black text-[#251A76] hover:text-[#00AEEF]">
                  {branch.phone}
                </a>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center space-x-3">
              <Clock className="w-5 h-5 text-[#00AEEF] shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Working Hours</div>
                <div className="text-[11px] font-bold text-slate-700 whitespace-pre-line">{branch.shortHours}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#1A1254] to-[#251A76] p-6 rounded-2xl text-white space-y-3">
          <div className="text-xs font-black text-cyan-300 uppercase tracking-wider">
            Quick Actions ({branch.name})
          </div>
          <p className="text-xs text-slate-300">
            Contact our {branch.name} workshop manager directly or navigate via Google Maps.
          </p>

          <div className="space-y-2 pt-2">
            <a
              href={getPhoneHref(branch.phoneRaw)}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-white text-[#251A76] font-black text-xs hover:bg-slate-100 transition shadow-sm"
            >
              <Phone className="w-4 h-4 mr-2 text-[#00AEEF]" /> CALL {branch.name.toUpperCase()} BRANCH
            </a>

            <a
              href={getWhatsAppHref(branch.whatsapp, `Hi GEN B BIKE CARE (${branch.name} Branch), I would like to enquire about servicing my bike.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition"
            >
              <MessageSquare className="w-4 h-4 mr-2" /> CHAT ON WHATSAPP
            </a>

            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition"
            >
              <Navigation className="w-4 h-4 mr-2 text-[#00AEEF]" /> GET MAP DIRECTIONS
            </a>

            <a
              href={`/book?branch=${branch.name}`}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] text-white font-black text-xs shadow-md transition"
            >
              BOOK AT {branch.name.toUpperCase()} <ArrowRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
