"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageSquare, ShieldCheck, ArrowUpRight } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/Icons";
import { Link001, Link002 } from "@/components/ui/skiper-ui/skiper40";
import { SITE_CONFIG, getPhoneHref } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[#1A1254] text-white pt-16 pb-24 md:pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Cyan Accent Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00AEEF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info & Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
                <Image
                  src="/logo.png"
                  alt="GEN B BIKE CARE Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white leading-none tracking-tight block">
                  GEN B <span className="text-[#00AEEF]">BIKE CARE</span>
                </span>
                <span className="text-[10px] text-cyan-300 font-semibold uppercase tracking-wider block mt-0.5">
                  The Multi-Brand Bike Services
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {SITE_CONFIG.description}
            </p>

            <div className="pt-2">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-bold text-cyan-300 hover:text-white bg-white/5 border border-white/10 px-3 py-2 rounded-lg transition"
              >
                <Instagram className="w-4 h-4 text-[#00AEEF]" />
                <span>Follow {SITE_CONFIG.name} on Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00AEEF] mb-4">
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-semibold">
              <li>
                <Link href="/" className="hover:text-[#00AEEF] transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00AEEF] transition">
                  Complete Bike Services
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-[#00AEEF] transition">
                  Chithode & Perundurai Branches
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00AEEF] transition">
                  About GEN B Workshop
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#00AEEF] transition">
                  Workshop Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#00AEEF] transition">
                  Verified Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-[#00AEEF] transition">
                  Book A Service Visit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00AEEF] transition">
                  Contact Workshop
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Branch 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[#00AEEF]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.branches[0].name.toUpperCase()} BRANCH</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {SITE_CONFIG.branches[0].address}
            </p>
            <div className="text-xs space-y-1">
              <a
                href={getPhoneHref(SITE_CONFIG.branches[0].phoneRaw)}
                className="flex items-center text-white hover:text-cyan-300 font-bold transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#00AEEF] mr-1.5" />
                {SITE_CONFIG.branches[0].phone}
              </a>
              <p className="text-slate-400 text-[11px] whitespace-pre-line">
                {SITE_CONFIG.branches[0].hours.join("\n")}
              </p>
            </div>
          </div>

          {/* Column 4: Branch 2 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[#00AEEF]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.branches[1].name.toUpperCase()} BRANCH</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {SITE_CONFIG.branches[1].address}
            </p>
            <div className="text-xs space-y-1">
              <a
                href={getPhoneHref(SITE_CONFIG.branches[1].phoneRaw)}
                className="flex items-center text-white hover:text-cyan-300 font-bold transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#00AEEF] mr-1.5" />
                {SITE_CONFIG.branches[1].phone}
              </a>
              <p className="text-slate-400 text-[11px] whitespace-pre-line">
                {SITE_CONFIG.branches[1].hours.join("\n")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} GEN B BIKE CARE. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-500">The Multi-Brand Bike Services</span>
            <span className="text-slate-600">•</span>
            <Link href="/locations" className="hover:text-cyan-300 transition">
              Chithode & Perundurai
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
