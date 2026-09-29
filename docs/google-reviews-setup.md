# Live Google Reviews Setup

The reviews section shows **live Google Maps reviews for both branches**. When the API
key or Place IDs aren't configured yet, the site shows your curated reviews instead —
it never breaks.

**Free-tier math (official API):** reviews use the *Place Details Enterprise + Atmosphere*
SKU → **1,000 free calls/month**. This site refreshes each branch every **6 hours**
→ 2 branches × 4/day × 30 days ≈ **240 calls/month** — comfortably free. You must enable
billing on the Google Cloud project (card required by Google, but this usage charges ₹0).

## Setup (10 minutes)

1. **Google Cloud Console** → create/select a project → enable **Billing**.
2. Enable **"Places API (New)"**: APIs & Services → Library → search "Places API (New)" → Enable.
3. **APIs & Services → Credentials → Create credentials → API key.**
4. Restrict the key: click it → *Application restrictions: None* (server-side calls) →
   *API restrictions: Restrict key → tick only "Places API (New)"* → Save.
5. Find both branches' **Place IDs**:
   https://developers.google.com/maps/documentation/places/web-service/place-id
   Search "GEN B BIKE CARE Chithode" → copy `ChIJ…`; repeat for Perundurai.
6. Put this in `.env.local` **and in Vercel → Settings → Environment Variables**
   (all environments), then redeploy:

```bash
GOOGLE_PLACES_API_KEY="AIza..."
```

7. In `config/site.ts`, paste each branch's Place ID into the `placeId: ""` field
   (Chithode and Perundurai). That's the only code change.

## Verify

- Visit `/reviews`: each branch card shows the **live Google rating + review count**
  and a green **"Live from Google"** badge, with the required Google attribution above.
- **Home page** uses the same component — both spots update together.
- New reviews on Google Maps appear on the site within **6 hours** (the cache window).
- To change freshness: `revalidate: 21600` in `lib/reviews.ts` (seconds). Lower = fresher
  but more quota used (e.g. 3600 = hourly ≈ 1,440 calls/month — still free).

## If something's wrong

| Symptom | Fix |
| --- | --- |
| Green "Live from Google" badge missing | API key missing on the server → check `.env.local` / Vercel env, redeploy. |
| `REQUEST_DENIED` in server logs | "Places API (New)" not enabled for this key/project, or key restriction blocks it. |
| Wrong business shown | `placeId` incorrect — re-check with the Place ID finder link above. |
| Still shows curated reviews | That's the designed fallback (key missing or API error) — check server logs for `[reviews]`. |

## Alternatives compared (why the official API was chosen)

| Option | Cost | Verdict |
| --- | --- | --- |
| **Official Places API + 6h cache (built)** | ~240 of 1,000 free calls/month → ₹0 | Real-time, official, no ToS risk |
| Outscraper free tier | 500 reviews/month free | Works but scraping-based; reviews arrive via async jobs; ToS-grey for Google content |
| SerpApi free tier | 100 searches/month free | Enough for 2 branches/week, but it's scraping of SERPs; no attribution tooling |
| Elfsight/widget | Free ~200 pageviews/month | Their branding + tight limits |

Scrapers get the job done for tiny sites, but the official API at this cached volume is
effectively free and won't break when a scraper's HTML parsing does.
