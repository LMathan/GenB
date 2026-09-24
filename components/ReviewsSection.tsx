"use client";

import React from "react";
import { Star, ExternalLink, ShieldCheck, Quote, ThumbsUp } from "lucide-react";

import { SITE_CONFIG } from "@/config/site";

export default function ReviewsSection() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-lg relative overflow-hidden">
      {/* Top Banner with Google Rating */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center text-amber-600 shadow-xs">
            <span className="text-2xl font-black leading-none">5.0</span>
            <div className="flex text-amber-400 mt-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-current" />
              ))}
            </div>
          </div>

          <div>
            <div className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              GOOGLE BUSINESS VERIFIED RATING
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[#251A76]">
              RIDERS TRUST GEN B
            </h3>
            <p className="text-xs text-slate-500">
              Chithode Branch: <span className="font-bold text-slate-700">5.0 ★ Star Rating</span> (4 Verified Customer Reviews)
            </p>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=Gen+B+Bike+Care+Chithode+Erode"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-3 rounded-xl bg-[#251A76] hover:bg-[#1A1254] text-white text-xs font-bold shadow-md transition"
        >
          VIEW GOOGLE REVIEWS
          <ExternalLink className="w-3.5 h-3.5 ml-2 text-[#00AEEF]" />
        </a>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        {SITE_CONFIG.reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between hover:border-purple-200 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-[#00AEEF] bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">
                  {rev.branch}
                </span>
              </div>

              <Quote className="w-6 h-6 text-purple-200 mb-2" />
              <p className="text-xs text-slate-700 font-medium leading-relaxed mb-4 italic">
                &quot;{rev.text}&quot;
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 flex justify-between items-center text-[11px]">
              <span className="font-extrabold text-[#251A76]">{rev.author}</span>
              <span className="text-slate-400">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
