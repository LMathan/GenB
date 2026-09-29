"use client";

import React, { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Wrench,
  User,
  Calendar as CalendarIcon,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  ClipboardList,
} from "lucide-react";
import { SITE_CONFIG, getPhoneHref } from "@/config/site";
import { saveBooking, type SaveBookingResult } from "@/app/actions/booking";
import { buildBookingMessage } from "@/lib/whatsapp";

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

// Deep links from other pages (/book?issue=...) use their own wording.
// Map the known ones onto the wizard's service list so the right card is
// pre-selected; unknown values fall back to "Custom Repair" + notes.
const ISSUE_ALIASES: Record<string, string> = {
  "Engine Oil Change & Flush": "Periodic Maintenance Service",
  "Air Filter Clean & Replace": "Periodic Maintenance Service",
  "Brake Shoe & Disc Inspection": "Brake Shoe / Disc Brake Service",
  "Brake Shoe & Disc Brake Service": "Brake Shoe / Disc Brake Service",
  "Chain Cleaning & High Lube": "Chain & Sprocket Replacement",
  "Chain & Sprocket Maintenance": "Chain & Sprocket Replacement",
  "General Full Service & Inspection": "General Full Service",
  "Engine Diagnostics & Tappet Service": "Engine Overhaul / Diagnostic",
  "Electrical & Battery Diagnostics": "Electrical & Battery Checkup",
  "Pressure Water Wash & Polish": "Bike Cleaning & Detailing",
  "Custom Service & Diagnostics": "Custom Repair / Specific Problem",
};

const TIME_WINDOWS = [
  "Morning (9:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 4:00 PM)",
  "Evening (4:00 PM - 7:00 PM)",
];

const INITIAL_ACTION_STATE: SaveBookingResult = {
  ok: false,
  reference: "",
  saved: false,
  skipped: true,
  whatsappUrl: "",
};

export default function BookingWizard() {
  // Keyed remount so "Book Another Service" resets EVERYTHING (fields, step,
  // and the useActionState result) without effects or manual mirroring.
  const [wizardKey, setWizardKey] = useState(0);
  return <WizardForm key={wizardKey} onBookAnother={() => setWizardKey((k) => k + 1)} />;
}

