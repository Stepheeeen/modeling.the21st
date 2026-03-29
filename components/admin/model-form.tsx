'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ModelSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import { createModel, updateModel } from '@/lib/actions/admin'
import { Loader2, Plus, X, ImagePlus } from 'lucide-react'
import Image from 'next/image'
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload'

interface ModelFormProps {
  initialData?: any
}

export function ModelForm({ initialData }: ModelFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(ModelSchema),
    defaultValues: initialData || {
      name: '',
      stageName: '',
      slug: '',
      profileImage: '',
      gallery: [],
      bio: '',
      height: '',
      measurements: {
        bust: '',
        waist: '',
        hips: '',
        shoes: '',
      },
      location: '',
      specialties: [],
      categories: [],
      experience: 'new',
      availability: 'available',
      featured: false,
      gender: 'female',
      socialLinks: {
        instagram: '',
        tiktok: '',
        website: '',
      },
    },
  })

  async function onSubmit(values: any) {
    try {
      setLoading(true)
      if (initialData) {
        await updateModel(initialData.id, values)
        toast({ title: 'Model updated successfully' })
      } else {
        await createModel(values)
        toast({ title: 'Model created successfully' })
      }
      router.push('/admin/models')
      router.refresh()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // Helper for multi-input fields (specialties, categories)
  const [newSpecialty, setNewSpecialty] = useState('')
  const [newCategory, setNewCategory] = useState('')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Alexandra Chen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Slug</FormLabel>
                <FormControl>
                  <Input placeholder="alexandra-chen" {...field} />
                </FormControl>
                <FormDescription>The unique URL for this model profile.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell the world about this talent..." className="min-h-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="non-binary">Non-Binary</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new">New Face</SelectItem>
                    <SelectItem value="intermediate">Rising Talent</SelectItem>
                    <SelectItem value="experienced">Experienced</SelectItem>
                    <SelectItem value="elite">Elite</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="limited">Limited</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-muted/30 p-6 space-y-4">
          <h3 className="font-medium">Physical Measurements</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder='5&apos;10"' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="measurements.bust"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bust</FormLabel>
                  <FormControl>
                    <Input placeholder='32"' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="measurements.waist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waist</FormLabel>
                  <FormControl>
                    <Input placeholder='24"' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="measurements.hips"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hips</FormLabel>
                  <FormControl>
                    <Input placeholder='34"' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="measurements.shoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shoes</FormLabel>
                  <FormControl>
                    <Input placeholder="9" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <FormLabel>Profile Image</FormLabel>
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CloudinaryUpload 
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormLabel>Gallery</FormLabel>
          <FormField
            control={form.control}
            name="gallery"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CloudinaryUpload 
                    multiple
                    value={field.value}
                    onChange={field.onChange}
                    onRemove={(url) => field.onChange(field.value.filter((val: string) => val !== url))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base font-serif">Featured Talent</FormLabel>
                <FormDescription>
                  Featured models appear on the homepage hero and spotlight sections.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="font-sans">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Update Model Profile' : 'Create Model Profile'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            disabled={loading}
            className="font-sans"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
