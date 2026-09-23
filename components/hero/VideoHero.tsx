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

const HERO_VIDEOS = [
  "/videos/mixkit-close-up-shot-of-a-motorcycle-engine-in-a-workshop-41929-hd-ready.mp4",
  "/videos/mixkit-mechanic-pouring-oil-into-an-engine-41937-hd-ready.mp4",
  "/videos/a2b1e696aa.mp4",
];

export default function VideoHero() {
  const [playlist, setPlaylist] = useState<string[]>(HERO_VIDEOS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Randomly shuffle playlist order on client mount
  useEffect(() => {
    const shuffled = [...HERO_VIDEOS].sort(() => Math.random() - 0.5);
    setPlaylist(shuffled);
    setCurrentIndex(0);
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 space-y-6">
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

            <div className="text-lg sm:text-2xl font-black text-cyan-300 tracking-wider uppercase flex items-center justify-center lg:justify-start space-x-2">
              <span className="w-8 h-0.5 bg-[#00AEEF] hidden sm:block" />
              <span>&ldquo;The Multi-Brand Bike Services&rdquo;</span>
            </div>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium drop-shadow-md">
              Professional care for your motorcycle or gearless scooter, from routine maintenance to essential engine, brake, and electrical servicing.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4.5 rounded-2xl font-black text-base text-white bg-[#00AEEF] hover:bg-[#0099D4] shadow-xl shadow-cyan-500/30 active:scale-95 transition duration-200"
              >
                <Calendar className="w-5 h-5 mr-2.5" />
                BOOK A SERVICE
              </Link>

              <a
                href="https://wa.me/919176099009?text=Hi%20GEN%20B%20BIKE%20CARE%2C%20I%20would%20like%20to%20enquire%20about%20servicing%20my%20bike."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4.5 rounded-2xl font-extrabold text-base text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 shadow-xs transition"
              >
                <MessageSquare className="w-5 h-5 mr-2.5 text-emerald-600" />
                WHATSAPP US
              </a>
            </div>

            {/* Stat Badges Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-200 font-bold border-t border-white/10">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-400 fill-current mr-1.5" />
                5.0 ★ Google Rating (Chithode)
              </div>
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

          {/* Right Workshop Card Preview */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-white/10 backdrop-blur-md p-6 space-y-4 text-left text-white border border-white/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-cyan-300 uppercase tracking-wider">
                  WORKSHOP DIRECTORY
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                  Open Today
                </span>
              </div>

              <div className="space-y-3">
                <a
                  href="tel:+919176099009"
                  className="block p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
                >
                  <div className="text-[11px] font-extrabold text-cyan-300 uppercase">
                    Chithode Branch
                  </div>
                  <div className="text-base font-black text-white">+91 91760 99009</div>
                  <div className="text-[10px] text-slate-300">
                    36, Perundurai Road, Nadupalayam
                  </div>
                </a>

                <a
                  href="tel:+919176099119"
                  className="block p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
                >
                  <div className="text-[11px] font-extrabold text-cyan-300 uppercase">
                    Perundurai Branch
                  </div>
                  <div className="text-base font-black text-white">+91 91760 99119</div>
                  <div className="text-[10px] text-slate-300">
                    Bhavani Road, near Anna Silai
                  </div>
                </a>
              </div>

              <Link
                href="/locations"
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] text-white font-black text-xs shadow-md transition"
              >
                VIEW FULL BRANCH DETAILS & MAPS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
