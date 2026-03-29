'use client'

import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: LucideIcon
  index?: number
}

export function MetricCard({ title, value, change, changeLabel, icon: Icon, index = 0 }: MetricCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card border border-border p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-muted flex items-center justify-center">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-sans',
            isPositive && 'text-green-600',
            isNegative && 'text-red-600',
            !isPositive && !isNegative && 'text-muted-foreground'
          )}>
            {isPositive && <TrendingUp className="h-3 w-3" />}
            {isNegative && <TrendingDown className="h-3 w-3" />}
            <span>{isPositive ? '+' : ''}{change}%</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-serif font-medium mb-1">
        {value}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-sans">{title}</span>
        {changeLabel && (
          <span className="text-xs text-muted-foreground font-sans">{changeLabel}</span>
        )}
      </div>
    </motion.div>
  )
}