function WizardForm({ onBookAnother }: { onBookAnother: () => void }) {
  const searchParams = useSearchParams();

  // Deep-link init happens in lazy state initializers (no mount effect needed:
  // this component renders inside <Suspense>, so there is no SSR HTML to
  // hydrate-mismatch against).
  const resolveIssue = () => {
    const issue = searchParams?.get("issue")?.trim();
    if (!issue) return { service: "", notes: "" };
    if (SERVICES_LIST.includes(issue)) return { service: issue, notes: "" };
    if (ISSUE_ALIASES[issue]) return { service: ISSUE_ALIASES[issue], notes: "" };
    return { service: "Custom Repair / Specific Problem", notes: issue };
  };

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [stepError, setStepError] = useState<string | null>(null);

  const [branch, setBranch] = useState<"chithode" | "perundurai">(() => {
    const b = searchParams?.get("branch")?.toLowerCase().trim();
    if (b === "perundurai") return "perundurai";
    if (b === "chithode") return "chithode";
    return "chithode";
  });
  const [bikeBrand, setBikeBrand] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [service, setService] = useState(() => resolveIssue().service);
  const [problemNotes, setProblemNotes] = useState(() => resolveIssue().notes);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState(TIME_WINDOWS[0]);
  const [needPickup, setNeedPickup] = useState(false);
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupContact, setPickupContact] = useState("");
  const [pickupNotes, setPickupNotes] = useState("");

  const [actionState, formAction, isPending] = useActionState(
    saveBooking,
    INITIAL_ACTION_STATE
  );

  const branchObj =
    SITE_CONFIG.branches.find((b) => b.id === branch) ?? SITE_CONFIG.branches[0];

  // Auto-open WhatsApp as soon as the server responds with the booking URL.
  // (If a popup blocker stops it, the big WhatsApp button on the success
  // screen is the guaranteed fallback.)
  const openedForRef = useRef<string | null>(null);
  useEffect(() => {
    if (actionState.ok && actionState.whatsappUrl && openedForRef.current !== actionState.reference) {
      openedForRef.current = actionState.reference;
      window.open(actionState.whatsappUrl, "_blank");
    }
  }, [actionState]);

  // Local-date "today" for the date input min (avoids the UTC/IST off-by-one).
  const todayLocal = useMemo(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split("T")[0];
  }, []);

  // ---- Step validation with VISIBLE errors --------------------------------
  const stepErrorFor = (s: 1 | 2 | 3): string | null => {
    if (s === 1) {
      if (!bikeBrand) return "Please select your bike brand.";
      if (!bikeModel.trim()) return "Please enter your bike model (e.g. Activa 6G, Pulsar 220).";
      return null;
    }
    if (s === 2) {
      if (!service && !problemNotes.trim())
        return "Select a service category or describe the problem in the notes.";
      if (!preferredDate) return "Please choose your preferred service date.";
      if (needPickup && !pickupAddress.trim())
        return "Please enter the pickup address (required for doorstep pickup).";
      return null;
    }
    return null; // Step 3 uses native required fields + server-side validation.
  };

  const goToNextStep = () => {
    const err = stepErrorFor(step);
    if (err) {
      setStepError(err);
      return;
    }
    setStepError(null);
    setStep((s) => (s === 3 ? 3 : ((s + 1) as 2 | 3)));
  };

  const goBack = () => {
    setStepError(null);
    setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2)));
  };

  // Enter advances to the next step (except inside the notes textarea, where
  // Enter inserts a newline). On step 3 Enter submits the form naturally.
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLElement;
    if (target.tagName === "TEXTAREA") return;
    if (step < 3) {
      e.preventDefault();
      goToNextStep();
    }
  };

  const showBrandError = stepError !== null && step === 1 && !bikeBrand;
  const showModelError = stepError !== null && step === 1 && !bikeModel.trim();
  const showServiceError = stepError !== null && step === 2 && !service && !problemNotes.trim();
  const showDateError = stepError !== null && step === 2 && !preferredDate;
  const showPickupAddressError =
    stepError !== null && step === 2 && needPickup && !pickupAddress.trim();

  // Exact preview of the WhatsApp message (reference is appended server-side).
  const previewMessage = useMemo(
    () =>
      buildBookingMessage({
        branchName: branchObj.name,
        bikeBrand: bikeBrand || "(brand)",
        bikeModel: bikeModel.trim() || "(model)",
        service: service || problemNotes.trim() || "(service)",
        notes: problemNotes.trim() || undefined,
        customerName: customerName.trim() || "(your name)",
        customerPhone: customerPhone.trim() || "(phone)",
        preferredDate: preferredDate || "(date)",
        preferredTime,
        needPickup,
        pickupAddress: pickupAddress.trim() || undefined,
        pickupContact: pickupContact.trim() || undefined,
        pickupNotes: pickupNotes.trim() || undefined,
      }),
    [branchObj.name, bikeBrand, bikeModel, service, problemNotes, customerName, customerPhone, preferredDate, preferredTime, needPickup, pickupAddress, pickupContact, pickupNotes]
  );

  const inputBase =
    "w-full p-3.5 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2";
  const inputOk = "border-slate-300 focus:ring-[#00AEEF]";
  const inputErr = "border-red-400 focus:ring-red-400 bg-red-50/40";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Wizard Header + Progress */}
      <div className="bg-[#1A1254] text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-[#00AEEF] uppercase tracking-widest flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> ONLINE BOOKING REQUEST
            </span>
            <h2 className="text-2xl md:text-3xl font-black">BOOK A BIKE SERVICE</h2>
          </div>
          <div className="text-xs font-semibold text-slate-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            Step {step} of 3
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
          {[
            { s: 1 as const, name: "Branch & Bike" },
            { s: 2 as const, name: "Service & Date" },
            { s: 3 as const, name: "Contact & Send" },
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
              <span className="text-[10px] font-medium text-slate-300 mt-1">{st.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-10">
        {actionState.ok ? (
          /* ---------------- SUCCESS: saved + WhatsApp handoff ---------------- */
          <div className="text-center py-4 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-[#251A76] mb-2">
              REQUEST READY — {actionState.reference}
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mb-4">
              Thank you, <span className="font-bold">{customerName}</span>! Your booking for{" "}
              <span className="font-bold">
                {bikeBrand} {bikeModel}
              </span>{" "}
              at our <span className="font-bold text-[#00AEEF]">{branchObj.name} Branch</span> has
              reference <span className="font-black text-[#251A76]">{actionState.reference}</span>.
            </p>

            {/* Save status — honest about where the request lives */}
            <div
              className={`max-w-md mx-auto mb-6 rounded-xl border px-4 py-3 text-xs font-bold ${
                actionState.saved
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : actionState.skipped
                  ? "bg-amber-50 border-amber-200 text-amber-800"
                  : "bg-orange-50 border-orange-200 text-orange-800"
              }`}
            >
              {actionState.saved
                ? `✓ Saved to our workshop sheet — Ref ${actionState.reference}. Now tap Send in WhatsApp to confirm instantly.`
                : actionState.skipped
                ? "Your request is recorded with this reference. Now tap Send in WhatsApp to confirm with the workshop."
                : "We could not reach the workshop sheet — please send the WhatsApp message below or call us directly."}
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-md mx-auto space-y-3 mb-6">
              <a
                href={actionState.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition"
              >
                <MessageSquare className="w-4.5 h-4.5 mr-2" />
                OPEN WHATSAPP &amp; TAP SEND
              </a>

              <a
                href={getPhoneHref(branchObj.phoneRaw)}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-[#251A76] hover:bg-[#1A1254] text-white font-extrabold text-xs transition"
              >
                <Phone className="w-4 h-4 mr-2 text-[#00AEEF]" />
                CALL {branchObj.name.toUpperCase()} BRANCH ({branchObj.phone})
              </a>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              WhatsApp should have opened automatically with your details filled in — just press{" "}
              <span className="font-bold">Send</span>. If it did not open, use the green button
              above. Either way we have your number and can reach you.
            </p>

            <button
              onClick={onBookAnother}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
            >
              Book Another Service
            </button>
          </div>
        ) : (
          /* ---------------- FORM: 3 STEPS ---------------- */
          <form action={formAction} onKeyDown={handleFormKeyDown} noValidate={false}>
            {/*
              All submitted values live here as hidden mirrors of React state.
              Steps render conditionally, so step 1/2 inputs are UNMOUNTED when
              submitting from step 3 — FormData would otherwise lose them.
              The visible inputs below therefore have no `name` attributes.
            */}
            <input type="hidden" name="branchId" value={branchObj.id} />
            <input type="hidden" name="bikeBrand" value={bikeBrand} />
            <input type="hidden" name="bikeModel" value={bikeModel} />
            <input type="hidden" name="service" value={service} />
            <input type="hidden" name="notes" value={problemNotes} />
            <input type="hidden" name="preferredDate" value={preferredDate} />
            <input type="hidden" name="preferredTime" value={preferredTime} />
            <input type="hidden" name="needPickup" value={needPickup ? "yes" : "no"} />
            <input type="hidden" name="pickupAddress" value={needPickup ? pickupAddress : ""} />
            <input type="hidden" name="pickupContact" value={needPickup ? pickupContact : ""} />
            <input type="hidden" name="pickupNotes" value={needPickup ? pickupNotes : ""} />

            {actionState.error && (
              <div className="mb-6 flex items-start rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-700">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                {actionState.error}
              </div>
            )}

            {/* ================= STEP 1 — BRANCH & BIKE ================= */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-[#251A76] mb-2 flex items-center">
                  <MapPin className="w-5 h-5 text-[#00AEEF] mr-2" />
                  YOUR BRANCH &amp; BIKE
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Choose the workshop branch and tell us what you ride.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {SITE_CONFIG.branches.map((b) => {
                    const selected = branch === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBranch(b.id as "chithode" | "perundurai")}
                        aria-pressed={selected}
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
                            {selected && <CheckCircle2 className="w-5 h-5 text-[#00AEEF]" />}
                          </div>
                          <p className="text-xs text-slate-600 mb-3">{b.shortAddress}</p>
                          <p className="text-xs font-semibold text-slate-500">📞 {b.phone}</p>
                          <p className="text-xs text-slate-400 mt-1 whitespace-pre-line">
                            ⏰ {b.shortHours}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-2">
                  Bike Brand *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                  {BRANDS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBikeBrand(b)}
                      aria-pressed={bikeBrand === b}
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

                <label
                  htmlFor="bikeModel"
                  className="block text-xs font-extrabold text-[#251A76] uppercase mb-2"
                >
                  Model &amp; Registration / Spec *
                </label>
                <input
                  id="bikeModel"
                  type="text"
                  value={bikeModel}
                  onChange={(e) => setBikeModel(e.target.value)}
                  placeholder="e.g. Activa 6G, Pulsar 220, Royal Enfield Classic 350"
                  className={`${inputBase} ${showModelError ? inputErr : inputOk}`}
                />
                {showBrandError && (
                  <p className="mt-2 text-xs font-bold text-red-600 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> Please select your bike brand.
                  </p>
                )}
                {showModelError && !showBrandError && (
                  <p className="mt-2 text-xs font-bold text-red-600 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> Please enter your bike model.
                  </p>
                )}
              </div>
            )}

            {/* ================= STEP 2 — SERVICE & DATE ================= */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-[#251A76] mb-2 flex items-center">
                  <Wrench className="w-5 h-5 text-[#00AEEF] mr-2" />
                  SERVICE &amp; PREFERRED DATE
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  What does your bike need, and when will you drop by?
                </p>

                <label className="block text-xs font-extrabold text-[#251A76] uppercase mb-2">
                  Service Category *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                  {SERVICES_LIST.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setService(s)}
                      aria-pressed={service === s}
                      className={`p-3 rounded-xl text-xs font-bold border text-left transition ${
                        service === s
                          ? "bg-[#00AEEF] text-white border-[#00AEEF] shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <label
                  htmlFor="notes"
                  className="block text-xs font-extrabold text-[#251A76] uppercase mb-2"
                >
                  Problem Notes / Symptoms (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={problemNotes}
                  onChange={(e) => setProblemNotes(e.target.value)}
                  placeholder="Describe any sounds, starting issues, mileage drop or specific requests..."
                  className={`${inputBase} ${inputOk} font-medium`}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-xs font-extrabold text-[#251A76] uppercase mb-2"
                    >
                      Preferred Date *
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      value={preferredDate}
                      min={todayLocal}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={`${inputBase} ${showDateError ? inputErr : inputOk}`}
                    />
                    {showDateError && (
                      <p className="mt-2 text-xs font-bold text-red-600 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1" /> Please choose a date.
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="preferredTime"
                      className="block text-xs font-extrabold text-[#251A76] uppercase mb-2"
                    >
                      Preferred Time Window
                    </label>
                    <select
                      id="preferredTime"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className={`${inputBase} ${inputOk}`}
                    >
                      {TIME_WINDOWS.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Doorstep pickup option */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={needPickup}
                      onChange={(e) => {
                        setNeedPickup(e.target.checked);
                        if (!e.target.checked) {
                          // Clear pickup fields when unchecked so stale data
                          // never reaches WhatsApp or the sheet.
                          setPickupAddress("");
                          setPickupContact("");
                          setPickupNotes("");
                        }
                      }}
                      className="mt-0.5 w-4.5 h-4.5 accent-[#00AEEF] cursor-pointer"
                    />
                    <span>
                      <span className="block text-sm font-extrabold text-[#251A76]">
                        Yes, I need my bike picked up (Doorstep Pickup)
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5">
                        Our pickup rider collects your bike from your address and delivers it back
                        after service.
                      </span>
                    </span>
                  </label>

                  {needPickup && (
                    <div className="mt-4 space-y-4 animate-fadeIn">
                      <div>
                        <label
                          htmlFor="pickupAddress"
                          className="block text-xs font-extrabold text-[#251A76] uppercase mb-2"
                        >
                          Pickup Address *
                        </label>
                        <textarea
                          id="pickupAddress"
                          rows={2}
                          value={pickupAddress}
                          onChange={(e) => setPickupAddress(e.target.value)}
                          placeholder="House / street, area, landmark, city..."
                          className={`${inputBase} ${showPickupAddressError ? inputErr : inputOk} font-medium`}
                        />
                        {showPickupAddressError && (
                          <p className="mt-2 text-xs font-bold text-red-600 flex items-center">
                            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Pickup address is required for doorstep pickup.
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="pickupContact"
                            className="block text-xs font-extrabold text-[#251A76] uppercase mb-2"
                          >
                            Alternate Contact at Pickup (Optional)
                          </label>
                          <input
                            id="pickupContact"
                            type="tel"
                            value={pickupContact}
                            onChange={(e) => setPickupContact(e.target.value)}
                            placeholder="If someone else hands over the bike"
                            className={`${inputBase} ${inputOk}`}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="pickupNotes"
                            className="block text-xs font-extrabold text-[#251A76] uppercase mb-2"
                          >
                            Pickup Instructions (Optional)
                          </label>
                          <input
                            id="pickupNotes"
                            type="text"
                            value={pickupNotes}
                            onChange={(e) => setPickupNotes(e.target.value)}
                            placeholder="e.g. Bike in basement parking, call before coming"
                            className={`${inputBase} ${inputOk}`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {showServiceError && (
                  <p className="mt-3 text-xs font-bold text-red-600 flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> Select a service category or
                    describe the problem in the notes.
                  </p>
                )}
              </div>
            )}

            {/* ================= STEP 3 — CONTACT, REVIEW & SEND ================= */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-black text-[#251A76] mb-2 flex items-center">
                  <User className="w-5 h-5 text-[#00AEEF] mr-2" />
                  YOUR DETAILS &amp; CONFIRM
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  We save your request and open WhatsApp with everything filled in — you just tap
                  Send.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="block text-xs font-extrabold text-[#251A76] uppercase mb-2"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="customerName"
                      name="customerName"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className={`${inputBase} ${inputOk}`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="customerPhone"
                      className="block text-xs font-extrabold text-[#251A76] uppercase mb-2"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      required
                      pattern="[0-9+\-\s]{10,15}"
                      title="Enter a 10-digit mobile number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className={`${inputBase} ${inputOk}`}
                    />
                  </div>
                </div>

                {/* Exact WhatsApp message preview */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-6">
                  <div className="flex items-center text-xs font-extrabold text-[#251A76] uppercase tracking-wider mb-2">
                    <ClipboardList className="w-4 h-4 mr-1.5 text-[#00AEEF]" />
                    Message that will open in WhatsApp
                  </div>
                  <pre className="whitespace-pre-wrap text-xs text-slate-700 font-medium leading-relaxed bg-white rounded-xl border border-slate-100 p-3.5 max-h-56 overflow-y-auto">
                    {previewMessage}
                  </pre>
                </div>
              </div>
            )}

            {/* ---------------- Step navigation ---------------- */}
            {stepError && (
              <div className="mt-6 flex items-start rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-700">
                <AlertCircle className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                {stepError}
              </div>
            )}

            <div className="flex justify-between items-center pt-8 border-t border-slate-200 mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 hidden sm:block">
                  Tip: press <kbd className="font-bold text-slate-500">Enter</kbd> to continue
                </span>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="inline-flex items-center text-xs font-black text-white bg-[#251A76] hover:bg-[#1A1254] px-6 py-3 rounded-xl shadow-md transition"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-1.5 text-[#00AEEF]" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center text-xs font-black text-white bg-[#00AEEF] hover:bg-[#0099D4] disabled:opacity-60 disabled:cursor-wait px-6 py-3 rounded-xl shadow-md shadow-cyan-500/25 transition min-w-[240px]"
                >
                  {isPending ? (
                    "SAVING & OPENING WHATSAPP…"
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      SUBMIT &amp; OPEN WHATSAPP
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
