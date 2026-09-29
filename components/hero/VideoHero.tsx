"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Phone,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Star,
  CheckCircle2,
  Wrench,
  Search,
} from "lucide-react";
import { SITE_CONFIG, getPhoneHref, getWhatsAppHref } from "@/config/site";

const HERO_VIDEOS = [
  "/videos/mixkit-close-up-shot-of-a-motorcycle-engine-in-a-workshop-41929-hd-ready.mp4",
  "/videos/mixkit-mechanic-pouring-oil-into-an-engine-41937-hd-ready.mp4",
  "/videos/a2b1e696aa.mp4",
];

export default function VideoHero() {
  // Start with the canonical order so server HTML == first client render
  // (avoids React hydration mismatch). Shuffled after mount below.
  const [playlist, setPlaylist] = useState<string[]>(HERO_VIDEOS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Deferred to a macrotask so it runs strictly after hydration and is not
    // a synchronous setState-in-effect.
    const id = window.setTimeout(() => {
      setPlaylist([...HERO_VIDEOS].sort(() => Math.random() - 0.5));
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [currentIndex, playlist]);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={playlist[currentIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
          poster="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1920"
          className="w-full h-full object-cover opacity-85 scale-100 transition-opacity duration-700"
        >
          <source src={playlist[currentIndex]} type="video/mp4" />
        </video>

        {/* Balanced Lighting Overlay for Clear Video Visibility + Crisp Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1254]/90 via-[#1A1254]/40 to-[#1A1254]/30" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Dual Location Pill */}
          <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/40 shadow-xl text-xs font-black text-[#251A76]">
            <MapPin className="w-3.5 h-3.5 text-[#00AEEF]" />
            <span className="text-[#00AEEF] font-black">CHITHODE</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#00AEEF] font-black">PERUNDURAI</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-bold">ERODE REGION</span>
          </div>

          {/* Main Brand Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-2xl">
            GEN B <span className="text-[#00AEEF]">BIKE CARE</span>
          </h1>

          <div className="text-lg sm:text-2xl font-black text-cyan-300 tracking-wider uppercase flex items-center justify-center space-x-2">
            <span className="w-8 h-0.5 bg-[#00AEEF] hidden sm:block" />
            <span>&ldquo;The Multi-Brand Bike Services&rdquo;</span>
            <span className="w-8 h-0.5 bg-[#00AEEF] hidden sm:block" />
          </div>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-md">
            Professional care for your motorcycle or gearless scooter, from routine maintenance to essential engine, brake, and electrical servicing.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4.5 rounded-2xl font-black text-base text-white bg-[#00AEEF] hover:bg-[#0099D4] shadow-xl shadow-cyan-500/30 active:scale-95 transition duration-200"
            >
              <Calendar className="w-5 h-5 mr-2.5" />
              BOOK A SERVICE
            </Link>

            <a
              href={getWhatsAppHref(SITE_CONFIG.branches[0].whatsapp, "Hi GEN B BIKE CARE, I would like to enquire about servicing my bike.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4.5 rounded-2xl font-extrabold text-base text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 shadow-xs transition"
            >
              <MessageSquare className="w-5 h-5 mr-2.5 text-emerald-600" />
              WHATSAPP US
            </a>
          </div>

          {/* Stat Badges Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-200 font-bold border-t border-white/10">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-[#00AEEF] mr-1.5" />
              2 Workshop Locations
            </div>
            <div className="flex items-center">
              <ShieldCheck className="w-4 h-4 text-[#00AEEF] mr-1.5" />
              Multi-Brand Service Center
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
