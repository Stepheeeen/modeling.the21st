'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { ModelCard } from '@/components/model-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { modelCategories, experienceLevels, availabilityOptions, genderOptions } from '@/lib/data'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ModelsListProps {
  initialModels: any[]
}

export function ModelsList({ initialModels }: ModelsListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [experience, setExperience] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [gender, setGender] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const featuredModels = initialModels.filter((m) => m.featured)

  const filteredModels = useMemo(() => {
    return initialModels.filter((model) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          model.name.toLowerCase().includes(query) ||
          model.location.toLowerCase().includes(query) ||
          model.specialties?.some((s: string) => s.toLowerCase().includes(query)) ||
          model.categories?.some((c: string) => c.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      if (activeCategory !== 'All') {
        if (!model.categories?.includes(activeCategory)) return false
      }

      if (experience !== 'all' && model.experience !== experience) return false
      if (availability !== 'all' && model.availability !== availability) return false
      if (gender !== 'all' && model.gender !== gender) return false

      return true
    })
  }, [initialModels, searchQuery, activeCategory, experience, availability, gender])

  const clearFilters = () => {
    setSearchQuery('')
    setActiveCategory('All')
    setExperience('all')
    setAvailability('all')
    setGender('all')
  }

  const hasActiveFilters = 
    searchQuery || 
    activeCategory !== 'All' || 
    experience !== 'all' || 
    availability !== 'all' || 
    gender !== 'all'

  return (
    <div>
      {/* Featured Models Section */}
      {!hasActiveFilters && (
        <section className="py-16 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl font-serif">Featured Talent</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {featuredModels.slice(0, 5).map((model, index) => (
                <ModelCard key={model.id} model={model} index={index} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search & Filters Sticky Bar */}
      <section className="py-8 bg-background border-b border-border sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search models, locations, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-sans"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {modelCategories.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-3 py-1.5 text-sm tracking-wide whitespace-nowrap transition-colors font-sans',
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger className="w-[150px] font-sans">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="font-sans">
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground font-sans">
              Showing {filteredModels.length} {filteredModels.length === 1 ? 'model' : 'models'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredModels.map((model, index) => (
              <ModelCard key={model.id} model={model} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
