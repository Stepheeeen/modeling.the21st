import { getPhotoshoots } from '@/lib/actions/photoshoot'
import { getModels } from '@/lib/actions/model'
import { PhotoshootForm } from '@/components/admin/photoshoot-form'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, MapPin, Camera } from 'lucide-react'

export default async function PhotoshootsPage() {
  const [photoshoots, models] = await Promise.all([
    getPhotoshoots(),
    getModels(),
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'in-progress': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      case 'completed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20'
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium tracking-tight">Photoshoots</h1>
          <p className="text-muted-foreground font-sans">
            Schedule and manage photography sessions.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-sans">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">New Photoshoot</DialogTitle>
              <DialogDescription>
                Fill in the details below to schedule a new session.
              </DialogDescription>
            </DialogHeader>
            <PhotoshootForm models={models} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-sans">Session Detail</TableHead>
              <TableHead className="font-sans">Logistics</TableHead>
              <TableHead className="font-sans">Crew</TableHead>
              <TableHead className="font-sans">Status</TableHead>
              <TableHead className="text-right font-sans">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {photoshoots.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground font-sans">
                  No photoshoots scheduled yet.
                </TableCell>
              </TableRow>
            ) : (
              photoshoots.map((session) => (
                <TableRow key={session.id} className="group transition-colors">
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-serif font-medium">{session.title}</p>
                      <p className="text-xs text-muted-foreground font-sans italic">
                        Model ID: {session.modelId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5 text-sm font-sans">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-3.5 w-3.5" />
                        {new Date(session.date).toLocaleDateString()} at {session.time}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-3.5 w-3.5" />
                        {session.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm font-sans text-muted-foreground">
                      <div className="flex items-center">
                        <Camera className="mr-2 h-3.5 w-3.5 opacity-70" />
                        {session.photographer || 'N/A'}
                      </div>
                      <p className="pl-[22px] text-xs opacity-70">Stylist: {session.stylist || 'N/A'}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-sans capitalize py-0.5 ${getStatusColor(session.status)}`}>
                      {session.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground font-sans">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
