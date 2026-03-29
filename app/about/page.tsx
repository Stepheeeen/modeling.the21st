'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'

const stats = [
  { value: 'Culture', label: 'Driven' },
  { value: 'Creative', label: 'Led' },
  { value: 'Development', label: 'Focused' },
  { value: 'Community', label: 'Oriented' },
]

const values = [
  {
    title: 'Culture-Driven',
    description: 'Rooted in African youth culture with a global appeal that resonates across borders.',
  },
  {
    title: 'Creative-Led',
    description: 'A strong focus on storytelling and visuals that define a new era of modeling.',
  },
  {
    title: 'Development-Focused',
    description: 'We invest in the growth and professional potential of our models, not just bookings.',
  },
  {
    title: 'Community-Oriented',
    description: 'We build lasting relationships with our talent and collaborators, not just rosters.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
                  A DIVISION OF THE 21ST CREATIVE HOUSE
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-6">
                  THE 21ST Modeling
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-sans text-balance">
                  T21 Modeling Agency is a modern talent agency focused on discovering, developing and managing the next generation of models.
                </p>
                <p className="text-muted-foreground leading-relaxed font-sans mb-8">
                  We work at the intersection of fashion, culture and media, helping new faces grow into industry-ready professionals while connecting them to real opportunities. We are built for a new era where modeling goes beyond the runway and into storytelling, branding and global influence.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop"
                    alt="Fashion editorial shoot"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-border bg-card -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-24 bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif mb-6 italic">Our Vision</h2>
                <p className="text-xl text-muted-foreground leading-relaxed font-sans italic">
                  &quot;To become a leading platform for emerging models, shaping a new standard of representation rooted in diversity, authenticity and cultural relevance.&quot;
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-serif mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-sans">
                  To identify raw talent, refine their potential and position them for success through strategic development, exposure and industry connections.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-serif font-medium mb-2 uppercase tracking-widest">
                    {stat.value}
                  </div>
                  <div className="text-xs text-primary-foreground/60 tracking-[0.3em] font-sans uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values / Differentiators Section */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
                WHY T21?
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                What Makes Us Different
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 border border-border bg-card hover:bg-muted transition-colors"
                >
                  <h3 className="text-xl font-serif mb-4">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-24 md:py-32 bg-card overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <Image
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=800&fit=crop"
                    alt="Creative direction"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
                  OUR APPROACH
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-6">
                  Building Models, Not Just Rosters
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 font-sans">
                  At T21, we don&apos;t just &quot;sign&quot; models; we build them. We take a hands-on, creative-first approach by understanding each model&apos;s unique identity, developing their personal style and strengths, and positioning them for the right opportunities.
                </p>
                <div className="space-y-4">
                  {[
                    'Understanding unique identity',
                    'Developing personal style',
                    'Strategic positioning',
                    'Growth-stage guidance'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-sm font-sans text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Who We Work With Section */}
        <section className="py-24 md:py-32 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                Who We Work With
              </h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Aspiring and emerging models',
                'Fashion brands and designers',
                'Photographers and creatives',
                'Production teams',
                'Agencies and collaborators'
              ].map((partner, index) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-6 py-3 bg-background border border-border text-sm font-sans"
                >
                  {partner}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Goals Section */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
                  LOOKING FORWARD
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                  Our Future Goals
                </h2>
              </motion.div>

              <div className="space-y-8">
                {[
                  { title: 'Talent Roster', desc: 'Build a strong and diverse talent roster that represents the best of emerging faces.' },
                  { title: 'Global Collaboration', desc: 'Collaborate with top brands locally and internationally to create impactful visuals.' },
                  { title: 'Scouting Events', desc: 'Host model scouting and casting events to discover fresh talent directly.' },
                  { title: 'Market Expansion', desc: 'Expand into global markets, bringing African youth culture to the world stage.' }
                ].map((goal, index) => (
                  <motion.div
                    key={goal.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 pb-8 border-b border-border last:border-0"
                  >
                    <span className="text-2xl font-serif text-primary/30">0{index + 1}</span>
                    <div>
                      <h3 className="text-xl font-serif mb-2">{goal.title}</h3>
                      <p className="text-muted-foreground font-sans">{goal.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  )
}
