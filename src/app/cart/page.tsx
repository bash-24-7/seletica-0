"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen pt-32 px-6">Loading...</div>;
  }

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag size={48} className="mb-6 text-brand-ash" strokeWidth={1} />
        <h1 className="font-serif text-3xl mb-4">Your Cart is Empty</h1>
        <p className="text-brand-ash font-light mb-8 max-w-md">
          Discover our limited edition collections and find your next statement piece.
        </p>
        <Link 
          href="/shop/women/all"
          className="border border-brand-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-brand-black hover:text-brand-white transition-colors"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-32">
      <h1 className="font-serif text-4xl mb-12">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {items.map((item) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={item.id} 
              className="flex gap-6 border-b border-brand-black/10 pb-8"
            >
              <div className="relative w-24 sm:w-32 aspect-[3/4] bg-zinc-900 shrink-0">
                <Image 
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-brand-ash hover:text-brand-black transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-brand-ash mb-4">Size: Medium</p> {/* Placeholder for actual size logic if implemented later */}
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-xs tracking-widest text-brand-ash uppercase">Qty: {item.quantity}</p>
                  <p className="tracking-wider">৳{item.price.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-zinc-900/50 p-8 border border-brand-black/5">
            <h2 className="font-serif text-2xl mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8 text-sm font-light text-brand-ash border-b border-brand-black/10 pb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-brand-black">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-brand-black">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="text-brand-black">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-sm tracking-widest uppercase">Total</span>
              <span className="text-2xl tracking-wider">৳{subtotal.toLocaleString()}</span>
            </div>

            <Link 
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-brand-black text-brand-white py-4 text-xs tracking-[0.2em] uppercase hover:bg-brand-black/90 transition-colors"
            >
              Secure Checkout <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
