"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok || data.message === 'Subscribed offline') {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <div className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-brand-white relative hide-scrollbar text-brand-black">
      
      {/* 1. Cinematic Hero */}
      <section className="h-screen w-full relative snap-center snap-always flex flex-col justify-end pb-24 px-6 md:px-12 bg-brand-black text-brand-white">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=3540&auto=format&fit=crop"
            alt="Seletica Editorial Hero"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
        
        <div className="relative z-20 w-full flex flex-col items-center justify-center text-center h-full pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 text-brand-white/80">Premium Limited Edition</p>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-12"
          >
            SELETICA
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link href="/shop/all/all" className="uppercase tracking-[0.2em] text-xs md:text-sm border-b border-white/40 pb-2 hover:border-white transition-colors">
              Discover The Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Limited Edition Urgency */}
      <section className="min-h-screen h-auto w-full relative snap-center snap-always flex items-center justify-center bg-brand-beige px-6 md:px-12 py-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2 relative h-[40vh] md:h-[70vh] min-h-[300px] group overflow-hidden">
             <Image 
                src="https://images.unsplash.com/photo-1524041255072-7da0525d6b34?q=80&w=2400&auto=format&fit=crop" 
                alt="Limited Edition Dress" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute top-6 left-6 bg-brand-white text-brand-black px-4 py-2 text-[10px] tracking-widest uppercase font-semibold">
               Only 10 Made
             </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-6xl mb-6 text-brand-black">The Evening Drape</h2>
              <p className="text-brand-ash font-light text-lg mb-8 max-w-md leading-relaxed">
                A masterpiece of minimalist design. Cut from fluid, heavy silk crepe de chine sourced from Como, Italy. Never to be reproduced.
              </p>
              
              <div className="w-full max-w-xs mb-8">
                <div className="flex justify-between text-xs tracking-widest uppercase mb-2 text-brand-black font-semibold">
                  <span>Available</span>
                  <span>3 / 10</span>
                </div>
                <div className="w-full h-1 bg-brand-black/10">
                  <div className="h-full bg-brand-black w-[30%]" />
                </div>
              </div>

              <div className="flex flex-wrap w-full">
                <Link href="/product/limited-evening-drape" className="bg-brand-black text-brand-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-brand-black/80 transition-colors inline-block text-center w-full sm:w-auto">
                  Reserve Yours
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Magazine Style Collections */}
      <section className="h-screen w-full relative snap-center snap-always bg-brand-white px-6 md:px-12 py-12 flex flex-col justify-center">
         <div className="text-center mb-12">
           <h2 className="font-serif text-4xl md:text-5xl text-brand-black">Curated Collections</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-[60vh] max-w-screen-2xl mx-auto w-full">
            <Link href="/shop/women/summer" className="relative group overflow-hidden bg-brand-black w-full h-full block">
              <Image 
                src="https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=2400&auto=format&fit=crop" 
                alt="Summer Collection" 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-700">
                <h3 className="font-serif text-4xl md:text-5xl text-brand-white text-center">Summer <br/><span className="text-xl md:text-2xl font-sans tracking-[0.2em] uppercase font-light mt-4 block">Collection</span></h3>
              </div>
            </Link>
            <Link href="/shop/women/evening" className="relative group overflow-hidden bg-brand-black w-full h-full block">
              <Image 
                src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2400&auto=format&fit=crop" 
                alt="Evening Collection" 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-700">
                <h3 className="font-serif text-4xl md:text-5xl text-brand-white text-center">Evening <br/><span className="text-xl md:text-2xl font-sans tracking-[0.2em] uppercase font-light mt-4 block">Collection</span></h3>
              </div>
            </Link>
         </div>
      </section>

      {/* 4. Brand & Newsletter */}
      <section className="min-h-screen w-full relative snap-center snap-always bg-brand-black text-brand-white flex flex-col justify-center px-6 md:px-24 py-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 mb-24">
          <Image src="/logo.png" alt="SELETICA" width={200} height={60} className="object-contain invert" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-5xl leading-tight text-brand-white"
          >
            Exclusivity in Every Thread.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-brand-ash text-lg md:text-xl font-light leading-relaxed max-w-2xl"
          >
            Our collections are strictly limited to exactly 10 pieces per design worldwide. 
            Crafted for the modern affluent individual, offering timeless fashion that stands apart from ephemeral trends.
            Never restocked. Never reproduced.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
             <Link href="/about" className="uppercase tracking-widest text-sm border-b border-brand-white/40 pb-1 hover:border-brand-white transition-colors inline-block mt-8">
                Read Our Story
              </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto w-full text-center border-t border-brand-white/10 pt-24"
        >
          <h3 className="font-serif text-2xl md:text-3xl mb-4 text-brand-white">Join The Inner Circle</h3>
          <p className="text-brand-ash text-sm mb-8">Receive priority access to new 10-piece collections and private events.</p>
          <form className="flex flex-col md:flex-row gap-4 w-full" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-b border-brand-white/30 py-3 px-4 focus:outline-none focus:border-brand-white transition-colors text-sm text-brand-white"
              required
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-brand-white text-brand-black px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-brand-white/90 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {status === 'success' && <p className="text-sm text-green-400 mt-4">Welcome to the Inner Circle.</p>}
          {status === 'error' && <p className="text-sm text-red-400 mt-4">Subscription failed. Please try again.</p>}
        </motion.div>
      </section>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
