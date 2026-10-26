"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const fadeUp: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-brand-white text-brand-black pt-32 pb-24 overflow-hidden selection:bg-brand-black selection:text-brand-white">
      
      {/* Hero Section */}
      <section className="h-[80vh] flex flex-col items-center justify-center text-center px-6 lg:px-12 mb-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-brand-ash mb-8 block font-semibold">The House of Seletica</span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] max-w-5xl mx-auto">
            Quiet Luxury. <br /> Modern Elegance.
          </h1>
          <p className="font-sans text-lg md:text-xl text-brand-black/60 leading-relaxed max-w-2xl mx-auto font-light">
            A premium fashion label born from a desire to return exclusivity and timelessness to the modern wardrobe. We believe in owning fewer, better things.
          </p>
        </motion.div>
      </section>

      {/* Brand Story / Vision */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative aspect-[4/5] w-full"
          >
            <Image 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2400&auto=format&fit=crop"
              alt="Brand Story"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-ash mb-6 font-semibold">Our Vision & Mission</span>
            <h2 className="font-serif text-4xl lg:text-5xl mb-8 leading-tight">
              Redefining <br/> Modern Luxury.
            </h2>
            <div className="space-y-6 font-sans text-brand-black/70 leading-relaxed font-light">
              <p>
                Our mission is to create a sanctuary of style where quality takes precedence over quantity. We envision a world where garments are cherished as heirlooms, not discarded as trends.
              </p>
              <p>
                SELETICA is a commitment to the art of dressing well. It is an exploration of form, fabric, and restraint.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy (10 Pieces) */}
      <section className="bg-brand-beige py-32 mb-40 px-6 lg:px-12">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="order-2 lg:order-1 flex flex-col justify-center lg:pl-12"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-ash mb-6 font-semibold">The Philosophy</span>
            <h2 className="font-serif text-4xl lg:text-6xl mb-8 leading-tight">
              Only 10 Pieces.<br/> Ever.
            </h2>
            <div className="space-y-6 font-sans text-brand-black/70 leading-relaxed font-light">
              <p>
                In a world of mass production, true luxury lies in rarity. Every single design crafted by SELETICA is strictly limited to an edition of exactly 10 pieces worldwide.
              </p>
              <p>
                Once a piece is claimed, it is gone forever. This unwavering commitment ensures that your garment remains exceptionally rare, serving as a distinct expression of your individuality.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="order-1 lg:order-2 relative aspect-[3/4] w-full max-w-lg mx-auto"
          >
            <Image 
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2400&auto=format&fit=crop"
              alt="10 Pieces Philosophy"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship & Materials */}
      <section className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-40">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.3em] text-brand-ash mb-6 block font-semibold"
          >
            Craftsmanship
          </motion.span>
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-serif text-4xl lg:text-5xl leading-tight mb-6"
          >
            The Art of Construction
          </motion.h2>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-sans text-brand-black/70 leading-relaxed font-light"
          >
            We partner exclusively with multi-generational mills in Italy and Japan. From 22-momme silk to virgin wool, our materials are selected for their unparalleled drape, longevity, and tactile brilliance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative aspect-square">
              <Image src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=2400&auto=format&fit=crop" alt="Fabric details" fill className="object-cover" />
           </motion.div>
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="relative aspect-square">
              <Image src="https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2400&auto=format&fit=crop" alt="Tailoring details" fill className="object-cover" />
           </motion.div>
        </div>
      </section>

      {/* Values & Sustainability */}
      <section className="bg-brand-black text-brand-white py-32 px-6 lg:px-12 mb-40">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6 block font-semibold">Values</span>
            <h2 className="font-serif text-4xl lg:text-5xl">What Makes Us Different</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center">
              <div className="w-px h-12 bg-white/20 mb-8"></div>
              <h3 className="font-serif text-2xl mb-4">Timeless Fashion</h3>
              <p className="font-sans text-white/60 leading-relaxed font-light text-sm">
                Designs untethered by seasonal trends. Created to remain elegant and relevant for decades.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center">
              <div className="w-px h-12 bg-white/20 mb-8"></div>
              <h3 className="font-serif text-2xl mb-4">Sustainability</h3>
              <p className="font-sans text-white/60 leading-relaxed font-light text-sm">
                By producing only 10 pieces per design, we eliminate deadstock and minimize our environmental footprint. Zero waste, infinite value.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center">
              <div className="w-px h-12 bg-white/20 mb-8"></div>
              <h3 className="font-serif text-2xl mb-4">Minimalism</h3>
              <p className="font-sans text-white/60 leading-relaxed font-light text-sm">
                Stripped of clutter. We focus on architectural silhouettes and beautiful drape over unnecessary embellishment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote / Founder */}
      <section className="py-24 px-6 lg:px-12 text-center max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-ash mb-12 block font-semibold">Founder&apos;s Message</span>
          <h2 className="font-serif text-3xl md:text-5xl leading-relaxed italic text-brand-black mb-12">
            "We do not create clothing for the masses. We craft artifacts for the individual. True luxury is having something no one else has."
          </h2>
          <div className="w-12 h-px bg-brand-black mx-auto mb-6"></div>
          <p className="font-sans tracking-widest uppercase text-xs font-semibold">The Founder, Seletica</p>
        </motion.div>
      </section>

    </main>
  );
}
