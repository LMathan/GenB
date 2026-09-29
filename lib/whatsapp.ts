// Shared WhatsApp helpers. Imported by BOTH server code (app/actions/booking.ts)
// and client components, so this file must stay framework-neutral (no "use client"/"use server").
//
// NOTE: Message labels are intentionally plain ASCII. Emoji in wa.me "text" params
// rendered as replacement glyphs (�) for some users; plain labels always survive
// every WhatsApp client, URL encoder, and terminal the message passes through.

export interface BookingMessageData {
  branchName: string;
  bikeBrand: string;
  bikeModel: string;
  service: string;
  notes?: string;
  customerName: string;
  customerPhone: string;
  preferredDate: string;
  preferredTime: string;
}

export function buildBookingMessage(d: BookingMessageData, reference?: string): string {
  const lines = [
    `Hi GEN B BIKE CARE (${d.branchName} Branch), I would like to book a service.`,
    "",
    `Branch: ${d.branchName} Branch`,
    `Bike: ${d.bikeBrand} ${d.bikeModel}`.trimEnd(),
    `Service: ${d.service}`,
    d.notes ? `Notes: ${d.notes}` : "",
    `Name: ${d.customerName}`,
    `Phone: ${d.customerPhone}`,
    `Preferred Date: ${d.preferredDate}`,
    `Preferred Time: ${d.preferredTime}`,
    reference ? `Booking Ref: ${reference}` : "",
  ];
  return lines.filter((l) => l !== "").join("\n");
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
