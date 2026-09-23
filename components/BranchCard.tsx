"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, MapPin, Clock, ArrowRight, Navigation } from "lucide-react";

export interface BranchInfo {
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  rawPhone: string;
  whatsapp: string;
  hours: string[];
  mapUrl: string;
}

export default function BranchCard({ branch }: { branch: BranchInfo }) {
  const whatsappUrl = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(
    `Hi GEN B BIKE CARE (${branch.name} Branch), I would like to enquiry about servicing my bike.`
  )}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl hover:border-purple-300 transition duration-200 p-6 flex flex-col justify-between relative overflow-hidden group">
      {/* Subtle Purple Visual Accent Pill */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-100/70 to-transparent rounded-bl-full -mr-6 -mt-6 pointer-events-none group-hover:scale-110 transition duration-300" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#251A76] rounded-xl text-white shadow-xs">
              <MapPin className="w-6 h-6 text-[#00AEEF]" />
            </div>
            <div>
              <span className="text-[11px] font-black tracking-widest text-[#00AEEF] uppercase">
                LOCATION
              </span>
              <h3 className="text-xl font-black text-[#251A76] leading-tight">
                {branch.name} Branch
              </h3>
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            Active Workshop
          </span>
        </div>

        {/* Address */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Workshop Address
          </p>
          <p className="text-sm text-slate-700 font-semibold leading-relaxed">
            {branch.address}
          </p>
        </div>

        {/* Operating Hours */}
        <div className="mb-5 space-y-1">
          <div className="flex items-center text-xs font-bold text-slate-500 mb-1">
            <Clock className="w-3.5 h-3.5 text-[#00AEEF] mr-1.5" />
            OPERATING HOURS
          </div>
          {branch.hours.map((h, i) => (
            <div
              key={i}
              className="flex justify-between text-xs text-slate-600 font-medium py-0.5 border-b border-slate-100 last:border-none"
            >
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="space-y-2.5 pt-2">
        <div className="grid grid-cols-2 gap-2">
          {/* CALL BUTTON */}
          <a
            href={`tel:${branch.rawPhone}`}
            className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-[#251A76] hover:bg-[#1A1254] text-white text-xs font-extrabold shadow-sm transition"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-[#00AEEF]" />
            CALL NOW
          </a>

          {/* WHATSAPP BUTTON */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            WHATSAPP
          </a>
        </div>

        {/* GET DIRECTIONS BUTTON */}
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#251A76] text-xs font-extrabold border border-slate-200 transition"
        >
          <Navigation className="w-3.5 h-3.5 mr-2 text-[#00AEEF]" />
          GET DIRECTIONS ON MAP
        </a>

        {/* BRANCH BOOKING LINK */}
        <Link
          href={`/book?branch=${encodeURIComponent(branch.name)}`}
          className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] text-white text-xs font-black shadow-md shadow-cyan-500/20 transition"
        >
          BOOK AT {branch.name.toUpperCase()}
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Link>
      </div>
    </div>
  );
}
