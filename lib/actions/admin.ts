'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ModelSchema, EditorialSchema } from '@/lib/validations'

async function checkAdmin() {
  const session = await auth()
  const user = session?.user as any
  if (!session || user?.role !== 'admin') {
    throw new Error('Unauthorized')
  }
}

export async function getAdminStats() {
  await checkAdmin()

  try {
    const [modelCount, pendingBookings, pendingApplications] = await Promise.all([
      prisma.model.count(),
      prisma.booking.count({ where: { status: 'pending' } }),
      prisma.application.count({ where: { status: 'pending' } }),
    ])

    return {
      modelCount,
      pendingBookings,
      pendingApplications,
      // Revenue is simulated as we don't have a payments table yet
      revenue: 42500, 
    }
  } catch (error) {
    console.error('Failed to fetch admin stats:', error)
    return {
      modelCount: 0,
      pendingBookings: 0,
      pendingApplications: 0,
      revenue: 0,
      error: true
    }
  }
}

export async function getRecentBookings(limit = 5) {
  await checkAdmin()
  try {
    return await prisma.booking.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Failed to fetch recent bookings:', error)
    return []
  }
}

export async function getRecentApplications(limit = 5) {
  await checkAdmin()
  try {
    return await prisma.application.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Failed to fetch recent applications:', error)
    return []
  }
}

export async function getAllBookings() {
  await checkAdmin()
  return prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getAllApplications() {
  await checkAdmin()
  return prisma.application.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getAllModels() {
  await checkAdmin()
  return prisma.model.findMany({
    orderBy: { name: 'asc' },
  })
}

export async function getAdminFeaturedModels(limit = 4) {
  await checkAdmin()
  try {
    return await prisma.model.findMany({
      where: { featured: true },
      take: limit,
    })
  } catch (error) {
    console.error('Failed to fetch featured models (admin view):', error)
    return []
  }
}

// Model CRUD
export async function createModel(data: any) {
  await checkAdmin()
  const validated = ModelSchema.parse(data)
  
  const model = await prisma.model.create({
    data: {
      ...validated,
      measurements: validated.measurements as any,
      socialLinks: validated.socialLinks as any,
    },
  })
  
  revalidatePath('/admin/models')
  revalidatePath('/models')
  return model
}

export async function updateModel(id: string, data: any) {
  await checkAdmin()
  const validated = ModelSchema.parse(data)
  
  const model = await prisma.model.update({
    where: { id },
    data: {
      ...validated,
      measurements: validated.measurements as any,
      socialLinks: validated.socialLinks as any,
    },
  })
  
  revalidatePath('/admin/models')
  revalidatePath(`/admin/models/${id}`)
  revalidatePath('/models')
  revalidatePath(`/models/${model.slug}`)
  return model
}

export async function deleteModel(id: string) {
  await checkAdmin()
  await prisma.model.delete({ where: { id } })
  revalidatePath('/admin/models')
  revalidatePath('/models')
}

export async function getModelById(id: string) {
  await checkAdmin()
  return prisma.model.findUnique({ where: { id } })
}

// Booking Management
export async function updateBookingStatus(id: string, status: string) {
  await checkAdmin()
  const booking = await prisma.booking.update({
    where: { id },
    data: { status },
  })
  revalidatePath('/admin/bookings')
  return booking
}

// Application Management
export async function updateApplicationStatus(id: string, status: string) {
  await checkAdmin()
  const application = await prisma.application.update({
    where: { id },
    data: { status },
  })
  revalidatePath('/admin/applications')
  return application
}

export async function getApplicationById(id: string) {
  await checkAdmin()
  return prisma.application.findUnique({ where: { id } })
}

// Editorial CRUD
export async function createEditorial(data: any) {
  await checkAdmin()
  const validated = EditorialSchema.parse(data)
  
  const editorial = await prisma.editorial.create({
    data: validated,
  })
  
  revalidatePath('/admin/editorials')
  revalidatePath('/editorial')
  return editorial
}

export async function updateEditorial(id: string, data: any) {
  await checkAdmin()
  const validated = EditorialSchema.parse(data)
  
  const editorial = await prisma.editorial.update({
    where: { id },
    data: validated,
  })
  
  revalidatePath('/admin/editorials')
  revalidatePath(`/admin/editorials/${id}`)
  revalidatePath('/editorial')
  revalidatePath(`/editorial/${editorial.slug}`)
  return editorial
}

export async function deleteEditorial(id: string) {
  await checkAdmin()
  await prisma.editorial.delete({ where: { id } })
  revalidatePath('/admin/editorials')
  revalidatePath('/editorial')
}

export async function getEditorialById(id: string) {
  await checkAdmin()
  return prisma.editorial.findUnique({ where: { id } })
}

export async function getAllEditorials() {
  await checkAdmin()
  return prisma.editorial.findMany({
    orderBy: { publishedAt: 'desc' },
  })
}
