import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('seletica_admin2026', 10)

  await prisma.user.upsert({
    where: { email: 'admin@seletica.com' },
    update: { password: hashedPassword, role: 'ADMIN' },
    create: {
      email: 'admin@seletica.com',
      password: hashedPassword,
      name: 'Seletica Admin',
      role: 'ADMIN'
    }
  })
  console.log('Admin user created: admin@seletica.com / seletica_admin2026')

  const products = [
    {
      name: 'Structured Wool Blazer',
      slug: 'structured-wool-blazer',
      description: 'Hand-tailored structured blazer crafted from premium Italian virgin wool. Features sharply padded shoulders and a nipped-in waist, adhering to our quiet luxury aesthetic.',
      price: 1250,
      images: [
        'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2787&auto=format&fit=crop'
      ],
      stock: 10
    },
    {
      name: 'Silk Crepe De Chine Dress',
      slug: 'silk-crepe-de-chine-dress',
      description: 'A minimalist floor-length evening gown cut from heavy 100% silk crepe de chine. Designed with an elegant open back and delicate rouleau straps.',
      price: 1800,
      images: [
        'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2787&auto=format&fit=crop'
      ],
      stock: 10
    },
    {
      name: 'Cashmere Turtleneck Sweater',
      slug: 'cashmere-turtleneck-sweater',
      description: 'Ultra-soft pure cashmere turtleneck spun in Scotland. A timeless essential that balances modern elegance with supreme comfort.',
      price: 850,
      images: [
        'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=2772&auto=format&fit=crop'
      ],
      stock: 10
    },
    {
      name: 'Pleated Wide-Leg Trousers',
      slug: 'pleated-wide-leg-trousers',
      description: 'High-waisted wide-leg trousers cut from fluid wool gabardine. Features deep front pleats and a concealed side zip for an uninterrupted silhouette.',
      price: 790,
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2787&auto=format&fit=crop'
      ],
      stock: 10
    }
  ]

  for (const product of products) {
    const p = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
    console.log(`Created product with id: ${p.id}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })