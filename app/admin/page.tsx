import { DashboardClient } from '@/components/admin/dashboard-client'
import { getAdminStats, getRecentBookings, getRecentApplications, getAdminFeaturedModels } from '@/lib/actions/admin'

export const dynamic = 'force-dynamic'

export default async function AdminOverviewPage() {
  const [stats, recentBookings, recentApplications, featuredModels] = await Promise.all([
    getAdminStats(),
    getRecentBookings(),
    getRecentApplications(),
    getAdminFeaturedModels(),
  ])

  return (
    <DashboardClient 
      stats={stats}
      recentBookings={recentBookings as any}
      recentApplications={recentApplications as any}
      featuredModels={featuredModels as any}
    />
  )
}
