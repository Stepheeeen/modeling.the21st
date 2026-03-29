'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Instagram } from 'lucide-react'
import type { Model } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface ModelCardProps {
  model: Model
  index?: number
  variant?: 'default' | 'featured' | 'compact'
}

export function ModelCard({ model, index = 0, variant = 'default' }: ModelCardProps) {
  const availabilityColors = {
    available: 'bg-green-500/10 text-green-700 border-green-200',
    limited: 'bg-amber-500/10 text-amber-700 border-amber-200',
    unavailable: 'bg-red-500/10 text-red-700 border-red-200',
  }

  if (variant === 'compact') {
    return (
      <Link href={`/models/${model.slug}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative"
        >
          <div className="aspect-[3/4] relative overflow-hidden bg-muted">
            <Image
              src={model.profileImage}
              alt={model.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="mt-3">
            <h3 className="font-serif text-lg">{model.name}</h3>
            <p className="text-sm text-muted-foreground font-sans">{model.location}</p>
          </div>
        </motion.div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link href={`/models/${model.slug}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          viewport={{ once: true }}
          className="group relative"
        >
          <div className="aspect-[2/3] relative overflow-hidden bg-muted">
            <Image
              src={model.profileImage}
              alt={model.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Hover Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="text-primary-foreground">
                <p className="text-sm mb-2 font-sans">{model.specialties.slice(0, 2).join(' / ')}</p>
                <p className="text-sm opacity-80 font-sans">{model.height}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl">{model.stageName || model.name}</h3>
              {model.socialLinks.instagram && (
                <Instagram className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 font-sans">
              <MapPin className="h-3 w-3" />
              {model.location}
            </p>
          </div>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={`/models/${model.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative"
      >
        <div className="aspect-[3/4] relative overflow-hidden bg-muted">
          <Image
            src={model.profileImage}
            alt={model.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Availability Badge */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant="outline" 
              className={cn('text-xs capitalize font-sans', availabilityColors[model.availability])}
            >
              {model.availability}
            </Badge>
          </div>

          {/* Hover Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="text-primary-foreground">
              <p className="text-xs mb-2 flex flex-wrap gap-1 font-sans">
                {model.categories.slice(0, 3).map((cat) => (
                  <span key={cat} className="bg-primary-foreground/20 px-2 py-0.5">
                    {cat}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-serif text-lg">{model.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 font-sans">
                <MapPin className="h-3 w-3" />
                {model.location}
              </p>
            </div>
            <span className="text-xs text-muted-foreground capitalize font-sans">
              {model.experience}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
