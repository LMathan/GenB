import React from "react";
import GalleryGrid from "@/components/GalleryGrid";
import { Camera } from "lucide-react";

export const metadata = {
  title: "Workshop Gallery — GEN B BIKE CARE | Inside Our Workshop",
  description:
    "View photos of GEN B BIKE CARE workshop facilities, motorcycle servicing, diagnostic work, and completed customer bikes in Chithode and Perundurai.",
};

export default function GalleryPage() {
  return (
    <div className="bg-[#F8FAFC] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00AEEF] text-xs font-black uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 mr-1" /> PHOTO GALLERY
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#251A76] tracking-tight">
            INSIDE GEN B WORKSHOP
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Take a look inside our Chithode and Perundurai workshop bays, diagnostic setups, and completed customer motorcycle services.
          </p>
        </div>

        <GalleryGrid />
      </div>
    </div>
  );
}
