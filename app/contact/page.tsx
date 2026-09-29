import React from "react";
import ContactForm from "@/components/ContactForm";
import BranchCard from "@/components/BranchCard";
import { Phone, MapPin } from "lucide-react";
import { SITE_CONFIG, getPhoneHref, canonicalFor } from "@/config/site";

export const metadata = {
  title: "Contact — GEN B BIKE CARE | Chithode & Perundurai",
  description:
    "Contact GEN B BIKE CARE in Chithode or Perundurai for bike service enquiries. Phone numbers, WhatsApp, addresses & working hours for both workshop branches.",
  ...canonicalFor("/contact"),
};

export default function ContactPage() {
  return (
    <div className="bg-[#F8FAFC] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-purple-100 text-[#251A76] text-xs font-black uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5 mr-1 text-[#00AEEF]" /> CONTACT WORKSHOP
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#251A76] tracking-tight">
            GET IN TOUCH WITH GEN B
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Have a question about bike servicing, parts, or location directions? Contact our Chithode or Perundurai branch directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left: General Enquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right: Quick Direct Call Pills */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1A1254] text-white p-6 rounded-3xl border border-purple-500/20 shadow-xl space-y-4">
              <h3 className="text-lg font-black flex items-center text-white">
                <Phone className="w-5 h-5 text-[#00AEEF] mr-2" />
                DIRECT BRANCH DIALERS
              </h3>
              <p className="text-xs text-slate-300">
                Call our workshop managers during operating hours:
              </p>

              <div className="space-y-3">
                <a
                  href={getPhoneHref(SITE_CONFIG.branches[0].phoneRaw)}
                  className="block p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
                >
                  <div className="text-xs font-bold text-cyan-300 uppercase">
                    {SITE_CONFIG.branches[0].name.toUpperCase()} BRANCH
                  </div>
                  <div className="text-lg font-black text-white">{SITE_CONFIG.branches[0].phone}</div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    {SITE_CONFIG.branches[0].shortHours}
                  </div>
                </a>

                <a
                  href={getPhoneHref(SITE_CONFIG.branches[1].phoneRaw)}
                  className="block p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
                >
                  <div className="text-xs font-bold text-cyan-300 uppercase">
                    {SITE_CONFIG.branches[1].name.toUpperCase()} BRANCH
                  </div>
                  <div className="text-lg font-black text-white">{SITE_CONFIG.branches[1].phone}</div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    {SITE_CONFIG.branches[1].shortHours}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Branch Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BranchCard
            branch={{
              name: SITE_CONFIG.branches[0].name,
              subtitle: SITE_CONFIG.branches[0].shortAddress,
              address: SITE_CONFIG.branches[0].address,
              phone: SITE_CONFIG.branches[0].phone,
              rawPhone: SITE_CONFIG.branches[0].phoneRaw,
              whatsapp: SITE_CONFIG.branches[0].whatsapp,
              hours: SITE_CONFIG.branches[0].hours,
              mapUrl: SITE_CONFIG.branches[0].mapUrl,
            }}
          />

          <BranchCard
            branch={{
              name: SITE_CONFIG.branches[1].name,
              subtitle: SITE_CONFIG.branches[1].shortAddress,
              address: SITE_CONFIG.branches[1].address,
              phone: SITE_CONFIG.branches[1].phone,
              rawPhone: SITE_CONFIG.branches[1].phoneRaw,
              whatsapp: SITE_CONFIG.branches[1].whatsapp,
              hours: SITE_CONFIG.branches[1].hours,
              mapUrl: SITE_CONFIG.branches[1].mapUrl,
            }}
          />
        </div>
      </div>
    </div>
  );
}
