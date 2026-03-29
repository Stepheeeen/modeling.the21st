'use client'

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { updateBookingStatus } from '@/lib/actions/admin'
import { toast } from '@/hooks/use-toast'
import { Loader2, MoreHorizontal } from 'lucide-react'

interface BookingActionProps {
  id: string
  currentStatus: string
}

export function BookingActions({ id, currentStatus }: BookingActionProps) {
  const [loading, setLoading] = useState(false)

  const onStatusUpdate = async (newStatus: string) => {
    try {
      setLoading(true)
      await updateBookingStatus(id, newStatus)
      toast({ title: 'Status updated' })
    } catch (error) {
      toast({ title: 'Error', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <div className="flex gap-1">
          {currentStatus === 'pending' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onStatusUpdate('confirmed')}
                className="h-8 text-[10px] uppercase font-sans tracking-wider"
              >
                Confirm
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onStatusUpdate('cancelled')}
                className="h-8 text-[10px] uppercase font-sans tracking-wider text-destructive hover:text-destructive"
              >
                Cancel
              </Button>
            </>
          )}
          {currentStatus === 'confirmed' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatusUpdate('completed')}
              className="h-8 text-[10px] uppercase font-sans tracking-wider"
            >
              Mark Completed
            </Button>
          )}
          {currentStatus === 'completed' && (
            <span className="text-[10px] uppercase font-sans tracking-wider text-muted-foreground mr-2">
              Done
            </span>
          )}
        </div>
      )}
    </div>
  )
}
