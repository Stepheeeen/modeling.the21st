'use server'

import prisma from '@/lib/prisma';

export async function getModels() {
  try {
    return await prisma.model.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}

export async function getFeaturedModels() {
  try {
    return await prisma.model.findMany({
      where: { featured: true },
      take: 5,
    });
  } catch (error) {
    console.error('Error fetching featured models:', error);
    return [];
  }
}

export async function getModelBySlug(slug: string) {
  try {
    return await prisma.model.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error('Error fetching model by slug:', error);
    return null;
  }
}
