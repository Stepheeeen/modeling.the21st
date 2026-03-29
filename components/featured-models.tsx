'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ModelCard } from '@/components/model-card'
import { Button } from '@/components/ui/button'

interface FeaturedModelsProps {
  models: any[]
}

export function FeaturedModels({ models }: FeaturedModelsProps) {
  const featuredModels = models.filter((m) => m.featured).slice(0, 4)

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
              OUR TALENT
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
              Featured Models
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/models">
              <Button variant="outline" className="group font-sans">
                View All Talent
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredModels.map((model, index) => (
            <ModelCard key={model.id} model={model} index={index} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  )
}
