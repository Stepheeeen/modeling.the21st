import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@the21st.com'
  const adminPassword = 'adminpassword123' // Change this after first login
  
  console.log('--- Admin Seeding Started ---')

  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      name: 'Agency Admin',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log(`Admin user created/updated: ${admin.email}`)
  console.log(`Temporary Password: ${adminPassword}`)
  console.log('--- Seeding Completed ---')
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
