'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Users, Calendar, FileText, TrendingUp, ArrowRight, Clock } from 'lucide-react'
import { MetricCard } from '@/components/admin/metric-card'
import { StatusBadge } from '@/components/admin/status-badge'
import { Button } from '@/components/ui/button'

interface DashboardClientProps {
  stats: {
    modelCount: number
    pendingBookings: number
    pendingApplications: number
    revenue: number
  }
  recentBookings: any[]
  recentApplications: any[]
  featuredModels: any[]
}

export function DashboardClient({ 
  stats, 
  recentBookings, 
  recentApplications, 
  featuredModels 
}: DashboardClientProps) {
  const isError = (stats as any).error;

  const metrics = [
    { 
      title: 'Active Models', 
      value: stats.modelCount, 
      change: 12, 
      changeLabel: 'vs last month',
      icon: Users 
    },
    { 
      title: 'Pending Bookings', 
      value: stats.pendingBookings, 
      change: 8,
      changeLabel: 'vs last week',
      icon: Calendar 
    },
    { 
      title: 'New Applications', 
      value: stats.pendingApplications, 
      change: -5,
      changeLabel: 'vs last week',
      icon: FileText 
    },
    { 
      title: 'Revenue (MTD)', 
      value: `₦${(stats.revenue / 1000).toFixed(1)}K`, 
      change: 23,
      changeLabel: 'vs last month',
      icon: TrendingUp 
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-serif font-medium mb-2">Dashboard</h1>
        <p className="text-muted-foreground font-sans">
          Welcome back! Here&apos;s what&apos;s happening at The 21st.
        </p>
      </motion.div>

      {isError && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-4 text-amber-600 dark:text-amber-500"
        >
          <div className="p-2 bg-amber-500/10 rounded-full">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-sans font-medium text-sm">Database Connection Issue</p>
            <p className="font-sans text-xs opacity-80">Some data could not be retrieved. Please check your Vercel Environment Variables.</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.title} {...metric} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-card border border-border"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-serif text-lg">Recent Bookings</h2>
            <Link href="/admin/bookings">
              <Button variant="ghost" size="sm" className="font-sans">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentBookings.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground font-sans text-sm">
                No recent bookings
              </div>
            ) : (
              recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm truncate">{booking.clientCompany || 'Direct Client'}</p>
                    <p className="text-xs text-muted-foreground font-sans">
                      {booking.eventType} · {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Info Column */}
        <div className="space-y-6">
          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-serif text-lg">New Applications</h2>
              <Link href="/admin/applications">
                <Button variant="ghost" size="sm" className="font-sans">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentApplications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground font-sans text-sm">
                  No new applications
                </div>
              ) : (
                recentApplications.map((app) => (
                  <div key={app.id} className="p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm truncate">
                        {app.firstName} {app.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground font-sans">
                        {app.location}
                      </p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Featured Models */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-serif text-lg">Featured</h2>
              <Link href="/admin/models">
                <Button variant="ghost" size="sm" className="font-sans">
                  Manage
                </Button>
              </Link>
            </div>
            <div className="p-4">
              {featuredModels.length === 0 ? (
                <div className="text-center text-muted-foreground font-sans text-sm py-4">
                  No featured models
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {featuredModels.map((model) => (
                    <div key={model.id} className="aspect-[3/4] relative overflow-hidden bg-muted">
                      <Image
                        src={model.profileImage}
                        alt={model.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-[10px] text-white font-sans truncate">
                          {model.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
