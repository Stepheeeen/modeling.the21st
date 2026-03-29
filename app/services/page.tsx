'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Camera, Sparkles, BookOpen, TrendingUp, Star, Lightbulb, Check } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  Camera,
  Sparkles,
  BookOpen,
  TrendingUp,
  Star,
  Lightbulb,
}

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We begin with a detailed discussion of your vision, brand requirements, and project goals.',
  },
  {
    step: '02',
    title: 'Talent Matching',
    description: 'Our team curates a selection of models perfectly suited to your campaign aesthetic.',
  },
  {
    step: '03',
    title: 'Production',
    description: 'We manage all logistics, from casting to final delivery, ensuring seamless execution.',
  },
  {
    step: '04',
    title: 'Delivery',
    description: 'Your project is completed to the highest standards with ongoing support as needed.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
                  OUR SERVICES
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-6">
                  Comprehensive Talent Solutions
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-sans">
                  T21 provides end-to-end talent management and creative services 
                  rooted in culture, storytelling, and professional excellence.
                </p>
                <Link href="/booking">
                  <Button size="lg" className="group font-sans">
                    Start a Project
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop"
                    alt="Fashion campaign shoot"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 md:py-32 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
                WHAT WE OFFER
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                Full-Service Capabilities
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || Camera
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group p-8 border border-border hover:border-foreground/20 transition-colors bg-background"
                  >
                    <Icon className="h-10 w-10 mb-6" />
                    <h3 className="text-xl font-serif mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed font-sans">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm font-sans">
                          <Check className="h-4 w-4 text-foreground/60" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 md:py-32 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm tracking-[0.3em] text-primary-foreground/60 mb-4 block font-sans">
                HOW WE WORK
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                Our Process
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-5xl font-serif text-primary-foreground/20 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-serif mb-3">{step.title}</h3>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed font-sans">
                    {step.description}
                  </p>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 right-0 w-1/2 h-px bg-primary-foreground/20" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
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
                TRUSTED BY
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight mb-4">
                Industry Leaders
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-sans">
                We have partnered with some of the world&apos;s most prestigious brands, 
                publications, and creative agencies.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {['VOGUE', 'CHANEL', 'DIOR', 'GUCCI', 'PRADA', 'HARPER\'S'].map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <span className="text-xl tracking-[0.2em] text-muted-foreground/50 font-serif">
                    {brand}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-6">
                Ready to Start Your Project?
              </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8 font-sans">
                  Let&apos;s discuss how THE 21ST Modeling can bring your vision to life with our 
                  exceptional talent and creative-led approach.
                </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="group font-sans">
                    Book a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="font-sans">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
