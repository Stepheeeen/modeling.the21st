import type { Metadata, Viewport } from 'next'
import { Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sharpGrotesk = localFont({
  src: [
    {
      path: '../public/Sharp_Grotesk/SharpGrotesk-Thin20.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/Sharp_Grotesk/SharpGrotesk-Light20.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/Sharp_Grotesk/SharpGrotesk-Book20.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/Sharp_Grotesk/SharpGrotesk-Medium20.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/Sharp_Grotesk/SharpGrotesk-SemiBold20.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/Sharp_Grotesk/SharpGrotesk-Bold20.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/Sharp_Grotesk/SharpGrotesk-Black20.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-sharp-grotesk',
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
    <html lang="en" className={`${playfair.variable} ${sharpGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
