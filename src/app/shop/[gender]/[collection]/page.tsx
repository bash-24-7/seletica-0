import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ gender: string; collection: string }>;
}) {
  const { gender, collection } = await params;

  // Validate parameters
  const validGenders = ["women", "men", "all"];
  const validCollections = ["new-arrivals", "winter", "summer", "evening", "all"];

  if (!validGenders.includes(gender) || !validCollections.includes(collection)) {
    notFound();
  }

  const genderEnum = gender.toUpperCase();
  
  // Build query
  const query: any = {
    where: {
      isArchived: false,
      ...(genderEnum !== "ALL" && {
        gender: {
          in: [genderEnum, "UNISEX"],
        }
      })
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  // Apply collection filters
  if (collection === "winter") {
    query.where.season = "WINTER";
  } else if (collection === "summer") {
    query.where.season = "SUMMER";
  }
  // 'new-arrivals' just relies on the default orderBy: { createdAt: 'desc' }
  // 'all' gets everything for that gender

    let products: any[] = [];
  try {
    products = await prisma.product.findMany(query);
  } catch (error) {
    console.error("Database connection failed in shop/[gender]/[collection]:", error);
    // Continue with empty products array
  }



  // Formatting for display
  const displayGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  const displayCollection = collection
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Fallback temporary products if DB fails or is empty
  if (!products || products.length === 0) {
    const isMen = gender === "men";
    const baseImage = isMen 
      ? "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2400&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400&auto=format&fit=crop";
    
    const fallbackCount = collection === "new-arrivals" ? 4 : 8;
    
    products = Array.from({ length: fallbackCount }).map((_, i) => {
      // Create some products that are 'upcoming/pre-order' with negative stock logic or specific property
      const isPreOrder = i === 1; // Make the second item a pre-order item
      
      return {
        id: `temp-${gender}-${collection}-${i}`,
        name: `${displayGender} ${displayCollection} Piece ${i + 1}`,
        slug: `temp-${gender}-${collection}-${i}`,
        price: isMen ? 85000 + (i * 5000) : 185000 + (i * 10000),
        images: [`${baseImage}&sig=${i + (isMen ? 20 : 10)}`],
        stock: isPreOrder ? 10 : (i % 3 === 0) ? 2 : 10 - i, // Pre-order items have full stock but are marked differently
        totalPieces: 10,
        isPreOrder: isPreOrder // Custom flag for the frontend
      };
    });
  }



  const pageTitle =
    collection === "all"
      ? `${displayGender}'s Clothing`
      : `${displayGender}'s ${displayCollection}`;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">{pageTitle}</h1>
          <p className="text-brand-ash max-w-2xl">
            {collection === "new-arrivals"
              ? "Discover our latest additions, where contemporary design meets timeless elegance."
              : collection === "winter"
              ? "Embrace the cold with our premium winter collection, designed for warmth and style."
              : collection === "summer"
              ? "Light, breathable, and effortlessly chic. Our summer collection."
              : "Explore our complete collection of meticulously crafted pieces."}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center border border-white/10 rounded-lg">
            <h2 className="text-2xl font-serif mb-4">No products found</h2>
            <p className="text-brand-ash">
              Check back soon for new additions to this collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product) => (
              <Link href={`/product/${product.slug}`} key={product.id} className="group">
                <div className="relative aspect-[3/4] mb-4 bg-white/5 overflow-hidden">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-ash">
                      No Image
                    </div>
                  )}
                  {product.isPreOrder && (
                    <div className="absolute top-4 left-4 bg-white text-black text-xs tracking-widest px-3 py-1 font-bold">
                      UPCOMING / PRE-ORDER
                    </div>
                  )}
                  {!product.isPreOrder && product.stock <= 3 && product.stock > 0 && (
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs tracking-widest px-3 py-1">
                      ONLY {product.stock} LEFT
                    </div>
                  )}
                  {!product.isPreOrder && product.stock === 0 && (
                    <div className="absolute top-4 left-4 bg-white text-black text-xs tracking-widest px-3 py-1 font-bold">
                      SOLD OUT
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-lg mb-1">{product.name}</h3>
                <p className="text-brand-ash text-sm mb-2">
                  {product.isPreOrder ? "0 of 10" : `${product.totalPieces - product.stock + 1} of ${product.totalPieces}`}
                </p>
                <p className="font-medium">৳{product.price.toLocaleString()}</p>
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center text-center pointer-events-none">
                  <div className="flex gap-4 w-full justify-center pointer-events-auto">
                     <span className="text-[10px] uppercase tracking-widest border-b border-white/40 pb-1 hover:border-white transition-colors cursor-pointer">Quick View</span>
                     <span className="text-[10px] uppercase tracking-widest border-b border-white/40 pb-1 hover:border-white transition-colors cursor-pointer">Add to Wishlist</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
