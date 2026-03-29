import { getApplicationById, updateApplicationStatus } from '@/lib/actions/admin'
import { StatusBadge } from '@/components/admin/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Mail, Phone, Instagram, MapPin, Calendar, User, ArrowLeft, Check, X, Archive } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const application = await getApplicationById(params.id)

  if (!application) {
    notFound()
  }

  const measurements = application.measurements as any

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/applications">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-medium">Application Detail</h1>
          <p className="text-muted-foreground font-sans">
            Submitted on {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={application.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Photos */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-serif font-medium">Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {application.photos.map((photo, index) => (
              <div key={index} className="aspect-[3/4] relative bg-muted group">
                <Image
                  src={photo}
                  alt={`Applicant photo ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            ))}
            {application.photos.length === 0 && (
              <div className="col-span-full h-64 bg-muted flex items-center justify-center text-muted-foreground italic font-sans italic font-sans italic font-sans">
                No photos provided
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Info & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Applicant Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-sans">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{application.firstName} {application.lastName}</div>
                  <div className="text-xs text-muted-foreground">Name</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{application.email}</div>
                  <div className="text-xs text-muted-foreground">Email</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{application.phone}</div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">@{application.instagramHandle}</div>
                  <div className="text-xs text-muted-foreground">Instagram</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">{application.location}</div>
                  <div className="text-xs text-muted-foreground">Location</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Stats & Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 font-sans">
                <div className="p-3 bg-muted/50 rounded-sm">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Height</div>
                  <div className="text-lg font-medium">{application.height}</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-sm">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Bust</div>
                  <div className="text-lg font-medium">{measurements?.bust || 'N/A'}</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-sm">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Waist</div>
                  <div className="text-lg font-medium">{measurements?.waist || 'N/A'}</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-sm">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Hips</div>
                  <div className="text-lg font-medium">{measurements?.hips || 'N/A'}</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-sm">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Shoe</div>
                  <div className="text-lg font-medium">{measurements?.shoeSize || 'N/A'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <form action={async () => {
              'use server'
              await updateApplicationStatus(application.id, 'accepted')
            }}>
              <Button className="w-full h-12 gap-2 bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4" />
                Approve
              </Button>
            </form>
            <form action={async () => {
              'use server'
              await updateApplicationStatus(application.id, 'rejected')
            }}>
              <Button variant="destructive" className="w-full h-12 gap-2">
                <X className="h-4 w-4" />
                Reject
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
