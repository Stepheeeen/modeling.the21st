'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-8xl md:text-9xl font-serif font-black text-primary/10 select-none">
              404
            </h1>
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                Lost in Style
              </h2>
              <p className="text-muted-foreground font-sans">
                The page you are looking for doesn&apos;t exist or has been moved to a new collection.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button className="w-full sm:w-auto font-sans px-8">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Button>
            </Link>
            <Link href="/models">
              <Button variant="outline" className="w-full sm:w-auto font-sans px-8">
                <Search className="mr-2 h-4 w-4" />
                Explore Models
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="javascript:history.back()" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors font-sans"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back to previous page
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
