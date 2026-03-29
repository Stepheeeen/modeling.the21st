'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Clock, Send, Instagram, Twitter, Linkedin } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    details: ['Lokoja, Nigeria'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@the21st.agency', 'bookings@the21st.agency'],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+1 (212) 555-1234', '+1 (212) 555-5678'],
  },
  {
    icon: Clock,
    title: 'Hours',
    details: ['Monday - Friday: 9am - 6pm', 'Saturday: By appointment'],
  },
]

const socialLinks = [
  { href: 'https://instagram.com/the21stng', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com/the21stng', icon: Twitter, label: 'Twitter' },
]

const inquiryTypes = [
  'General Inquiry',
  'Booking Request',
  'Model Application',
  'Press & Media',
  'Partnership',
  'Other',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
                  GET IN TOUCH
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-6">
                  Let&apos;s Connect
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-12 font-sans">
                  Whether you&apos;re looking to book talent, join our roster, or explore a 
                  partnership, we&apos;d love to hear from you.
                </p>

                <div className="space-y-8 mb-12">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-12 h-12 bg-secondary flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-sans text-sm tracking-wide mb-1">{item.title}</h3>
                        {item.details.map((detail) => (
                          <p key={detail} className="text-muted-foreground text-sm font-sans">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-sm tracking-wide mb-4 font-sans">FOLLOW US</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                        aria-label={social.label}
                      >
                        <social.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-card p-8 md:p-12 border border-border"
              >
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6">
                      <Send className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-serif mb-4">Message Sent</h2>
                    <p className="text-muted-foreground font-sans">
                      Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-serif mb-8">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="font-sans text-sm">
                            Full Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="font-sans"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-sans text-sm">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="font-sans text-sm">
                            Company
                          </Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="font-sans"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inquiryType" className="font-sans text-sm">
                            Inquiry Type <span className="text-destructive">*</span>
                          </Label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                            required
                          >
                            <SelectTrigger className="font-sans">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type} value={type} className="font-sans">
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="font-sans text-sm">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="font-sans resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full font-sans"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-96 bg-muted relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-balance px-4">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground font-sans">
                Lokoja, Nigeria
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
