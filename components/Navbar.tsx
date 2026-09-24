"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Calendar, Menu, X, ChevronRight, MessageSquare } from "lucide-react";

import { SITE_CONFIG, getPhoneHref } from "@/config/site";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeBranchModal, setActiveBranchModal] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Locations", href: "/locations" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Announcement & Location Bar */}
      <div className="bg-[#1A1254] text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-cyan-300 font-medium">
              <MapPin className="w-3.5 h-3.5 mr-1 text-[#00AEEF]" />
              CHITHODE & PERUNDURAI • ERODE REGION
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-200">The Multi-Brand Bike Services</span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href={getPhoneHref(SITE_CONFIG.branches[0].phoneRaw)}
              className="flex items-center hover:text-cyan-300 transition"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-[#00AEEF]" />
              {SITE_CONFIG.branches[0].name}: <span className="font-semibold ml-1">{SITE_CONFIG.branches[0].phone}</span>
            </a>
            <span className="text-gray-500">|</span>
            <a
              href={getPhoneHref(SITE_CONFIG.branches[1].phoneRaw)}
              className="flex items-center hover:text-cyan-300 transition"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-[#00AEEF]" />
              {SITE_CONFIG.branches[1].name}: <span className="font-semibold ml-1">{SITE_CONFIG.branches[1].phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <header className="sticky top-0 z-40 glass-nav shadow-xs border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Identity */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 rounded-lg bg-white p-1 shadow-xs border border-slate-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="GEN B BIKE CARE Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#251A76] leading-none group-hover:text-[#00AEEF] transition">
                  GEN B <span className="text-[#00AEEF]">BIKE CARE</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                  The Multi-Brand Bike Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                      active
                        ? "text-[#00AEEF] bg-[#E0F7FE] font-bold"
                        : "text-slate-700 hover:text-[#251A76] hover:bg-slate-100/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setActiveBranchModal(true)}
                className="flex items-center text-xs font-bold text-[#251A76] bg-purple-50 hover:bg-purple-100 border border-purple-200/70 px-3 py-2 rounded-lg transition"
              >
                <MapPin className="w-3.5 h-3.5 text-[#00AEEF] mr-1.5" />
                2 Branches
              </button>

              <Link
                href="/book"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-[#00AEEF] hover:bg-[#0099D4] shadow-md shadow-cyan-500/20 active:scale-98 transition duration-150"
              >
                <Calendar className="w-4 h-4 mr-2" />
                BOOK A SERVICE
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link
                href="/book"
                className="px-3 py-1.5 rounded-md text-xs font-bold text-white bg-[#00AEEF] shadow-xs"
              >
                BOOK
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#251A76]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#251A76]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold ${
                    isActive(link.href)
                      ? "text-[#00AEEF] bg-[#E0F7FE]"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>

            {/* Branch Quick Contacts Mobile Card */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 mb-4 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Direct Branch Call
              </div>
              <a
                href={getPhoneHref(SITE_CONFIG.branches[0].phoneRaw)}
                className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-sm font-bold text-[#251A76]"
              >
                <span className="flex items-center">
                  <Phone className="w-4 h-4 text-[#00AEEF] mr-2" />
                  {SITE_CONFIG.branches[0].name} Branch
                </span>
                <span className="text-xs text-[#00AEEF] bg-cyan-50 px-2 py-0.5 rounded">
                  Call Now
                </span>
              </a>
              <a
                href={getPhoneHref(SITE_CONFIG.branches[1].phoneRaw)}
                className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-sm font-bold text-[#251A76]"
              >
                <span className="flex items-center">
                  <Phone className="w-4 h-4 text-[#00AEEF] mr-2" />
                  {SITE_CONFIG.branches[1].name} Branch
                </span>
                <span className="text-xs text-[#00AEEF] bg-cyan-50 px-2 py-0.5 rounded">
                  Call Now
                </span>
              </a>
            </div>

            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl font-bold text-white bg-[#00AEEF] shadow-lg shadow-cyan-500/30"
            >
              <Calendar className="w-5 h-5 mr-2" />
              BOOK A SERVICE NOW
            </Link>
          </div>
        )}
      </header>

      {/* Branch Modal Overview */}
      {activeBranchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setActiveBranchModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-100 text-[#251A76]">
                <MapPin className="w-6 h-6 text-[#00AEEF]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#251A76]">
                  GEN B BIKE CARE Branches
                </h3>
                <p className="text-xs text-slate-500">
                  Two convenient workshop locations in Erode district
                </p>
              </div>
            </div>

            <div className="space-y-4 my-4">
              {SITE_CONFIG.branches.map((b) => (
                <div
                  key={b.name}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-purple-300 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-extrabold text-[#251A76] text-base">
                      {b.name} Branch
                    </h4>
                    <span className="text-[11px] font-bold text-[#00AEEF] bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">
                      Open Today
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                    {b.shortAddress}
                  </p>
                  <p className="text-xs font-medium text-slate-500 mb-3">
                    ⏰ {b.shortHours}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={getPhoneHref(b.phoneRaw)}
                      className="flex items-center justify-center py-2 px-3 rounded-lg bg-[#251A76] text-white text-xs font-bold hover:bg-[#1A1254] transition"
                    >
                      <Phone className="w-3.5 h-3.5 mr-1.5" /> Call {b.name}
                    </a>
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center py-2 px-3 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
                    >
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#00AEEF]" /> Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveBranchModal(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </>
  );
}
