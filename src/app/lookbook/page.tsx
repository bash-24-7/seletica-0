"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LookbookPage() {
  return (
    <div className="w-full min-h-screen pt-32 pb-32 bg-brand-white text-brand-black selection:bg-brand-black selection:text-brand-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-32 text-center px-4"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-brand-ash mb-8 block font-semibold">Editorial</span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight">Campaign</h1>
        <p className="text-brand-black/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light">
          An editorial exploration of modern elegance, capturing the fluid silhouettes and quiet luxury of our collection.
        </p>
      </motion.div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col gap-32 md:gap-56">
        
        {/* Look 1 */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-[60%] aspect-[4/5] relative bg-brand-beige"
          >
            <Image 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2400&auto=format&fit=crop"
              alt="Lookbook Campaign 1"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-[40%] flex flex-col px-4"
          >
            <h2 className="font-serif text-3xl md:text-5xl mb-6">Look 01</h2>
            <p className="text-brand-black/60 text-sm md:text-base font-light leading-relaxed mb-10">
              The Silk Crepe De Chine Evening Drape paired with bespoke artisanal hardware. A study in uninterrupted lines and pure minimalism.
            </p>
            <span className="text-[10px] tracking-[0.2em] font-semibold uppercase border-b border-black/40 pb-2 w-max hover:border-black transition-colors cursor-pointer">Shop The Look</span>
          </motion.div>
        </div>

        {/* Look 2 */}
        <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-[60%] aspect-[4/5] relative bg-brand-beige"
          >
            <Image 
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2400&auto=format&fit=crop"
              alt="Lookbook Campaign 2"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-[40%] flex flex-col px-4 md:items-end md:text-right"
          >
            <h2 className="font-serif text-3xl md:text-5xl mb-6">Look 02</h2>
            <p className="text-brand-black/60 text-sm md:text-base font-light leading-relaxed mb-10 md:max-w-sm">
              Modern tailoring redefined. The structured wool blazer cut from virgin Italian wool over fluid trousers. Sharp yet inherently effortless.
            </p>
            <span className="text-[10px] tracking-[0.2em] font-semibold uppercase border-b border-black/40 pb-2 w-max hover:border-black transition-colors cursor-pointer">Shop The Look</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
