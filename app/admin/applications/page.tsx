import { getAllApplications } from '@/lib/actions/admin'
import { StatusBadge } from '@/components/admin/status-badge'
import { ApplicationActions } from '@/components/admin/application-actions'
import { Button } from '@/components/ui/button'
import { Search, Filter, Mail, Phone, Instagram } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminApplicationsPage() {
  const applications = await getAllApplications()

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-medium mb-2">Talent Applications</h1>
          <p className="text-muted-foreground font-sans">
            Review new face submissions and scouting requests.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search applications..." 
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
                <th className="p-4 font-medium">Applicant</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Stats</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {app.photos?.[0] ? (
                          <div className="w-12 h-16 relative bg-muted shrink-0">
                            <Image
                              src={app.photos[0]}
                              alt={`${app.firstName} ${app.lastName}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-16 bg-muted shrink-0 flex items-center justify-center text-[10px] text-muted-foreground italic">
                            No Photo
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{app.firstName} {app.lastName}</div>
                          <div className="text-xs text-muted-foreground">{app.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                          <Mail className="h-3 w-3" />
                          {app.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {app.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Instagram className="h-3 w-3" />
                          {app.instagramHandle}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <span className="font-medium">H:</span> {app.height}
                      </div>
                      {app.measurements && typeof app.measurements === 'object' && (
                        <div className="text-[10px] text-muted-foreground">
                          {(app.measurements as any).bust && `B:${(app.measurements as any).bust} `}
                          {(app.measurements as any).waist && `W:${(app.measurements as any).waist} `}
                          {(app.measurements as any).hips && `H:${(app.measurements as any).hips}`}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="p-4 text-right">
                      <ApplicationActions id={app.id} currentStatus={app.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
