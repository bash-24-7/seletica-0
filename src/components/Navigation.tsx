"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, User, X } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    // Only access zustand store on the client side after mounting
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const cartCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white transition-all duration-300">
        <div className="w-full px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setMenuOpen(true)}
              className="hover:opacity-70 transition-opacity"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <Image src="/logo.png" alt="SELETICA" width={400} height={133} className="object-contain h-24 sm:h-28 lg:h-32 w-auto scale-125 origin-center" priority />
          </Link>

          <div className="flex items-center gap-6">
            <button className="hover:opacity-70 transition-opacity hidden sm:block">
              <Search size={24} strokeWidth={1.5} />
            </button>
            <Link href="/account" className="hover:opacity-70 transition-opacity hidden sm:block">
              <User size={24} strokeWidth={1.5} />
            </Link>
            <Link href="/cart" className="hover:opacity-70 transition-opacity relative flex items-center">
              <ShoppingBag size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Zara Style Drawer Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[90] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
              className="fixed inset-y-0 left-0 w-[400px] max-w-[85vw] bg-background border-r border-white/10 z-[100] flex flex-col overflow-y-auto"
            >
              <div className="h-20 px-8 flex items-center border-b border-white/10">
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="text-foreground hover:text-brand-ash transition-colors"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </div>
              
              <div className="flex flex-col py-8 font-sans">
                <div className="px-8 mb-8">
                  <h3 className="text-xs tracking-[0.2em] text-brand-ash mb-4 uppercase">Women</h3>
                  <div className="flex flex-col gap-4 text-xl">
                    <Link href="/shop/women/new-arrivals" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      New Arrivals
                    </Link>
                    <Link href="/shop/women/winter" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Winter Collection
                    </Link>
                    <Link href="/shop/women/summer" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Summer Collection
                    </Link>
                    <Link href="/shop/all/all" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      All Clothing
                    </Link>
                  </div>
                </div>

                <div className="px-8 mb-8">
                  <h3 className="text-xs tracking-[0.2em] text-brand-ash mb-4 uppercase">Men</h3>
                  <div className="flex flex-col gap-4 text-xl">
                    <Link href="/shop/men/new-arrivals" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      New Arrivals
                    </Link>
                    <Link href="/shop/men/winter" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Winter Collection
                    </Link>
                    <Link href="/shop/men/summer" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Summer Collection
                    </Link>
                    <Link href="/shop/men/all" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      All Clothing
                    </Link>
                  </div>
                </div>

                <div className="px-8 mb-8 pt-8 border-t border-white/10">
                  <h3 className="text-xs tracking-[0.2em] text-brand-ash mb-4 uppercase">Editorial</h3>
                  <div className="flex flex-col gap-4 text-xl">
                    <Link href="/journal" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Campaigns
                    </Link>
                    <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Brand Philosophy
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto p-8 border-t border-white/10 flex gap-8 text-sm tracking-widest uppercase text-brand-ash">
                 <Link href="/account" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Account</Link>
                 <Link href="/search" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Search</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
