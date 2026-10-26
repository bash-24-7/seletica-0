"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const campaigns = [
  {
    id: 1,
    title: "The Midnight Silhouette",
    season: "Winter 2026",
    span: "col-span-1 md:col-span-2 aspect-[16/9]",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=3540&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Architecture of Silk",
    season: "Behind The Design",
    span: "col-span-1 aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2787&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "A Study in Monochrome",
    season: "Editorial",
    span: "col-span-1 aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2787&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "The Craftsmanship Behind 10 Pieces",
    season: "Brand Philosophy",
    span: "col-span-1 md:col-span-2 aspect-[21/9]",
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=2772&auto=format&fit=crop"
  }
];

export default function JournalPage() {
  const containerRef = useRef(null);

  return (
    <main ref={containerRef} className="min-h-screen bg-brand-white text-brand-black pt-32 pb-24 selection:bg-brand-black selection:text-brand-white">
      <div className="max-w-[95vw] mx-auto">
        <header className="mb-24 flex flex-col items-center text-center">
          <motion.span 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-[10px] uppercase tracking-[0.4em] text-brand-ash mb-8 block font-semibold"
          >
            Editorials & Campaigns
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-serif text-6xl md:text-8xl lg:text-[9rem] tracking-tight leading-none mb-8"
          >
            Journal
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[1px] bg-brand-black/20"
          />
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`group relative overflow-hidden bg-brand-beige cursor-pointer ${campaign.span}`}
            >
              <Image 
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 z-10" />
              
              <div className="absolute inset-0 z-20 p-8 lg:p-12 flex flex-col justify-end transition-opacity duration-700 text-white">
                <motion.span 
                  className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] mb-4 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0"
                >
                  {campaign.season}
                </motion.span>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white transform transition-transform duration-500 group-hover:-translate-y-2">{campaign.title}</h2>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}
