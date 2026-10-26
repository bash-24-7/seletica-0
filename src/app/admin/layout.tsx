"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-beige text-brand-black font-sans">
      <aside className="w-64 bg-brand-white border-r border-black/10 flex flex-col p-6 fixed inset-y-0 z-50 shadow-2xl">
        <div className="mb-12 border-b border-black/10 pb-8">
          <h2 className="font-serif text-2xl tracking-widest uppercase text-brand-black">SELETICA</h2>
          <p className="text-brand-ash text-[10px] mt-2 uppercase tracking-[0.2em]">Admin Dashboard</p>
        </div>
        
        <nav className="flex flex-col gap-2 text-sm font-light flex-1">
          <Link href="/admin" className="hover:bg-brand-black/5 hover:text-brand-black text-brand-ash px-4 py-3 rounded-sm transition-all flex items-center">Overview</Link>
          <Link href="/admin/products" className="hover:bg-brand-black/5 hover:text-brand-black text-brand-ash px-4 py-3 rounded-sm transition-all flex items-center">Products</Link>
          <Link href="/admin/orders" className="hover:bg-brand-black/5 hover:text-brand-black text-brand-ash px-4 py-3 rounded-sm transition-all flex items-center opacity-50 cursor-not-allowed">Orders</Link>
          <Link href="/admin/subscribers" className="hover:bg-brand-black/5 hover:text-brand-black text-brand-ash px-4 py-3 rounded-sm transition-all flex items-center">Newsletter</Link>
          <Link href="/admin/cms" className="hover:bg-brand-black/5 hover:text-brand-black text-brand-ash px-4 py-3 rounded-sm transition-all flex items-center">CMS Content</Link>
          <Link href="/admin/journal" className="hover:bg-brand-black/5 hover:text-brand-black text-brand-ash px-4 py-3 rounded-sm transition-all flex items-center">Journal</Link>
          <Link href="/admin/lookbook" className="hover:bg-brand-black/5 hover:text-brand-black text-brand-ash px-4 py-3 rounded-sm transition-all flex items-center">Lookbook</Link>
          <Link href="/admin/timeline" className="hover:bg-brand-black/5 hover:text-brand-black text-brand-ash px-4 py-3 rounded-sm transition-all flex items-center">Timeline</Link>
          <Link href="/admin/messages" className="hover:bg-brand-black/5 hover:text-brand-black text-brand-ash px-4 py-3 rounded-sm transition-all flex items-center opacity-50 cursor-not-allowed">Messages</Link>
        </nav>

        <div className="border-t border-black/10 pt-6 mt-auto">
           <button onClick={handleLogout} className="flex items-center gap-3 text-brand-ash hover:text-red-400 transition-colors w-full px-4 py-2 text-sm">
             <LogOut size={16} />
             <span>Sign Out</span>
           </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-12 lg:p-16">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
