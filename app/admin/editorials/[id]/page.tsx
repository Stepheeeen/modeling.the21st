import { getEditorialById } from '@/lib/actions/admin'
import { EditorialForm } from '@/components/admin/editorial-form'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface EditEditorialPageProps {
  params: {
    id: string
  }
}

export default async function EditEditorialPage({ params }: EditEditorialPageProps) {
  const editorial = await getEditorialById(params.id)

  if (!editorial) {
    notFound()
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <Link 
          href="/admin/editorials" 
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Editorials
        </Link>
        <h1 className="text-3xl font-serif font-medium">Edit Editorial: {editorial.title}</h1>
        <p className="text-muted-foreground font-sans">
          Update the content and featured status of the article.
        </p>
      </div>

      <div className="bg-card border border-border p-6 md:p-8">
        <EditorialForm initialData={editorial} />
      </div>
    </div>
  )
}
