'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { RefreshCcw, Home, AlertCircle, Database } from 'lucide-react'
import Link from 'next/link'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error for debugging
    console.error('Admin Panel Error:', error)
  }, [error])

  const isDatabaseError = error.message.toLowerCase().includes('prisma') || 
                          error.message.toLowerCase().includes('database') ||
                          error.message.toLowerCase().includes('fetch')

  return (
    <div className="flex items-center justify-center min-h-[70vh] p-6 bg-background">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <div className={`p-4 rounded-full ${isDatabaseError ? 'bg-amber-500/10' : 'bg-destructive/10'}`}>
              {isDatabaseError ? (
                <Database className="h-12 w-12 text-amber-500" />
              ) : (
                <AlertCircle className="h-12 w-12 text-destructive" />
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-medium tracking-tight">
              {isDatabaseError ? 'Database Connection Issue' : 'Admin Panel Error'}
            </h1>
            <p className="text-muted-foreground font-sans">
              {isDatabaseError 
                ? "We're having trouble connecting to the database. Please check your DATABASE_URL environment variable in your Vercel Project Settings." 
                : "An unexpected error occurred in the admin dashboard. This might be a temporary issue."}
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
            Retry
          </Button>
          
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto font-sans px-8">
              <Home className="mr-2 h-4 w-4" />
              Main Site
            </Button>
          </Link>
        </motion.div>

        {error.digest && (
          <div className="pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground/50 font-mono">
              Diagnostic ID: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
