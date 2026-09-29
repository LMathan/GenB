# Connect the Booking Google Sheet

Bookings are auto-saved as rows in a Google Sheet when the customer submits Step 3
of the booking wizard. WhatsApp opens **immediately after** with the booking details
pre-filled — the customer just taps **Send**.

```
Customer submits Step 3
        │
        ▼
Server Action (app/actions/booking.ts)
        │
        ├──► Google Sheet row saved (with Booking Ref)   ── your record
        └──► WhatsApp URL returned (same text as preview) ── customer taps Send
```

## One-time setup (~5 minutes)

### 1. Create the sheet

1. Create a new Google Sheet.
2. In row 1, add these headers (exact order — 14 columns):

   ```
   Timestamp | Booking Ref | Branch | Bike Brand | Bike Model | Service | Notes | Customer Name | Customer Phone | Preferred Date | Preferred Time | Pickup Required | Pickup Address | Pickup Contact
   ```

### 2. Add the Apps Script

1. In the sheet: **Extensions → Apps Script**.
2. Delete the placeholder code and paste:

   ```javascript
   function doPost(e) {
     try {
       const body = JSON.parse(e.postData.contents);

       // Simple shared-secret check (set the same value in your .env.local)
       if (body.secret !== "REPLACE_WITH_A_LONG_RANDOM_STRING") {
         return ContentService.createTextOutput(JSON.stringify({ ok: false }))
           .setMimeType(ContentService.MimeType.JSON);
       }

       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
       sheet.appendRow([
         body.timestamp,
         body.reference,
         body.branch,
         body.bikeBrand,
         body.bikeModel,
         body.service,
         body.notes || "",
         body.customerName,
         body.customerPhone,
         body.preferredDate,
         body.preferredTime,
         body.pickupRequired || "No",
         body.pickupAddress || "",
         body.pickupContact || "",
       ]);

       return ContentService.createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

3. Replace `REPLACE_WITH_A_LONG_RANDOM_STRING` with any long random text
   (e.g. from `openssl rand -hex 24`). This is the "secret".

### 3. Deploy the Web App

1. Apps Script editor: **Deploy → New deployment**.
2. Type: **Web app**.
3. Description: anything (e.g. `booking intake`).
4. **Execute as:** Me (your Google account).
5. **Who has access:** **Anyone**. (Required — the site server calls it without Google login. The secret is what stops strangers from writing rows.)
6. Click **Deploy** and copy the **Web app URL**
   (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### 4. Add the two environment variables

Create/edit `.env.local` in the project root:

```bash
GOOGLE_SHEET_WEB_APP_URL="https://script.google.com/macros/s/AKfycb.../exec"
GOOGLE_SHEET_SECRET="the same long random string you set in the script"
```

Restart the dev server (or redeploy) after adding them.

## How you know it works

- Submit a test booking → a row appears in the sheet within seconds, with a `GB-YYxxxx` reference.
- The wizard's success screen shows a green **"Saved to workshop sheet"** line when the
  row was written, and an orange **"Requests only in WhatsApp"** note when no sheet is
  configured (site still fully works).
- If the sheet is slow or down, booking never breaks: the save is skipped after 5s and
  the WhatsApp handoff still opens.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| No row appears, success screen says "Requests only in WhatsApp" | Env vars missing/restart not done → check `.env.local`, restart server. |
| `saved` false but env vars set | Apps Script secret mismatch, or deployment not "Anyone" access. Re-deploy a **New deployment** after edits. |
| Row saved twice | You deployed twice and used both URLs — keep only one `GOOGLE_SHEET_WEB_APP_URL`. |
| First deploy asks for permissions | Grant the script access to your own sheet — normal Google flow. |
