import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getModels } from '@/lib/actions/model'
import { BookingForm } from '@/components/booking-form'

export const dynamic = 'force-dynamic'

export default async function BookingPage() {
  const models = await getModels()
  
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">Request a Booking</h1>
              <p className="text-lg text-muted-foreground font-sans">Complete the form below to request talent for your next project.</p>
            </div>
            <Suspense fallback={<div className="text-center py-8 font-sans">Loading form...</div>}>
              <BookingForm models={models} />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
