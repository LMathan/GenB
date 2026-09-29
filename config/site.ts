export interface Branch {
  id: string;
  name: string;
  address: string;
  shortAddress: string;
  phone: string;       // Formatted for display
  phoneRaw: string;    // Formatted for tel: links
  whatsapp: string;    // Formatted for wa.me links
  hours: string[];
  shortHours: string;
  mapUrl: string;
  placeId: string;     // Google Maps Place ID (live reviews); empty = curated reviews
}

export interface Service {
  id: string;
  title: string;
  desc: string;
  checklist: string[];
  badge: string;
}

export interface ServiceIssue {
  id: string;
  label: string;
  icon: string;
  desc: string;
}

export interface BrandCategory {
  title: string;
  desc: string;
  points: string[];
  color: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ReviewItem {
  id: number;
  author: string;
  rating: number;
  date: string;
  branch: string;
  text: string;
}

export const SITE_CONFIG = {
  name: "GEN B BIKE CARE",
  shortName: "GEN B",
  tagline: "The Multi-Brand Bike Services",
  description: "Professional care for your motorcycle or gearless scooter, from routine maintenance to essential engine, brake, and electrical servicing.",
  
  social: {
    instagram: "https://www.instagram.com/p/DcdafwiSVSg/",
  },

  branches: [
    {
      id: "chithode",
      name: "Chithode",
      address: "36, Perundurai Road, Nadupalayam, Chithode, Erode, Tamil Nadu 638102",
      shortAddress: "36, Perundurai Road, Nadupalayam",
      phone: "+91 91760 99009",
      phoneRaw: "+919176099009",
      whatsapp: "919176099009",
      hours: [
        "Monday – Saturday: 9:00 AM – 8:00 PM",
        "Sunday: 10:00 AM – 2:00 PM"
      ],
      shortHours: "Mon-Sat 9AM-8PM | Sun 10AM-2PM",
      mapUrl: "https://maps.google.com/?q=Gen+B+Bike+Care+Chithode+Erode",
      // Google Maps Place ID for live review fetching (lib/reviews.ts).
      // Find it: https://developers.google.com/maps/documentation/places/web-service/place-id
      placeId: "",
    },
    {
      id: "perundurai",
      name: "Perundurai",
      address: "Bhavani Road, 134/264, near Anna Silai, Perundurai, Karumandisellipalayam, Tamil Nadu 638052",
      shortAddress: "Bhavani Road, near Anna Silai",
      phone: "+91 91760 99119",
      phoneRaw: "+919176099119",
      whatsapp: "919176099119",
      hours: [
        "Monday – Saturday: 9:00 AM – 7:30 PM",
        "Sunday: Closed"
      ],
      shortHours: "Mon-Sat 9:00 AM – 7:30 PM",
      mapUrl: "https://maps.google.com/?q=Gen+B+Bike+Care+Perundurai",
      placeId: "",
    }
  ] as Branch[],

  detailedServices: [
    {
      id: "periodic",
      title: "Periodic Maintenance Service",
      desc: "Recommended every 2,500km – 3,000km to maintain engine health, smooth gear shifts, and optimal fuel efficiency.",
      checklist: [
        "Engine oil check & flush replacement",
        "Air filter cleaning or filter replacement",
        "Spark plug cleaning & gap adjustment",
        "Brake shoe / pad inspection & adjustment",
        "Throttle & clutch cable lubrication",
        "Battery terminal voltage & charging check",
        "Tire pressure & tread depth check",
        "General wash & lube application",
      ],
      badge: "Popular Service",
    },
    {
      id: "general",
      title: "General Full Service & Inspection",
      desc: "A thorough top-to-bottom multi-point checkup for bikes that haven't been serviced in a while.",
      checklist: [
        "Complete multi-point vehicle inspection",
        "Carburetor cleaning / EFI throttle body check",
        "Drive chain adjustment & spray lube",
        "Front & rear brake cleaning",
        "Wheel bearing & steering head check",
        "Electrical switch & horn operation check",
        "Water wash & shine polish",
      ],
      badge: "Comprehensive",
    },
    {
      id: "engine",
      title: "Engine Diagnostics & Tappet Service",
      desc: "Specialized mechanical service to fix engine noise, knocking, low compression, or excessive heating.",
      checklist: [
        "Tappet / valve clearance measurement & setting",
        "Piston & cylinder compression test",
        "Engine gasket & oil seal leak fix",
        "Coolant level & radiator inspection",
        "Exhaust carbon cleaning",
        "Engine oil pressure verification",
      ],
      badge: "Specialized",
    },
    {
      id: "brake",
      title: "Brake Shoe & Disc Brake Service",
      desc: "Essential safety service to ensure firm lever feel, squeal-free braking, and maximum stopping power.",
      checklist: [
        "Disc brake pad thickness measurement",
        "Brake caliper pin lubrication",
        "Brake fluid flush & hydraulic bleeding",
        "Rear brake drum de-dusting & shoe adjustment",
        "Brake lever pivot greasing",
      ],
      badge: "Safety Essential",
    },
    {
      id: "electrical",
      title: "Electrical & Battery Diagnostics",
      desc: "Fixing self-start failure, dim headlamps, blown fuses, and battery discharge issues.",
      checklist: [
        "Battery voltage & load test",
        "Self-starter motor & relay check",
        "Alternator & RR unit charging test",
        "Wiring harness continuity inspection",
        "Indicator & brake light bulb replacement",
      ],
      badge: "Quick Fix",
    },
    {
      id: "chain",
      title: "Chain & Sprocket Maintenance",
      desc: "Prevents chain snapping, gear jumping, and harsh power transmission noise.",
      checklist: [
        "Chain slack measurement & alignment",
        "Ultrasonic / spray chain degreasing",
        "Sprocket teeth wear inspection",
        "High-viscosity chain lube application",
      ],
      badge: "Transmission",
    },
  ] as Service[],

  serviceIssues: [
    {
      id: "start",
      label: "Bike won't start / Starting trouble",
      icon: "⚡",
      desc: "Self start not clicking, kick start slip, battery drain or spark plug issue",
    },
    {
      id: "engine",
      label: "Engine noise / Abnormal vibration",
      icon: "🔧",
      desc: "Tappet noise, knocking, high heat or unusual mechanical clatter",
    },
    {
      id: "brake",
      label: "Brake issue / Squeal noise",
      icon: "🛑",
      desc: "Low brake pressure, spongy lever, squealing noise, or worn brake pads",
    },
    {
      id: "chain",
      label: "Chain noise / Loose sprocket",
      icon: "⚙️",
      desc: "Chain slack, grinding sound, dry chain, or jumpy gear shifts",
    },
    {
      id: "pickup",
      label: "Poor pickup / Low mileage",
      icon: "🚀",
      desc: "Engine hesitation, slow acceleration, carburetor/EFI adjustment needed",
    },
    {
      id: "battery",
      label: "Battery dead / Horn & Light weak",
      icon: "🔋",
      desc: "Dim headlight, weak horn, indicator failure or battery charging issue",
    },
    {
      id: "regular",
      label: "Regular / Periodic Service Due",
      icon: "🛢️",
      desc: "Scheduled oil change, air filter cleaning, tuning & overall checkup",
    },
    {
      id: "other",
      label: "Other General Inspection / Unknown Sound",
      icon: "🔍",
      desc: "Clutch slip, suspension leakage, tire puncture, or custom repair requirement",
    },
  ] as ServiceIssue[],

  brandCategories: [
    {
      title: "Commuter & Daily Rides",
      desc: "Hero, Honda, TVS, Bajaj 100cc-150cc commuter motorcycles designed for daily reliability.",
      points: ["Engine Oil Flush", "Carb/EFI Tuning", "Brake Shoe Replacement"],
      color: "bg-blue-50 border-blue-200 text-blue-900",
    },
    {
      title: "Scooters & Gearless",
      desc: "Activa, Jupiter, Access, Ntorq gearless scooters requiring CVT belt & transmission inspection.",
      points: ["CVT Belt & Roller Check", "Fork Bushing Care", "Spark Plug Service"],
      color: "bg-purple-50 border-purple-200 text-purple-900",
    },
    {
      title: "Executive & Sports",
      desc: "Pulsar, Apache, FZ, MT-15, Duke performance single & twin cylinder engines.",
      points: ["Coolant Level Inspection", "Chain & Sprocket Lube", "Disc Brake Bleeding"],
      color: "bg-cyan-50 border-cyan-200 text-cyan-900",
    },
    {
      title: "Cruisers & Classics",
      desc: "Royal Enfield Classic, Bullet, Meteor, Hunter 350 & Jawa multi-cylinder cruisers.",
      points: ["Tappet Clearance Adjustment", "Clutch Cable Lube", "Heavy Fork Service"],
      color: "bg-[#251A76]/5 border-purple-200 text-[#251A76]",
    },
  ] as BrandCategory[],

  faqs: [
    {
      q: "Which motorcycle and scooter brands does GEN B BIKE CARE service?",
      a: "GEN B BIKE CARE is a multi-brand workshop. We service Honda, TVS, Yamaha, Hero, Royal Enfield, Bajaj, Suzuki, gearless scooters, and executive motorcycles.",
    },
    {
      q: "Where are your workshop branches located in Erode district?",
      a: "We operate from two active workshop locations: 1) Chithode Branch at 36 Perundurai Road, Nadupalayam, Chithode (+91 91760 99009) and 2) Perundurai Branch at Bhavani Road, near Anna Silai, Perundurai (+91 91760 99119).",
    },
    {
      q: "Do I need an appointment or can I walk in for service?",
      a: "Both walk-in visits and online service bookings are welcome. Booking online or calling ahead allows us to reserve a service bay for faster inspection and delivery.",
    },
    {
      q: "What is included in a Periodic Service package?",
      a: "Our Periodic Service package includes engine oil check/flush, air filter cleaning or replacement, spark plug check, front & rear brake adjustment, chain lube & tension check, battery voltage test, and wash detailing.",
    },
    {
      q: "How will I know when my bike service is completed?",
      a: "Once your bike passes our final quality inspection, our branch team will call or message you on WhatsApp so you can pick up your bike at your convenience.",
    },
  ] as FaqItem[],

  reviews: [
    {
      id: 1,
      author: "Local Rider (Verified Customer)",
      rating: 5,
      date: "Google Business Review",
      branch: "Chithode Branch",
      text: "Excellent service for multi-brand bikes. Polite behavior, transparent explanation of work needed, and prompt turnaround.",
    },
    {
      id: 2,
      author: "Verified Bike Owner",
      rating: 5,
      date: "Google Business Review",
      branch: "Chithode Branch",
      text: "Professional bike service workshop in Chithode region. Thorough checkup and clean delivery.",
    },
    {
      id: 3,
      author: "Two-Wheeler Owner",
      rating: 5,
      date: "Google Business Review",
      branch: "Chithode Branch",
      text: "Satisfied with their periodic service and chain maintenance work. Highly recommended local workshop.",
    },
  ] as ReviewItem[],
};

// SEO Helper: per-page canonical URL (spread into each page's metadata)
export function canonicalFor(path: string) {
  return { alternates: { canonical: `https://genbbikecare.com${path}` } };
}

// URL Helpers
export function getPhoneHref(phoneRaw: string): string {
  return `tel:${phoneRaw}`;
}

export function getWhatsAppHref(whatsapp: string, message: string): string {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getMapsHref(url: string): string {
  return url;
}
