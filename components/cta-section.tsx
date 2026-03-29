'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* For Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
              FOR CLIENTS
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-6">
              Ready to book exceptional talent?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed font-sans">
              Whether you need models for a campaign, runway show, or brand partnership, 
              our team will help you find the perfect match for your vision.
            </p>
            <Link href="/booking">
              <Button size="lg" className="group font-sans">
                Book a Model
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* For Models */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative lg:border-l lg:border-border lg:pl-16"
          >
            <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
              FOR MODELS
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-6">
              Join our roster of elite talent
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed font-sans">
              We are always looking for fresh faces and experienced professionals. 
              Submit your application and take the next step in your modeling career.
            </p>
            <Link href="/apply">
              <Button size="lg" variant="outline" className="group font-sans">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
