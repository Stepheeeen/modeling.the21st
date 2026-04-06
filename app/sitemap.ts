import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://the21st.agency'

  try {
    // Fetch all models for dynamic routes
    const models = await prisma.model.findMany({
      select: { slug: true, updatedAt: true },
    })

  const modelUrls = models.map((model) => ({
    url: `${baseUrl}/models/${model.slug}`,
    lastModified: model.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fetch all editorials for dynamic routes
  const editorials = await prisma.editorial.findMany({
    select: { slug: true, updatedAt: true },
  })

    const editorialUrls = editorials.map((editorial) => ({
      url: `${baseUrl}/editorial/${editorial.slug}`,
      lastModified: editorial.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Static routes
    const routes = [
      '',
      '/models',
      '/editorial',
      '/apply',
      '/services',
      '/about',
      '/contact',
      '/booking',
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))

    return [...routes, ...modelUrls, ...editorialUrls]
  } catch (error) {
    console.error('Sitemap generation failed:', error)
    // Fallback to only static routes if DB fails during build or runtime
    return [
      '',
      '/models',
      '/editorial',
      '/apply',
      '/services',
      '/about',
      '/contact',
      '/booking',
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))
  }
}
