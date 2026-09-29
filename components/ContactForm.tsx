"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG, getWhatsAppHref } from "@/config/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("chithode");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const selectedBranchData = SITE_CONFIG.branches.find(b => b.id === branch);
  const whatsappLink = selectedBranchData
    ? getWhatsAppHref(
        selectedBranchData.whatsapp,
        `Hi GEN B BIKE CARE (${selectedBranchData.name} Branch),\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`
      )
    : "";

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
      <h2 className="text-2xl font-black text-[#251A76] mb-2">
        SEND AN ENQUIRY
      </h2>
      <p className="text-xs text-slate-500 mb-6">
        Fill out the form below or chat directly on WhatsApp.
      </p>

      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="enquiry-branch" className="block text-xs font-extrabold text-[#251A76] uppercase mb-1">
              Select Branch
            </label>
            <select
              id="enquiry-branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
            >
              <option value="chithode">{SITE_CONFIG.branches[0].name} Branch ({SITE_CONFIG.branches[0].phone})</option>
              <option value="perundurai">{SITE_CONFIG.branches[1].name} Branch ({SITE_CONFIG.branches[1].phone})</option>
            </select>
          </div>

          <div>
            <label htmlFor="enquiry-name" className="block text-xs font-extrabold text-[#251A76] uppercase mb-1">
              Your Full Name *
            </label>
            <input
              id="enquiry-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
            />
          </div>

          <div>
            <label htmlFor="enquiry-phone" className="block text-xs font-extrabold text-[#251A76] uppercase mb-1">
              Phone Number *
            </label>
            <input
              id="enquiry-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your 10-digit mobile number..."
              className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
            />
          </div>

          <div>
            <label htmlFor="enquiry-message" className="block text-xs font-extrabold text-[#251A76] uppercase mb-1">
              Message / Question
            </label>
            <textarea
              id="enquiry-message"
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
            Click below to send your enquiry directly to our {selectedBranchData?.name} workshop manager via WhatsApp.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-md"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            SEND VIA WHATSAPP ({selectedBranchData?.name.toUpperCase()})
          </a>
        </div>
      )}
    </div>
  );
}
