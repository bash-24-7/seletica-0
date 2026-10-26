"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<any>(null);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Bespoke Selection State
  const [fittingType, setFittingType] = useState<"tailor" | "measurements">("tailor");
  const [tailorGender, setTailorGender] = useState<string>("Female Master Tailor");
  const [tailorAddress, setTailorAddress] = useState<string>("");
  const [tailorDate, setTailorDate] = useState<string>("");
  const [tailorContact, setTailorContact] = useState<string>("");
  const [measurementsDetails, setMeasurementsDetails] = useState<string>("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/admin/products`);
        if (res.ok) {
          const all = await res.json();
          const found = all.find((p: any) => String(p.id) === String(id));
          if (found) setProduct(found);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 animate-pulse">
          Loading Archive Piece...
        </p>
      </div>
    );
  }

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [product.images || "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85"];
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: images[0],
      quantity: 1,
      fittingType,
      tailorGender: fittingType === "tailor" ? tailorGender : undefined,
      tailorAddress: fittingType === "tailor" ? tailorAddress : undefined,
      tailorDate: fittingType === "tailor" ? tailorDate : undefined,
      tailorContact: fittingType === "tailor" ? tailorContact : undefined,
      measurementsDetails: fittingType === "measurements" ? measurementsDetails : undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Zara/Dior Vertical Seamless Image Stack */}
        <div className="lg:col-span-7 space-y-4">
          {images.map((img, idx) => (
            <div key={idx} className="aspect-[3/4] w-full bg-neutral-100 overflow-hidden">
              <img
                src={img}
                alt={`${product.name} - View ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Right: Sticky Couture Details Panel */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-8 max-w-md lg:ml-auto">
            <div className="space-y-2 border-b border-neutral-200 pb-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                SELETICA Archive — Ref. {String(product.id).slice(0, 6).toUpperCase()}
              </p>
              <h1 className="font-editorial text-3xl md:text-4xl font-light italic">
                {product.name}
              </h1>
              <p className="text-sm tracking-[0.2em] pt-2">
                ${Number(product.price).toFixed(2)} USD
              </p>
            </div>

            <p className="text-xs leading-relaxed text-neutral-600 font-light">
              {product.description ||
                "Crafted with architectural precision from heavyweight luxury textiles. Designed for an elongated, effortless silhouette."}
            </p>

            {/* Bespoke Atelier Fitting Selector */}
            <div className="space-y-6 pt-4 border-t border-neutral-200">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.25em]">
                <span className="font-semibold text-neutral-900">Bespoke Atelier Fitting</span>
                <span className="text-neutral-400">Couture Service</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setFittingType("tailor")}
                  className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] border transition-colors ${
                    fittingType === "tailor" ? "border-black bg-black text-white" : "border-neutral-200 text-neutral-500 hover:border-black hover:text-black"
                  }`}
                >
                  At-Home Tailor
                </button>
                <button
                  onClick={() => setFittingType("measurements")}
                  className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] border transition-colors ${
                    fittingType === "measurements" ? "border-black bg-black text-white" : "border-neutral-200 text-neutral-500 hover:border-black hover:text-black"
                  }`}
                >
                  My Measurements
                </button>
              </div>

              {fittingType === "tailor" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                  <select
                    value={tailorGender}
                    onChange={(e) => setTailorGender(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-300 py-2 text-[11px] tracking-[0.15em] focus:outline-none focus:border-black uppercase"
                  >
                    <option value="Female Master Tailor">Female Master Tailor</option>
                    <option value="Male Master Tailor">Male Master Tailor</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Home Address"
                    value={tailorAddress}
                    onChange={(e) => setTailorAddress(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-300 py-2 text-[11px] tracking-[0.15em] focus:outline-none focus:border-black placeholder:uppercase placeholder:text-neutral-400"
                  />
                  <input
                    type="text"
                    placeholder="Preferred Date & Time"
                    value={tailorDate}
                    onChange={(e) => setTailorDate(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-300 py-2 text-[11px] tracking-[0.15em] focus:outline-none focus:border-black placeholder:uppercase placeholder:text-neutral-400"
                  />
                  <input
                    type="text"
                    placeholder="Contact Number"
                    value={tailorContact}
                    onChange={(e) => setTailorContact(e.target.value)}
                    className="w-full bg-transparent border-b border-neutral-300 py-2 text-[11px] tracking-[0.15em] focus:outline-none focus:border-black placeholder:uppercase placeholder:text-neutral-400"
                  />
                </div>
              )}

              {fittingType === "measurements" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                  <textarea
                    placeholder="Enter Exact Measurements (Chest, Waist, Hips, Shoulder, Sleeve, Length) or paste a link to your measurement chart."
                    value={measurementsDetails}
                    onChange={(e) => setMeasurementsDetails(e.target.value)}
                    rows={4}
                    className="w-full bg-transparent border border-neutral-300 p-3 text-[11px] tracking-[0.15em] focus:outline-none focus:border-black placeholder:uppercase placeholder:text-neutral-400 resize-none"
                  ></textarea>
                </div>
              )}
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-black text-white text-[11px] uppercase tracking-[0.3em] hover:bg-neutral-800 transition-colors"
            >
              {added ? "Added to Your Bag" : "Add to Shopping Bag"}
            </button>

            {/* Atelier Specifications */}
            <div className="pt-6 border-t border-neutral-200 space-y-4 text-[11px] tracking-[0.15em] text-neutral-500">
              <div className="flex justify-between">
                <span className="uppercase text-neutral-900">Composition</span>
                <span>100% Archival Grade Textile</span>
              </div>
              <div className="flex justify-between">
                <span className="uppercase text-neutral-900">Complimentary Shipping</span>
                <span>Express Couture Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
