export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  gender: "WOMEN" | "MEN" | "UNISEX";
  season: "WINTER" | "SUMMER" | "EVENING" | "ALL_SEASON";
  price: number;
  stock: number;
  totalPieces: number;
  isPreOrder?: boolean;
  description: string;
  fabric: string;
  careGuide: string;
  craftsmanship: string;
  images: string[];
}

export const OUTSIDE_DHAKA_TAILOR_FEE = 5000;

export const CATALOG: Product[] = [
  {
    id: "sel-01",
    slug: "limited-evening-drape",
    name: "The Midnight Silk Evening Drape",
    subtitle: "Atelier Limited Edition — 22 Momme Como Silk",
    gender: "WOMEN",
    season: "EVENING",
    price: 180000,
    stock: 3,
    totalPieces: 10,
    description: "An architectural floor-length evening silhouette cut from heavyweight pure mulberry silk crepe de chine. Individually patterned to your exact anatomical measurements.",
    fabric: "100% 22-Momme Mulberry Silk sourced from Como, Italy.",
    careGuide: "Specialist dry clean only. Store on padded hanger.",
    craftsmanship: "45 hours of hand-pinned draping and French seam construction in our Dhaka Atelier.",
    images: [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2400&auto=format&fit=crop",
    ],
  },
  {
    id: "sel-02",
    slug: "structured-wool-blazer",
    name: "Structured Virgin Wool Blazer",
    subtitle: "Sharp Shoulder Bespoke Tailoring",
    gender: "WOMEN",
    season: "WINTER",
    price: 125000,
    stock: 6,
    totalPieces: 10,
    description: "Inspired by Milanese power tailoring. Features hand-padded roped shoulders, a sculpted waist, and horn buttons. Canvas-basted to your exact posture.",
    fabric: "100% Super 150s Italian Virgin Wool with Bemberg Cupro lining.",
    careGuide: "Dry clean only. Do not tumble dry.",
    craftsmanship: "Full floating horsehair canvas chest piece, hand-stitched lapels.",
    images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2400&auto=format&fit=crop"],
  },
  {
    id: "sel-03",
    slug: "double-breasted-cashmere-overcoat",
    name: "Artisanal Cashmere Greatcoat",
    subtitle: "Menswear Private Reserve",
    gender: "MEN",
    season: "WINTER",
    price: 210000,
    stock: 4,
    totalPieces: 10,
    description: "A commanding double-breasted overcoat with peak lapels and a clean, monolithic drop. Engineered around your exact chest, shoulder, and sleeve pitch.",
    fabric: "90% Virgin Wool, 10% Mongolian Grade-A Cashmere.",
    careGuide: "Specialist dry clean only.",
    craftsmanship: "Hand-felled collar, bespoke horn hardware, custom monogrammed pocket.",
    images: ["https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2400&auto=format&fit=crop"],
  },
  {
    id: "sel-04",
    slug: "pleated-wide-leg-trousers",
    name: "Fluid Pleated Gabardine Trousers",
    subtitle: "Architectural Wide-Leg Silhouette",
    gender: "WOMEN",
    season: "SUMMER",
    price: 79000,
    stock: 2,
    totalPieces: 10,
    description: "High-waisted wide-leg trousers featuring double deep front pleats and a concealed side closure. Tailored to your exact rise, waist, and heel height.",
    fabric: "Breathable high-twist wool-silk gabardine.",
    careGuide: "Dry clean only. Cool iron on reverse.",
    craftsmanship: "Hand-pressed pleats, silk-lined waistband.",
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2400&auto=format&fit=crop"],
  },
  {
    id: "sel-05",
    slug: "raw-silk-resort-tunic",
    name: "Unbleached Linen-Silk Atelier Shirt",
    subtitle: "Summer Sartorial Edition",
    gender: "MEN",
    season: "SUMMER",
    price: 74000,
    stock: 10,
    totalPieces: 10,
    isPreOrder: true,
    description: "Effortless warm-weather luxury. Cut from an artisanal blend of organic Belgian linen and raw mulberry silk.",
    fabric: "70% Belgian Linen, 30% Raw Mulberry Silk.",
    careGuide: "Gentle hand wash cold or dry clean.",
    craftsmanship: "Single-needle stitching at 22 stitches per inch.",
    images: ["https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=2400&auto=format&fit=crop"],
  },
  {
    id: "sel-06",
    slug: "cashmere-turtleneck-sweater",
    name: "Pure Scottish Cashmere Knit",
    subtitle: "Unisex Monolith Collection",
    gender: "UNISEX",
    season: "WINTER",
    price: 85000,
    stock: 5,
    totalPieces: 10,
    description: "Loomed from 4-ply Scottish cashmere for an enveloping hand feel. Custom-knitted to your torso and arm length.",
    fabric: "100% Grade-A Scottish Cashmere.",
    careGuide: "Hand wash cold with cashmere shampoo. Dry flat.",
    craftsmanship: "Fully-fashioned linked seams, ribbed cuffs and collar.",
    images: ["https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=2400&auto=format&fit=crop"],
  },
];