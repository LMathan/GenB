import "server-only";

import { SITE_CONFIG, type Branch } from "@/config/site";

/**
 * Google reviews provider chain:
 *
 * 1. Official Places API ("Place Details Enterprise + Atmosphere" SKU, the only
 *    SKU that returns reviews) — includes 1,000 free calls/month. Each branch
 *    is fetched at most once per 6 hours => ~240 calls/month for 2 branches,
 *    comfortably inside the free quota. `next: { revalidate }` also survives
 *    serverless cold starts, unlike in-memory caches.
 * 2. Curated fallback from config — used when no API key is configured or the
 *    fetch fails, so the reviews section NEVER renders empty/broken.
 *
 * Reviews policy notes:
 * - We show the first N reviews returned by Google (most helpful/newest per
 *   Google's ranking). No manual cherry-picking.
 * - Google requires visible attribution ("Google" + logo per their branding
 *   guidelines) — rendered alongside the data.
 */

const PLACES_API_BASE = "https://places.googleapis.com/v1/places";

export interface DisplayReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto?: string;
}

export interface BranchReviews {
  branchId: string;
  branchName: string;
  rating: number | null;
  reviewCount: number | null;
  reviews: DisplayReview[];
  mapsUrl: string;
  source: "google-live" | "curated";
}

async function fetchGoogleReviews(branch: Branch): Promise<BranchReviews> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY ?? "";

  if (!apiKey || !branch.placeId) {
    return curatedFor(branch);
  }

  try {
    const res = await fetch(`${PLACES_API_BASE}/${branch.placeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        // Atmosphere fields (reviews, userRatingCount, rating) are what put the
        // call into the "Enterprise + Atmosphere" SKU: 1,000 free calls/month.
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
      body: JSON.stringify({ languageCode: "en" }),
      // Refresh at most every 6 hours, cached across cold starts:
      next: { revalidate: 21600 },
    });

    if (!res.ok) {
      console.error(
        `[reviews] Places API ${res.status} for ${branch.name}; using curated fallback`
      );
      return curatedFor(branch);
    }

    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: Array<{
        name?: string;
        authorAttribution?: { displayName?: string; photoUri?: string };
        rating?: number;
        text?: { text?: string };
        originalText?: { text?: string };
        relativePublishTimeDescription?: string;
      }>;
    };

    const reviews: DisplayReview[] = (data.reviews ?? []).map((r, i) => ({
      id: r.name ?? `${branch.id}-${i}`,
      author: r.authorAttribution?.displayName ?? "Google User",
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
      profilePhoto: r.authorAttribution?.photoUri,
    }));

    if (reviews.length === 0) {
      return curatedFor(branch);
    }

    return {
      branchId: branch.id,
      branchName: branch.name,
      rating: data.rating ?? null,
      reviewCount: data.userRatingCount ?? null,
      reviews,
      mapsUrl: data.googleMapsUri ?? branch.mapUrl,
      source: "google-live",
    };
  } catch (err) {
    console.error(`[reviews] Places API failed for ${branch.name}:`, err);
    return curatedFor(branch);
  }
}

function curatedFor(branch: Branch): BranchReviews {
  const branchReviews = SITE_CONFIG.reviews.filter(
    (r) => r.branch.startsWith(branch.name)
  );
  const list = branchReviews.length > 0 ? branchReviews : SITE_CONFIG.reviews;

  return {
    branchId: branch.id,
    branchName: branch.name,
    rating: 5,
    reviewCount: null,
    reviews: list.map((r) => ({
      id: String(r.id),
      author: r.author,
      rating: r.rating,
      text: r.text,
      relativeTime: r.date,
    })),
    mapsUrl: branch.mapUrl,
    source: "curated",
  };
}

/** Fetch reviews for BOTH branches (cached; ~240 billable calls/month total). */
export async function getAllBranchReviews(): Promise<BranchReviews[]> {
  return Promise.all(SITE_CONFIG.branches.map(fetchGoogleReviews));
}
