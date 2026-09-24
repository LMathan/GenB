"use client";

import React from "react";
import { Bike, ShieldCheck, CheckCircle2, Zap, Wrench } from "lucide-react";

import { SITE_CONFIG } from "@/config/site";

export default function MultiBrandShowcase() {

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-lg">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00AEEF] text-xs font-black uppercase tracking-wider mb-2">
          <Wrench className="w-3.5 h-3.5 mr-1.5" /> THE MULTI-BRAND SPECIALISTS
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-[#251A76] tracking-tight mb-3">
          ONE WORKSHOP. MULTIPLE BRANDS.
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          Professional bike care tailored to the specific mechanical requirements of every two-wheeler brand in Tamil Nadu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SITE_CONFIG.brandCategories.map((cat, index) => (
          <div
            key={index}
            className={`p-5 rounded-2xl border ${cat.color} flex flex-col justify-between hover:shadow-md transition`}
          >
            <div>
              <div className="p-2.5 rounded-xl bg-white w-fit mb-3 shadow-xs border border-slate-200/50">
                <Bike className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <h3 className="font-extrabold text-base mb-2">{cat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{cat.desc}</p>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-slate-200/60">
              {cat.points.map((pt, i) => (
                <div key={i} className="flex items-center text-[11px] font-bold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AEEF] mr-1.5 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
