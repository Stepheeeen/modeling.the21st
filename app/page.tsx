import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { FeaturedModels } from '@/components/featured-models'
import { ServicesPreview } from '@/components/services-preview'
import { EditorialPreview } from '@/components/editorial-preview'
import { CTASection } from '@/components/cta-section'
import { getFeaturedModels } from '@/lib/actions/model'
import { getEditorials } from '@/lib/actions/editorial'

export default async function HomePage() {
  const [featuredModels, editorials] = await Promise.all([
    getFeaturedModels(),
    getEditorials(),
  ])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedModels models={featuredModels} />
        <ServicesPreview />
        <EditorialPreview editorials={editorials} />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

