import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de base de datos...');

  // Crear usuario administrador
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@crocodilians.cl' },
    update: {},
    create: {
      email: 'admin@crocodilians.cl',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'Crocodilians',
      phone: '+56912345678',
      isAdmin: true,
    },
  });

  // Crear usuario de prueba
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      passwordHash: userPassword,
      firstName: 'Juan',
      lastName: 'Pérez',
      phone: '+56987654321',
      isAdmin: false,
    },
  });

  console.log('✅ Usuarios creados');

  // Crear categorías
  const pokemonCategory = await prisma.category.upsert({
    where: { slug: 'pokemon-tcg' },
    update: {},
    create: {
      name: 'Pokémon TCG',
      slug: 'pokemon-tcg',
      description: 'Juegos de cartas coleccionables de Pokémon',
      imageUrl: 'https://example.com/pokemon-category.jpg',
    },
  });

  const magicCategory = await prisma.category.upsert({
    where: { slug: 'magic-the-gathering' },
    update: {},
    create: {
      name: 'Magic: The Gathering',
      slug: 'magic-the-gathering',
      description: 'El juego de cartas estratégico más popular del mundo',
      imageUrl: 'https://example.com/magic-category.jpg',
    },
  });

  const yugiohCategory = await prisma.category.upsert({
    where: { slug: 'yu-gi-oh' },
    update: {},
    create: {
      name: 'Yu-Gi-Oh!',
      slug: 'yu-gi-oh',
      description: 'Cartas de duelo legendarias',
      imageUrl: 'https://example.com/yugioh-category.jpg',
    },
  });

  console.log('✅ Categorías creadas');

  // Crear productos de ejemplo
  const products = [
    {
      title: 'Pikachu V-Union Special Collection',
      description: 'Colección especial con cartas raras de Pikachu',
      price: 89990,
      stock: 15,
      categoryId: pokemonCategory.id,
      imageUrl: 'https://example.com/pikachu-v-union.jpg',
      images: [
        'https://example.com/pikachu-v-union-1.jpg',
        'https://example.com/pikachu-v-union-2.jpg',
      ],
      metadata: {
        set: 'V-Union',
        rarity: 'Ultra Rare',
        language: 'Spanish',
      },
    },
    {
      title: 'Charizard EX - 1st Edition',
      description: 'Carta holográfica de primera edición',
      price: 299990,
      stock: 3,
      categoryId: pokemonCategory.id,
      imageUrl: 'https://example.com/charizard-ex.jpg',
      images: [],
      metadata: {
        set: 'Base Set',
        rarity: '1st Edition',
        language: 'English',
      },
    },
    {
      title: 'Black Lotus - Beta',
      description: 'La carta más poderosa de Magic',
      price: 999990,
      stock: 1,
      categoryId: magicCategory.id,
      imageUrl: 'https://example.com/black-lotus-beta.jpg',
      images: [],
      metadata: {
        set: 'Beta',
        rarity: 'Mythic Rare',
        condition: 'Near Mint',
      },
    },
    {
      title: 'Blue-Eyes White Dragon',
      description: 'Carta legendaria de Yu-Gi-Oh!',
      price: 149990,
      stock: 8,
      categoryId: yugiohCategory.id,
      imageUrl: 'https://example.com/blue-eyes.jpg',
      images: [],
      metadata: {
        set: 'Legend of Blue Eyes',
        rarity: 'Ultra Rare',
        language: 'Spanish',
      },
    },
    {
      title: 'Booster Pack - Scarlet & Violet',
      description: 'Sobre de expansión con cartas aleatorias',
      price: 5990,
      stock: 50,
      categoryId: pokemonCategory.id,
      imageUrl: 'https://example.com/booster-scarlet-violet.jpg',
      images: [],
      metadata: {
        set: 'Scarlet & Violet',
        type: 'Booster Pack',
      },
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('✅ Productos creados');

  // Crear banners promocionales
  const banners = [
    {
      title: '¡Oferta Especial!',
      imageUrl: 'https://example.com/banner-oferta.jpg',
      linkUrl: '/categories/pokemon-tcg',
      displayOrder: 1,
    },
    {
      title: 'Nuevos Lanzamientos',
      imageUrl: 'https://example.com/banner-nuevos.jpg',
      linkUrl: '/products',
      displayOrder: 2,
    },
    {
      title: 'Envío Gratis',
      imageUrl: 'https://example.com/banner-envio.jpg',
      linkUrl: '/checkout',
      displayOrder: 3,
    },
  ];

  for (const banner of banners) {
    await prisma.banner.create({
      data: banner,
    });
  }

  console.log('✅ Banners creados');

  // Crear direcciones de ejemplo para el usuario
  await prisma.address.create({
    data: {
      userId: user.id,
      street: 'Av. Providencia 123',
      city: 'Santiago',
      state: 'Región Metropolitana',
      postalCode: '7500000',
      country: 'Chile',
      isDefault: true,
    },
  });

  console.log('✅ Direcciones creadas');

  console.log('🎉 Seed completado exitosamente!');
  console.log('\n📋 Credenciales de prueba:');
  console.log('Admin: admin@crocodilians.cl / admin123');
  console.log('User: user@example.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });