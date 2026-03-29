'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface EditorialListClientProps {
  editorials: any[]
}

const categories = ['All', 'Campaign', 'Editorial', 'News', 'Spotlight']

export function EditorialListClient({ editorials }: EditorialListClientProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredEditorials = activeCategory === 'All'
    ? editorials
    : editorials.filter((e) => e.category?.toLowerCase() === activeCategory.toLowerCase())

  return (
    <>
      {/* Category Filter */}
      <section className="py-8 bg-card border-y border-border sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-4 py-2 text-sm tracking-wide transition-colors font-sans',
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEditorials.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-sans">
                No articles found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEditorials.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/editorial/${article.slug}`} className="group block">
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted mb-6">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {article.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground px-3 py-1 text-xs tracking-wide font-sans">
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs tracking-widest text-muted-foreground uppercase font-sans">
                        {article.category}
                      </span>
                      <span className="w-1 h-1 bg-border rounded-full" />
                      <span className="text-xs text-muted-foreground font-sans">
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-serif mb-3 group-hover:text-muted-foreground transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans line-clamp-2">
                      {article.excerpt}
                    </p>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
