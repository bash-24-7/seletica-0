"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, User, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "./BrandLogo";

export function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const cartCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/85 backdrop-blur-md border-b border-white/10 text-brand-white transition-all duration-300">
        <div className="w-full max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="hover:opacity-70 transition-opacity"
              aria-label="Open Menu"
            >
              <Menu size={26} strokeWidth={1.5} />
            </button>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-white">
            <BrandLogo />
          </Link>

          <div className="flex items-center gap-5">
            <Link href="/search" className="hover:opacity-70 transition-opacity" aria-label="Search">
              <Search size={22} strokeWidth={1.5} />
            </Link>
            <Link href="/account" className="hover:opacity-70 transition-opacity hidden sm:block" aria-label="Account">
              <User size={22} strokeWidth={1.5} />
            </Link>
            <Link href="/cart" className="hover:opacity-70 transition-opacity relative flex items-center" aria-label="Cart">
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
              className="fixed inset-y-0 left-0 w-[400px] max-w-[85vw] bg-brand-black text-brand-white border-r border-white/10 z-[100] flex flex-col overflow-y-auto"
            >
              <div className="h-20 px-8 flex items-center justify-between border-b border-white/10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-ash">House Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-white hover:text-brand-ash transition-colors"
                >
                  <X size={26} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex flex-col py-8 font-sans">
                <div className="px-8 mb-8">
                  <h3 className="text-xs tracking-[0.2em] text-brand-ash mb-4 uppercase">Women</h3>
                  <div className="flex flex-col gap-4 text-xl font-serif">
                    <Link href="/shop/women/new-arrivals" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      New Arrivals
                    </Link>
                    <Link href="/shop/women/winter" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Winter Collection
                    </Link>
                    <Link href="/shop/women/summer" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Summer Collection
                    </Link>
                    <Link href="/shop/women/evening" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Evening Atelier
                    </Link>
                    <Link href="/shop/all/all" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      All 10-Piece Editions
                    </Link>
                  </div>
                </div>

                <div className="px-8 mb-8">
                  <h3 className="text-xs tracking-[0.2em] text-brand-ash mb-4 uppercase">Men</h3>
                  <div className="flex flex-col gap-4 text-xl font-serif">
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
                      All Men&apos;s Clothing
                    </Link>
                  </div>
                </div>

                <div className="px-8 mb-8 pt-8 border-t border-white/10">
                  <h3 className="text-xs tracking-[0.2em] text-brand-ash mb-4 uppercase">House & Concierge</h3>
                  <div className="flex flex-col gap-4 text-lg font-serif">
                    <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Brand Philosophy
                    </Link>
                    <Link href="/lookbook" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Lookbook
                    </Link>
                    <Link href="/journal" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Journal
                    </Link>
                    <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-brand-ash transition-colors">
                      Contact Concierge
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-auto p-8 border-t border-white/10 flex gap-8 text-xs tracking-widest uppercase text-brand-ash">
                <Link href="/account" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
                  Account
                </Link>
                <Link href="/search" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">
                  Search
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}