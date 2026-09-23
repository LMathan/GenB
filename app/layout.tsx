import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://genbbikecare.com"),
  title: {
    default: "GEN B BIKE CARE — Multi-Brand Bike Service Center Near Me | Chithode & Perundurai",
    template: "%s | GEN B BIKE CARE",
  },
  description:
    "GEN B BIKE CARE: Top-rated bike service center near me in Chithode and Perundurai, Erode. Honda bike service, Hero bike service, Bajaj, TVS, Yamaha, Royal Enfield, bike chain cleaning & online service booking.",
  keywords: [
    "bike service near me",
    "bike service center",
    "bike service centre",
    "honda bike service",
    "honda service",
    "hero bike service",
    "bajaj bike service",
    "tvs bike service",
    "yamaha bike service",
    "royal enfield bike service",
    "bike service center near me",
    "bike chain cleaning",
    "how to clean bike chain",
    "online bike service booking",
    "bike service app",
    "GEN B BIKE CARE",
    "genbbikecare.com",
    "genbbikecare.in",
    "bike service Chithode",
    "bike repair Chithode",
    "two wheeler service Chithode",
    "bike service Erode",
    "bike service Perundurai",
    "multi brand bike service center",
  ],
  alternates: {
    canonical: "https://genbbikecare.com",
    languages: {
      "en-IN": "https://genbbikecare.in",
    },
  },
  openGraph: {
    title: "GEN B BIKE CARE — Multi-Brand Bike Service Center Near Me",
    description:
      "Your trusted bike service center near me in Chithode & Perundurai. Professional Honda, Hero, Bajaj, TVS, Yamaha & Royal Enfield bike service.",
    url: "https://genbbikecare.com",
    siteName: "GEN B BIKE CARE",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "GEN B BIKE CARE Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdChithode = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "GEN B BIKE CARE — Bike Service Center Chithode",
    image: "https://genbbikecare.com/logo.png",
    telePhone: "+919176099009",
    url: "https://genbbikecare.com",
    sameAs: ["https://genbbikecare.in", "https://www.instagram.com/p/DcdafwiSVSg/"],
    description:
      "Multi-brand bike service center near me in Chithode offering Honda bike service, Hero bike service, Bajaj, TVS, Yamaha & Royal Enfield service.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "36, Perundurai Road, Nadupalayam",
      addressLocality: "Chithode, Erode",
      addressRegion: "Tamil Nadu",
      postalCode: "638102",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
  };

  const jsonLdPerundurai = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "GEN B BIKE CARE — Bike Service Center Perundurai",
    image: "https://genbbikecare.com/logo.png",
    telePhone: "+919176099119",
    url: "https://genbbikecare.com",
    sameAs: ["https://genbbikecare.in", "https://www.instagram.com/p/DcdafwiSVSg/"],
    description:
      "Multi-brand bike service center near me in Perundurai offering Honda bike service, Hero bike service, Bajaj, TVS, Yamaha & Royal Enfield service.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bhavani Road, 134/264, near Anna Silai",
      addressLocality: "Perundurai, Karumandisellipalayam",
      addressRegion: "Tamil Nadu",
      postalCode: "638052",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:30",
      },
    ],
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdChithode) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerundurai) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-900 antialiased selection:bg-[#00AEEF] selection:text-white">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <StickyMobileBar />
        </SmoothScroll>
      </body>
    </html>
  );
}
