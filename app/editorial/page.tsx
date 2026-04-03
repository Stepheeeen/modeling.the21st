import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { EditorialListClient } from '@/components/editorial-list-client'
import { getEditorials } from '@/lib/actions/editorial'

export const metadata = {
  title: 'Editorial | THE 21ST Modeling',
  description: 'Stay updated with the latest campaigns, industry news, and model spotlights from THE 21ST.',
}

export const dynamic = 'force-dynamic'

export default async function EditorialPage() {
  const editorials = await getEditorials()

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
                NEWS & INSIGHTS
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-6">
                Editorial
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed font-sans">
                Stay updated with the latest campaigns, industry news, model spotlights, 
                and behind-the-scenes content from The 21st.
              </p>
            </div>
          </div>
        </section>

        <EditorialListClient editorials={editorials} />
      </main>
      <Footer />
    </>
  )
}
