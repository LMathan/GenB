import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Phone,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Wrench,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Bike,
  Gauge,
  Zap,
  Activity,
  Award,
  ChevronRight,
  Star,
  Search,
} from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/Icons";
import { SITE_CONFIG, getPhoneHref, getWhatsAppHref } from "@/config/site";

import BranchCard from "@/components/BranchCard";
import BranchSwitcherTab from "@/components/BranchSwitcherTab";

import MultiBrandShowcase from "@/components/MultiBrandShowcase";
import GalleryGrid from "@/components/GalleryGrid";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import BookingWizard from "@/components/BookingWizard";
import VideoHero from "@/components/hero/VideoHero";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import ServicesSection from "@/components/ServicesSection";
import PopupPosterModal from "@/components/PopupPosterModal";

export const metadata = {
  title: "GEN B BIKE CARE — Multi-Brand Bike Service Center | Chithode & Perundurai",
  description:
    "GEN B BIKE CARE: Multi-brand bike service center near me in Chithode and Perundurai, Erode. Honda bike service, Hero bike service, Bajaj, TVS, Yamaha, Royal Enfield & chain cleaning.",
};

const SERVICES = [
  {
    title: "Periodic Maintenance Service",
    desc: "Scheduled oil change, air filter cleaning, spark plug inspection, brake adjustment, and complete safety checkup.",
    icon: Wrench,
    badge: "Most Popular",
    searchKey: "Bike Service Center",
  },
  {
    title: "General Full Service & Tuning",
    desc: "Comprehensive multi-point inspection, throttle cable lubrication, battery voltage check, and wash detailing.",
    icon: Activity,
    badge: "Comprehensive",
    searchKey: "Bike Service Centre",
  },
  {
    title: "Engine Diagnostics & Repair",
    desc: "Tappet noise fixing, valve clearance setting, oil leakage resolution, and performance engine tuning.",
    icon: Gauge,
    badge: "Specialized",
    searchKey: "Honda & Hero Engine Care",
  },
  {
    title: "Brake Shoe & Disc Brake Service",
    desc: "Disc brake pad replacement, brake shoe cleaning, fluid flush, and master cylinder servicing.",
    icon: ShieldCheck,
    badge: "Safety First",
    searchKey: "Brake Repair Center",
  },
  {
    title: "Electrical & Battery Care",
    desc: "Self-start troubleshooting, relay checkup, wiring harness inspection, and battery terminal cleaning.",
    icon: Zap,
    badge: "Quick Fix",
    searchKey: "Self Start & Battery",
  },
  {
    title: "Chain Cleaning & Sprocket Care",
    desc: "Chain slack adjustment, de-greasing, ultrasonic cleaning, and high-temperature chain lube application.",
    icon: Bike,
    badge: "Trending Query",
    searchKey: "How To Clean Bike Chain",
  },
];



