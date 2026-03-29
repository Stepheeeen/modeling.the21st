'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  agency: [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/editorial', label: 'Editorial' },
    { href: '/contact', label: 'Contact' },
  ],
  models: [
    { href: '/models', label: 'Browse Talent' },
    { href: '/apply', label: 'Apply Now' },
    { href: '/models?category=Fashion', label: 'Fashion' },
    { href: '/models?category=Commercial', label: 'Commercial' },
  ],
  clients: [
    { href: '/booking', label: 'Book a Model' },
    { href: '/services', label: 'Our Services' },
    { href: '/contact', label: 'Inquiries' },
  ],
}

const socialLinks = [
  { href: 'https://instagram.com/the21stng', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com/the21stng', icon: Twitter, label: 'Twitter' },
]

export function Footer() {
  const pathname = usePathname()

  // Don't show footer on admin routes
  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-2">
              <span className="text-2xl tracking-[0.2em] font-serif font-medium uppercase">
                THE 21ST
              </span>
              <span className="text-xs tracking-[0.3em] text-primary-foreground/70 ml-2">
                Modeling
              </span>
            </Link>
            <p className="text-xs tracking-widest text-primary-foreground/50 mb-6 font-sans">
              A DIVISION OF THE 21ST CREATIVE HOUSE
            </p>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm font-sans">
              Built for a new era where modeling goes beyond the runway and into 
              storytelling, branding and global influence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Agency Links */}
          <div>
            <h4 className="text-sm tracking-widest mb-6 font-sans">AGENCY</h4>
            <ul className="space-y-3">
              {footerLinks.agency.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Models Links */}
          <div>
            <h4 className="text-sm tracking-widest mb-6 font-sans">TALENT</h4>
            <ul className="space-y-3">
              {footerLinks.models.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm tracking-widest mb-6 font-sans">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-sm text-primary-foreground/70 font-sans">
                  Lokoja, Nigeria
                </span>
              </li>
              <li>
                <a
                  href="tel:+12125551234"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-sans"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +1 (212) 555-1234
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@the21st.agency"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-sans"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  info@the21st.agency
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/50 font-sans">
              &copy; {new Date().getFullYear()} THE 21ST Modeling. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors font-sans"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors font-sans"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
