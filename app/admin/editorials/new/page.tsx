import { EditorialForm } from '@/components/admin/editorial-form'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function NewEditorialPage() {
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
        <h1 className="text-3xl font-serif font-medium">New Editorial</h1>
        <p className="text-muted-foreground font-sans">
          Create a new campaign or news article.
        </p>
      </div>

      <div className="bg-card border border-border p-6 md:p-8">
        <EditorialForm />
      </div>
    </div>
  )
}
