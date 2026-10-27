"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-brand-black text-brand-white border-t border-white/10 pt-20 pb-10">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col items-start gap-6">
          <BrandLogo className="items-start text-white" />
          <p className="text-sm text-brand-ash max-w-xs leading-relaxed">
            Premium fashion label specializing in 10-piece limited-edition collections with bespoke anatomical measurement mapping.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 tracking-wide">Shop</h4>
          <ul className="flex flex-col gap-4 text-sm text-brand-ash">
            <li><Link href="/shop/all/all" className="hover:text-white transition-colors">All Collections</Link></li>
            <li><Link href="/shop/women/winter" className="hover:text-white transition-colors">Winter Collection</Link></li>
            <li><Link href="/shop/women/summer" className="hover:text-white transition-colors">Summer Collection</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 tracking-wide">Brand</h4>
          <ul className="flex flex-col gap-4 text-sm text-brand-ash">
            <li><Link href="/about" className="hover:text-white transition-colors">About Seletica</Link></li>
            <li><Link href="/journal" className="hover:text-white transition-colors">Journal</Link></li>
            <li><Link href="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 tracking-wide">Help & Bespoke Fitting</h4>
          <ul className="flex flex-col gap-4 text-sm text-brand-ash">
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Privacy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 border-t border-white/10 pt-8 pb-4 flex gap-6 text-sm text-brand-ash justify-center md:justify-end">
        <a href="https://www.instagram.com/seletica.official" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          Instagram
        </a>
        <a href="https://www.facebook.com/seletica" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          Facebook
        </a>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-ash">
        <p>&copy; {new Date().getFullYear()} SELETICA. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}