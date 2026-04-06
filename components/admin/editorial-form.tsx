'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EditorialSchema } from '@/lib/validations'
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
import { createEditorial, updateEditorial } from '@/lib/actions/admin'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload'

interface EditorialFormProps {
  initialData?: any
}

export function EditorialForm({ initialData }: EditorialFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(EditorialSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      category: 'editorial',
      featured: false,
      author: 'T21 Editorial Team',
      modelIds: [],
      gallery: [],
    },
  })

  async function onSubmit(values: any) {
    try {
      setLoading(true)
      if (initialData) {
        await updateEditorial(initialData.id, values)
        toast({ title: 'Editorial updated successfully' })
      } else {
        await createEditorial(values)
        toast({ title: 'Editorial published successfully' })
      }
      router.push('/admin/editorials')
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="The New Wave of Fashion" {...field} />
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
                  <Input placeholder="new-wave-fashion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (Short Summary)</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief introduction to the article..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write the full story here..." className="min-h-[300px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="campaign">Campaign</SelectItem>
                    <SelectItem value="editorial">Editorial</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="spotlight">Spotlight</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormLabel>Cover Image</FormLabel>
          <FormField
            control={form.control}
            name="coverImage"
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
          <FormLabel>Gallery (Optional)</FormLabel>
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
                <FormDescription>Add multiple images for the editorial gallery.</FormDescription>
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
                <FormLabel className="text-base font-serif">Featured Article</FormLabel>
                <FormDescription>
                  Featured editorials are highlighted at the top of the feed and homepage.
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
            {initialData ? 'Update Editorial' : 'Publish Editorial'}
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
