"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, MessageSquare, Calendar, Sparkles, CheckCircle2, Tag, Gift, Wrench } from "lucide-react";
import { SITE_CONFIG, getWhatsAppHref } from "@/config/site";

const POPUP_SEEN_KEY = "gb_popup_seen";

export default function PopupPosterModal() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // Show the offer popup once per browser session (not on every page load)
    try {
      if (sessionStorage.getItem(POPUP_SEEN_KEY) === "1") return;
    } catch {
      // sessionStorage unavailable (private mode etc.) — still show once
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      try {
        sessionStorage.setItem(POPUP_SEEN_KEY, "1");
      } catch {
        // ignore
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const whatsappOfferUrl = getWhatsAppHref(
    SITE_CONFIG.branches[0].whatsapp,
    "Hi GEN B BIKE CARE, I would like to claim the Special Bike Service Offer @ ₹999!"
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Special service offer"
    >
      {/* Dark Blur Backdrop */}
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
      />

      {/* Neat & Simple Professional Offer Poster Card */}
      <div className="relative w-full max-w-[360px] sm:max-w-md bg-gradient-to-b from-[#18114C] via-[#1A1254] to-[#0E0933] text-white rounded-3xl overflow-hidden shadow-2xl border border-cyan-400/30 z-10 flex flex-col animate-scaleUp">
        {/* Top Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close offer popup"
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition flex items-center justify-center border border-white/20 shadow-md group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Poster Header */}
        <div className="p-6 sm:p-7 text-center border-b border-white/10 relative overflow-hidden">
          {/* Subtle Glow Circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#00AEEF]/20 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[#00AEEF] text-[11px] font-black uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> SPECIAL SERVICE OFFER
          </span>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
            GEN B <span className="text-[#00AEEF]">BIKE CARE</span>
          </h2>
          <p className="text-xs text-slate-300 font-semibold tracking-wide uppercase">
            Chithode & Perundurai Branches
          </p>
        </div>

        {/* Offer Details Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Main Pricing Box */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
              LIMITED TIME FESTIVE PACKAGE
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              ₹999 <span className="text-xs font-normal text-slate-300 line-through">₹1,499</span>
            </div>
            <p className="text-xs font-extrabold text-cyan-300 mt-0.5">
              Complete Periodic Bike Service
            </p>
          </div>

          {/* Checklist Benefits */}
          <div className="space-y-3 pt-1">
            {[
              { text: "Engine Oil Flush & Drain Inspection", icon: Wrench },
              { text: "FREE Water Foam Wash & Polish Detailing", icon: Gift },
              { text: "15% OFF on Genuine Spare Parts & Lubricants", icon: Tag },
              { text: "Full Battery, Electrical & Safety Diagnostics", icon: CheckCircle2 },
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div key={index} className="flex items-center text-xs sm:text-sm font-semibold text-slate-200">
                  <div className="w-6 h-6 rounded-lg bg-[#00AEEF]/20 text-[#00AEEF] flex items-center justify-center mr-3 shrink-0">
                    <ItemIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-5 bg-slate-950/60 border-t border-white/10 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={whatsappOfferUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeModal}
              className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs shadow-lg transition"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              CLAIM ON WHATSAPP
            </a>

            <Link
              href="/book"
              onClick={closeModal}
              className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] active:scale-95 text-white font-black text-xs shadow-lg transition"
            >
              <Calendar className="w-4 h-4 mr-2" />
              BOOK ONLINE NOW
            </Link>
          </div>

          <button
            onClick={closeModal}
            className="w-full text-center text-xs font-bold text-slate-400 hover:text-white transition pt-1"
          >
            Skip & Continue to Website ✕
          </button>
        </div>
      </div>
    </div>
  );
}
