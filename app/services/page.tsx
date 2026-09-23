import React from "react";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Zap,
  Activity,
  Gauge,
  Bike,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Services — GEN B BIKE CARE | Multi-Brand Bike Services",
  description:
    "Explore complete bike services offered by GEN B BIKE CARE in Chithode and Perundurai: Periodic service, engine tuning, brake repairs, chain sprocket, electrical troubleshooting.",
};

const DETAILED_SERVICES = [
  {
    id: "periodic",
    title: "Periodic Maintenance Service",
    desc: "Recommended every 2,500km – 3,000km to maintain engine health, smooth gear shifts, and optimal fuel efficiency.",
    checklist: [
      "Engine oil check & flush replacement",
      "Air filter cleaning or filter replacement",
      "Spark plug cleaning & gap adjustment",
      "Brake shoe / pad inspection & adjustment",
      "Throttle & clutch cable lubrication",
      "Battery terminal voltage & charging check",
      "Tire pressure & tread depth check",
      "General wash & lube application",
    ],
    badge: "Popular Service",
  },
  {
    id: "general",
    title: "General Full Service & Inspection",
    desc: "A thorough top-to-bottom multi-point checkup for bikes that haven't been serviced in a while.",
    checklist: [
      "Complete multi-point vehicle inspection",
      "Carburetor cleaning / EFI throttle body check",
      "Drive chain adjustment & spray lube",
      "Front & rear brake cleaning",
      "Wheel bearing & steering head check",
      "Electrical switch & horn operation check",
      "Water wash & shine polish",
    ],
    badge: "Comprehensive",
  },
  {
    id: "engine",
    title: "Engine Diagnostics & Tappet Service",
    desc: "Specialized mechanical service to fix engine noise, knocking, low compression, or excessive heating.",
    checklist: [
      "Tappet / valve clearance measurement & setting",
      "Piston & cylinder compression test",
      "Engine gasket & oil seal leak fix",
      "Coolant level & radiator inspection",
      "Exhaust carbon cleaning",
      "Engine oil pressure verification",
    ],
    badge: "Specialized",
  },
  {
    id: "brake",
    title: "Brake Shoe & Disc Brake Service",
    desc: "Essential safety service to ensure firm lever feel, squeal-free braking, and maximum stopping power.",
    checklist: [
      "Disc brake pad thickness measurement",
      "Brake caliper pin lubrication",
      "Brake fluid flush & hydraulic bleeding",
      "Rear brake drum de-dusting & shoe adjustment",
      "Brake lever pivot greasing",
    ],
    badge: "Safety Essential",
  },
  {
    id: "electrical",
    title: "Electrical & Battery Diagnostics",
    desc: "Fixing self-start failure, dim headlamps, blown fuses, and battery discharge issues.",
    checklist: [
      "Battery voltage & load test",
      "Self-starter motor & relay check",
      "Alternator & RR unit charging test",
      "Wiring harness continuity inspection",
      "Indicator & brake light bulb replacement",
    ],
    badge: "Quick Fix",
  },
  {
    id: "chain",
    title: "Chain & Sprocket Maintenance",
    desc: "Prevents chain snapping, gear jumping, and harsh power transmission noise.",
    checklist: [
      "Chain slack measurement & alignment",
      "Ultrasonic / spray chain degreasing",
      "Sprocket teeth wear inspection",
      "High-viscosity chain lube application",
    ],
    badge: "Transmission",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#F8FAFC] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#00AEEF] text-xs font-black uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 mr-1" /> WORKSHOP CATALOG
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#251A76] tracking-tight">
            COMPLETE BIKE CARE SERVICES
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            From routine maintenance to essential mechanical repairs, explore our workshop services available at Chithode and Perundurai branches.
          </p>
        </div>

        {/* Detailed Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {DETAILED_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-black text-[#00AEEF] bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                    {srv.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Chithode & Perundurai
                  </span>
                </div>

                <h2 className="text-xl font-black text-[#251A76] mb-3">
                  {srv.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                  {srv.desc}
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
                  <h4 className="text-xs font-extrabold text-[#251A76] uppercase tracking-wider mb-3">
                    Service Checklist Includes:
                  </h4>
                  <ul className="space-y-2">
                    {srv.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00AEEF] mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/book?issue=${encodeURIComponent(srv.title)}`}
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] text-white text-xs font-black shadow-md transition"
                >
                  BOOK {srv.title.toUpperCase()}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Enquiry Banner */}
        <div className="bg-gradient-to-r from-[#1A1254] to-[#251A76] text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black mb-2">
              Need a Custom Repair or Inspection?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Talk directly with our workshop managers at Chithode (+91 91760 99009) or Perundurai (+91 91760 99119).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/919176099009?text=Hi%20GEN%20B%20BIKE%20CARE%2C%20I%20have%20a%20specific%20repair%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md transition"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WHATSAPP ENQUIRY
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#00AEEF] hover:bg-[#0099D4] text-white font-black text-xs shadow-md transition"
            >
              BOOK WORKSHOP VISIT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
