import { cn } from '@/lib/utils'

type StatusType = 
  | 'pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled' 
  | 'reviewed' 
  | 'accepted' 
  | 'rejected'
  | 'scheduled'
  | 'in-progress'
  | 'available'
  | 'limited'
  | 'unavailable'

interface StatusBadgeProps {
  status: StatusType | string
  className?: string
}

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-500/10 text-blue-700 border-blue-200',
  completed: 'bg-green-500/10 text-green-700 border-green-200',
  cancelled: 'bg-red-500/10 text-red-700 border-red-200',
  reviewed: 'bg-purple-500/10 text-purple-700 border-purple-200',
  accepted: 'bg-green-500/10 text-green-700 border-green-200',
  rejected: 'bg-red-500/10 text-red-700 border-red-200',
  scheduled: 'bg-blue-500/10 text-blue-700 border-blue-200',
  'in-progress': 'bg-amber-500/10 text-amber-700 border-amber-200',
  available: 'bg-green-500/10 text-green-700 border-green-200',
  limited: 'bg-amber-500/10 text-amber-700 border-amber-200',
  unavailable: 'bg-red-500/10 text-red-700 border-red-200',
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase()
  const styles = statusStyles[normalizedStatus] || 'bg-muted text-muted-foreground border-border'

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-sans capitalize border',
        styles,
        className
      )}
    >
      {status}
    </span>
  )
}
