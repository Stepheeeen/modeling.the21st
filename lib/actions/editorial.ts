import prisma from '@/lib/prisma';

export async function getEditorials() {
  try {
    return await prisma.editorial.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
  } catch (error) {
    console.error('Error fetching editorials:', error);
    return [];
  }
}

export async function getEditorialBySlug(slug: string) {
  try {
    return await prisma.editorial.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error('Error fetching editorial by slug:', error);
    return null;
  }
}
