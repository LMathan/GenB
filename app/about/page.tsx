import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Wrench, Award, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us — GEN B BIKE CARE | Multi-Brand Bike Services",
  description:
    "Learn about GEN B BIKE CARE: Multi-brand two-wheeler workshop operating in Chithode and Perundurai, Erode. Focused on reliable service, transparent inspection & customer care.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00AEEF] text-xs font-black uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> ABOUT OUR WORKSHOP
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#251A76] tracking-tight">
            BUILT AROUND YOUR RIDE.
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            GEN B BIKE CARE was established with a singular mission: providing professional, transparent, multi-brand two-wheeler care for riders across the Erode region.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-lg mb-16 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-[#251A76]">
                The Multi-Brand Workshop Approach
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Rather than limiting bike servicing to a single manufacturer, GEN B BIKE CARE provides multi-brand mechanical service across commuter bikes, scooters, executive motorcycles, and performance two-wheelers.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Our workshop standards emphasize clear inspection, honest advice, and using quality lubricants and components for long-term motorcycle reliability.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-extrabold text-[#251A76] text-base">
                Our Workshop Core Pillars
              </h3>
              <ul className="space-y-3">
                {[
                  "Transparent Inspection & Pre-Service Customer Communication",
                  "Multi-Brand Tools & Diagnostic Equipment",
                  "Dedicated Branches in Chithode & Perundurai",
                  "Focus on Ride Safety & Long-Term Reliability",
                ].map((p, i) => (
                  <li key={i} className="flex items-start text-xs font-bold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#00AEEF] mr-2 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/book"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-[#00AEEF] hover:bg-[#0099D4] text-white font-black text-sm shadow-lg shadow-cyan-500/20 transition"
          >
            BOOK YOUR NEXT BIKE SERVICE
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
