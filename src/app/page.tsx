"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { UserCheck, Ruler, Mail } from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("success");
    }
    setEmail("");
  };

  return (
    <div className="w-full overflow-x-hidden bg-brand-black text-brand-white">
      <section className="h-screen w-full relative flex flex-col justify-end pb-24 px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2400&auto=format&fit=crop"
            alt="Seletica Editorial Hero"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-20 w-full flex flex-col items-center justify-center text-center h-full pt-24">
          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 text-brand-white/90">
            10-Piece Limited Edition • Bespoke Mapped Fit
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-10">
            SELETICA
          </h1>
          <Link
            href="/shop/all/all"
            className="bg-white text-black px-8 py-4 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-white/90 transition-colors"
          >
            Discover The Collection
          </Link>
        </div>
      </section>

      <section className="min-h-screen w-full flex items-center justify-center bg-brand-beige text-brand-black px-6 md:px-12 py-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2 relative h-[50vh] md:h-[70vh] min-h-[340px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2400&auto=format&fit=crop"
              alt="The Evening Drape"
              fill
              className="object-cover"
            />
            <div className="absolute top-6 left-6 bg-brand-black text-brand-white px-4 py-2 text-[10px] tracking-widest uppercase font-semibold">
              Only 10 Made Worldwide
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-ash block mb-3 font-semibold">
              No Prefixed Sizes • Custom Mapped
            </span>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">The Evening Drape</h2>
            <p className="text-brand-black/70 font-light text-base md:text-lg mb-8 max-w-md leading-relaxed">
              Cut from fluid, heavy 22-momme silk crepe de chine sourced from Como, Italy. Tailored exclusively to your anatomical measurements via our visiting Male/Female Master Tailor or your email dossier.
            </p>
            <div className="w-full max-w-xs mb-8">
              <div className="flex justify-between text-xs tracking-widest uppercase mb-2 font-semibold">
                <span>Available</span>
                <span>3 / 10</span>
              </div>
              <div className="w-full h-1 bg-brand-black/10">
                <div className="h-full bg-brand-black w-[30%]" />
              </div>
            </div>
            <Link
              href="/product/limited-evening-drape"
              className="bg-brand-black text-brand-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-brand-black/80 transition-colors"
            >
              Reserve Yours
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-zinc-950 border-y border-white/10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-ash block mb-4">
              The Seletica Fitting Protocol
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl mb-6">Beyond Prefixed Sizing</h2>
            <p className="text-sm text-brand-ash leading-relaxed">
              We never use generic S, M, or L sizing. When you reserve a piece, you choose how your measurements are mapped.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-white/10 bg-black p-8 space-y-4">
              <UserCheck size={26} strokeWidth={1.2} />
              <h3 className="font-serif text-2xl">Male or Female Specialist</h3>
              <p className="text-xs text-brand-ash leading-relaxed">
                Select a seasoned Male or Female measurement mapping person to visit your residence or office.
              </p>
            </div>
            <div className="border border-white/10 bg-black p-8 space-y-4">
              <Ruler size={26} strokeWidth={1.2} />
              <h3 className="font-serif text-2xl">Inside Dhaka Free • Outside Dhaka</h3>
              <p className="text-xs text-brand-ash leading-relaxed">
                In-person mapping is Free Inside Dhaka. Outside Dhaka requires a ৳5,000 travel allowance & logistics fee for the visiting specialist.
              </p>
            </div>
            <div className="border border-white/10 bg-black p-8 space-y-4">
              <Mail size={26} strokeWidth={1.2} />
              <h3 className="font-serif text-2xl">Self-Provided Data via Mail</h3>
              <p className="text-xs text-brand-ash leading-relaxed">
                Choose Self-Provided Data at checkout and send your measurements via mail to seletica.official@gmail.com for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-24 bg-brand-black text-brand-white">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 mb-20">
          <BrandLogo className="text-brand-white scale-125 mb-4" />
          <h2 className="font-serif text-3xl md:text-5xl">Exclusivity in Every Thread.</h2>
          <p className="text-brand-ash text-base md:text-xl font-light leading-relaxed max-w-2xl">
            Strictly limited to 10 pieces per design worldwide. Never restocked. Never reproduced.
          </p>
          <Link href="/about" className="uppercase tracking-widest text-sm border-b border-white/40 pb-1 hover:border-white">
            Read Our Story
          </Link>
        </div>

        <div className="max-w-2xl mx-auto w-full text-center border-t border-white/10 pt-16">
          <h3 className="font-serif text-2xl md:text-3xl mb-4">Join The Inner Circle</h3>
          <form className="flex flex-col md:flex-row gap-4 w-full mt-6" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-b border-white/40 py-3 px-4 focus:outline-none focus:border-white text-sm text-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white/90"
            >
              Subscribe
            </button>
          </form>
          {status === "success" && <p className="text-sm text-green-400 mt-4">Welcome to the Inner Circle.</p>}
        </div>
      </section>
    </div>
  );
}