'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getPhotoshoots() {
  try {
    const photoshoots = await prisma.photoshoot.findMany({
      orderBy: { date: 'asc' },
    })
    return photoshoots
  } catch (error) {
    console.error('Error fetching photoshoots:', error)
    return []
  }
}

export async function createPhotoshoot(data: any) {
  try {
    const photoshoot = await prisma.photoshoot.create({
      data: {
        title: data.title,
        modelId: data.modelId,
        date: new Date(data.date),
        time: data.time,
        location: data.location,
        photographer: data.photographer,
        stylist: data.stylist,
        notes: data.notes,
        status: 'scheduled',
      },
    })
    revalidatePath('/admin/photoshoots')
    return { success: true, id: photoshoot.id }
  } catch (error: any) {
    console.error('Error creating photoshoot:', error)
    return { error: error.message || 'Failed to create photoshoot' }
  }
}

export async function updatePhotoshootStatus(id: string, status: string) {
  try {
    await prisma.photoshoot.update({
      where: { id },
      data: { status },
    })
    revalidatePath('/admin/photoshoots')
    return { success: true }
  } catch (error: any) {
    console.error('Error updating photoshoot status:', error)
    return { error: error.message || 'Failed to update status' }
  }
}

export async function deletePhotoshoot(id: string) {
  try {
    await prisma.photoshoot.delete({
      where: { id },
    })
    revalidatePath('/admin/photoshoots')
    return { success: true }
  } catch (error: any) {
    console.error('Error deleting photoshoot:', error)
    return { error: error.message || 'Failed to delete photoshoot' }
  }
}
