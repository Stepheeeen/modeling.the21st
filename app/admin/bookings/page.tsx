import { getAllBookings } from '@/lib/actions/admin'
import { StatusBadge } from '@/components/admin/status-badge'
import { BookingActions } from '@/components/admin/booking-actions'
import { Button } from '@/components/ui/button'
import { Search, Filter, Calendar as CalendarIcon, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'

export const dynamic = 'force-dynamic'

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings()

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-medium mb-2">Bookings</h1>
          <p className="text-muted-foreground font-sans">
            Manage model bookings and client requests.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search bookings..." 
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
                <th className="p-4 font-medium">Client / Company</th>
                <th className="p-4 font-medium">Model</th>
                <th className="p-4 font-medium">Event Details</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="font-medium">{booking.clientName}</div>
                      <div className="text-xs text-muted-foreground">{booking.clientCompany}</div>
                    </td>
                    <td className="p-4 italic text-muted-foreground">
                      {booking.modelName || 'Direct Request'}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs">
                          <CalendarIcon className="h-3 w-3" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {booking.location}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="p-4 text-right">
                      <BookingActions id={booking.id} currentStatus={booking.status} />
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
