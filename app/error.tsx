'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { RefreshCcw, Home, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="flex justify-center">
            <div className="p-4 bg-destructive/10 rounded-full">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-medium tracking-tight">
              Something went wrong
            </h1>
            <p className="text-muted-foreground font-sans">
              An unexpected error occurred while processing your request. 
              Our team has been notified and we are working to fix it.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={() => reset()}
            className="w-full sm:w-auto font-sans px-8"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto font-sans px-8">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
          </Link>
        </motion.div>

        {error.digest && (
          <p className="text-xs text-muted-foreground/50 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
