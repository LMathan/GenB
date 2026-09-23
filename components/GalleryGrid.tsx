"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Filter, ZoomIn, X, Wrench, ShieldCheck, Bike, Sparkles } from "lucide-react";

export interface GalleryItem {
  id: number;
  title: string;
  category: "workshop" | "services" | "bikes" | "team";
  categoryLabel: string;
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "GEN B Workshop Facility",
    category: "workshop",
    categoryLabel: "Workshop",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200",
    description: "Equipped workshop bays with pneumatic lifts and modern diagnostic tools.",
  },
  {
    id: 2,
    title: "Precision Engine Inspection",
    category: "services",
    categoryLabel: "Services",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1200",
    description: "Detailed engine tuning, valve clearance check, and fluid replacement.",
  },
  {
    id: 3,
    title: "Multi-Brand Service Work",
    category: "bikes",
    categoryLabel: "Bikes & Work",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1200",
    description: "Professional maintenance across commuter, scooter, and performance bikes.",
  },
  {
    id: 4,
    title: "Brake System Servicing",
    category: "services",
    categoryLabel: "Services",
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200",
    description: "Disc brake pad cleaning, caliper pin lubrication, and brake fluid flush.",
  },
  {
    id: 5,
    title: "Chain & Sprocket Alignment",
    category: "services",
    categoryLabel: "Services",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200",
    description: "Laser chain alignment, tension adjustment, and high-temp lube application.",
  },
  {
    id: 6,
    title: "Chithode & Perundurai Team",
    category: "team",
    categoryLabel: "Our Workshop",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200",
    description: "Dedicated motorcycle mechanics with multi-brand hands-on experience.",
  },
];

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: "all", label: "All Photos", icon: Camera },
          { id: "workshop", label: "Workshop Setup", icon: ShieldCheck },
          { id: "services", label: "Service Work", icon: Wrench },
          { id: "bikes", label: "Customer Bikes", icon: Bike },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold transition duration-150 ${
                active
                  ? "bg-[#251A76] text-white shadow-md shadow-purple-900/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 mr-1.5 ${active ? "text-[#00AEEF]" : "text-slate-400"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Responsive Masonry / Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImage(item)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer"
          >
            <div className="relative h-64 w-full overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1254]/90 via-[#1A1254]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold text-[#00AEEF] uppercase tracking-wider mb-1">
                  {item.categoryLabel}
                </span>
                <h4 className="font-extrabold text-base mb-1">{item.title}</h4>
                <p className="text-xs text-slate-200 line-clamp-2">{item.description}</p>
                <div className="mt-3 inline-flex items-center text-xs font-bold text-cyan-300">
                  <ZoomIn className="w-3.5 h-3.5 mr-1" /> View Full Image
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.categoryLabel}</p>
              </div>
              <span className="p-2 rounded-lg bg-slate-100 text-[#251A76] group-hover:bg-[#00AEEF] group-hover:text-white transition">
                <ZoomIn className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white bg-slate-900/60 hover:bg-slate-900 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src={lightboxImage.image}
                alt={lightboxImage.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 bg-white">
              <span className="text-xs font-black text-[#00AEEF] uppercase tracking-widest">
                {lightboxImage.categoryLabel}
              </span>
              <h3 className="text-xl font-black text-[#251A76] mt-1 mb-2">
                {lightboxImage.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {lightboxImage.description}
              </p>

              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-medium">
                  GEN B BIKE CARE — Chithode & Perundurai
                </span>
                <a
                  href="/book"
                  className="px-4 py-2 rounded-lg bg-[#00AEEF] text-white text-xs font-bold shadow-xs hover:bg-[#0099D4]"
                >
                  Book Service Visit
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
