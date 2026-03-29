import { getAllEditorials } from '@/lib/actions/admin'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'

export default async function AdminEditorialsPage() {
  const editorials = await getAllEditorials()

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-medium mb-2">Editorials</h1>
          <p className="text-muted-foreground font-sans">
            Manage your agency&apos;s campaigns, news, and spotlights.
          </p>
        </div>
        <Link href="/admin/editorials/new">
          <Button className="font-sans">
            <Plus className="h-4 w-4 mr-2" />
            New Editorial
          </Button>
        </Link>
      </div>

      <div className="bg-card border border-border">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search editorials..." 
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
                <th className="p-4 font-medium">Article</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Published</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {editorials.map((article) => (
                <tr key={article.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 relative overflow-hidden bg-muted rounded shrink-0">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium line-clamp-1">{article.title}</span>
                    </div>
                  </td>
                  <td className="p-4 capitalize">
                    <span className="px-2 py-1 bg-muted rounded text-[10px] uppercase tracking-wider">
                      {article.category}
                    </span>
                  </td>
                  <td className="p-4">{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/editorials/${article.id}`}>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {editorials.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No editorials found. Create your first one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
