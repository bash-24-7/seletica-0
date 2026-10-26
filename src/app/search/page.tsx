"use client";

import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const suggestions = [
  "Silk Dresses",
  "Winter Coats",
  "Cashmere Sweaters",
  "Limited Edition Bags",
  "Black Turtlenecks"
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-32 px-6 lg:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto mt-20 lg:mt-32"
      >
        <div className="relative group">
          <SearchIcon className="absolute left-0 bottom-4 text-brand-ash group-focus-within:text-white transition-colors" size={32} strokeWidth={1} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search SELETICA..." 
            className="w-full bg-transparent border-b border-white/20 pb-4 pl-14 text-4xl md:text-6xl lg:text-7xl font-serif text-white placeholder-white/20 focus:outline-none focus:border-white transition-all duration-500"
            autoFocus
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-brand-ash mb-6">Popular Searches</h3>
          <div className="flex flex-wrap gap-4">
            {suggestions.map((suggestion, idx) => (
              <button 
                key={idx}
                onClick={() => setQuery(suggestion)}
                className="font-sans text-sm md:text-base text-white hover:text-black border border-white/20 hover:bg-white px-6 py-3 rounded-full transition-all duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}