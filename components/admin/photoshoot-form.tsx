'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createPhotoshoot } from '@/lib/actions/photoshoot'
import { toast } from '@/hooks/use-toast'
import { Loader2, Calendar, Clock, MapPin, User, Camera, Brush } from 'lucide-react'

interface PhotoshootFormProps {
  models: any[]
}

export function PhotoshootForm({ models }: PhotoshootFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      modelId: formData.get('modelId'),
      date: formData.get('date'),
      time: formData.get('time'),
      location: formData.get('location'),
      photographer: formData.get('photographer'),
      stylist: formData.get('stylist'),
      notes: formData.get('notes'),
    }

    try {
      const result = await createPhotoshoot(data)
      if (result.success) {
        toast({ title: 'Photoshoot scheduled' })
        router.refresh()
        // Reset or close modal logic would go here
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Photoshoot Title</Label>
        <Input id="title" name="title" placeholder="Summer Campaign 2026" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="modelId">Model</Label>
          <Select name="modelId" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="location" name="location" className="pl-9" placeholder="Studio A, Lagos" required />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="date" name="date" type="date" className="pl-9" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="time" name="time" type="time" className="pl-9" required />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="photographer">Photographer</Label>
          <div className="relative">
            <Camera className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="photographer" name="photographer" className="pl-9" placeholder="Optional" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="stylist">Stylist</Label>
          <div className="relative">
            <Brush className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="stylist" name="stylist" className="pl-9" placeholder="Optional" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" placeholder="Equipment needed, moodboard links, etc." rows={3} />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Schedule Photoshoot
      </Button>
    </form>
  )
}
