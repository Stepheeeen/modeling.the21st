'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useActionState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Upload, Check, ArrowLeft, ImagePlus, X, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { modelCategories, genderOptions } from '@/lib/data'
import { submitApplication } from '@/lib/actions/apply'
import { useToast } from '@/hooks/use-toast'

const experienceOptions = [
  'No experience',
  'Less than 1 year',
  '1-3 years',
  '3-5 years',
  '5+ years',
]

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [state, formAction, isPending] = useActionState(submitApplication, null as any)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    bust: '',
    waist: '',
    hips: '',
    shoeSize: '',
    location: '',
    experience: '',
    categories: [] as string[],
    instagramHandle: '',
    about: '',
    photos: [] as File[],
    photoPreviews: [] as string[],
    agreedToTerms: false,
    agreedToAge: false,
  })

  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Application Received',
        description: 'Thank you for your interest. Our talent team will review your application.',
      })
      setIsSubmitted(true)
    } else if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      })
    }
  }, [state, toast])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (formData.photos.length + files.length <= 5) {
      const newFiles = [...formData.photos, ...files]
      const newPreviews = [...formData.photoPreviews, ...files.map(f => URL.createObjectURL(f))]
      setFormData({ ...formData, photos: newFiles, photoPreviews: newPreviews })
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    const newPreviews = formData.photoPreviews.filter((_, i) => i !== index)
    setFormData({ ...formData, photos: newPhotos, photoPreviews: newPreviews })
  }

  const toggleCategory = (category: string) => {
    const categories = formData.categories.includes(category)
      ? formData.categories.filter((c) => c !== category)
      : formData.categories.length < 5 
        ? [...formData.categories, category]
        : formData.categories
    setFormData({ ...formData, categories })
  }

  const canProceedToStep2 = formData.firstName && formData.lastName && formData.email && formData.dateOfBirth && formData.gender
  const canProceedToStep3 = formData.height && formData.location && formData.experience
  const canSubmit = formData.photos.length >= 2 && formData.agreedToTerms && formData.agreedToAge

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="pt-20">
          <section className="py-24 md:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-8"><Check className="h-10 w-10" /></div>
                <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Application Received</h2>
                <p className="text-muted-foreground mb-8 font-sans">Thank you for your interest. Our talent team will review your application and contact you within 5-7 business days.</p>
                <Link href="/"><Button className="font-sans">Return Home</Button></Link>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">Apply to The 21st</h1>
              <p className="text-lg text-muted-foreground font-sans">Complete the application below to be considered for representation.</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-12">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 flex items-center justify-center text-sm font-sans ${s === step ? 'bg-primary text-primary-foreground' : s < step ? 'bg-primary/20' : 'bg-muted text-muted-foreground'}`}>
                      {s < step ? <Check className="h-4 w-4" /> : s}
                    </div>
                    {s < 3 && <div className={`w-16 md:w-24 h-px mx-2 ${s < step ? 'bg-primary' : 'bg-border'}`} />}
                  </div>
                ))}
              </div>



              <form action={formAction}>
                <Input type="hidden" name="categories" value={JSON.stringify(formData.categories)} />
                
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2"><Label htmlFor="firstName">First Name *</Label><Input name="firstName" id="firstName" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required /></div>
                      <div className="space-y-2"><Label htmlFor="lastName">Last Name *</Label><Input name="lastName" id="lastName" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required /></div>
                      <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input name="email" id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
                      <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input name="phone" id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
                      <div className="space-y-2"><Label htmlFor="dateOfBirth">Date of Birth *</Label><Input name="dateOfBirth" id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} required /></div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Input type="hidden" name="gender" value={formData.gender} />
                        <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                          <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                          <SelectContent>
                            {genderOptions.filter(g => g.value !== 'all').map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end"><Button type="button" onClick={() => setStep(2)} disabled={!canProceedToStep2}>Continue</Button></div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2"><Label htmlFor="height">Height *</Label><Input name="height" id="height" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} required /></div>
                      <div className="space-y-2"><Label htmlFor="bust">Bust / Chest</Label><Input name="bust" id="bust" value={formData.bust} onChange={(e) => setFormData({ ...formData, bust: e.target.value })} /></div>
                      <div className="space-y-2"><Label htmlFor="waist">Waist</Label><Input name="waist" id="waist" value={formData.waist} onChange={(e) => setFormData({ ...formData, waist: e.target.value })} /></div>
                      <div className="space-y-2"><Label htmlFor="hips">Hips</Label><Input name="hips" id="hips" value={formData.hips} onChange={(e) => setFormData({ ...formData, hips: e.target.value })} /></div>
                      <div className="space-y-2"><Label htmlFor="shoeSize">Shoe Size</Label><Input name="shoeSize" id="shoeSize" value={formData.shoeSize} onChange={(e) => setFormData({ ...formData, shoeSize: e.target.value })} /></div>
                      <div className="space-y-2"><Label htmlFor="location">Current Location *</Label><Input name="location" id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience *</Label>
                        <Input type="hidden" name="experience" value={formData.experience} />
                        <Select value={formData.experience} onValueChange={(v) => setFormData({ ...formData, experience: v })}>
                          <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                          <SelectContent>
                            {experienceOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label htmlFor="instagramHandle">Instagram Handle</Label><Input name="instagramHandle" id="instagramHandle" value={formData.instagramHandle} onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })} /></div>
                    </div>
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}><ArrowLeft className="h-4 w-4 mr-2" />Back</Button>
                      <Button type="button" onClick={() => setStep(3)} disabled={!canProceedToStep3}>Continue</Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="space-y-4">
                      <Label>Photos * (minimum 2)</Label>
                      <Input type="hidden" name="photos" value={JSON.stringify(formData.photoPreviews)} />
                      <CloudinaryUpload 
                        multiple
                        value={formData.photoPreviews}
                        onChange={(urls: string | string[]) => setFormData(prev => ({ 
                          ...prev, 
                          photoPreviews: Array.isArray(urls) ? urls : [urls] 
                        }))}
                        onRemove={(url: string) => setFormData(prev => ({ 
                          ...prev, 
                          photoPreviews: prev.photoPreviews.filter(p => p !== url) 
                        }))}
                      />
                    </div>
                    <div className="space-y-2"><Label htmlFor="about">About You</Label><Textarea name="about" id="about" value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} /></div>
                    <div className="space-y-4 bg-muted p-4">
                      <div className="flex items-start gap-2"><Checkbox id="agreedToAge" checked={formData.agreedToAge} onCheckedChange={(c) => setFormData({ ...formData, agreedToAge: !!c })} /><Label htmlFor="agreedToAge" className="cursor-pointer">I am 18+ or have consent</Label></div>
                      <div className="flex items-start gap-2"><Checkbox id="agreedToTerms" checked={formData.agreedToTerms} onCheckedChange={(c) => setFormData({ ...formData, agreedToTerms: !!c })} /><Label htmlFor="agreedToTerms" className="cursor-pointer">I agree to terms</Label></div>
                    </div>
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
                      <Button type="submit" disabled={!canSubmit || isPending}>{isPending ? 'Submitting...' : 'Submit'}</Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

