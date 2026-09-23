import React from "react";
import ReviewsSection from "@/components/ReviewsSection";
import { Star } from "lucide-react";

export const metadata = {
  title: "Reviews & Ratings — GEN B BIKE CARE | Customer Feedback",
  description:
    "Read customer reviews for GEN B BIKE CARE Chithode & Perundurai branches. 5.0 Star Google Business verified ratings.",
};

export default function ReviewsPage() {
  return (
    <div className="bg-[#F8FAFC] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-black uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 mr-1 fill-current" /> VERIFIED REVIEWS
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#251A76] tracking-tight">
            RIDERS TRUST GEN B
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Read authentic feedback from motorcycle owners serviced at our Chithode and Perundurai workshop locations.
          </p>
        </div>

        <ReviewsSection />
      </div>
    </div>
  );
}
