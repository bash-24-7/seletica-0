import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-white/10 pt-20 pb-10">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col gap-6">
          <Image src="/logo.png" alt="SELETICA" width={400} height={133} className="object-contain h-24 sm:h-32 w-auto invert dark:invert-0 opacity-80 origin-left" />
          <p className="text-sm text-brand-ash max-w-xs leading-relaxed">
            Premium fashion label specializing in limited-edition collections for men and women. Quiet luxury, modern elegance, and timeless fashion.
          </p>
        </div>
        
        <div>
          <h4 className="font-serif text-lg mb-6 tracking-wide">Shop</h4>
          <ul className="flex flex-col gap-4 text-sm text-brand-ash">
            <li><Link href="/shop/all/all" className="hover:text-foreground transition-colors">All Collections</Link></li>
            <li><Link href="/shop/women/winter" className="hover:text-foreground transition-colors">Winter Collection</Link></li>
            <li><Link href="/shop/women/summer" className="hover:text-foreground transition-colors">Summer Collection</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 tracking-wide">Brand</h4>
          <ul className="flex flex-col gap-4 text-sm text-brand-ash">
            <li><Link href="/about" className="hover:text-foreground transition-colors">About Seletica</Link></li>
            <li><Link href="/journal" className="hover:text-foreground transition-colors">Journal</Link></li>
            <li><Link href="/lookbook" className="hover:text-foreground transition-colors">Lookbook</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 tracking-wide">Help</h4>
          <ul className="flex flex-col gap-4 text-sm text-brand-ash">
            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms & Privacy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 border-t border-white/10 pt-8 pb-4 flex gap-6 text-sm text-brand-ash justify-center md:justify-end">
        <a href="https://www.instagram.com/seletica.official" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          Instagram
        </a>
        <a href="https://www.facebook.com/seletica" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          Facebook
        </a>
      </div>
      
      <div className="max-w-screen-2xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-ash">
        <p>&copy; {new Date().getFullYear()} SELETICA. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
