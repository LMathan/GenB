import React from "react";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Zap,
  Activity,
  Gauge,
  Bike,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Services — GEN B BIKE CARE | Multi-Brand Bike Services",
  ...canonicalFor("/services"),
  description:
    "Explore complete bike services offered by GEN B BIKE CARE in Chithode and Perundurai: Periodic service, engine tuning, brake repairs, chain sprocket, electrical troubleshooting.",
};

import { SITE_CONFIG, getWhatsAppHref, canonicalFor } from "@/config/site";

export default function ServicesPage() {
  return (
    <div className="bg-[#F8FAFC] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00AEEF] text-xs font-black uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 mr-1" /> WORKSHOP CATALOG
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#251A76] tracking-tight">
            COMPLETE BIKE CARE SERVICES
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            From routine maintenance to essential mechanical repairs, explore our workshop services available at Chithode and Perundurai branches.
          </p>
        </div>

        {/* Detailed Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SITE_CONFIG.detailedServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-black text-[#00AEEF] bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                    {srv.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Chithode & Perundurai
                  </span>
                </div>

                <h2 className="text-xl font-black text-[#251A76] mb-3">
                  {srv.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                  {srv.desc}
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
                  <h4 className="text-xs font-extrabold text-[#251A76] uppercase tracking-wider mb-3">
                    Service Checklist Includes:
                  </h4>
                  <ul className="space-y-2">
                    {srv.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00AEEF] mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/book?issue=${encodeURIComponent(srv.title)}`}
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] text-white text-xs font-black shadow-md transition"
                >
                  BOOK {srv.title.toUpperCase()}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Enquiry Banner */}
        <div className="bg-gradient-to-r from-[#1A1254] to-[#251A76] text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black mb-2">
              Need a Custom Repair or Inspection?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Talk directly with our workshop managers at {SITE_CONFIG.branches[0].name} ({SITE_CONFIG.branches[0].phone}) or {SITE_CONFIG.branches[1].name} ({SITE_CONFIG.branches[1].phone}).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href={getWhatsAppHref(SITE_CONFIG.branches[0].whatsapp, "Hi GEN B BIKE CARE, I have a specific repair enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md transition"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WHATSAPP ENQUIRY
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] text-white font-black text-xs shadow-md transition"
            >
              BOOK WORKSHOP VISIT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
