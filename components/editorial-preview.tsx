'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EditorialPreviewProps {
  editorials: any[]
}

export function EditorialPreview({ editorials }: EditorialPreviewProps) {
  const featuredEditorials = editorials.slice(0, 2)

  return (
    <section className="py-24 md:py-32 bg-background">
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
              LATEST NEWS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight">
              From Our Editorial
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/editorial">
              <Button variant="outline" className="group font-sans">
                All Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredEditorials.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Link href={`/editorial/${article.slug}`} className="group block">
                <div className="aspect-[16/10] relative overflow-hidden bg-muted mb-6">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs tracking-widest text-muted-foreground uppercase font-sans">
                    {article.category}
                  </span>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <span className="text-xs text-muted-foreground font-sans">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-3 group-hover:text-muted-foreground transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {article.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
