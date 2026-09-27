"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  Droplet,
  Wind,
  ShieldCheck,
  Bike,
  Sparkles,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  badgeBg: string;
  image: string;
  desc: string;
  points: string[];
  icon: React.ElementType;
}

const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: "oil-change",
    title: "Engine Oil Change & Flush",
    badge: "ESSENTIAL CARE",
    badgeBg: "bg-blue-600 text-white",
    image: "/services/oil_change.jpg",
    desc: "Complete engine oil drain, sludge flush, and refill with high-grade synthetic or mineral oil for smooth engine performance.",
    points: [
      "Engine oil flush & drain",
      "Oil filter cleaning / replacement",
      "Clutch & gear shift smoothing",
    ],
    icon: Droplet,
  },
  {
    id: "air-filter",
    title: "Air Filter Clean & Replace",
    badge: "FUEL MILEAGE BOOST",
    badgeBg: "bg-[#0066FF] text-white",
    image: "/services/air_filter.jpg",
    desc: "Clean intake box, remove trapped dust, and replace clogged air filter to restore optimal air-fuel ratio and mileage.",
    points: [
      "High-pressure dust blowout",
      "Carburetor / EFI intake check",
      "Spark plug gap inspection",
    ],
    icon: Wind,
  },
  {
    id: "brake-check",
    title: "Brake Shoe & Disc Inspection",
    badge: "SAFETY ESSENTIAL",
    badgeBg: "bg-rose-600 text-white",
    image: "/services/brake_service.jpg",
    desc: "Inspect front disc pads & rear drum shoes, flush old brake fluid, grease caliper pins, and adjust lever play.",
    points: [
      "Disc pad thickness & rotor check",
      "Brake shoe de-dusting & adjustment",
      "Hydraulic fluid top-up",
    ],
    icon: ShieldCheck,
  },
  {
    id: "chain-lube",
    title: "Chain Cleaning & High Lube",
    badge: "TRANSMISSION CARE",
    badgeBg: "bg-purple-600 text-white",
    image: "/services/chain_lube.jpg",
    desc: "Degrease road dirt & grime from drive chain, adjust chain slack to factory spec, and apply sticky high-temp lube.",
    points: [
      "Chain slack adjustment & alignment",
      "Ultrasonic degreasing wash",
      "High-viscosity chain lube spray",
    ],
    icon: Bike,
  },
  {
    id: "water-wash",
    title: "Pressure Water Wash & Polish",
    badge: "SHINE & DETAIL",
    badgeBg: "bg-emerald-600 text-white",
    image: "/services/water_wash.jpg",
    desc: "High-pressure water wash to remove underbody mud, snow-foam wash, tire dressing, and protective body wax polish.",
    points: [
      "High-pressure underbody rinse",
      "Foam wash & engine degrease",
      "Synthetic wax & shine polish",
    ],
    icon: Sparkles,
  },
  {
    id: "custom-requirements",
    title: "Custom Service & Diagnostics",
    badge: "TAILORED FIXES",
    badgeBg: "bg-[#251A76] text-white",
    image: "/services/custom_repair.jpg",
    desc: "Specific problem diagnosis for starting trouble, unusual engine clatter, wiring harness issues, or custom requests.",
    points: [
      "Detailed symptom diagnosis",
      "Electrical & battery voltage test",
      "Custom repair estimate & fix",
    ],
    icon: Search,
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle slider every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICE_ITEMS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Scroll active card into view when activeIndex changes
  useEffect(() => {
    if (containerRef.current) {
      const card = containerRef.current.children[activeIndex] as HTMLElement;
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SERVICE_ITEMS.length) % SERVICE_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SERVICE_ITEMS.length);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-purple-100 text-[#251A76] text-xs font-black uppercase tracking-wider mb-3 border border-purple-200">
              <Wrench className="w-3.5 h-3.5 mr-1.5 text-[#00AEEF]" /> WHAT WE DO IN BIKE SERVICE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#251A76] tracking-tight">
              COMPLETE BIKE MAINTENANCE & CARE
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
              Explore essential checks and specialized tasks performed in our workshop for every motorcycle & scooter.
            </p>
          </div>

          {/* Controls: Left / Right Arrows */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              aria-label="Previous service"
              className="p-3 rounded-full bg-white border border-slate-200 text-[#251A76] hover:bg-[#251A76] hover:text-white transition shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next service"
              className="p-3 rounded-full bg-white border border-slate-200 text-[#251A76] hover:bg-[#251A76] hover:text-white transition shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid Area */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          <div
            ref={containerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-none scroll-smooth pb-6 pt-2 snap-x snap-mandatory"
          >
            {SERVICE_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-[310px] sm:w-[360px] h-[520px] sm:h-[550px] shrink-0 snap-center rounded-3xl overflow-hidden relative flex flex-col justify-end p-6 sm:p-7 cursor-pointer group transition-all duration-500 ease-out transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 ${
                    isActive
                      ? "ring-4 ring-[#00AEEF] border-transparent scale-[1.02] shadow-2xl shadow-cyan-500/25"
                      : "border border-slate-800/80 hover:border-cyan-400 opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* 100% HEIGHT FULL CARD BACKGROUND IMAGE WITH SMOOTH ZOOM */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                  />

                  {/* FULL CARD DARK GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent group-hover:via-slate-950/65 transition-all duration-500" />

                  {/* CONTENT OVERLAY: TITLE, DESC, CHECKLIST, CTA BUTTON */}
                  <div className="relative z-10 space-y-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md leading-tight mb-2 group-hover:text-cyan-300 transition duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-2 pt-3 border-t border-white/15">
                      {item.points.map((pt, i) => (
                        <div key={i} className="flex items-start text-xs sm:text-sm font-semibold text-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pill CTA Button */}
                    <Link
                      href={`/book?issue=${encodeURIComponent(item.title)}`}
                      className="w-full flex items-center justify-center py-3.5 px-5 rounded-full bg-[#00AEEF] hover:bg-[#0099D4] text-white text-xs font-black tracking-wider shadow-lg shadow-cyan-500/30 group-hover:scale-[1.02] transition-all duration-300"
                    >
                      BOOK THIS SERVICE
                      <ArrowRight className="w-4 h-4 ml-2 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator Navigation */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            {SERVICE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-[#00AEEF]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
