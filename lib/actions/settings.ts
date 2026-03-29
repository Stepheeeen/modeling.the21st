'use server'

import prisma from '@/lib/prisma'
import { SettingsSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function getSettings() {
  try {
    let settings = await prisma.settings.findFirst()
    
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          agencyName: 'THE 21ST',
          contactEmail: 'admin@the21st.com',
          socialLinks: {
            instagram: '',
            tiktok: '',
            twitter: '',
            linkedin: ''
          }
        }
      })
    }
    
    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export async function updateSettings(data: any) {
  try {
    const validatedData = SettingsSchema.parse(data)
    
    const existing = await prisma.settings.findFirst()
    
    if (existing) {
      await prisma.settings.update({
        where: { id: existing.id },
        data: validatedData
      })
    } else {
      await prisma.settings.create({
        data: validatedData
      })
    }
    
    revalidatePath('/admin/settings')
    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    console.error('Error updating settings:', error)
    return { error: error.message || 'Failed to update settings' }
  }
}
