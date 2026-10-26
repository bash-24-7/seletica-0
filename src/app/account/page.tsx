"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-brand-white text-brand-black grid grid-cols-1 lg:grid-cols-2 pt-20">
      {/* Visual / Editorial Side */}
      <div className="hidden lg:flex flex-col justify-end p-16 relative bg-brand-black/5 border-r border-brand-black/10">
        <div className="absolute inset-0 z-0 flex items-center justify-center font-sans uppercase tracking-widest text-brand-black/10">
          Editorial Image
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="font-serif text-4xl mb-4">The Private Client</h2>
          <p className="font-sans text-brand-ash leading-relaxed">
            Access your exclusive purchase history, track limited edition orders, and enjoy tailored luxury services.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-6 py-24 lg:p-24">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="flex gap-8 mb-12 border-b border-brand-black/20">
            <button 
              onClick={() => setIsLogin(true)}
              className={`pb-4 font-sans uppercase tracking-widest text-sm transition-colors relative ${isLogin ? "text-brand-black" : "text-brand-black/40 hover:text-brand-black/70"}`}
            >
              Sign In
              {isLogin && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-black" />}
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`pb-4 font-sans uppercase tracking-widest text-sm transition-colors relative ${!isLogin ? "text-brand-black" : "text-brand-black/40 hover:text-brand-black/70"}`}
            >
              Register
              {!isLogin && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-black" />}
            </button>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="font-sans text-xs uppercase tracking-[0.2em] text-brand-ash">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-brand-black/20 pb-2 text-lg focus:outline-none focus:border-white transition-colors"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase tracking-[0.2em] text-brand-ash">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-brand-black/20 pb-2 text-lg focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-sans text-xs uppercase tracking-[0.2em] text-brand-ash">Password</label>
              <input 
                type="password" 
                className="w-full bg-transparent border-b border-brand-black/20 pb-2 text-lg focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <Link href="#" className="font-sans text-xs text-brand-ash hover:text-brand-black transition-colors">
                  Forgot Password?
                </Link>
              </div>
            )}

            <button className="w-full bg-brand-black text-brand-white font-sans uppercase tracking-[0.2em] text-sm py-4 hover:bg-brand-black/90 transition-colors mt-8">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}