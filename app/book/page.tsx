import React, { Suspense } from "react";
import BookingWizard from "@/components/BookingWizard";
import { Calendar } from "lucide-react";
import { canonicalFor } from "@/config/site";

export const metadata = {
  title: "Book a Service — GEN B BIKE CARE | Chithode & Perundurai",
  ...canonicalFor("/book"),
  description:
    "Book your motorcycle or scooter service online with GEN B BIKE CARE. Select Chithode or Perundurai branch, select your bike brand, and schedule your appointment.",
};

export default function BookPage() {
  return (
    <div className="bg-[#F8FAFC] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00AEEF] text-xs font-black uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 mr-1" /> ONLINE SERVICE SCHEDULER
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#251A76] tracking-tight">
            BOOK YOUR BIKE SERVICE
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Quick 3-step online service request for Chithode and Perundurai workshop locations.
            Your details are saved with a booking reference and WhatsApp opens ready to send.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12">Loading Service Booking Engine...</div>}>
          <BookingWizard />
        </Suspense>
      </div>
    </div>
  );
}
