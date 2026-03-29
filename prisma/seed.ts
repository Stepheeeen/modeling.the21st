const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const seedPrisma = new PrismaClient();

async function main() {
  // 1. Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@the21st.agency';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await seedPrisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Agency Admin',
      role: 'admin',
    },
  });

  console.log('Admin user created/updated:', adminEmail);

  // 2. Import Models from Mock Data (Simplified example)
  // In a real scenario, we'd import the actual data from lib/data.ts
  const modelsData = [
    {
      name: 'Alexandra Chen',
      slug: 'alexandra-chen',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop',
      bio: 'Alexandra is a versatile model with over 8 years of experience...',
      height: "5'10\"",
      location: 'New York, NY',
      experience: 'elite',
      availability: 'limited',
      featured: true,
      gender: 'female',
    },
    // ... Add more models as needed or read from lib/data.ts if possible via require
  ];

  for (const model of modelsData) {
    await seedPrisma.model.upsert({
      where: { slug: model.slug },
      update: {},
      create: model,
    });
  }

  console.log('Initial models seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await seedPrisma.$disconnect();
  });
