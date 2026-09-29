import React from "react";
import { Star, ExternalLink, ShieldCheck, Quote, MapPin } from "lucide-react";
import { getAllBranchReviews, type BranchReviews } from "@/lib/reviews";

function Stars({ rating, className = "w-4 h-4" }: { rating: number; className?: string }) {
  return (
    <div className="flex text-amber-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < Math.round(rating) ? "fill-current" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

function BranchReviewsCard({ branch }: { branch: BranchReviews }) {
  const isLive = branch.source === "google-live";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-lg flex flex-col">
      {/* Branch header: rating + count + Google link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center text-amber-600 shadow-xs">
            <span className="text-2xl font-black leading-none">
              {branch.rating ? branch.rating.toFixed(1) : "—"}
            </span>
            <Stars rating={branch.rating ?? 0} className="w-2.5 h-2.5 mt-0.5" />
          </div>
          <div>
            <div className="flex items-center text-xs font-bold text-[#251A76] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#00AEEF] mr-1" />
              {branch.branchName} Branch
            </div>
            <p className="text-xs text-slate-500">
              {branch.reviewCount != null ? (
                <>
                  <span className="font-bold text-slate-700">{branch.reviewCount}</span> Google
                  reviews
                </>
              ) : (
                <>Customer feedback</>
              )}
            </p>
            {isLive && (
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mt-1">
                <ShieldCheck className="w-3 h-3 mr-1" /> Live from Google
              </span>
            )}
          </div>
        </div>

        <a
          href={branch.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#251A76] hover:bg-[#1A1254] text-white text-xs font-bold shadow-md transition"
        >
          VIEW ON GOOGLE MAPS
          <ExternalLink className="w-3.5 h-3.5 ml-2 text-[#00AEEF]" />
        </a>
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 flex-1">
        {branch.reviews.slice(0, 4).map((rev) => (
          <div
            key={rev.id}
            className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {rev.profilePhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={rev.profilePhoto}
                      alt={rev.author}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#251A76] text-white text-[10px] font-black flex items-center justify-center">
                      {rev.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-extrabold text-[#251A76]">{rev.author}</span>
                </div>
                <Stars rating={rev.rating} className="w-3 h-3" />
              </div>
              <Quote className="w-5 h-5 text-purple-200 mb-1" />
              <p className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-4">
                {rev.text}
              </p>
            </div>
            <div className="pt-2 mt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-semibold">
              {rev.relativeTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ReviewsSection() {
  const branches = await getAllBranchReviews();

  return (
    <div className="space-y-8">
      {/* Google attribution (required when displaying Google content) */}
      <div className="flex justify-center items-center space-x-2 text-xs text-slate-500 font-semibold">
        <span>Powered by</span>
        {/* Google's own logo URL; kept as plain img — tiny asset, not worth a loader config */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://www.google.com/images/branding/googlelogo/2.0x/googlelogo_color_74x24dp.png"
          alt="Google"
          width={74}
          height={24}
          className="h-5 w-auto"
        />
        <span>Reviews</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {branches.map((b) => (
          <BranchReviewsCard key={b.branchId} branch={b} />
        ))}
      </div>
    </div>
  );
}
