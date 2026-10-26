import { PrismaClient } from '@prisma/client';
import Link from "next/link";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

// This is a Server Component fetching directly from the DB.
export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="flex flex-col gap-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl mb-2">Products</h1>
          <p className="text-brand-ash font-light">Manage limited edition collections and inventory.</p>
        </div>
        <Link href="/admin/products/new" className="bg-white text-black px-6 py-3 text-xs tracking-widest uppercase hover:bg-white/90 transition-colors">
          Add Product
        </Link>
      </header>

      <div className="border border-white/10">
        <table className="w-full text-left text-sm font-light">
          <thead className="border-b border-white/10 text-brand-ash uppercase tracking-widest text-xs">
            <tr>
              <th className="px-6 py-4 font-normal">Name</th>
              <th className="px-6 py-4 font-normal">Price</th>
              <th className="px-6 py-4 font-normal">Stock Remaining</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-brand-ash">No products found.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">৳{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">{product.stock} / {product.totalPieces}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] uppercase tracking-widest ${product.stock === 0 ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                      {product.stock === 0 ? 'Sold Out' : 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-4">
                    <span className="text-brand-ash hover:text-white cursor-pointer transition-colors">Edit</span>
                    <span className="text-brand-ash hover:text-red-400 cursor-pointer transition-colors">Archive</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}