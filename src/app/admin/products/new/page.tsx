"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    gender: "WOMEN",
    season: "ALL_SEASON",
    images: "", // comma separated
    stock: "10",
    totalPieces: "10",
    fabric: "",
    careGuide: "",
    sizes: "XS, S, M, L",
    colors: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        totalPieces: parseInt(formData.totalPieces),
        images: formData.images.split(",").map(s => s.trim()).filter(Boolean),
        sizes: formData.sizes.split(",").map(s => s.trim()).filter(Boolean),
        colors: formData.colors.split(",").map(s => s.trim()).filter(Boolean),
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        console.log("Creation OK");
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Failed to create product: " + res.statusText);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 max-w-4xl">
      <header>
        <h1 className="font-serif text-4xl mb-2">New Product</h1>
        <p className="text-brand-ash font-light">Add a new limited edition piece to the collection.</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-zinc-900 border border-white/10 p-8">
        

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Gender</label>
            <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm">
              <option value="WOMEN">Women</option>
              <option value="MEN">Men</option>
              <option value="UNISEX">Unisex</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Season</label>
            <select value={formData.season} onChange={(e) => setFormData({...formData, season: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm">
              <option value="ALL_SEASON">All Season</option>
              <option value="WINTER">Winter</option>
              <option value="SUMMER">Summer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Slug</label>
            <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Price (BDT)</label>
            <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Stock Allocation</label>
            <input type="number" required max={10} value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase text-brand-ash">Description</label>
          <textarea rows={4} required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm resize-none"></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest uppercase text-brand-ash">Images (Comma separated URLs)</label>
          <textarea rows={2} value={formData.images} onChange={(e) => setFormData({...formData, images: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm resize-none"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Fabric Details</label>
            <input type="text" value={formData.fabric} onChange={(e) => setFormData({...formData, fabric: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Care Guide</label>
            <input type="text" value={formData.careGuide} onChange={(e) => setFormData({...formData, careGuide: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
           <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Sizes (Comma separated)</label>
            <input type="text" value={formData.sizes} onChange={(e) => setFormData({...formData, sizes: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-brand-ash">Colors (Comma separated)</label>
            <input type="text" value={formData.colors} onChange={(e) => setFormData({...formData, colors: e.target.value})} className="bg-black border border-white/20 py-3 px-4 focus:outline-none focus:border-white text-sm" />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-white text-black py-4 mt-6 text-xs tracking-widest uppercase hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating Piece..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}