import React from "react";
import BranchCard from "@/components/BranchCard";
import { MapPin, Navigation, Phone, MessageSquare, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Locations — GEN B BIKE CARE | Chithode & Perundurai Branches",
  description:
    "Find GEN B BIKE CARE workshop branches in Chithode (Nadupalayam) and Perundurai (near Anna Silai). Phone numbers, map directions & working hours.",
};

export default function LocationsPage() {
  return (
    <div className="bg-[#F8FAFC] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-purple-100 text-[#251A76] text-xs font-black uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#00AEEF]" /> WORKSHOP LOCATIONS
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#251A76] tracking-tight">
            OUR WORKSHOP BRANCHES
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            GEN B BIKE CARE operates from two convenient workshop locations in Erode district. Select your nearest branch for call, directions, or booking.
          </p>
        </div>

        {/* Dual Branch Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <BranchCard
            branch={{
              name: SITE_CONFIG.branches[0].name,
              subtitle: SITE_CONFIG.branches[0].shortAddress,
              address: SITE_CONFIG.branches[0].address,
              phone: SITE_CONFIG.branches[0].phone,
              rawPhone: SITE_CONFIG.branches[0].phoneRaw,
              whatsapp: SITE_CONFIG.branches[0].whatsapp,
              hours: SITE_CONFIG.branches[0].hours,
              mapUrl: SITE_CONFIG.branches[0].mapUrl,
            }}
          />

          <BranchCard
            branch={{
              name: SITE_CONFIG.branches[1].name,
              subtitle: SITE_CONFIG.branches[1].shortAddress,
              address: SITE_CONFIG.branches[1].address,
              phone: SITE_CONFIG.branches[1].phone,
              rawPhone: SITE_CONFIG.branches[1].phoneRaw,
              whatsapp: SITE_CONFIG.branches[1].whatsapp,
              hours: SITE_CONFIG.branches[1].hours,
              mapUrl: SITE_CONFIG.branches[1].mapUrl,
            }}
          />
        </div>

        {/* Local Area Information Note */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-slate-700 max-w-4xl mx-auto space-y-4">
          <h3 className="text-xl font-black text-[#251A76] flex items-center">
            <Navigation className="w-5 h-5 text-[#00AEEF] mr-2" />
            Serving the Erode & Perundurai Region
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            Whether you commute along Perundurai Road or live near Bhavani Road, our workshops provide multi-brand motorcycle service, periodic maintenance, and engine repairs with convenient access and fast turnarounds.
          </p>
        </div>
      </div>
    </div>
  );
}
