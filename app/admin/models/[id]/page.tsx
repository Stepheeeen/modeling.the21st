import { getModelById } from '@/lib/actions/admin'
import { ModelForm } from '@/components/admin/model-form'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface EditModelPageProps {
  params: {
    id: string
  }
}

export default async function EditModelPage({ params }: EditModelPageProps) {
  const model = await getModelById(params.id)

  if (!model) {
    notFound()
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <Link 
          href="/admin/models" 
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Roster
        </Link>
        <h1 className="text-3xl font-serif font-medium">Edit Model: {model.name}</h1>
        <p className="text-muted-foreground font-sans">
          Update the profile information and portfolio for {model.name}.
        </p>
      </div>

      <div className="bg-card border border-border p-6 md:p-8">
        <ModelForm initialData={model} />
      </div>
    </div>
  )
}
