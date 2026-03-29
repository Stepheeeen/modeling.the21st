import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'THE 21ST Modeling | Modern Talent Agency',
  description: 'T21 Modeling Agency is a modern talent agency focused on discovering, developing and managing the next generation of models, rooted in African youth culture.',
  keywords: ['modeling agency', 'fashion models', 'talent management', 'African fashion', 'African youth culture', 'model development'],
  authors: [{ name: 'THE 21ST Modeling' }],
  openGraph: {
    title: 'THE 21ST Modeling | Modern Talent Agency',
    description: 'Discovering, developing and managing the next generation of models, rooted in African youth culture.',
    url: 'https://the21st.agency',
    siteName: 'THE 21ST Modeling',
    locale: 'en_US',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
