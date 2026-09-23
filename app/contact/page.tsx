"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, MapPin, Mail, Send, CheckCircle2, Clock } from "lucide-react";
import BranchCard from "@/components/BranchCard";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("Chithode");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const whatsappLink = `https://wa.me/${
    branch === "Chithode" ? "919176099009" : "919176099119"
  }?text=${encodeURIComponent(
    `Hi GEN B BIKE CARE (${branch} Branch),\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`
  )}`;

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
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
            <h2 className="text-2xl font-black text-[#251A76] mb-2">
              SEND AN ENQUIRY
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the form below or chat directly on WhatsApp.
            </p>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-1">
                    Select Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  >
                    <option value="Chithode">Chithode Branch (+91 91760 99009)</option>
                    <option value="Perundurai">Perundurai Branch (+91 91760 99119)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your 10-digit mobile number..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-1">
                    Message / Question
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-black text-white text-sm bg-[#00AEEF] hover:bg-[#0099D4] shadow-md shadow-cyan-500/20 transition flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" /> SEND ENQUIRY NOW
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-xl font-black text-[#251A76] mb-2">
                  ENQUIRY READY TO DISPATCH
                </h3>
                <p className="text-xs text-slate-600 mb-6 max-w-sm mx-auto">
                  Click below to send your enquiry directly to our {branch} workshop manager via WhatsApp.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-md"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  SEND VIA WHATSAPP ({branch.toUpperCase()})
                </a>
              </div>
            )}
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
                  href="tel:+919176099009"
                  className="block p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
                >
                  <div className="text-xs font-bold text-cyan-300 uppercase">
                    CHITHODE BRANCH
                  </div>
                  <div className="text-lg font-black text-white">+91 91760 99009</div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Mon–Sat 9AM–8PM | Sun 10AM–2PM
                  </div>
                </a>

                <a
                  href="tel:+919176099119"
                  className="block p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
                >
                  <div className="text-xs font-bold text-cyan-300 uppercase">
                    PERUNDURAI BRANCH
                  </div>
                  <div className="text-lg font-black text-white">+91 91760 99119</div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Mon–Sat 9:00 AM – 7:30 PM
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
              name: "Chithode",
              subtitle: "Nadupalayam, Chithode",
              address:
                "36, Perundurai Road, Nadupalayam, Chithode, Erode, Tamil Nadu 638102",
              phone: "+91 91760 99009",
              rawPhone: "+919176099009",
              whatsapp: "919176099009",
              hours: [
                "Monday – Saturday: 9:00 AM – 8:00 PM",
                "Sunday: 10:00 AM – 2:00 PM",
              ],
              mapUrl: "https://maps.google.com/?q=Gen+B+Bike+Care+Chithode+Erode",
            }}
          />

          <BranchCard
            branch={{
              name: "Perundurai",
              subtitle: "Near Anna Silai, Perundurai",
              address:
                "Bhavani Road, 134/264, near Anna Silai, Perundurai, Karumandisellipalayam, Tamil Nadu 638052",
              phone: "+91 91760 99119",
              rawPhone: "+919176099119",
              whatsapp: "919176099119",
              hours: ["Monday – Saturday: 9:00 AM – 7:30 PM", "Sunday: Closed"],
              mapUrl: "https://maps.google.com/?q=Gen+B+Bike+Care+Perundurai",
            }}
          />
        </div>
      </div>
    </div>
  );
}
