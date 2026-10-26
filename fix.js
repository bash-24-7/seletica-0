const fs = require('fs');

// 1. Fix Navigation "Discover all"
let nav = fs.readFileSync('src/components/Navigation.tsx', 'utf8');
nav = nav.replace(/href="\/shop\/women\/all"/g, 'href="/shop/all/all"');
fs.writeFileSync('src/components/Navigation.tsx', nav);

let footer = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footer = footer.replace(/href="\/shop\/women\/all"/g, 'href="/shop/all/all"');
fs.writeFileSync('src/components/Footer.tsx', footer);

let page = fs.readFileSync('src/app/page.tsx', 'utf8');
page = page.replace(/href="\/shop\/women\/all"/g, 'href="/shop/all/all"');

// 2. Fix Hero image clipping and Reserve Yours button overflow
page = page.replace(/className="object-cover"/g, 'className="object-cover object-center"');
// Change section 2 h-screen to min-h-screen h-auto to avoid cutting off Reserve Yours on mobile
page = page.replace(/<section className="h-screen w-full relative snap-center snap-always flex items-center justify-center bg-brand-beige px-6 md:px-12 py-24">/g, '<section className="min-h-screen h-auto w-full relative snap-center snap-always flex items-center justify-center bg-brand-beige px-6 md:px-12 py-24">');
page = page.replace(/className="w-full md:w-1\/2 relative h-\[50vh\] md:h-\[70vh\] group overflow-hidden"/g, 'className="w-full md:w-1/2 relative h-[40vh] md:h-[70vh] min-h-[300px] group overflow-hidden"');
fs.writeFileSync('src/app/page.tsx', page);

// 3. Fix routing to accept 'all' gender
let shopRoute = fs.readFileSync('src/app/shop/[gender]/[collection]/page.tsx', 'utf8');
shopRoute = shopRoute.replace(/const validGenders = \["women", "men"\];/g, 'const validGenders = ["women", "men", "all"];');

shopRoute = shopRoute.replace(/const query: any = {[\s\S]*?where: {[\s\S]*?isArchived: false,[\s\S]*?gender: {[\s\S]*?in: \[genderEnum, "UNISEX"\],[\s\S]*?},[\s\S]*?},[\s\S]*?orderBy: {[\s\S]*?createdAt: "desc",[\s\S]*?},[\s\S]*?};/g, `const query: any = {
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
  };`);
fs.writeFileSync('src/app/shop/[gender]/[collection]/page.tsx', shopRoute);

console.log('Fixed issues');
