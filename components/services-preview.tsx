'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Camera, Sparkles, BookOpen, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: Camera,
    title: 'Fashion Campaigns',
    description: 'Full-service campaign production connecting top brands with elite talent.',
  },
  {
    icon: Sparkles,
    title: 'Runway & Events',
    description: 'Expert model placement for fashion weeks and exclusive events worldwide.',
  },
  {
    icon: BookOpen,
    title: 'Editorial',
    description: 'Curated talent for magazine editorials and digital content creation.',
  },
  {
    icon: TrendingUp,
    title: 'Commercial',
    description: 'Versatile talent for advertising campaigns and brand ambassadorships.',
  },
]

export function ServicesPreview() {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm tracking-[0.3em] text-primary-foreground/60 mb-4 block font-sans">
              WHAT WE DO
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
              Our Services
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/services">
              <Button 
                variant="outline" 
                className="group border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary font-sans"
              >
                All Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="p-6 border border-primary-foreground/10 hover:border-primary-foreground/30 transition-colors h-full">
                <service.icon className="h-8 w-8 mb-6 text-primary-foreground/80" />
                <h3 className="text-xl font-serif mb-3">{service.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
