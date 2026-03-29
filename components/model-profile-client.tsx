'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Instagram, Globe, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ModelProfileClientProps {
  model: any
  otherModels: any[]
}

export function ModelProfileClient({ model, otherModels }: ModelProfileClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const availabilityColors = {
    available: 'bg-green-500/10 text-green-700 border-green-200',
    limited: 'bg-amber-500/10 text-amber-700 border-amber-200',
    unavailable: 'bg-red-500/10 text-red-700 border-red-200',
  }

  const experienceLabels = {
    new: 'New Face',
    intermediate: 'Rising Talent',
    experienced: 'Experienced',
    elite: 'Elite',
  }

  const openLightbox = (index: number) => setSelectedImageIndex(index)
  const closeLightbox = () => setSelectedImageIndex(null)
  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % model.gallery.length)
    }
  }
  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? model.gallery.length - 1 : selectedImageIndex - 1
      )
    }
  }

  // Parse measurements if they are stringified or treat as object
  const measurements = typeof model.measurements === 'string' 
    ? JSON.parse(model.measurements) 
    : model.measurements || {}

  // Parse social links
  const socialLinks = typeof model.socialLinks === 'string'
    ? JSON.parse(model.socialLinks)
    : model.socialLinks || {}

  return (
    <div className="flex flex-col">
      {/* Profile Header */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div 
                className="aspect-[3/4] relative overflow-hidden bg-muted cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={model.profileImage}
                  alt={model.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge 
                  variant="outline" 
                  className={cn('capitalize font-sans', availabilityColors[model.availability as keyof typeof availabilityColors])}
                >
                  {model.availability}
                </Badge>
                <Badge variant="outline" className="font-sans">
                  {experienceLabels[model.experience as keyof typeof experienceLabels]}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-2">
                {model.name}
              </h1>
              {model.stageName && (
                <p className="text-lg text-muted-foreground mb-4 font-sans">
                  Stage Name: {model.stageName}
                </p>
              )}

              <div className="flex items-center gap-2 text-muted-foreground mb-6 font-sans">
                <MapPin className="h-4 w-4" />
                <span>{model.location}</span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8 font-sans">
                {model.bio}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-card border border-border">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Height</span>
                  <p className="text-lg font-serif mt-1">{model.height}</p>
                </div>
                {measurements.bust && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Bust</span>
                    <p className="text-lg font-serif mt-1">{measurements.bust}</p>
                  </div>
                )}
                {measurements.waist && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Waist</span>
                    <p className="text-lg font-serif mt-1">{measurements.waist}</p>
                  </div>
                )}
                {measurements.hips && (
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide font-sans">Hips</span>
                    <p className="text-lg font-serif mt-1">{measurements.hips}</p>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <span className="text-xs text-muted-foreground uppercase tracking-wide mb-3 block font-sans">
                  Specialties
                </span>
                <div className="flex flex-wrap gap-2">
                  {model.specialties.map((specialty: string) => (
                    <Badge key={specialty} variant="secondary" className="font-sans">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {(socialLinks.instagram || socialLinks.website) && (
                <div className="flex gap-4 mb-8">
                  {socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${socialLinks.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-sans"
                    >
                      <Instagram className="h-4 w-4" />
                      {socialLinks.instagram}
                    </a>
                  )}
                  {socialLinks.website && (
                    <a
                      href={`https://${socialLinks.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-sans"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  )}
                </div>
              )}

              <Link href={`/booking?model=${model.id}`}>
                <Button size="lg" className="w-full sm:w-auto font-sans">
                  Book {model.stageName || model.name.split(' ')[0]}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-serif font-medium">Portfolio</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {model.gallery.map((image: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="aspect-[3/4] relative overflow-hidden bg-muted cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image}
                  alt={`${model.name} portfolio ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Models */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <h2 className="text-3xl font-serif font-medium">You May Also Like</h2>
            <Link href="/models">
              <Button variant="outline" className="font-sans">
                View All
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {otherModels.map((otherModel, index) => (
              <motion.div
                key={otherModel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/models/${otherModel.slug}`} className="group block">
                  <div className="aspect-[3/4] relative overflow-hidden bg-muted mb-3">
                    <Image
                      src={otherModel.profileImage}
                      alt={otherModel.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-serif text-lg group-hover:text-muted-foreground transition-colors">
                    {otherModel.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans">{otherModel.location}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 p-2 text-foreground hover:text-muted-foreground transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-foreground hover:text-muted-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-foreground hover:text-muted-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div 
              className="relative max-w-4xl max-h-[90vh] w-full h-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={model.gallery[selectedImageIndex]}
                alt={`${model.name} portfolio ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-sans">
              {selectedImageIndex + 1} / {model.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
