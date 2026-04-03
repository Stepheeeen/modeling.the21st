import { getAllModels } from '@/lib/actions/admin'
import { StatusBadge } from '@/components/admin/status-badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'

export const dynamic = 'force-dynamic'

export default async function AdminModelsPage() {
  const models = await getAllModels()

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-medium mb-2">Models</h1>
          <p className="text-muted-foreground font-sans">
            Manage your agency&apos;s roster of talent.
          </p>
        </div>
        <Link href="/admin/models/new">
          <Button className="font-sans">
            <Plus className="h-4 w-4 mr-2" />
            Add New Model
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search models..." 
              className="pl-9 font-sans"
            />
          </div>
          <Button variant="outline" className="font-sans">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="p-4 font-medium">Model</th>
                <th className="p-4 font-medium">Categories</th>
                <th className="p-4 font-medium">Experience</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {models.map((model) => (
                <tr key={model.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative overflow-hidden bg-muted">
                        <Image
                          src={model.profileImage}
                          alt={model.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium">{model.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {model.categories.slice(0, 2).map((cat) => (
                        <span key={cat} className="px-2 py-0.5 bg-muted text-[10px] uppercase tracking-wider">
                          {cat}
                        </span>
                      ))}
                      {model.categories.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">+{model.categories.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 capitalize">{model.experience}</td>
                  <td className="p-4">
                    <StatusBadge status={model.availability} />
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/models/${model.id}`}>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
