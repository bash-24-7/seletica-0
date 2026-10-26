"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, use } from "react";
import { Heart, Ruler, Truck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  // We are simulating a database fetch. We will make any item with "temp" in ID that ends in "1" a preorder item to match our shop generator.
  const isPreOrder = resolvedParams.id.includes("temp") && resolvedParams.id.endsWith("1");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addItem({
      id: resolvedParams.id,
      name: "Silk Evening Drape",
      price: 125000,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400&auto=format&fit=crop",
      quantity: 1,
    });
    alert(isPreOrder ? "Added to pre-orders" : "Added to cart");
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-[3/4] w-full bg-zinc-900"
          >
            <Image 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400&auto=format&fit=crop"
              alt="Silk Evening Drape"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="relative aspect-[3/4] bg-zinc-900">
                <Image 
                  src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400&auto=format&fit=crop&sig=${i + 20}`}
                  alt="Detail view"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-32"
          >
            <div className="mb-8">
              <div className="flex gap-3 mb-6">
                <div className="inline-block border border-foreground px-3 py-1 text-xs tracking-widest uppercase">
                  {isPreOrder ? "0 of 10 Available" : "Piece 3 of 10"}
                </div>
                <div className={`inline-block px-3 py-1 text-xs tracking-widest uppercase font-medium ${isPreOrder ? "bg-white text-black font-bold" : "bg-zinc-800 text-brand-ash"}`}>
                  {isPreOrder ? "UPCOMING DESIGN" : "Never Restocked"}
                </div>
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl mb-4">Silk Evening Drape</h1>
              <p className="text-xl tracking-wider mb-6">৳125,000</p>
              <p className="text-brand-ash font-light leading-relaxed">
                A masterpiece of minimalist design. Crafted from 100% heavyweight pure silk, this evening drape embodies modern elegance with its fluid silhouette and impeccable tailoring.
                {isPreOrder && " This is an upcoming design available for pre-order. Secure your piece before the official release."}
              </p>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm tracking-widest uppercase">Size</span>
                <button className="text-xs text-brand-ash flex items-center gap-2 hover:text-foreground transition-colors">
                  <Ruler size={14} /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {['XS', 'S', 'M', 'L'].map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-3 text-sm transition-colors ${
                      selectedSize === size 
                        ? 'border-foreground bg-foreground text-background' 
                        : 'border-white/20 hover:border-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-foreground text-background py-4 text-sm tracking-widest uppercase hover:bg-white/90 transition-colors"
              >
                {isPreOrder ? "Pre-Order Now" : "Add to Cart"}
              </button>
              <button className="border border-white/20 p-4 hover:border-foreground transition-colors flex items-center justify-center">
                <Heart size={20} />
              </button>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col gap-6">
              <details className="group cursor-pointer">
                <summary className="flex justify-between items-center text-sm tracking-widest uppercase font-medium">
                  Fabric & Craftsmanship
                  <span className="group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-sm text-brand-ash font-light leading-relaxed">
                  <p className="mb-4">
                    Cut from fluid, heavy silk crepe de chine sourced from Como, Italy. 
                    The drape is hand-pinned and finished in our atelier, taking over 40 hours of meticulous craftsmanship.
                  </p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>100% Heavyweight Pure Silk (22 Momme)</li>
                    <li>Hand-finished French seams</li>
                    <li>Concealed invisible side zip</li>
                    <li>Bespoke hardware detailing</li>
                  </ul>
                </div>
              </details>

              <details className="group cursor-pointer">
                <summary className="flex justify-between items-center text-sm tracking-widest uppercase font-medium">
                  Care Guide
                  <span className="group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-sm text-brand-ash font-light leading-relaxed">
                  <p className="mb-2">This is a delicate garment requiring specialist care.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Specialist dry clean only</li>
                    <li>Do not tumble dry</li>
                    <li>Cool iron on reverse</li>
                    <li>Store flat or on padded hanger</li>
                  </ul>
                </div>
              </details>
              
              <details className="group cursor-pointer">
                <summary className="flex justify-between items-center text-sm tracking-widest uppercase font-medium">
                  Shipping & Returns
                  <span className="group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="mt-4 text-sm text-brand-ash font-light leading-relaxed">
                  <div className="flex items-start gap-4 mb-4">
                    <Truck size={20} className="shrink-0 mt-1" />
                    <p>{isPreOrder ? "Pre-orders will ship on the official release date. Complimentary express global shipping on all limited edition pieces." : "Complimentary express global shipping on all limited edition pieces. Delivery within 3-5 business days."}</p>
                  </div>
                  <p>14-day return window. Garment must be unworn with all security tags attached.</p>
                </div>
              </details>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
