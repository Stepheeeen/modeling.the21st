import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ModelProfileClient } from '@/components/model-profile-client'
import { getModelBySlug, getModels } from '@/lib/actions/model'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const model = await getModelBySlug(slug)
  
  if (!model) return { title: 'Model Not Found | THE 21ST' }
  
  return {
    title: `${model.name} | THE 21ST Modeling`,
    description: model.bio.substring(0, 160),
  }
}

export default async function ModelProfilePage({ params }: Props) {
  const { slug } = await params
  const model = await getModelBySlug(slug)

  if (!model) {
    notFound()
  }

  const allModels = await getModels()
  const otherModels = allModels.filter((m) => m.id !== model.id).slice(0, 4)

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Back Button */}
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/models"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors font-sans"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Directory
            </Link>
          </div>
        </div>

        <ModelProfileClient model={model} otherModels={otherModels} />
      </main>
      <Footer />
    </>
  )
}
