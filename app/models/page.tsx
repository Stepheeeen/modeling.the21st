import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ModelsList } from '@/components/models-list'
import { getModels } from '@/lib/actions/model'

export default async function ModelsPage() {
  const models = await getModels()

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        {/* Banner Section */}
        <section className="py-24 md:py-32 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm tracking-[0.3em] text-muted-foreground mb-4 block font-sans">
                OUR ROSTER
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight mb-6">
                Talent Directory
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed font-sans">
                Discover our curated roster of exceptional talent, each bringing their 
                unique presence to fashion, editorial, and commercial projects.
              </p>
            </div>
          </div>
        </section>

        <ModelsList initialModels={models} />
      </main>
      <Footer />
    </>
  )
}

