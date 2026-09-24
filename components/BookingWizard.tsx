"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Bike,
  Wrench,
  User,
  Calendar as CalendarIcon,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Clock,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

const BRANDS = [
  "Honda",
  "TVS",
  "Yamaha",
  "Hero",
  "Royal Enfield",
  "Bajaj",
  "Suzuki",
  "KTM / Husqvarna",
  "Ather / EV",
  "Other Brand",
];

const SERVICES_LIST = [
  "Periodic Maintenance Service",
  "General Full Service",
  "Engine Overhaul / Diagnostic",
  "Brake Shoe / Disc Brake Service",
  "Electrical & Battery Checkup",
  "Chain & Sprocket Replacement",
  "Clutch Plate / Cable Service",
  "Suspension & Fork Oil Service",
  "Bike Cleaning & Detailing",
  "Custom Repair / Specific Problem",
];

export default function BookingWizard() {
  const searchParams = useSearchParams();

  // Wizard States
  const [step, setStep] = useState(1);
  const [branch, setBranch] = useState<"chithode" | "perundurai">("chithode");
  const [bikeBrand, setBikeBrand] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (9 AM - 12 PM)");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const initialBranch = searchParams?.get("branch")?.toLowerCase();
    if (initialBranch === "perundurai") {
      setBranch("perundurai");
    } else if (initialBranch === "chithode") {
      setBranch("chithode");
    }

    const initialIssue = searchParams?.get("issue");
    if (initialIssue) {
      setSelectedService(initialIssue);
    }
  }, [searchParams]);

  const targetBranchObj = SITE_CONFIG.branches.find((b) => b.id === branch) || SITE_CONFIG.branches[0];

  const handleNext = () => {
    if (step === 1 && !branch) return;
    if (step === 2 && (!bikeBrand || !bikeModel.trim())) return;
    if (step === 3 && !selectedService && !problemDescription.trim()) return;
    if (step === 4 && (!customerName.trim() || customerPhone.length < 10)) return;
    if (step === 5 && !preferredDate) return;

    if (step === 5) {
      setStep(6);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsappMessage = () => {
    const msg = `Hi GEN B BIKE CARE, I would like to book a service.

📍 Branch: ${branch}
🏍️ Bike: ${bikeBrand} ${bikeModel}
🔧 Service: ${selectedService || problemDescription}
👤 Name: ${customerName}
📞 Phone: ${customerPhone}
📅 Date: ${preferredDate}
⏰ Time: ${preferredTime}`;

    return `https://wa.me/${targetBranchObj.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Wizard Progress Bar Header */}
      <div className="bg-[#1A1254] text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-[#00AEEF] uppercase tracking-widest flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> ONLINE BOOKING REQUEST
            </span>
            <h2 className="text-2xl md:text-3xl font-black">BOOK A BIKE SERVICE</h2>
          </div>
          <div className="text-xs font-semibold text-slate-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            Step {submitted ? 6 : step} of 6
          </div>
        </div>

        {/* Step Indicator Bubbles */}
        {!submitted && (
          <div className="grid grid-cols-6 gap-2 pt-2 border-t border-white/10 text-center">
            {[
              { s: 1, name: "Branch" },
              { s: 2, name: "Bike" },
              { s: 3, name: "Service" },
              { s: 4, name: "Details" },
              { s: 5, name: "Schedule" },
              { s: 6, name: "Confirm" },
            ].map((st) => (
              <div key={st.s} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition ${
                    step === st.s
                      ? "bg-[#00AEEF] text-white ring-4 ring-[#00AEEF]/30"
                      : step > st.s
                      ? "bg-emerald-500 text-white"
                      : "bg-white/10 text-slate-400"
                  }`}
                >
                  {step > st.s ? "✓" : st.s}
                </div>
                <span className="text-[10px] font-medium text-slate-300 mt-1 hidden sm:block">
                  {st.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Wizard Form Body */}
      <div className="p-6 md:p-10">
        {!submitted ? (
          <div>
            {/* STEP 01 — SELECT LOCATION */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-[#251A76] mb-2 flex items-center">
                  <MapPin className="w-5 h-5 text-[#00AEEF] mr-2" />
                  STEP 01 — SELECT YOUR GEN B BRANCH
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Choose which workshop branch is most convenient for your service visit.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SITE_CONFIG.branches.map((b) => {
                    const selected = branch === b.id;
                    return (
                      <button
                        key={b.name}
                        type="button"
                        onClick={() => setBranch(b.id as any)}
                        className={`p-5 rounded-2xl text-left border transition duration-200 flex flex-col justify-between ${
                          selected
                            ? "border-[#00AEEF] bg-cyan-50/50 shadow-md ring-2 ring-[#00AEEF]"
                            : "border-slate-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-black text-[#251A76] text-lg">
                              {b.name} Branch
                            </span>
                            {selected && (
                              <CheckCircle2 className="w-5 h-5 text-[#00AEEF]" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mb-3">{b.shortAddress}</p>
                          <p className="text-xs font-semibold text-slate-500">
                            📞 {b.phone}
                          </p>
                          <p className="text-xs text-slate-400 mt-1 whitespace-pre-line">⏰ {b.shortHours}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 02 — BIKE DETAILS */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-[#251A76] mb-2 flex items-center">
                  <Bike className="w-5 h-5 text-[#00AEEF] mr-2" />
                  STEP 02 — TELL US ABOUT YOUR BIKE
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Select your motorcycle / scooter brand and enter model name.
                </p>

                <div className="mb-6">
                  <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-2">
                    Bike Brand
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {BRANDS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBikeBrand(b)}
                        className={`p-3 rounded-xl text-xs font-bold border text-center transition ${
                          bikeBrand === b
                            ? "bg-[#251A76] text-white border-[#251A76] shadow-sm"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-2">
                    Model & Registration / Spec (e.g. Activa 6G, Pulsar 220, Royal Enfield Classic 350)
                  </label>
                  <input
                    type="text"
                    value={bikeModel}
                    onChange={(e) => setBikeModel(e.target.value)}
                    placeholder="Enter your bike model..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>
              </div>
            )}

            {/* STEP 03 — SERVICE REQUIREMENT */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-[#251A76] mb-2 flex items-center">
                  <Wrench className="w-5 h-5 text-[#00AEEF] mr-2" />
                  STEP 03 — SERVICE REQUIREMENT
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Select the primary service needed or describe any specific issues.
                </p>

                <div className="mb-6">
                  <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-2">
                    Select Service Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES_LIST.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedService(s)}
                        className={`p-3 rounded-xl text-xs font-bold border text-left transition ${
                          selectedService === s
                            ? "bg-[#00AEEF] text-white border-[#00AEEF] shadow-sm"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-2">
                    Additional Problem Notes / Symptoms (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    placeholder="Describe any sounds, starting issues, mileage drop or specific requests..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>
              </div>
            )}

            {/* STEP 04 — CUSTOMER DETAILS */}
            {step === 4 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-[#251A76] mb-2 flex items-center">
                  <User className="w-5 h-5 text-[#00AEEF] mr-2" />
                  STEP 04 — CUSTOMER CONTACT DETAILS
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Please provide your contact information so our branch manager can confirm your service.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-1.5">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="10-digit mobile number (e.g. 9876543210)"
                      className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 05 — PREFERRED SCHEDULE */}
            {step === 5 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-[#251A76] mb-2 flex items-center">
                  <CalendarIcon className="w-5 h-5 text-[#00AEEF] mr-2" />
                  STEP 05 — PREFERRED SERVICE DATE & TIME
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Select when you plan to drop off or bring your bike to the workshop.
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-1.5">
                      Preferred Time Window
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    >
                      <option>Morning (9:00 AM - 12:00 PM)</option>
                      <option>Afternoon (12:00 PM - 4:00 PM)</option>
                      <option>Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 06 — SUMMARY CONFIRMATION */}
            {step === 6 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-[#251A76] mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                  STEP 06 — CONFIRM BOOKING REQUEST
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Review your booking summary before submitting to {branch} branch.
                </p>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6 space-y-3">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500">Selected Branch:</span>
                    <span className="text-xs font-black text-[#251A76]">{targetBranchObj.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500">Bike:</span>
                    <span className="text-xs font-black text-[#251A76]">
                      {bikeBrand} {bikeModel}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500">Service:</span>
                    <span className="text-xs font-black text-[#00AEEF]">
                      {selectedService || problemDescription}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500">Customer:</span>
                    <span className="text-xs font-black text-[#251A76]">
                      {customerName} ({customerPhone})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-slate-500">Schedule:</span>
                    <span className="text-xs font-black text-emerald-700">
                      {preferredDate} • {preferredTime}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-xl font-black text-white text-base bg-[#00AEEF] hover:bg-[#0099D4] shadow-lg shadow-cyan-500/25 transition"
                >
                  SUBMIT SERVICE REQUEST NOW
                </button>
              </div>
            )}

            {/* Navigation Buttons (Back & Continue) */}
            {step < 6 && (
              <div className="flex justify-between items-center pt-8 border-t border-slate-200 mt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center text-xs font-black text-white bg-[#251A76] hover:bg-[#1A1254] px-6 py-3 rounded-xl shadow-md transition"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-1.5 text-[#00AEEF]" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* SUBMITTED SUCCESS SCREEN */
          <div className="text-center py-8 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-[#251A76] mb-2">
              SERVICE REQUEST RECEIVED!
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6">
              Thank you, <span className="font-bold">{customerName}</span>. Your service booking request for <span className="font-bold">{bikeBrand} {bikeModel}</span> has been logged for our <span className="font-bold text-[#00AEEF]">{targetBranchObj.name} Branch</span>.
            </p>

            {/* Immediate Action Buttons */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-md mx-auto space-y-3 mb-6">
              <a
                href={generateWhatsappMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition"
              >
                <MessageSquare className="w-4.5 h-4.5 mr-2" />
                SEND BOOKING DETAILS TO WHATSAPP
              </a>

              <a
                href={`tel:${targetBranchObj.phoneRaw}`}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-[#251A76] hover:bg-[#1A1254] text-white font-extrabold text-xs transition"
              >
                <Phone className="w-4 h-4 mr-2 text-[#00AEEF]" />
                CALL {targetBranchObj.name.toUpperCase()} BRANCH NOW ({targetBranchObj.phone})
              </a>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
            >
              Book Another Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
