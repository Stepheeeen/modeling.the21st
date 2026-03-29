'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { updateApplicationStatus } from '@/lib/actions/admin'
import { toast } from '@/hooks/use-toast'
import { Loader2, Check, X, Eye } from 'lucide-react'

interface ApplicationActionProps {
  id: string
  currentStatus: string
}

export function ApplicationActions({ id, currentStatus }: ApplicationActionProps) {
  const [loading, setLoading] = useState(false)

  const onStatusUpdate = async (newStatus: string) => {
    try {
      setLoading(true)
      await updateApplicationStatus(id, newStatus)
      toast({ title: `Application marked as ${newStatus}` })
    } catch (error) {
      toast({ title: 'Error updating status', variant: 'destructive' })
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
                onClick={() => onStatusUpdate('reviewed')}
                className="h-8 text-[10px] uppercase font-sans tracking-wider"
              >
                <Eye className="h-3 w-3 mr-1" />
                Review
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onStatusUpdate('accepted')}
                className="h-8 text-[10px] uppercase font-sans tracking-wider text-primary border-primary/20 hover:bg-primary/5"
              >
                <Check className="h-3 w-3 mr-1" />
                Accept
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onStatusUpdate('rejected')}
                className="h-8 text-[10px] uppercase font-sans tracking-wider text-destructive hover:text-destructive"
              >
                <X className="h-3 w-3 mr-1" />
                Reject
              </Button>
            </>
          )}
          {currentStatus === 'reviewed' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onStatusUpdate('accepted')}
              className="h-8 text-[10px] uppercase font-sans tracking-wider text-primary border-primary/20 hover:bg-primary/5"
            >
              <Check className="h-3 w-3 mr-1" />
              Accept
            </Button>
          )}
          {(currentStatus === 'accepted' || currentStatus === 'rejected') && (
            <span className="text-[10px] uppercase font-sans tracking-wider text-muted-foreground mr-2">
              {currentStatus}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
