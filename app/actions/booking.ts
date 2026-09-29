"use server";

/**
 * Saves a booking request as a row in a Google Sheet and returns a booking
 * reference. The sheet is populated via a Google Apps Script Web App
 * (see docs/google-sheet-setup.md) so no service-account credentials or
 * Google SDK are needed.
 *
 * Design decisions:
 * - The site ships with no sheet configured. In that case the action returns
 *   `saved: false, skipped: true` and the WhatsApp handoff still works — the
 *   site is never broken by a missing/misconfigured sheet.
 * - A WhatsApp URL is built SERVER-side with the same ASCII-safe builder used
 *   by the preview, so what the customer reviewed is exactly what opens.
 * - The sheet save runs inside a 5s timeout race: a hanging Apps Script never
 *   blocks the WhatsApp handoff for more than 5 seconds.
 */

import { SITE_CONFIG } from "@/config/site";
import {
  buildBookingMessage,
  buildWhatsAppUrl,
  type BookingMessageData,
} from "@/lib/whatsapp";

export interface SaveBookingInput extends BookingMessageData {
  branchId: string;
}

export interface SaveBookingResult {
  ok: boolean;
  reference: string;
  saved: boolean;
  skipped: boolean;
  whatsappUrl: string;
  error?: string;
}

const SHEET_WEB_APP_URL = process.env.GOOGLE_SHEET_WEB_APP_URL ?? "";
const SHEET_SECRET = process.env.GOOGLE_SHEET_SECRET ?? "";

function generateReference(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `GB-${year}${random}`;
}

function clean(value: FormDataEntryValue | null, max = 300): string {
  return String(value ?? "").trim().slice(0, max);
}

/**
 * useActionState-compatible signature: (prevState, formData).
 * The previous state is unused today but kept for API compatibility.
 */
export async function saveBooking(
  _prevState: SaveBookingResult,
  formData: FormData
): Promise<SaveBookingResult> {
  // ---- Validate (never trust client input) --------------------------------
  const branchId = clean(formData.get("branchId"), 40);
  const bikeBrand = clean(formData.get("bikeBrand"), 40);
  const bikeModel = clean(formData.get("bikeModel"), 80);
  const service = clean(formData.get("service"), 120);
  const notes = clean(formData.get("notes"), 500);
  const customerName = clean(formData.get("customerName"), 80);
  const customerPhone = clean(formData.get("customerPhone"), 15);
  const preferredDate = clean(formData.get("preferredDate"), 10);
  const preferredTime = clean(formData.get("preferredTime"), 60);

  const missing: string[] = [];
  if (!bikeBrand) missing.push("bike brand");
  if (!bikeModel) missing.push("bike model");
  if (!customerName) missing.push("name");
  if (!preferredDate) missing.push("date");
  if (missing.length > 0) {
    return {
      ok: false,
      reference: "",
      saved: false,
      skipped: false,
      whatsappUrl: "",
      error: `Missing required booking details: ${missing.join(", ")}.`,
    };
  }
  if (!/^[0-9+\-\s]{10,15}$/.test(customerPhone)) {
    return {
      ok: false,
      reference: "",
      saved: false,
      skipped: false,
      whatsappUrl: "",
      error: "Invalid phone number.",
    };
  }

  const branch =
    SITE_CONFIG.branches.find((b) => b.id === branchId) ?? SITE_CONFIG.branches[0];

  const reference = generateReference();

  const bookingData: BookingMessageData = {
    branchName: branch.name,
    bikeBrand,
    bikeModel,
    service: service || "General Service Enquiry",
    notes: notes || undefined,
    customerName,
    customerPhone,
    preferredDate,
    preferredTime,
  };

  // Build the exact WhatsApp URL server-side (same builder as the preview).
  const message = buildBookingMessage(bookingData, reference);
  const whatsappUrl = buildWhatsAppUrl(branch.whatsapp, message);

  // ---- Save to Google Sheet (optional, fails safe) ------------------------
  let saved = false;
  let skipped = true;

  if (SHEET_WEB_APP_URL) {
    skipped = false;
    try {
      const payload = JSON.stringify({
        secret: SHEET_SECRET,
        reference,
        timestamp: new Date().toISOString(),
        branch: branch.name,
        bikeBrand,
        bikeModel,
        service: bookingData.service,
        notes,
        customerName,
        customerPhone,
        preferredDate,
        preferredTime,
      });

      const fetchWithTimeout = Promise.race([
        fetch(SHEET_WEB_APP_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: payload,
          // Apps Script needs a redirect follow; cache must not serve a stale ack.
          redirect: "follow",
          cache: "no-store",
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Sheet request timed out")), 5000)
        ),
      ]);

      const res = await fetchWithTimeout;
      saved = res.ok;
      if (!res.ok) {
        console.error(`[booking] Sheet responded ${res.status} for ${reference}`);
      }
    } catch (err) {
      // Never let a sheet outage break the booking flow.
      console.error(`[booking] Sheet save failed for ${reference}:`, err);
    }
  }

  return { ok: true, reference, saved, skipped, whatsappUrl };
}
