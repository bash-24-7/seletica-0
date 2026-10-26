"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 text-white font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        <Image src="/logo.png" alt="SELETICA" width={200} height={60} className="object-contain invert opacity-80 mb-12" />
        
        <div className="w-full bg-zinc-900 border border-white/10 p-8">
          <h1 className="font-serif text-2xl text-center mb-8">Admin Portal</h1>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-widest uppercase text-brand-ash">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white transition-colors text-sm"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-widest uppercase text-brand-ash">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white transition-colors text-sm"
              />
            </div>

            {error && <p className="text-red-400 text-xs text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="bg-white text-black py-4 mt-4 text-xs tracking-widest uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}