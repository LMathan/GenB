"use client";

import React from "react";
import { Search } from "lucide-react";

const BIKE_BRANDS = [
  { name: "Yamaha", url: "https://cdn.simpleicons.org/yamahamotorcorporation/D31A2A" },
  { name: "TVS", url: "https://logos-world.net/wp-content/uploads/2022/12/TVS-Motor-Logo.png" },
  { name: "Honda", url: "/brands/honda.jpg" },
  { name: "Bajaj", url: "https://commons.wikimedia.org/wiki/Special:FilePath/Bajaj_Auto_logo.svg" },
  { name: "Hero", url: "/brands/hero.jpg" },
  { name: "Suzuki", url: "/brands/suzuki.jpg" },
  { name: "KTM", url: "https://cdn.simpleicons.org/ktm/FF6600" },
  { name: "Royal Enfield", url: "https://commons.wikimedia.org/wiki/Special:FilePath/Royal_Enfield_logo.svg" }
];

export default function InfiniteMarquee() {
  // We duplicate the array multiple times to ensure it covers wide screens.
  // The CSS animation will translate -50% of the entire flex container, creating a seamless loop.
  const duplicatedBrands = [...BIKE_BRANDS, ...BIKE_BRANDS, ...BIKE_BRANDS, ...BIKE_BRANDS];

  return (
    <section className="py-16 bg-white border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#251A76] text-xs font-black uppercase tracking-wider mb-3">
            <Search className="w-3.5 h-3.5 mr-1 text-[#00AEEF]" /> TOP SEARCHED BIKE BRANDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#251A76] tracking-tight mb-3">
            MULTI-BRAND BIKE SERVICE CENTER
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Dedicated service, genuine oil &amp; maintenance for India&apos;s leading motorcycle and scooter brands.
          </p>
        </div>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="flex overflow-hidden group w-full pb-8 relative">
        {/* Fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="flex items-center gap-16 md:gap-24 animate-marquee min-w-max pr-16 md:pr-24 group-hover:[animation-play-state:paused]">
          {duplicatedBrands.map((brand, i) => (
            <div key={i} className="flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300 w-32 md:w-48">
              <img 
                src={brand.url} 
                alt={`${brand.name} Logo`} 
                className={`w-auto object-contain mix-blend-multiply transition-all duration-300 ${
                  brand.name === 'Suzuki' || brand.name === 'Hero' 
                    ? 'max-h-20 md:max-h-28' 
                    : 'max-h-14 md:max-h-20'
                }`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden font-black text-2xl md:text-3xl text-slate-300 uppercase tracking-tight">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
