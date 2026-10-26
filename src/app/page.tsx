import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    products = [];
  }

  return (
    <div className="w-full">
      {/* 1. FULL-BLEED CINEMATIC HERO (DIOR / SAINT LAURENT STYLE) */}
      <section className="relative h-screen w-full overflow-hidden bg-neutral-950">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
          alt="SELETICA Autumn Winter Campaign"
          className="w-full h-full object-cover object-center opacity-80 scale-105 transition-transform duration-[4000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="absolute bottom-14 left-6 md:left-12 right-6 md:right-12 flex flex-col md:flex-row md:items-end justify-between text-white gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-300">
              Collection N° 04 — Autumn / Winter 2026
            </p>
            <h1 className="font-editorial text-5xl sm:text-6xl md:text-8xl font-light italic tracking-tight leading-[0.95]">
              L'Élégance Silencieuse
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <Link className="px-8 py-4 bg-white text-black text-[11px] uppercase tracking-[0.3em] hover:bg-neutral-200 transition-colors" href="/shop/women/all">
              Explore Campaign
            </Link>
            <Link className="px-8 py-4 border border-white/60 text-white text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors" href="/lookbook">
              Lookbook
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VOGUE EDITORIAL MANIFESTO QUOTE */}
      <section className="py-28 md:py-36 px-6 md:px-12 max-w-5xl mx-auto text-center space-y-6">
        <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 block">
          Atelier Note — Issue 01
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light leading-snug text-neutral-900">
          “True luxury whispers. It is found in the architectural drape of heavyweight silhouette, the precision of a seam, and the absence of the unnecessary.”
        </h2>
        <div className="pt-2">
          <Link className="text-[11px] uppercase tracking-[0.3em] border-b border-black pb-1 hover:opacity-50 transition-opacity" href="/about">
            Discover Our Savoir-Faire
          </Link>
        </div>
      </section>

      {/* 3. ZARA-INSPIRED ASYMMETRIC DUAL EDITORIAL GRID */}
      <section className="px-6 md:px-12 pb-28 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Tall Portrait */}
          <div className="lg:col-span-7 group relative overflow-hidden">
            <Link className="block overflow-hidden bg-neutral-100 aspect-[3/4]" href="/shop/women/all">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85"
                alt="Women's Silhouette"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </Link>
            <div className="pt-4 flex justify-between items-baseline">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">01 / Silhouette</p>
                <h3 className="font-editorial text-2xl md:text-3xl italic mt-1">Pour Femme — Tailoring</h3>
              </div>
              <Link className="text-[11px] uppercase tracking-[0.25em] border-b border-black pb-0.5" href="/shop/women/all">
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Offset Portrait */}
          <div className="lg:col-span-5 lg:mt-32 group relative overflow-hidden">
            <Link className="block overflow-hidden bg-neutral-100 aspect-[4/5]" href="/shop/men/all">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
                alt="Men's Atelier"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </Link>
            <div className="pt-4 flex justify-between items-baseline">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">02 / Structure</p>
                <h3 className="font-editorial text-2xl md:text-3xl italic mt-1">Pour Homme — Monolith</h3>
              </div>
              <Link className="text-[11px] uppercase tracking-[0.25em] border-b border-black pb-0.5" href="/shop/men/all">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED ARCHIVAL PIECES (PRODUCT SHOWCASE) */}
      <section className="py-24 px-6 md:px-12 bg-[#FAF9F6] border-t border-b border-neutral-200">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                Curated Selection
              </p>
              <h2 className="font-editorial text-3xl md:text-5xl font-light italic mt-1">
                Key Runway Pieces
              </h2>
            </div>
            <Link className="text-[11px] uppercase tracking-[0.25em] border-b border-black pb-1 self-start sm:self-auto" href="/shop/women/all">
              View All Creations
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.length > 0 ? (
              products.map((product) => {
                let firstImage = "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80";
                try {
                  const parsed = JSON.parse(product.images);
                  if (Array.isArray(parsed) && parsed[0]) firstImage = parsed[0];
                } catch {
                  if (product.images?.startsWith("http")) firstImage = product.images;
                }

                return (
                  <Link className="group block" href={`/product/${product.id}`} key={product.id}>
                    <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-200 mb-4">
                      <img
                        src={firstImage}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="text-[11px] uppercase tracking-[0.2em] text-neutral-900 group-hover:opacity-60 transition-opacity">
                        {product.name}
                      </h3>
                      <span className="text-[11px] tracking-[0.15em] text-neutral-500">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              /* Fallback Luxury Editorial Placeholders if DB is empty */
              [
                {
                  id: "1",
                  name: "Structured Cashmere Overcoat",
                  price: "1,850.00",
                  img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
                },
                {
                  id: "2",
                  name: "Pleated Silk Evening Gown",
                  price: "2,400.00",
                  img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
                },
                {
                  id: "3",
                  name: "Heavyweight Atelier Trench",
                  price: "1,620.00",
                  img: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=900&q=80",
                },
                {
                  id: "4",
                  name: "Tailored Virgin Wool Blazer",
                  price: "1,290.00",
                  img: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&w=900&q=80",
                },
              ].map((item) => (
                <Link className="group block" href="/shop/women/all" key={item.id}>
                  <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-200 mb-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-[11px] uppercase tracking-[0.2em] text-neutral-900">
                      {item.name}
                    </h3>
                    <span className="text-[11px] tracking-[0.15em] text-neutral-500">
                      ${item.price}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. VOGUE MAGAZINE JOURNAL SPREAD */}
      <section className="py-28 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 pr-0 lg:pr-12">
            <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">
              Vogue Editorial / Le Journal
            </p>
            <h2 className="font-editorial text-4xl md:text-6xl font-light italic leading-[1.05]">
              The Architecture of Modern Monochrome
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-light max-w-xl">
              Exploring the intersection of brutalist geometry and fluid drapery. Inside the Paris studio where each garment is sculpted for permanence rather than season.
            </p>
            <div className="pt-4">
              <Link className="inline-block px-8 py-4 bg-black text-white text-[11px] uppercase tracking-[0.3em] hover:bg-neutral-800 transition-colors" href="/journal">
                Read The Feature
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=85"
                alt="Editorial Spread"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