const WHY_GEN_B = [
  {
    title: "Multi-Brand Service Center",
    desc: "Equipped to service motorcycles and gearless scooters across all major brands with precision tools.",
    icon: Wrench,
  },
  {
    title: "Transparent Inspection Process",
    desc: "We inspect your bike thoroughly and inform you about required work before servicing.",
    icon: ShieldCheck,
  },
  {
    title: "Two Convenient Locations",
    desc: "Easily accessible workshop branches in Chithode and Perundurai for quick service drops.",
    icon: MapPin,
  },
  {
    title: "Online Bike Service Booking",
    desc: "Built around your convenience with instant online booking requests and WhatsApp updates.",
    icon: Award,
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "BOOK ONLINE / WHATSAPP",
    desc: "Select your bike brand, service requirement, and preferred Chithode or Perundurai branch.",
  },
  {
    num: "02",
    title: "WORKSHOP INSPECTION",
    desc: "The bike is checked thoroughly to understand required service and maintenance work.",
  },
  {
    num: "03",
    title: "SERVICE & CHAIN CARE",
    desc: "Required service, oil flush, or chain cleaning is performed using quality tools.",
  },
  {
    num: "04",
    title: "READY TO RIDE",
    desc: "Customer is informed promptly when the bike passes quality checks and is ready for pickup.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#F8FAFC] text-slate-900 overflow-hidden">
      {/* 🎥 MODERN AUTOPLAYING VIDEO HERO SECTION */}
      <VideoHero />

      {/* QUICK ACTIONS ROW */}
      <section className="py-8 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/book"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 transition group flex items-center space-x-3 shadow-2xs"
            >
              <div className="p-3 rounded-xl bg-[#251A76] text-[#00AEEF] group-hover:bg-[#00AEEF] group-hover:text-white transition">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#251A76] text-sm group-hover:text-[#00AEEF]">
                  BOOK SERVICE
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Online booking app</p>
              </div>
            </Link>

            <a
              href={getWhatsAppHref(SITE_CONFIG.branches[0].whatsapp, "Hi GEN B BIKE CARE, I would like to enquire about servicing my bike.")}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 transition group flex items-center space-x-3 shadow-2xs"
            >
              <div className="p-3 rounded-xl bg-emerald-600 text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-emerald-900 text-sm">
                  WHATSAPP
                </h4>
                <p className="text-[11px] text-emerald-700 font-medium">Chat with workshop</p>
              </div>
            </a>

            <a
              href={getPhoneHref(SITE_CONFIG.branches[0].phoneRaw)}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 transition group flex items-center space-x-3 shadow-2xs"
            >
              <div className="p-3 rounded-xl bg-[#00AEEF] text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#251A76] text-sm group-hover:text-[#00AEEF]">
                  CALL NOW
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Speak with manager</p>
              </div>
            </a>

            <Link
              href="/locations"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 transition group flex items-center space-x-3 shadow-2xs"
            >
              <div className="p-3 rounded-xl bg-[#251A76] text-white">
                <MapPin className="w-5 h-5 text-[#00AEEF]" />
              </div>
              <div>
                <h4 className="font-extrabold text-[#251A76] text-sm group-hover:text-[#00AEEF]">
                  NEAR ME
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Chithode & Perundurai</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* DUAL BRANCH INTERACTIVE SWITCHER SECTION */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BranchSwitcherTab />
      </section>

      <InfiniteMarquee />

      {/* WHAT WE DO IN BIKE SERVICE - AUTO-CYCLING CAROUSEL */}
      <ServicesSection />



      {/* MULTI-BRAND SHOWCASE */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <MultiBrandShowcase />
      </section>

      {/* WHY GEN B */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#251A76]">
              WHY RIDERS CHOOSE GEN B
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Professional standards, transparent service approach, and customer care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_GEN_B.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-purple-300 transition"
                >
                  <div className="p-3 bg-[#251A76] text-[#00AEEF] rounded-xl w-fit mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black text-[#251A76] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICE PROCESS ("HOW IT WORKS") */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-black text-[#00AEEF] uppercase tracking-widest">
            WORKSHOP STEPS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#251A76] mt-1">
            HOW IT WORKS
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Simple 4-step workflow from service booking to riding back home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((ps) => (
            <div
              key={ps.num}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-black text-[#00AEEF] block mb-3">
                  {ps.num}
                </span>
                <h3 className="font-extrabold text-[#251A76] text-base mb-2">
                  {ps.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ps.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKSHOP GALLERY */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-xs font-black text-[#00AEEF] uppercase tracking-widest">
              OUR WORKSHOP & BIKES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#251A76] mt-1">
              INSIDE GEN B WORKSHOP
            </h2>
          </div>

          <GalleryGrid />
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReviewsSection />
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqSection />
        </div>
      </section>

      {/* INSTAGRAM WORKSHOP FEED */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-black text-[#00AEEF] uppercase tracking-widest flex items-center justify-center">
              <Instagram className="w-4 h-4 mr-1 text-[#00AEEF]" /> LIVE WORKSHOP UPDATES
            </span>
            <h2 className="text-3xl font-black text-[#251A76]">
              FROM THE GEN B WORKSHOP
            </h2>
            <p className="text-xs text-slate-600">
              See completed bike services, workshop updates and maintenance tips.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600",
            ].map((img, i) => (
              <div
                key={i}
                className="relative h-48 rounded-xl overflow-hidden border border-slate-200 group"
              >
                <Image
                  src={img}
                  alt="GEN B Instagram post"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>

          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3.5 rounded-xl bg-[#251A76] text-white text-xs font-bold shadow-md hover:bg-[#1A1254] transition"
          >
            <Instagram className="w-4 h-4 mr-2 text-[#00AEEF]" />
            VIEW WORKSHOP REELS & POSTS ON INSTAGRAM
          </a>
        </div>
      </section>

      {/* INTERACTIVE BOOKING WIZARD ENGINE */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-12 text-slate-500 font-bold">Loading Service Booking Engine...</div>}>
          <BookingWizard />
        </Suspense>
      </section>
      {/* POPUP OFFER POSTER MODAL ON WEBSITE OPEN */}
      <PopupPosterModal />
    </div>
  );
}
